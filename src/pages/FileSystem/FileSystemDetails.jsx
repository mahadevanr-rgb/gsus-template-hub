import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getComponent } from "@/codeRegistry/codeRegistry";
import ComponentDetailsView from "@/components/common/ComponentDetailsView/ComponentDetailsView";
import {
  BasicFileUploadDemo,
  MultipleFileUploadDemo,
  DragDropUploadDemo,
  ImageUploadDemo,
  DocumentUploadDemo,
  ImagePreviewDemo,
  FilePreviewDemo,
  FileListDemo,
  RemoveReplaceDemo,
  UploadProgressDemo,
  UploadCancelDemo,
  UploadRetryDemo,
  FileTypeValidationDemo,
  FileSizeValidationDemo,
  ImageDimensionValidationDemo,
  ImageCropDemo,
  ImageCompressionDemo,
  AvatarUploadDemo,
} from "./components";

const fileSystemSiblings = [
  { slug: "basic-file-upload", name: "Basic File Upload" },
  { slug: "multiple-file-upload", name: "Multiple File Upload" },
  { slug: "drag-drop-upload", name: "Drag & Drop Upload" },
  { slug: "image-upload", name: "Image Upload" },
  { slug: "document-upload", name: "Document Upload" },
  { slug: "image-preview", name: "Image Preview" },
  { slug: "file-preview", name: "Multi-Format Preview" },
  { slug: "file-list", name: "Interactive File List" },
  { slug: "remove-replace", name: "Remove & Replace" },
  { slug: "upload-progress", name: "Upload Progress" },
  { slug: "upload-cancel", name: "In-Flight Cancel" },
  { slug: "upload-retry", name: "Upload Retry" },
  { slug: "file-type-validation", name: "Type Validation" },
  { slug: "file-size-validation", name: "Size Validation" },
  { slug: "image-dimension-validation", name: "Dimension Validation" },
  { slug: "image-crop", name: "Client-Side Crop" },
  { slug: "image-compression", name: "Client-Side Compression" },
  { slug: "avatar-upload", name: "Avatar Uploader" },
];

export default function FileSystemDetails({ selected, onBack, onNavigateHome }) {
  const params = useParams();
  const navigate = useNavigate();

  const activeSlug = selected || params.id || "basic-file-upload";
  const [currentSlug, setCurrentSlug] = useState(activeSlug);

  useEffect(() => {
    if (selected) {
      setCurrentSlug(selected);
    } else if (params.id) {
      setCurrentSlug(params.id);
    }
  }, [selected, params.id]);

  const component = getComponent(currentSlug);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate("/file-system");
    }
  };

  const handleHome = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      navigate("/");
    }
  };

  const renderCustomPreview = () => {
    switch (currentSlug) {
      case "basic-file-upload":
        return <BasicFileUploadDemo />;
      case "multiple-file-upload":
        return <MultipleFileUploadDemo />;
      case "drag-drop-upload":
        return <DragDropUploadDemo />;
      case "image-upload":
        return <ImageUploadDemo />;
      case "document-upload":
        return <DocumentUploadDemo />;
      case "image-preview":
        return <ImagePreviewDemo />;
      case "file-preview":
        return <FilePreviewDemo />;
      case "file-list":
        return <FileListDemo />;
      case "remove-replace":
        return <RemoveReplaceDemo />;
      case "upload-progress":
        return <UploadProgressDemo />;
      case "upload-cancel":
        return <UploadCancelDemo />;
      case "upload-retry":
        return <UploadRetryDemo />;
      case "file-type-validation":
        return <FileTypeValidationDemo />;
      case "file-size-validation":
        return <FileSizeValidationDemo />;
      case "image-dimension-validation":
        return <ImageDimensionValidationDemo />;
      case "image-crop":
        return <ImageCropDemo />;
      case "image-compression":
        return <ImageCompressionDemo />;
      case "avatar-upload":
        return <AvatarUploadDemo />;
      default:
        return <BasicFileUploadDemo />;
    }
  };

  const handleCustomize = () => {
    navigate(`/file-system/customize/${currentSlug}`);
  };

  const renderSidebar = () => (
    <div className="bg-gradient-to-br from-emerald-950/40 via-teal-950/20 to-slate-900 border border-emerald-500/30 rounded-3xl p-5 space-y-3 shadow-lg">
      <div className="flex items-center gap-2.5">
        <span className="text-xl">🎨</span>
        <div>
          <h4 className="font-bold text-sm text-white">Customize This Component</h4>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Modify appearance, validation rules, dropzone dimensions, and export ready-to-use code.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={handleCustomize}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-500/30 active:scale-[0.98] transition-all cursor-pointer"
      >
        <span>⚡ Customize This File Component</span>
      </button>
    </div>
  );

  return (
    <ComponentDetailsView
      component={component}
      categoryName="File System"
      categoryPath="/file-system"
      subCategories={fileSystemSiblings}
      activeSlug={currentSlug}
      onSelectSibling={(slug) => {
        setCurrentSlug(slug);
        navigate(`/file-system/${slug}`);
      }}
      onBack={handleBack}
      onNavigateHome={handleHome}
      renderCustomPreview={renderCustomPreview}
      renderSidebar={renderSidebar}
    />
  );
}
