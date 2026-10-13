import {
  ImageCropDemo,
  ImageCompressionDemo,
  AvatarUploadDemo,
} from "@/pages/FileSystem/components";

export const processingComponents = [
  {
    id: "image-crop",
    slug: "image-crop",
    name: "Client-Side Image Crop",
    category: "file-system",
    subCategory: "Processing",
    tag: "Crop",
    theme: "fuchsia",
    version: "v1.0.0",
    description:
      "Clean canvas-powered image cropper offering 1:1, 4:3, 16:9, and freeform aspect presets, interactive zoom, pan, and real File blob output.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["crop", "canvas", "aspect-ratio", "client-side", "image-editor"],
    files: [{ name: "ImageCropModal.jsx", path: "components/common/FileSystem/ImageCropModal.jsx" }],
    component: ImageCropDemo,
    sourceCode: `import React, { useState } from "react";
import { ImageCropModal } from "@/components/common/FileSystem";

export default function ImageCropDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("https://picsum.photos/800/600");

  return (
    <ImageCropModal
      isOpen={isOpen}
      imageSrc={imageUrl}
      aspectRatio="1:1"
      onClose={() => setIsOpen(false)}
      onCropComplete={(result) => console.log("Cropped:", result.width, result.height)}
    />
  );
}`,
    uses: ["Avatar cropping", "Thumbnail framing", "Banner aspect ratio alignment"],
  },
  {
    id: "image-compression",
    slug: "image-compression",
    name: "Client-Side Compression",
    category: "file-system",
    subCategory: "Processing",
    tag: "Compression",
    theme: "cyan",
    version: "v1.0.0",
    description:
      "Real-time canvas image compression showing quality slider, max dimension scaling, and original vs compressed byte savings comparison.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["compression", "canvas-compress", "optimize", "byte-saving"],
    files: [{ name: "ImageCompressor.jsx", path: "components/common/FileSystem/ImageCompressor.jsx" }],
    component: ImageCompressionDemo,
    sourceCode: `import React from "react";
import { ImageCompressor } from "@/components/common/FileSystem";

export default function ImageCompressionDemo({ file }) {
  return (
    <ImageCompressor
      file={file}
      onCompressionComplete={(res) => console.log("Savings:", res.savedPercent + "%")}
    />
  );
}`,
    uses: ["Bandwidth optimization", "Fast photo submissions", "Mobile network optimization"],
  },
  {
    id: "avatar-upload",
    slug: "avatar-upload",
    name: "Profile Avatar Uploader",
    category: "file-system",
    subCategory: "Avatar",
    tag: "Avatar",
    theme: "purple",
    version: "v1.0.0",
    description:
      "Specialized profile avatar editor featuring circular preview, camera hover trigger, built-in 1:1 crop dialog, initials fallback, and quick removal.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["avatar", "profile", "user-image", "circular", "crop"],
    files: [{ name: "AvatarUpload.jsx", path: "components/common/FileSystem/AvatarUpload.jsx" }],
    component: AvatarUploadDemo,
    sourceCode: `import React from "react";
import { AvatarUpload } from "@/components/common/FileSystem";

export default function AvatarUploadDemo() {
  return (
    <div className="w-full max-w-sm mx-auto p-4 text-center">
      <AvatarUpload
        initials="TH"
        size="lg"
        maxSize={5 * 1024 * 1024}
        allowCrop={true}
        onUploadSuccess={(res) => console.log("Uploaded:", res)}
      />
    </div>
  );
}`,
    uses: ["User settings / profile pages", "Team member management", "Customer onboarding"],
  },
];
