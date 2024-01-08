"use client";
import axios from "axios";
import UploadIcon from "./UploadIcon";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadForm() {
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  async function upload(ev) {
    ev.preventDefault();
    const files = ev.target?.files;
    if (files.length > 0) {
      const file = files[0];
      setIsUploading(true);
      const res = await axios.postForm("/api/upload", { file });
      setIsUploading(false);
      const newName = res.data.newName;
      router.push("/" + newName);
    }
  }

  return (
    <>
      {isUploading && (
        <div className="fixed inset-0 flex items-center text-white bg-black/90">
          <div className="w-full text-center">
            <h2 className="mb-4 text-4xl">Uploading</h2>
            <h3 className="text-xl">Please wait...</h3>
          </div>
        </div>
      )}
      <label className="inline-flex gap-2 px-6 py-2 bg-green-600 border-2 rounded-full cursor-pointer border-purple-700/50">
        <UploadIcon />
        <span>Choose File</span>
        <input onChange={upload} type="file" className="hidden" />
      </label>
    </>
  );
}
