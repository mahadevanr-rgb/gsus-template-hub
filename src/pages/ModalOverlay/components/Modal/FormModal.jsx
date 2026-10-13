import React, { useState } from "react";
import { FolderPlus, Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import Modal from "./Modal";

export default function FormModal({ open, onClose, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    projectName: "",
    category: "web",
    description: "",
    visibility: "private",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const newErrors = {};
    if (!formData.projectName.trim()) {
      newErrors.projectName = "Project name is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Brief description is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    // Simulate async API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      if (onSubmitSuccess) onSubmitSuccess(formData);
      if (onClose) onClose();
      setFormData({
        projectName: "",
        category: "web",
        description: "",
        visibility: "private",
      });
    }, 700);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create New Project"
      description="Define project metadata and access permissions."
      icon={FolderPlus}
      badge="Form Modal"
      size="md"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || success}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Creating Project...</span>
              </>
            ) : success ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Created!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Create Project</span>
              </>
            )}
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Project Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300">
            Project Name <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Acme Design System"
            value={formData.projectName}
            onChange={(e) => handleChange("projectName", e.target.value)}
            disabled={loading}
            className={`w-full rounded-xl border ${
              errors.projectName
                ? "border-rose-500/80 bg-rose-950/20"
                : "border-slate-800 bg-slate-950/80 focus:border-indigo-500"
            } px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all`}
          />
          {errors.projectName && (
            <p className="text-[11px] text-rose-400">{errors.projectName}</p>
          )}
        </div>

        {/* Category & Visibility Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
              disabled={loading}
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-xs text-slate-300 outline-none focus:border-indigo-500 transition-all"
            >
              <option value="web">Web Application</option>
              <option value="mobile">Mobile App</option>
              <option value="api">Backend API</option>
              <option value="components">UI Library</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              Visibility
            </label>
            <select
              value={formData.visibility}
              onChange={(e) => handleChange("visibility", e.target.value)}
              disabled={loading}
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-xs text-slate-300 outline-none focus:border-indigo-500 transition-all"
            >
              <option value="private">Private (Team only)</option>
              <option value="public">Public (Open source)</option>
              <option value="internal">Internal Organization</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300">
            Description <span className="text-rose-400">*</span>
          </label>
          <textarea
            rows={3}
            placeholder="Brief overview of the project's purpose and target audience..."
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            disabled={loading}
            className={`w-full rounded-xl border ${
              errors.description
                ? "border-rose-500/80 bg-rose-950/20"
                : "border-slate-800 bg-slate-950/80 focus:border-indigo-500"
            } p-3 text-xs text-white placeholder-slate-500 outline-none transition-all resize-none`}
          />
          {errors.description && (
            <p className="text-[11px] text-rose-400">{errors.description}</p>
          )}
        </div>
      </form>
    </Modal>
  );
}
