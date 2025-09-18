import React from "react";
import Navbar from "@/components/Navbar";
import { FileUpload } from "@/components/FileUpload";

const HomePage = () => {
  return (
    <div className="flex justify-center w-screen h-screen ">
      <Navbar />
      <div className="mt-30 w-full max-w-4xl m-1 md:mr-10 md:fixed md:top-20 md:left-80 md:z-50 overflow-hidden">
        <FileUpload />
      </div>
    </div>
  );
};

export default HomePage;
