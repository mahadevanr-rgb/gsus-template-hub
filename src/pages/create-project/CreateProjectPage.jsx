import { useState } from "react";
import {
  Sparkles,
  FileText,
  Palette,
  Sidebar,
  Blocks,
  Rocket,
  Check,
} from "lucide-react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";

const STEPS = [
  { number: 1, label: "Project Info", icon: FileText },
  { number: 2, label: "Template", icon: Palette },
  { number: 3, label: "Sidebar", icon: Sidebar },
  { number: 4, label: "Page Builder", icon: Blocks },
  { number: 5, label: "Launch", icon: Rocket },
];

export default function CreateProjectPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    projectName: "",
    appName: "",
    font: "",
    templateId: null,
    templateName: "",
    modules: [{ id: "1", label: "Dashboard", icon: "LayoutGrid" }],
    components: [],
  });

  const update = (patch) => setData((prev) => ({ ...prev, ...patch }));
  const next = () => setStep((s) => Math.min(s + 1, 5));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#f8fafc 0%,#f1f5f9 100%)",
        fontFamily: "'Inter',sans-serif",
      }}
    >
      {/* Top Header */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #e5e7eb",
          padding: "16px 40px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Sparkles size={18} color="#fff" />
        </div>
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: 800,
              color: "#111827",
            }}
          >
            Create New Project
          </h1>
          <p style={{ margin: 0, fontSize: "12px", color: "#9ca3af" }}>
            Build your app in minutes
          </p>
        </div>
      </div>

      {/* Stepper */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #e5e7eb",
          padding: "0 40px",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          {STEPS.map((s, i) => {
            const isDone = step > s.number;
            const isActive = step === s.number;
            const StepIcon = s.icon;
            return (
              <div
                key={s.number}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flex: i < STEPS.length - 1 ? 1 : "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "16px 0",
                    cursor: isDone ? "pointer" : "default",
                  }}
                  onClick={() => isDone && setStep(s.number)}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      fontWeight: 700,
                      flexShrink: 0,
                      background: isDone
                        ? "#22c55e"
                        : isActive
                          ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
                          : "#f3f4f6",
                      color: isDone || isActive ? "#fff" : "#9ca3af",
                      boxShadow: isActive
                        ? "0 0 0 4px rgba(99,102,241,0.2)"
                        : "none",
                    }}
                  >
                    {isDone ? <Check size={16} /> : <StepIcon size={16} />}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#9ca3af",
                        fontWeight: 600,
                      }}
                    >
                      Step {s.number}
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: isActive ? 700 : 500,
                        color: isActive
                          ? "#111827"
                          : isDone
                            ? "#374151"
                            : "#9ca3af",
                      }}
                    >
                      {s.label}
                    </span>
                  </div>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: "2px",
                      background: step > s.number ? "#22c55e" : "#e5e7eb",
                      margin: "0 12px",
                      borderRadius: "999px",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 40px" }}
      >
        {step === 1 && <Step1 data={data} onChange={update} onNext={next} />}
        {step === 2 && (
          <Step2 data={data} onChange={update} onNext={next} onBack={back} />
        )}
        {step === 3 && (
          <Step3 data={data} onChange={update} onNext={next} onBack={back} />
        )}
        {step === 4 && (
          <Step4 data={data} onChange={update} onNext={next} onBack={back} />
        )}
        {step === 5 && <Step5 data={data} onBack={back} />}
      </div>
    </div>
  );
}
