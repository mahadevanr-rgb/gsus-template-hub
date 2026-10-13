import React, { useState } from "react";
import { FileUpload } from "@/components/common/FileSystem";

export default function BasicFileUploadDemo() {
  const [uploadedFile, setUploadedFile] = useState(null);

  return (
    <div className="w-full max-w-lg mx-auto p-2">
      <FileUpload
        accept=".pdf,.png,.jpg,.jpeg,.zip"
        maxSize={5 * 1024 * 1024} // 5 MB
        title="Upload component source"
        description="PDF, PNG, JPG, or ZIP up to 5 MB"
        onFileChange={(f) => setUploadedFile(f)}
        onUploadSuccess={(res) => console.log("Uploaded file successfully:", res)}
      />

      {uploadedFile?.status === "success" && (
        <div className="mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center justify-between">
          <span>File ready for processing: <strong>{uploadedFile.name}</strong></span>
          <span className="font-mono text-[10px]">ID: {uploadedFile.id}</span>
        </div>
      )}
    </div>
  );
}
