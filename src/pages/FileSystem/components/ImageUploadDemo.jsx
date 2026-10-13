import React from "react";
import { ImageUpload } from "@/components/common/FileSystem";

export default function ImageUploadDemo() {
  return (
    <div className="w-full max-w-lg mx-auto p-2">
      <ImageUpload
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        maxSize={8 * 1024 * 1024} // 8 MB
        allowCrop={true}
        allowCompress={true}
        aspectRatio="16:9"
        title="Upload component preview"
        description="PNG, JPG or WEBP up to 8 MB · Crop & Compress enabled"
        onImageChange={(img) => console.log("Image selected:", img?.name)}
      />
    </div>
  );
}
