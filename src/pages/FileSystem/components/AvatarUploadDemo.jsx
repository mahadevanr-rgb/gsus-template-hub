import React, { useState } from "react";
import { AvatarUpload } from "@/components/common/FileSystem";

export default function AvatarUploadDemo() {
  const [avatar, setAvatar] = useState(null);

  return (
    <div className="w-full max-w-sm mx-auto p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
      <AvatarUpload
        initials="TH"
        size="lg"
        maxSize={5 * 1024 * 1024}
        allowCrop={true}
        onAvatarChange={(av) => setAvatar(av)}
        onUploadSuccess={(res) => console.log("Avatar uploaded successfully:", res)}
      />

      {avatar && (
        <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
          Selected: <span className="font-semibold text-slate-800 dark:text-slate-200">{avatar.name}</span>
        </div>
      )}
    </div>
  );
}
