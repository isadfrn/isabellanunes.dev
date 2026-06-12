import { useEffect, useState } from "react";
import {
  FEATURE_KEYS,
  FEATURE_LABELS,
  getFlags,
  saveFlags,
  type FeatureFlags,
} from "@/lib/features";

export default function FeatureFlagsAdmin() {
  const [flags, setFlags] = useState<FeatureFlags | null>(null);
  const [savedKey, setSavedKey] = useState<string | null>(null);

  useEffect(() => {
    setFlags(getFlags());
  }, []);

  function toggle(key: keyof FeatureFlags) {
    if (!flags) return;
    const next = { ...flags, [key]: !flags[key] };
    setFlags(next);
    saveFlags(next);
    setSavedKey(key);
    window.setTimeout(() => setSavedKey(null), 1200);
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-900">
      <div className="mx-auto max-w-md">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Feature Flags</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Toggle site sections on or off in real time.
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
          {flags &&
            FEATURE_KEYS.map((key, index) => (
              <div
                key={key}
                className={`flex items-center justify-between px-5 py-4 ${
                  index < FEATURE_KEYS.length - 1 ? "border-b border-slate-100 dark:border-slate-700" : ""
                }`}
              >
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    {FEATURE_LABELS[key]}
                  </p>
                  <p
                    className={`mt-0.5 text-xs transition-colors ${
                      savedKey === key ? "text-primary-500" : flags[key] ? "text-slate-400" : "text-red-400"
                    }`}
                  >
                    {savedKey === key ? "Saved" : flags[key] ? "Visible" : "Hidden"}
                  </p>
                </div>
                <button
                  role="switch"
                  aria-checked={flags[key]}
                  aria-label={`Toggle ${FEATURE_LABELS[key]}`}
                  onClick={() => toggle(key)}
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 ${
                    flags[key] ? "bg-primary-500" : "bg-slate-200 dark:bg-slate-600"
                  }`}
                  type="button"
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${
                      flags[key] ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
