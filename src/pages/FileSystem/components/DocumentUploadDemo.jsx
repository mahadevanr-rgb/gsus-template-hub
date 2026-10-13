import React from "react";
import { DocumentUpload } from "@/components/common/FileSystem";

export default function DocumentUploadDemo() {
  return (
    <div className="w-full max-w-lg mx-auto p-2">
      <DocumentUpload
        accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt"
        maxSize={15 * 1024 * 1024}
        maxFiles={4}
        title="Upload documentation & specs"
        description="PDF, Word, Excel, and CSV files supported"
        onFilesChange={(docs) => console.log("Documents:", docs.length)}
      />
    </div>
  );
}
