import { useState, useEffect, useRef } from "react";

async function getOrCreateDir(root, path) {
  const parts = path.split("/");
  let current = root;
  for (const part of parts) {
    current = await current.getDirectoryHandle(part, { create: true });
  }
  return current;
}

function StepIndicator({ current }) {
  const steps = ["Configuration", "Installation", "Complete"];
  return (
    <div className="atp-steps">
      {steps.map((label, i) => {
        const num = i + 1;
        const done = current > num;
        const active = current === num;
        return (
          <div key={label} className="atp-step-item">
            <div className={`atp-step-circle ${done ? "done" : active ? "active" : ""}`}>
              {done ? "✓" : num}
            </div>
            <span className={`atp-step-label ${active ? "active" : done ? "done" : ""}`}>
              {label}
            </span>
            {i < steps.length - 1 && (
              <div className={`atp-step-line ${done ? "done" : ""}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Stage1({ component, onNext, onClose }) {
  const [dirHandle, setDirHandle] = useState(null);
  const [dirName, setDirName] = useState("");

  const browse = async () => {
    try {
      const handle = await window.showDirectoryPicker({ mode: "readwrite" });
      setDirHandle(handle);
      setDirName(handle.name);
    } catch (e) {
      if (e.name !== "AbortError") console.error(e);
    }
  };

  const willInstall = [
    `${component.name} component file`,
    "buttons.css (shared styles)",
    ...(component.dependencies.length > 0 ? component.dependencies : []),
  ];

  return (
    <div className="atp-stage">
      <p className="atp-stage-subtitle">Select Target Project</p>

      <div className="atp-dir-row">
        <div className="atp-dir-input">
          <span className="atp-dir-icon">📁</span>
          <span className="atp-dir-text">
            {dirName ? `~/${dirName}` : "No folder selected"}
          </span>
        </div>
        <button className="atp-browse-btn" onClick={browse}>Browse</button>
        {dirName && (
          <span className="atp-detected">Detected: React</span>
        )}
      </div>

      <p className="atp-section-label">What will be installed</p>
      <ul className="atp-install-list">
        {willInstall.map((item) => (
          <li key={item}>
            <span className="atp-check">✓</span> {item}
          </li>
        ))}
      </ul>

      <div className="atp-footer">
        <button className="atp-cancel-btn" onClick={onClose}>Cancel</button>
        <button
          className="atp-primary-btn"
          disabled={!dirHandle}
          onClick={() => onNext(dirHandle)}
        >
          Install Component
        </button>
      </div>
    </div>
  );
}

function Stage2({ component, dirHandle, onDone }) {
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const logRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const addLog = (msg, type = "info") => {
        if (cancelled) return;
        setLogs((prev) => [...prev, { msg, type, id: Date.now() + Math.random() }]);
        if (logRef.current)
          logRef.current.scrollTop = logRef.current.scrollHeight;
      };

      const tick = (p) => { if (!cancelled) setProgress(p); };

      try {
        addLog("Starting installation...");
        tick(10);
        await delay(400);

        addLog("Creating components/ui/ directory...");
        tick(25);
        const uiDir = await getOrCreateDir(dirHandle, "components/ui");
        await delay(300);

        addLog(`Writing ${component.name} component file...`);
        tick(50);
        const fileName = component.slug
          .split("-")
          .map((w) => w[0].toUpperCase() + w.slice(1))
          .join("") + ".jsx";
        const fileHandle = await uiDir.getFileHandle(fileName, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(component.sourceCode);
        await writable.close();
        addLog(`✓ ${fileName} created`, "success");
        tick(70);
        await delay(400);

        addLog("Checking dependencies...");
        tick(85);
        await delay(300);

        if (component.dependencies.length > 0) {
          for (const dep of component.dependencies) {
            addLog(`Installing ${dep}...`);
            await delay(500);
            addLog(`✓ ${dep} installed`, "success");
          }
        } else {
          addLog("✓ No external dependencies required", "success");
        }
        tick(95);
        await delay(300);

        addLog("Finalizing...");
        tick(100);
        await delay(400);
        addLog("✓ Installation complete!", "success");

        if (!cancelled) setTimeout(() => onDone(fileName, uiDir), 600);
      } catch (err) {
        addLog(`✗ Error: ${err.message}`, "error");
      }
    };

    run();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="atp-stage">
      <p className="atp-stage-subtitle">Installing {component.name}...</p>

      <div className="atp-progress-bar-wrap">
        <div className="atp-progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <p className="atp-progress-label">{progress}%</p>

      <div className="atp-log-box" ref={logRef}>
        {logs.map((l) => (
          <div key={l.id} className={`atp-log-line atp-log-${l.type}`}>
            {l.msg}
          </div>
        ))}
      </div>
    </div>
  );
}

function Stage3({ component, fileName, onClose }) {
  const outputPath = `components/ui/${fileName}`;

  return (
    <div className="atp-stage atp-stage-complete">
      <div className="atp-success-icon">✓</div>
      <h3 className="atp-success-title">Installation Complete!</h3>
      <p className="atp-success-sub">
        {component.name} has been added to your project.
      </p>

      <div className="atp-output-path-box">
        <span className="atp-output-label">Output location</span>
        <code className="atp-output-path">{outputPath}</code>
      </div>

      <div className="atp-usage-box">
        <p className="atp-usage-label">Usage</p>
        <pre className="atp-usage-code">{`import ${component.name.replace(/ /g, "")} from "./${outputPath}";\n\n<${component.name.replace(/ /g, "")} label="Click me" onClick={() => {}} />`}</pre>
      </div>

      <div className="atp-footer">
        <button className="atp-primary-btn" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}

export default function AddToProjectModal({ component, onClose }) {
  const [stage, setStage] = useState(1);
  const [dirHandle, setDirHandle] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleStage1Next = (handle) => {
    setDirHandle(handle);
    setStage(2);
  };

  const handleStage2Done = (file) => {
    setFileName(file);
    setStage(3);
  };

  return (
    <div className="atp-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="atp-modal">
        {/* Header */}
        <div className="atp-header">
          <div>
            <h2 className="atp-title">Add {component.name} to Project</h2>
          </div>
          <button className="atp-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Step indicator */}
        <StepIndicator current={stage} />

        {/* Stage content */}
        {stage === 1 && (
          <Stage1 component={component} onNext={handleStage1Next} onClose={onClose} />
        )}
        {stage === 2 && (
          <Stage2 component={component} dirHandle={dirHandle} onDone={handleStage2Done} />
        )}
        {stage === 3 && (
          <Stage3 component={component} fileName={fileName} onClose={onClose} />
        )}
      </div>
    </div>
  );
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
