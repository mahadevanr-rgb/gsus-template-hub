/**
 * Client-side Canvas Image Compression
 */
export async function compressImage(file, options = {}) {
  const {
    quality = 0.8,
    maxWidth = 1920,
    maxHeight = 1080,
    mimeType = "image/jpeg",
  } = options;

  if (!file || !file.type.startsWith("image/")) {
    throw new Error("File is not a valid image");
  }

  // If SVG or GIF, do not compress to avoid losing vector/animation
  if (file.type === "image/svg+xml" || file.type === "image/gif") {
    return {
      file,
      originalSize: file.size,
      compressedSize: file.size,
      savedBytes: 0,
      savedPercent: 0,
      previewUrl: URL.createObjectURL(file),
      width: 0,
      height: 0,
    };
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let width = img.naturalWidth;
        let height = img.naturalHeight;

        // Scale down keeping aspect ratio if dimensions exceed constraints
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas context could not be created"));
          return;
        }

        // Fill background white in case of transparent PNG converting to JPEG
        if (mimeType === "image/jpeg") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, width, height);
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Canvas toBlob failed"));
              return;
            }

            const compressedFile = new File([blob], file.name, {
              type: mimeType,
              lastModified: Date.now(),
            });

            const originalSize = file.size;
            const compressedSize = compressedFile.size;
            const savedBytes = Math.max(0, originalSize - compressedSize);
            const savedPercent = Math.round((savedBytes / originalSize) * 100);

            resolve({
              file: compressedFile,
              originalSize,
              compressedSize,
              savedBytes,
              savedPercent,
              previewUrl: URL.createObjectURL(blob),
              width,
              height,
            });
          },
          mimeType,
          quality
        );
      };
      img.onerror = () => reject(new Error("Failed to load image for compression"));
    };
    reader.onerror = () => reject(new Error("Failed to read file for compression"));
  });
}

/**
 * Client-side Canvas Image Crop
 */
export async function cropImageToBlob(imageSrc, cropArea, outputMime = "image/png", quality = 0.92) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Canvas 2d context unavailable"));
        return;
      }

      const { x, y, width, height } = cropArea;
      canvas.width = Math.max(1, Math.round(width));
      canvas.height = Math.max(1, Math.round(height));

      ctx.drawImage(
        img,
        Math.round(x),
        Math.round(y),
        Math.round(width),
        Math.round(height),
        0,
        0,
        Math.round(width),
        Math.round(height)
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Crop conversion failed"));
            return;
          }
          resolve(blob);
        },
        outputMime,
        quality
      );
    };
    img.onerror = () => reject(new Error("Failed to load source image for cropping"));
    img.src = imageSrc;
  });
}
