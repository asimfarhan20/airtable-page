"use client";
import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const user = useUser({ or: "redirect" });

  useEffect(() => {
    if (user) {
      router.replace("/homepage");
    }
  });
  return (
    <div className="flex items-center justify-center h-screen">
      <h1>Welcome to AskJunior</h1>
    </div>
  );
}