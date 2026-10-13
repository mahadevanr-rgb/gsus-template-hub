import { useState } from "react";
import Stepper from "@/components/common/Navigation/Stepper";
import { ArrowLeft, ArrowRight, RotateCcw, CheckCircle } from "lucide-react";

export default function StepperDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [orientation, setOrientation] = useState("horizontal");
  const [formData, setFormData] = useState({
    username: "alex.dev",
    email: "alex@company.com",
    plan: "developer",
    agree: true,
  });
  const [validationError, setValidationError] = useState(null);

  const steps = [
    { id: "account", title: "Account Info", description: "Email & username" },
    { id: "plan", title: "Select Tier", description: "Compute resources" },
    { id: "review", title: "Confirmation", description: "Accept terms" },
  ];

  const handleNext = () => {
    setValidationError(null);

    // Validation guard: Step 0 requires username and email
    if (currentStep === 0) {
      if (!formData.username.trim() || !formData.email.trim()) {
        setValidationError("Username and email are required to continue.");
        return;
      }
    }

    // Validation guard: Step 1 requires a selected plan
    if (currentStep === 1) {
      if (!formData.plan) {
        setValidationError("Please select a service plan tier.");
        return;
      }
    }

    // Validation guard: Step 2 requires agreement
    if (currentStep === 2) {
      if (!formData.agree) {
        setValidationError("You must agree to the terms of service.");
        return;
      }
    }

    // Mark current step completed and advance
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }
    setCurrentStep((prev) => Math.min(steps.length, prev + 1));
  };

  const handlePrev = () => {
    setValidationError(null);
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleReset = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setValidationError(null);
  };

  return (
    <div className="w-full space-y-6">
      {/* Controls Bar */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Layout:</span>
          {["horizontal", "vertical"].map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => setOrientation(o)}
              className={`px-3 py-1 rounded-lg font-semibold capitalize transition-all ${
                orientation === o
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {o}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Wizard</span>
        </button>
      </div>

      {/* Stepper Wizard Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-950 shadow-xl space-y-8">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          completedSteps={completedSteps}
          errorStep={validationError ? currentStep : null}
          orientation={orientation}
          onStepClick={(idx) => {
            setValidationError(null);
            setCurrentStep(idx);
          }}
        />

        {/* Wizard Form Viewport */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          {currentStep === 0 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white">Step 1: Account Identification</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Username</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white">Step 2: Deployment Resource Tier</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {["starter", "developer", "enterprise"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFormData({ ...formData, plan: t })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      formData.plan === t
                        ? "bg-indigo-600/15 border-indigo-500 text-white font-semibold"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <p className="text-xs font-bold uppercase">{t}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Scale tier preset</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white">Step 3: Review & Terms</h4>
              <p className="text-xs text-slate-400">
                You are about to initialize user <strong>{formData.username}</strong> on the{" "}
                <span className="text-indigo-400 font-semibold">{formData.plan}</span> plan.
              </p>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.agree}
                  onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                  className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500"
                />
                <span>I accept the enterprise master service agreement</span>
              </label>
            </div>
          )}

          {currentStep === 3 && (
            <div className="py-6 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">Wizard Successfully Completed!</h4>
              <p className="text-xs text-slate-400">
                All 3 validation stages have passed and the account was created.
              </p>
            </div>
          )}

          {/* Error Message */}
          {validationError && (
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
              ⚠️ {validationError}
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              disabled={currentStep === 0}
              onClick={handlePrev}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            {currentStep < 3 && (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all"
              >
                <span>{currentStep === 2 ? "Finish" : "Continue"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
