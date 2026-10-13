/**
 * Demo Upload Simulation Adapter
 * Simulates real upload progress, network latency, abort signals, and failure handling.
 */
export function simulateUploadAdapter(file, { onProgress, signal, speedMs = 120, shouldFail = false } = {}) {
  return new Promise((resolve, reject) => {
    let progress = 0;
    const intervalTime = speedMs;
    const totalSteps = 10;
    const stepIncrement = 100 / totalSteps;

    const timer = setInterval(() => {
      if (signal?.aborted) {
        clearInterval(timer);
        const error = new Error("Upload canceled by user");
        error.name = "AbortError";
        reject(error);
        return;
      }

      progress += stepIncrement;

      // Simulate failure at 60% if requested
      if (shouldFail && progress >= 60) {
        clearInterval(timer);
        const err = new Error("Network connection lost during upload");
        reject(err);
        return;
      }

      if (progress >= 100) {
        progress = 100;
        if (onProgress) onProgress(100);
        clearInterval(timer);
        resolve({
          success: true,
          fileId: `file_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          url: URL.createObjectURL(file),
          uploadedAt: new Date().toISOString(),
          name: file.name,
          size: file.size,
        });
        return;
      }

      if (onProgress) {
        onProgress(Math.min(99, Math.round(progress)));
      }
    }, intervalTime);

    if (signal) {
      signal.addEventListener("abort", () => {
        clearInterval(timer);
        const error = new Error("Upload canceled by user");
        error.name = "AbortError";
        reject(error);
      });
    }
  });
}
