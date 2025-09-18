"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useEdgeStore } from "@/lib/edgestore"
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileWithPreview extends File {
  preview?: string
}

export function FileUpload() {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: string }>({})
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const { edgestore } = useEdgeStore()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      }),
    )
    setFiles((prev) => [...prev, ...newFiles])
    setErrors({})
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  const removeFile = (fileToRemove: FileWithPreview) => {
    setFiles((files) => files.filter((file) => file !== fileToRemove))
    if (fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview)
    }
  }

  const uploadFiles = async () => {
    if (files.length === 0) return

    setUploading(true)
    setUploadProgress({})
    setUploadedFiles({})
    setErrors({})

    for (const file of files) {
      try {
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            setUploadProgress((prev) => ({
              ...prev,
              [file.name]: progress,
            }))
          },
        })

        setUploadedFiles((prev) => ({
          ...prev,
          [file.name]: res.url,
        }))
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          [file.name]: error instanceof Error ? error.message : "Upload failed",
        }))
      }
    }

    setUploading(false)
  }

  const getFileStatus = (fileName: string) => {
    if (errors[fileName]) return "error"
    if (uploadedFiles[fileName]) return "success"
    if (uploadProgress[fileName] !== undefined) return "uploading"
    return "pending"
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          File Upload
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
            isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
          )}
        >
          <input {...getInputProps()} />
          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          {isDragActive ? (
            <p className="text-primary">Drop the files here...</p>
          ) : (
            <div>
              <p className="text-lg font-medium mb-2">Drag & drop files here, or click to select</p>
              <p className="text-sm text-muted-foreground">Maximum file size: 10MB</p>
            </div>
          )}
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium">Selected Files ({files.length})</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {files.map((file, index) => {
                const status = getFileStatus(file.name)
                const progress = uploadProgress[file.name] || 0

                return (
                  <div key={`${file.name}-${index}`} className="flex items-center gap-3 p-3 border rounded-lg">
                    {file.preview ? (
                      <img
                        src={file.preview || "/placeholder.svg"}
                        alt={file.name}
                        className="h-10 w-10 object-cover rounded"
                      />
                    ) : (
                      <File className="h-10 w-10 text-muted-foreground" />
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>

                      {status === "uploading" && <Progress value={progress} className="mt-1 h-1" />}

                      {status === "error" && <p className="text-xs text-destructive mt-1">{errors[file.name]}</p>}

                      {status === "success" && <p className="text-xs text-green-600 mt-1">Uploaded successfully</p>}
                    </div>

                    <div className="flex items-center gap-2">
                      {status === "success" && <CheckCircle className="h-4 w-4 text-green-600" />}
                      {status === "error" && <AlertCircle className="h-4 w-4 text-destructive" />}
                      {status === "uploading" && (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      )}

                      {!uploading && (
                        <Button variant="ghost" size="sm" onClick={() => removeFile(file)} className="h-8 w-8 p-0">
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Upload Button */}
        {files.length > 0 && (
          <Button onClick={uploadFiles} disabled={uploading} className="w-full">
            {uploading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload {files.length} file{files.length > 1 ? "s" : ""}
              </>
            )}
          </Button>
        )}

        {/* Uploaded Files Links */}
        {Object.keys(uploadedFiles).length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium text-green-600">Uploaded Files</h3>
            <div className="space-y-1">
              {Object.entries(uploadedFiles).map(([fileName, url]) => (
                <div
                  key={fileName}
                  className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-950/20 rounded"
                >
                  <span className="text-sm truncate">{fileName}</span>
                  <Button variant="outline" size="sm" onClick={() => window.open(url, "_blank")}>
                    View
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
