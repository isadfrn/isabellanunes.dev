import { LockClosedIcon } from "@heroicons/react/24/outline";
import { useEffect, useState, type FormEvent } from "react";
import {
  AUTH_KEY,
  FEATURE_KEYS,
  FEATURE_LABELS,
  getFlags,
  saveFlags,
  type FeatureFlags,
} from "@/lib/features";

interface Props {
  adminPin: string;
}

export default function FeatureFlagsAdmin({ adminPin }: Props) {
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [flags, setFlags] = useState<FeatureFlags | null>(null);
  const [savedKey, setSavedKey] = useState<string | null>(null);

  useEffect(() => {
    const auth = sessionStorage.getItem(AUTH_KEY) === "true";
    setAuthenticated(auth);
    if (auth) setFlags(getFlags());
  }, []);

  function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (pin === adminPin) {
      sessionStorage.setItem(AUTH_KEY, "true");
      setAuthenticated(true);
      setFlags(getFlags());
      setError(false);
    } else {
      setError(true);
    }

    setPin("");
  }

  function handleLogout() {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthenticated(false);
    setFlags(null);
  }

  function toggle(key: keyof FeatureFlags) {
    if (!flags) return;

    const next = { ...flags, [key]: !flags[key] };
    setFlags(next);
    saveFlags(next);
    setSavedKey(key);
    window.setTimeout(() => setSavedKey(null), 1200);
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-900">
        <div className="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="mb-6 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/40">
              <LockClosedIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" aria-hidden />
            </div>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
              Feature Flags
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Enter your PIN to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={pin}
                onChange={(event) => {
                  setPin(event.target.value);
                  setError(false);
                }}
                placeholder="PIN"
                autoFocus
                className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900 dark:text-slate-50 ${
                  error ? "border-red-400 dark:border-red-500" : "border-slate-200 dark:border-slate-600"
                }`}
              />
              {error && <p className="mt-1.5 text-xs text-red-500">Incorrect PIN.</p>}
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-primary-700"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-900">
      <div className="mx-auto max-w-md">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Feature Flags</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Toggle site sections on or off in real time.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-1 text-xs text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-300"
            type="button"
          >
            Sign out
          </button>
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
