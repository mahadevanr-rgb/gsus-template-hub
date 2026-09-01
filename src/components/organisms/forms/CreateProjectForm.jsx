import React, { useState } from "react";
import { FormField } from "../../molecules/forms/FormField";
import { SwitchToggle } from "../../atoms/forms/SwitchToggle";

export const CreateProjectForm = () => {
  const [isPublic, setIsPublic] = useState(false);

  return (
    <form className="space-y-6 p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Create New Project
        </h2>
        <p className="text-sm text-slate-500">
          Set up your workspace parameters.
        </p>
      </div>

      <FormField
        label="Project Name"
        required
        placeholder="e.g. Apollo Dashboard"
      >
        {/* <TextInput placeholder="Enter project name..." /> */}
      </FormField>

      <FormField label="Description" helperText="Maximum 200 characters.">
        <textarea
          className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all min-h-[100px]"
          placeholder="Describe your project goal..."
        />
      </FormField>

      <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
        <div className="space-y-0.5">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Public Visibility
          </p>
          <p className="text-xs text-slate-500">
            Allow others to view this template.
          </p>
        </div>
        <SwitchToggle checked={isPublic} onChange={setIsPublic} />
      </div>

      <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
        Create Project
      </button>
    </form>
  );
};
