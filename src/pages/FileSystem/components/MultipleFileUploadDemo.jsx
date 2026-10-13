import React from "react";
import { MultipleFileUpload } from "@/components/common/FileSystem";

export default function MultipleFileUploadDemo() {
  return (
    <div className="w-full max-w-xl mx-auto p-2">
      <MultipleFileUpload
        accept=".pdf,.png,.jpg,.jpeg,.svg,.docx,.zip"
        maxSize={10 * 1024 * 1024} // 10 MB per file
        maxFiles={6}
        title="Upload project assets"
        description="Select multiple documents or images (Max 6 files)"
        onFilesChange={(files) => console.log("Files updated:", files.length)}
      />
    </div>
  );
}
