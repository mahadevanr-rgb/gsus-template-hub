import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  X,
  Check,
  Download,
  FolderOpen,
  Copy,
  Terminal,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import JSZip from "jszip";
import { fetchAllComponents } from "@/services/supabase/components.service";
import { getAllComponents } from "@/codeRegistry/codeRegistry";
import {
  copyToClipboard,
  getInstallManifest,
} from "@/utils/installContract";

const EMPTY_FILES = [];

export default function AddToProjectModal({ component, onClose }) {
  const [stage, setStage] = useState(1);
  const [installMethod, setInstallMethod] = useState("download"); // 'folder' | 'download' | 'copy'
  const [dirHandle, setDirHandle] = useState(null);
  const [dirName, setDirName] = useState("");
  const [targetDirectory, setTargetDirectory] = useState("src/components");
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [copiedUsage, setCopiedUsage] = useState(false);
  const [copiedDependencies, setCopiedDependencies] = useState(false);
  const [copiedTailwind, setCopiedTailwind] = useState(false);
  const [installResult, setInstallResult] = useState(null);
  const [installErrorResult, setInstallErrorResult] = useState({
    component: null,
    error: "",
  });
  const [conflictFiles, setConflictFiles] = useState([]);
  const [replaceExistingFiles, setReplaceExistingFiles] = useState(false);
  const logRef = useRef(null);
  const setInstallError = useCallback(
    (error) => {
      setInstallErrorResult({ component, error });
    },
    [component],
  );

  useEffect(() => {
    let active = true;
    if (!component)
      return () => {
        active = false;
      };

    const buildManifest = (items) => {
      if (!active) return;

      try {
        const manifest = getInstallManifest(component, items);

        if (component?.customizedSource && component?.files?.length) {
          const customizedFiles = component.files.filter(
            (file) => file && (file.content != null || file.source != null),
          );

          const normalizePath = (path = "") =>
            path.replace(/\\/g, "/").replace(/^\.\/+/, "");
          const baseName = (path = "") =>
            normalizePath(path).split("/").pop()?.toLowerCase();

          const resolvedFiles = (manifest.files || []).map((file) => {
            const installPath = normalizePath(file.path || file.name);
            const exactMatch = customizedFiles.find(
              (customFile) =>
                normalizePath(customFile.path || customFile.name) ===
                installPath,
            );
            const basenameMatches = exactMatch
              ? []
              : customizedFiles.filter(
                  (customFile) =>
                    baseName(customFile.path || customFile.name) ===
                    baseName(installPath),
                );
            const matchedFile = exactMatch ||
              (basenameMatches.length === 1 ? basenameMatches[0] : null);

            return matchedFile
              ? {
                  ...file,
                  content: String(matchedFile.content ?? matchedFile.source),
                }
              : file;
          });

          manifest.files = resolvedFiles;
        }

        setInstallResult({ component, manifest, error: "" });
        setInstallError("");
      } catch (error) {
        setInstallResult({ component, manifest: null, error: "" });
        setInstallError(error.message || "Unable to resolve component files.");
      }
    };

    fetchAllComponents()
      .then(buildManifest)
      .catch(() => buildManifest(getAllComponents()));
    return () => {
      active = false;
    };
  }, [component, setInstallError]);

  const installManifest =
    installResult?.component === component ? installResult.manifest : null;
  const installError =
    installErrorResult.component === component ? installErrorResult.error : "";
  const componentName = component?.name || "Component";
  const slug = component?.slug || component?.id || "component";
  const pascalName = componentName.replace(/[^a-zA-Z0-9]/g, "");
  const installName =
    installManifest?.exportName || component?.installName || pascalName;
  const packageFiles = installManifest?.files || EMPTY_FILES;
  const preserveRegistryPaths = packageFiles.some((file) =>
    file.path?.startsWith("forms/"),
  );
  const preserveSourcePaths =
    packageFiles.length > 1 &&
    packageFiles.some(
      (file) =>
        file.path?.startsWith("src/pages/") ||
        file.path?.startsWith("src/utils/"),
    );
  const installFiles = useMemo(
    () =>
      packageFiles.map((file) => ({
        ...file,
        relativePath: preserveSourcePaths
          ? file.path
          : preserveRegistryPaths && file.path?.startsWith("forms/")
            ? file.path
            : packageFiles.length === 1
              ? `${installName}.jsx`
              : file.path.split("/").pop(),
      })),
    [packageFiles, preserveRegistryPaths, preserveSourcePaths, installName],
  );
  const rootFile = installFiles[installFiles.length - 1];
  const targetFileName = (rootFile?.relativePath || `${installName}.jsx`)
    .split("/")
    .pop();
  const safeTargetDirectory =
    (preserveSourcePaths ? "" : targetDirectory)
      .replace(/\\/g, "/")
      .split("/")
      .filter((part) => part && part !== "." && part !== "..")
      .join("/") || (preserveSourcePaths ? "" : "src/components");
  const getDestinationPath = useCallback(
    (relativePath) =>
      [safeTargetDirectory, relativePath].filter(Boolean).join("/"),
    [safeTargetDirectory],
  );
  const targetFilePath = getDestinationPath(
    rootFile?.relativePath || targetFileName,
  );
  const usageSubpath = rootFile?.relativePath
    ?.replace(/\\/g, "/")
    .replace(/\.jsx?$/i, "");
  const usageDirectory = safeTargetDirectory.startsWith("src/")
    ? safeTargetDirectory.slice(4)
    : safeTargetDirectory;
  const usageImportPath = preserveRegistryPaths
    ? `./${[usageDirectory, usageSubpath].filter(Boolean).join("/")}`
    : preserveSourcePaths
      ? `./${rootFile?.relativePath?.replace(/^src\//, "").replace(/\.jsx?$/i, "") || installName}`
      : `./${usageDirectory ? usageDirectory + "/" : ""}${installName}`;
  const codeContent =
    rootFile?.content || component?.sourceCode || component?.code || "";
  const dependencies = installManifest?.externalDependencies || EMPTY_FILES;
  const internalDependencies =
    installManifest?.componentDependencies || EMPTY_FILES;
  const dependencyCommand = dependencies.length
    ? `npm install ${dependencies.join(" ")}`
    : "";
  const usesTailwind = String(component?.styling || "")
    .toLowerCase()
    .includes("tailwind");
  const tailwindInstallCommand =
    "npm install -D tailwindcss@3 postcss autoprefixer\nnpx tailwindcss init -p";

  // Direct download remains one JSX file for legacy components and a ZIP for file graphs.
  const downloadFile = useCallback(async () => {
    let blob;
    let downloadName = targetFileName;
    if (installFiles.length > 1) {
      const archive = new JSZip();
      installFiles.forEach((file) =>
        archive.file(file.relativePath, file.content),
      );
      blob = await archive.generateAsync({ type: "blob" });
      downloadName = `${slug}-components.zip`;
    } else {
      blob = new Blob([installFiles[0]?.content || codeContent], {
        type: "text/javascript;charset=utf-8",
      });
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = downloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [installFiles, targetFileName, slug, codeContent]);

  // Browse local directory
  const browseDirectory = async () => {
    try {
      if ("showDirectoryPicker" in window) {
        const handle = await window.showDirectoryPicker({ mode: "readwrite" });
        setDirHandle(handle);
        setDirName(handle.name);
        setInstallMethod("folder");
        setConflictFiles([]);
        setReplaceExistingFiles(false);
      } else {
        alert(
          "Directory picker is not supported on this browser. Direct download will be used.",
        );
        setInstallMethod("download");
      }
    } catch (e) {
      if (e.name !== "AbortError") {
        console.error(e);
      }
    }
  };

  const locateDirectory = async (root, relativePath, create = false) => {
    let current = root;
    const directoryParts = relativePath.split("/").slice(0, -1);
    for (const part of directoryParts) {
      current = await current.getDirectoryHandle(part, { create });
    }
    return { directory: current, fileName: relativePath.split("/").pop() };
  };

  const findExistingFiles = async () => {
    let base = dirHandle;
    for (const part of safeTargetDirectory.split("/")) {
      if (!part) continue;
      base = await base.getDirectoryHandle(part, { create: true });
    }
    const conflicts = [];
    for (const file of installFiles) {
      const { directory, fileName: candidate } = await locateDirectory(
        base,
        file.relativePath,
        true,
      );
      try {
        await directory.getFileHandle(candidate);
        conflicts.push(getDestinationPath(file.relativePath));
      } catch (error) {
        if (error.name !== "NotFoundError") throw error;
      }
    }
    return conflicts;
  };

  // Check all paths before beginning the installation.
  const startInstallation = async (replaceExisting = false) => {
    if (!installManifest || !installFiles.length) return;
    setConflictFiles([]);
    setInstallError("");
    if (installMethod === "folder" && dirHandle) {
      try {
        const conflicts = await findExistingFiles();
        if (conflicts.length && !replaceExisting) {
          setConflictFiles(conflicts);
          return;
        }
      } catch (error) {
        setInstallError(error.message || "Unable to check the target folder.");
        return;
      }
    }
    setReplaceExistingFiles(replaceExisting);
    setStage(2);
  };

  // Installation simulator / runner for Stage 2
  useEffect(() => {
    if (!component || stage !== 2) return;

    let cancelled = false;

    const run = async () => {
      const addLog = (msg, type = "info") => {
        if (cancelled) return;
        setLogs((prev) => [
          ...prev,
          { msg, type, id: Date.now() + Math.random() },
        ]);
        if (logRef.current) {
          logRef.current.scrollTop = logRef.current.scrollHeight;
        }
      };

      const tick = (p) => {
        if (!cancelled) setProgress(p);
      };

      try {
        addLog("Initializing TemplateHub component installer...");
        tick(15);
        await delay(350);

        if (installMethod === "folder" && dirHandle) {
          addLog(`Accessing directory: ~/${dirName}...`);
          tick(35);
          await delay(300);

          addLog(
            `Preparing ${installFiles.length} component file(s) under ${safeTargetDirectory}/...`,
          );
          let current = dirHandle;
          for (const part of safeTargetDirectory.split("/")) {
            if (!part) continue;
            current = await current.getDirectoryHandle(part, { create: true });
          }
          await delay(300);

          for (let index = 0; index < installFiles.length; index += 1) {
            const file = installFiles[index];
            const { directory, fileName: candidate } = await locateDirectory(
              current,
              file.relativePath,
              true,
            );
            try {
              await directory.getFileHandle(candidate);
              const path = getDestinationPath(file.relativePath);
              if (!replaceExistingFiles) {
                const conflict = new Error("File already exists: " + path);
                conflict.code = "FILE_CONFLICT";
                conflict.path = path;
                throw conflict;
              }
            } catch (error) {
              if (error.code === "FILE_CONFLICT") throw error;
              if (error.name !== "NotFoundError") throw error;
            }
            addLog(`Writing ${getDestinationPath(file.relativePath)}...`);
            tick(45 + Math.round(((index + 1) / installFiles.length) * 35));
            const fileHandle = await directory.getFileHandle(candidate, {
              create: true,
            });
            const writable = await fileHandle.createWritable();
            await writable.write(file.content);
            await writable.close();
            addLog(
              `Written ${getDestinationPath(file.relativePath)} successfully.`,
              "success",
            );
          }
          addLog(`✓ ${targetFilePath} written successfully!`, "success");
        } else {
          addLog(
            installFiles.length > 1
              ? "Preparing component dependency archive..."
              : `Preparing ${targetFileName} for direct download...`,
          );
          tick(50);
          await delay(400);
          await downloadFile();
          addLog(
            `✓ ${targetFileName} downloaded to your local device!`,
            "success",
          );
        }

        tick(80);
        await delay(350);

        addLog("Reviewing component dependencies...");
        if (dependencies.length) {
          addLog(`Run in your project terminal: ${dependencyCommand}`, "info");
        } else {
          addLog("✓ Zero external dependencies required", "success");
        }

        tick(100);
        await delay(400);
        addLog("✓ Component successfully installed!", "success");

        if (!cancelled) {
          setTimeout(() => setStage(3), 600);
        }
      } catch (err) {
        if (err.code === "FILE_CONFLICT") {
          setConflictFiles([err.path]);
          setStage(1);
          return;
        }
        addLog(
          `✗ Notice: ${err.message}. Falling back to download...`,
          "error",
        );
        await downloadFile();
        tick(100);
        setTimeout(() => setStage(3), 800);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [
    stage,
    component,
    installMethod,
    dirHandle,
    dirName,
    installFiles,
    targetFileName,
    safeTargetDirectory,
    targetFilePath,
    dependencyCommand,
    dependencies.length,
    downloadFile,
    getDestinationPath,
    replaceExistingFiles,
  ]);

  const usageImport = installManifest?.namedExport
    ? `import { ${installName} } from "${usageImportPath}";`
    : `import ${installName} from "${usageImportPath}";`;
  const controlledUsage = {
    "date-picker": { stateName: "date", initialValue: "null" },
    "date-range-picker": {
      stateName: "range",
      initialValue: '{ start: "", end: "" }',
    },
    "month-picker": { stateName: "month", initialValue: '""' },
    "year-picker": { stateName: "year", initialValue: '""' },
    "week-picker": { stateName: "week", initialValue: '""' },
    "time-picker": { stateName: "time", initialValue: '""' },
    "datetime-picker": { stateName: "dateTime", initialValue: '""' },
    "datetime-range-picker": {
      stateName: "range",
      initialValue: '{ start: "", end: "" }',
    },
  }[slug];
  const stateSetter = controlledUsage
    ? `set${controlledUsage.stateName[0].toUpperCase()}${controlledUsage.stateName.slice(1)}`
    : "";
  const usageCode = controlledUsage
    ? `import { useState } from "react";\n${usageImport}\n\nexport default function Example() {\n  const [${controlledUsage.stateName}, ${stateSetter}] = useState(${controlledUsage.initialValue});\n  return <${installName} value={${controlledUsage.stateName}} onChange={${stateSetter}} />;\n}`
    : `${usageImport}\n\nexport default function Example() {\n  return <${installName} />;\n}`;
  const copyUsageCode = async () => {
    const code = usageCode;
    await copyToClipboard(code);
    setCopiedUsage(true);
    setTimeout(() => setCopiedUsage(false), 2000);
  };

  const copyDependencyCommand = async () => {
    if (!dependencyCommand) return;
    await copyToClipboard(dependencyCommand);
    setCopiedDependencies(true);
    setTimeout(() => setCopiedDependencies(false), 2000);
  };

  const copyTailwindCommand = async () => {
    await copyToClipboard(tailwindInstallCommand);
    setCopiedTailwind(true);
    setTimeout(() => setCopiedTailwind(false), 2000);
  };

  if (!component) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 text-slate-200 shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white leading-none">
                Add {componentName} to Project
              </h2>
              <p className="text-[11px] text-slate-400 mt-1">
                Install ready-to-use React component
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Flow Indicators */}
        <div className="flex items-center justify-between px-6 py-3 bg-slate-950/40 border-b border-slate-800/80 text-xs">
          {["Configuration", "Installation", "Complete"].map((step, idx) => {
            const stepNum = idx + 1;
            const isDone = stage > stepNum;
            const isActive = stage === stepNum;
            return (
              <div key={step} className="flex items-center gap-2">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isDone
                      ? "bg-emerald-500 text-white"
                      : isActive
                        ? "bg-indigo-600 text-white ring-2 ring-indigo-500/30"
                        : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {isDone ? <Check className="w-3 h-3" /> : stepNum}
                </div>
                <span
                  className={`text-[11px] font-semibold ${
                    isActive
                      ? "text-white"
                      : isDone
                        ? "text-emerald-400"
                        : "text-slate-500"
                  }`}
                >
                  {step}
                </span>
                {idx < 2 && (
                  <div className="w-6 h-[1px] bg-slate-800 hidden sm:block" />
                )}
              </div>
            );
          })}
        </div>

        {/* STAGE 1: Configuration */}
        {stage === 1 && (
          <div className="min-h-0 flex-1 overflow-y-auto p-6 space-y-5">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Installation Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setInstallMethod("download")}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    installMethod === "download"
                      ? "bg-indigo-600/10 border-indigo-500/60 text-white ring-1 ring-indigo-500/30"
                      : "bg-slate-800/40 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                  }`}
                >
                  <Download className="w-4 h-4 text-indigo-400 mb-1" />
                  <p className="text-xs font-bold text-white">
                    Direct Download
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Save .jsx file directly
                  </p>
                </button>

                <button
                  type="button"
                  onClick={browseDirectory}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    installMethod === "folder"
                      ? "bg-indigo-600/10 border-indigo-500/60 text-white ring-1 ring-indigo-500/30"
                      : "bg-slate-800/40 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                  }`}
                >
                  <FolderOpen className="w-4 h-4 text-purple-400 mb-1" />
                  <p className="text-xs font-bold text-white">
                    Local Project Folder
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {dirName ? `~/${dirName}` : "Select repository folder"}
                  </p>
                </button>
              </div>
            </div>

            {/* Target Location */}
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                Destination Files
              </span>
              <ul className="space-y-1">
                {installFiles.map((file) => (
                  <li
                    key={file.relativePath}
                    className="break-all text-xs font-mono text-indigo-400"
                  >
                    {getDestinationPath(file.relativePath)}
                  </li>
                ))}
              </ul>
            </div>

            {installError && (
              <p
                role="alert"
                className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300"
              >
                {installError}
              </p>
            )}
            {conflictFiles.length > 0 && (
              <div
                role="alert"
                className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200"
              >
                <p className="font-semibold">
                  These files already exist. Replacing them updates the picker to the current customized version and overwrites any edits in those files:
                </p>
                <ul className="mt-2 list-inside list-disc">
                  {conflictFiles.map((path) => (
                    <li key={path} className="break-all font-mono">
                      {path}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => startInstallation(true)}
                  className="mt-3 rounded-lg bg-amber-300 px-3 py-2 font-semibold text-slate-950 transition hover:bg-amber-200"
                >
                  Replace listed files and update component
                </button>
              </div>
            )}

            <label className="block space-y-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Component folder
              </span>
              <input
                value={targetDirectory}
                onChange={(event) => {
                  setTargetDirectory(event.target.value);
                  setConflictFiles([]);
                  setReplaceExistingFiles(false);
                }}
                placeholder="src/components"
                spellCheck="false"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-mono text-slate-200 outline-none transition-colors placeholder:text-slate-600 focus:border-indigo-500"
              />
              <span className="block text-[11px] text-slate-500">
                Choose the folder already used by your project. The installer
                never creates a separate UI folder unless you enter one.
              </span>
            </label>

            {dependencyCommand && (
              <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-3.5 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-200">
                    Required before running
                  </span>
                  <button
                    type="button"
                    onClick={copyDependencyCommand}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-300 hover:text-indigo-200"
                  >
                    <Copy className="h-3 w-3" />
                    {copiedDependencies ? "Copied" : "Copy command"}
                  </button>
                </div>
                <code className="block overflow-x-auto rounded-lg bg-slate-950 px-3 py-2 text-xs text-amber-100">
                  {dependencyCommand}
                </code>
                <p className="text-[11px] leading-relaxed text-slate-400">
                  Run this once from the target project's root after adding the
                  component.
                </p>
              </div>
            )}

            {usesTailwind && (
              <div className="rounded-2xl border border-sky-500/25 bg-sky-500/5 p-3.5 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-200">
                    Tailwind CSS required
                  </span>
                  <button
                    type="button"
                    onClick={copyTailwindCommand}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-300 hover:text-indigo-200"
                  >
                    <Copy className="h-3 w-3" />
                    {copiedTailwind ? "Copied" : "Copy setup"}
                  </button>
                </div>
                <pre className="overflow-x-auto rounded-lg bg-slate-950 px-3 py-2 text-xs text-sky-100">
                  <code>{tailwindInstallCommand}</code>
                </pre>
                <p className="text-[11px] leading-relaxed text-slate-400">
                  This component uses Tailwind utility classes. Add{" "}
                  <code className="text-slate-200">@tailwind base;</code>,{" "}
                  <code className="text-slate-200">@tailwind components;</code>,
                  and{" "}
                  <code className="text-slate-200">@tailwind utilities;</code>{" "}
                  to your main CSS file.
                </p>
              </div>
            )}

            {/* What Will Be Installed */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Included Assets
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{installFiles.length} required component file(s)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Tailwind CSS classes & theme tokens</span>
                </li>
                {internalDependencies.length > 0 && (
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>
                      TemplateHub components: {internalDependencies.join(", ")}
                    </span>
                  </li>
                )}
                {dependencies.length > 0 && (
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>npm dependencies: {dependencies.join(", ")}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => startInstallation(false)}
                disabled={!installManifest || Boolean(installError)}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] transition-all shadow-lg shadow-indigo-600/20"
              >
                <Download className="w-3.5 h-3.5" />
                <span>
                  {installMethod === "folder"
                    ? "Add to Project"
                    : "Download Component"}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 2: Installation Runner */}
        {stage === 2 && (
          <div className="min-h-0 flex-1 overflow-y-auto p-6 space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">
                  Installing {componentName}...
                </span>
                <span className="font-mono text-indigo-400">{progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Real-time terminal log console */}
            <div
              ref={logRef}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1.5 h-44 overflow-y-auto"
            >
              <div className="flex items-center gap-2 text-slate-500 pb-2 border-b border-slate-800/80 text-[10px]">
                <Terminal className="w-3 h-3" />
                <span>installer.log</span>
              </div>
              {logs.map((log) => (
                <p
                  key={log.id}
                  className={`leading-relaxed ${
                    log.type === "success"
                      ? "text-emerald-400"
                      : log.type === "error"
                        ? "text-rose-400"
                        : "text-slate-300"
                  }`}
                >
                  {log.msg}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* STAGE 3: Complete */}
        {stage === 3 && (
          <div className="min-h-0 flex-1 overflow-y-auto p-6 space-y-5 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-white">
                Component Added!
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {dependencyCommand
                  ? "Install the required package below, then import the configured component file and use it in your app."
                  : `${componentName} is ready. Import the configured component file below to use your customized version.`}
              </p>
            </div>

            <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 px-4 py-3 text-left">
              <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                Import this installed file
              </p>
              <code className="mt-1 block break-all text-xs text-slate-200">
                {targetFilePath}
              </code>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
                This configured entry includes your picker settings. Import it using the path in the quick start below; then <code className="text-slate-200">&lt;{installName} /&gt;</code> uses your customization automatically.
              </p>
            </div>

            {/* Quick Usage Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Quick start · use your customized component
                </span>
                <button
                  type="button"
                  onClick={copyUsageCode}
                  className="inline-flex items-center gap-1 text-[10px] text-indigo-400 hover:text-indigo-300"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedUsage ? "Copied!" : "Copy"}</span>
                </button>
              </div>
              <pre className="text-xs font-mono text-slate-300 overflow-x-auto">
                <code>{usageCode}</code>
              </pre>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Your selected appearance and behavior are included in the installed component, so you can use the simple component tag without repeating those settings.
              </p>
            </div>

            {dependencyCommand && (
              <div className="p-4 rounded-2xl border border-amber-500/25 bg-amber-500/5 text-left space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200">
                    One required terminal command
                  </span>
                  <button
                    type="button"
                    onClick={copyDependencyCommand}
                    className="inline-flex items-center gap-1 text-[10px] font-semibold text-indigo-300 hover:text-indigo-200"
                  >
                    <Copy className="h-3 w-3" />
                    {copiedDependencies ? "Copied!" : "Copy"}
                  </button>
                </div>
                <code className="block overflow-x-auto rounded-lg bg-slate-950 px-3 py-2 text-xs text-amber-100">
                  {dependencyCommand}
                </code>
              </div>
            )}

            {usesTailwind && (
              <div className="p-4 rounded-2xl border border-sky-500/25 bg-sky-500/5 text-left space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-200">
                    Tailwind setup required
                  </span>
                  <button
                    type="button"
                    onClick={copyTailwindCommand}
                    className="inline-flex items-center gap-1 text-[10px] font-semibold text-indigo-300 hover:text-indigo-200"
                  >
                    <Copy className="h-3 w-3" />
                    {copiedTailwind ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="overflow-x-auto rounded-lg bg-slate-950 px-3 py-2 text-xs text-sky-100">
                  <code>{tailwindInstallCommand}</code>
                </pre>
                <p className="text-[11px] leading-relaxed text-slate-400">
                  Then add the three Tailwind directives to{" "}
                  <code className="text-slate-200">src/index.css</code> and
                  restart the dev server.
                </p>
              </div>
            )}

            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
