"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Modal } from "@/components/shared/modal";
import { Progress } from "@/components/shared/progress";
import { StatCard } from "@/components/shared/stat-card";
import {
  FormSection,
  FormField,
  inputClass,
} from "@/components/shared/form-section";
import {
  ShieldIcon,
  LockIcon,
  KeyIcon,
  CheckSquareIcon,
  RefreshCwIcon,
  XCircleIcon,
  AlertIcon,
} from "@/components/Layouts/sidebar/icons";
import {
  activeSessions as initialSessions,
  apiTokens as initialTokens,
  loginHistory,
  type ApiToken,
  type Session,
} from "@/data/user-account/security";

const passwordStrength = (pw: string): { score: number; label: string; tone: "danger" | "accent" | "primary" } => {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const pct = Math.min(100, (score / 5) * 100);
  if (score <= 2) return { score: pct, label: "Weak", tone: "danger" };
  if (score <= 3) return { score: pct, label: "Fair", tone: "accent" };
  return { score: pct, label: "Strong", tone: "primary" };
};

export default function SecuritySettingsClient() {
  const [twoFA, setTwoFA] = useState(true);
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [tokens, setTokens] = useState<ApiToken[]>(initialTokens);
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [tokenName, setTokenName] = useState("");
  const [newTokenModal, setNewTokenModal] = useState(false);

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const strength = passwordStrength(newPw);
  const pwError =
    confirmPw && newPw !== confirmPw ? "Passwords do not match." : undefined;

  const toggle2FA = () => {
    if (!twoFA) {
      setShow2FASetup(true);
    } else {
      setTwoFA(false);
    }
  };

  const revokeToken = (id: string) =>
    setTokens((arr) => arr.filter((t) => t.id !== id));

  const revokeSession = (id: string) =>
    setSessions((arr) => arr.filter((s) => s.id !== id));

  const createToken = () => {
    if (!tokenName.trim()) return;
    const prefix = "hlp_live_" + Math.random().toString(16).slice(2, 6);
    const newToken: ApiToken = {
      id: "TKN-" + (tokens.length + 1),
      name: tokenName,
      prefix,
      scopes: ["orders:read", "products:read"],
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      lastUsed: "Never",
      expiresAt: "In 12 months",
    };
    setTokens((arr) => [newToken, ...arr]);
    setTokenName("");
    setNewTokenModal(false);
  };

  const generateRecoveryCodes = () => {
    const codes = Array.from({ length: 8 }, () =>
      Math.random().toString(16).slice(2, 10).toUpperCase().match(/.{1,4}/g)!.join("-"),
    );
    setRecoveryCodes(codes);
  };

  return (
    <div>
      <PageHeader
        title="Security settings"
        description="Keep your account safe with a strong password, 2FA and active session control."
        breadcrumbs={[{ label: "User & Account" }, { label: "Security" }]}
        actions={
          <Badge variant={twoFA ? "success" : "warning"}>
            {twoFA ? "2FA enabled" : "2FA disabled"}
          </Badge>
        }
      />

      {/* Top stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Security score"
          value="86 / 100"
          delta={{ value: "+4", trend: "up" }}
          tone="primary"
          icon={<ShieldIcon className="size-5" />}
        />
        <StatCard
          label="Active sessions"
          value={sessions.length}
          tone="info"
          icon={<KeyIcon className="size-5" />}
        />
        <StatCard
          label="API tokens"
          value={tokens.length}
          tone="violet"
          icon={<KeyIcon className="size-5" />}
        />
        <StatCard
          label="Failed logins (7d)"
          value="3"
          tone="danger"
          icon={<AlertIcon className="size-5" />}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Password change */}
          <Card>
            <CardHeader
              title="Change password"
              subtitle="Use at least 12 characters with a mix of letters, numbers and symbols."
              action={<LockIcon className="size-5 text-dark-5 dark:text-dark-6" />}
            />
            <FormSection title="" columns={1} className="border-0 p-0 shadow-none">
              <FormField label="Current password" htmlFor="cur-pw">
                <input
                  id="cur-pw"
                  type="password"
                  className={inputClass}
                  value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)}
                  placeholder="••••••••••"
                />
              </FormField>
              <FormField
                label="New password"
                htmlFor="new-pw"
                hint={newPw ? `Strength: ${strength.label}` : "At least 12 characters recommended."}
                error={pwError}
              >
                <input
                  id="new-pw"
                  type="password"
                  className={inputClass}
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  placeholder="••••••••••"
                />
              </FormField>
              {newPw && (
                <div className="-mt-2">
                  <Progress value={strength.score} tone={strength.tone} size="sm" />
                </div>
              )}
              <FormField label="Confirm new password" htmlFor="confirm-pw" error={pwError}>
                <input
                  id="confirm-pw"
                  type="password"
                  className={inputClass}
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  placeholder="••••••••••"
                />
              </FormField>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Reset</Button>
                <Button
                  disabled={!newPw || !confirmPw || newPw !== confirmPw}
                >
                  <RefreshCwIcon className="size-4" />
                  Update password
                </Button>
              </div>
            </FormSection>
          </Card>

          {/* Two-factor auth */}
          <Card>
            <CardHeader
              title="Two-factor authentication"
              subtitle="Require a second factor from your authenticator app at every sign-in."
              action={
                <button
                  type="button"
                  role="switch"
                  aria-checked={twoFA}
                  onClick={toggle2FA}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                    twoFA ? "bg-primary" : "bg-gray-3 dark:bg-dark-3"
                  }`}
                >
                  <span
                    className={`inline-block size-5 transform rounded-full bg-white shadow transition ${
                      twoFA ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              }
            />
            {twoFA ? (
              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-xl border border-stroke p-4 dark:border-dark-3">
                  <span className="grid size-10 place-items-center rounded-lg bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light">
                    <CheckSquareIcon className="size-5" />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-dark dark:text-white">
                      Authenticator app · Active
                    </p>
                    <p className="text-xs text-dark-5 dark:text-dark-6">
                      Codes refresh every 30 seconds from your Authenticator app on iPhone 15 Pro.
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setShow2FASetup(true)}>
                    Reconfigure
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-stroke p-4 dark:border-dark-3">
                    <p className="text-sm font-semibold text-dark dark:text-white">Backup codes</p>
                    <p className="mt-0.5 text-xs text-dark-5 dark:text-dark-6">
                      Use these one-time codes if you lose your device.
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 px-0"
                      onClick={generateRecoveryCodes}
                    >
                      View backup codes
                    </Button>
                  </div>
                  <div className="rounded-xl border border-stroke p-4 dark:border-dark-3">
                    <p className="text-sm font-semibold text-dark dark:text-white">Backup phone</p>
                    <p className="mt-0.5 text-xs text-dark-5 dark:text-dark-6">
                      Receive codes by SMS to +91 •••• ••210.
                    </p>
                    <Button variant="ghost" size="sm" className="mt-2 px-0">Update phone</Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-accent/40 bg-accent-subtle/40 p-4 dark:bg-accent/10">
                <p className="text-sm font-semibold text-accent-dark dark:text-accent-light">
                  Two-factor is disabled
                </p>
                <p className="mt-0.5 text-xs text-accent-dark/80 dark:text-accent-light/80">
                  Your account is more vulnerable to takeovers. Enable 2FA to add a second factor at sign-in.
                </p>
                <Button size="sm" className="mt-3" onClick={() => setShow2FASetup(true)}>
                  Enable 2FA
                </Button>
              </div>
            )}
          </Card>

          {/* Active sessions */}
          <Card>
            <CardHeader
              title="Active sessions"
              subtitle="Devices currently signed into your account. Revoke any you don't recognize."
              action={<Badge variant="info">{sessions.length} active</Badge>}
            />
            <ul className="space-y-3">
              {sessions.map((s) => (
                <li
                  key={s.id}
                  className="flex flex-col gap-3 rounded-xl border border-stroke p-4 dark:border-dark-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-gray-2 text-dark-5 dark:bg-white/5 dark:text-dark-6">
                      <KeyIcon className="size-5" />
                    </span>
                    <div>
                      <p className="flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
                        {s.device}
                        {s.current && <Badge variant="success">This device</Badge>}
                      </p>
                      <p className="text-xs text-dark-5 dark:text-dark-6">
                        {s.browser} · {s.location} · {s.ip}
                      </p>
                      <p className="mt-0.5 text-xs text-dark-5 dark:text-dark-6">
                        Last active {s.lastActive}
                      </p>
                    </div>
                  </div>
                  {!s.current && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => revokeSession(s.id)}
                    >
                      <XCircleIcon className="size-4" />
                      Revoke
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </Card>

          {/* Login history */}
          <Card>
            <CardHeader
              title="Login history"
              subtitle="Recent sign-in attempts, including failures and 2FA challenges."
              action={<Button variant="ghost" size="sm">Export CSV</Button>}
            />
            <div className="overflow-hidden rounded-xl border border-stroke dark:border-dark-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-2 text-left text-xs uppercase tracking-wider text-dark-5 dark:bg-dark-2 dark:text-dark-6">
                    <th className="px-4 py-3">When</th>
                    <th className="px-4 py-3">Device</th>
                    <th className="px-4 py-3">Location</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loginHistory.map((h) => (
                    <tr key={h.id} className="border-t border-stroke dark:border-dark-3">
                      <td className="px-4 py-3 text-dark-7 dark:text-dark-6">{h.timestamp}</td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-dark dark:text-white">{h.device}</p>
                        <p className="text-xs text-dark-5 dark:text-dark-6">{h.browser}</p>
                      </td>
                      <td className="px-4 py-3 text-dark-7 dark:text-dark-6">
                        {h.location}
                        <p className="text-xs text-dark-5 dark:text-dark-6">{h.ip}</p>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={
                            h.status === "Success"
                              ? "success"
                              : h.status === "Failed"
                                ? "danger"
                                : "warning"
                          }
                        >
                          {h.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* API tokens */}
          <Card>
            <CardHeader
              title="API tokens"
              subtitle="Use tokens to authenticate scripts and integrations."
              action={
                <Button size="sm" onClick={() => setNewTokenModal(true)}>
                  <KeyIcon className="size-4" />
                  New token
                </Button>
              }
            />
            <ul className="space-y-3">
              {tokens.map((t) => (
                <li
                  key={t.id}
                  className="rounded-xl border border-stroke p-4 dark:border-dark-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-dark dark:text-white">{t.name}</p>
                    <Badge variant="outline" size="sm">{t.prefix}…</Badge>
                  </div>
                  <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">
                    Scopes: {t.scopes.join(", ")}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-xs text-dark-5 dark:text-dark-6">
                    <span>Created {t.createdAt}</span>
                    <span>Last used {t.lastUsed}</span>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red"
                      onClick={() => revokeToken(t.id)}
                    >
                      Revoke
                    </Button>
                  </div>
                </li>
              ))}
              {tokens.length === 0 && (
                <p className="py-6 text-center text-sm text-dark-5 dark:text-dark-6">
                  No active API tokens.
                </p>
              )}
            </ul>
          </Card>

          {/* Recovery codes */}
          <Card>
            <CardHeader
              title="Recovery codes"
              subtitle="One-time codes for when you lose your 2FA device."
            />
            {recoveryCodes.length === 0 ? (
              <p className="py-6 text-center text-sm text-dark-5 dark:text-dark-6">
                No codes generated yet.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                {recoveryCodes.map((c) => (
                  <span
                    key={c}
                    className="rounded-md bg-gray-2 px-2 py-1.5 text-dark-7 dark:bg-white/5 dark:text-dark-6"
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}
            <Button variant="outline" size="sm" className="mt-3 w-full" onClick={generateRecoveryCodes}>
              <RefreshCwIcon className="size-4" />
              Generate new codes
            </Button>
          </Card>
        </div>
      </div>

      {/* 2FA setup modal */}
      <Modal
        open={show2FASetup}
        onClose={() => setShow2FASetup(false)}
        title="Set up two-factor authentication"
        description="Scan this QR code with your authenticator app, then enter a 6-digit code to verify."
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setShow2FASetup(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setTwoFA(true);
                setShow2FASetup(false);
              }}
            >
              <CheckSquareIcon className="size-4" />
              Verify &amp; enable
            </Button>
          </>
        }
      >
        <div className="flex flex-col items-center gap-4">
          {/* Decorative QR placeholder built from CSS — no external asset */}
          <div className="grid size-44 grid-cols-12 grid-rows-12 gap-px overflow-hidden rounded-xl border border-stroke bg-white p-2 dark:border-dark-3">
            {Array.from({ length: 144 }).map((_, i) => {
              const seed = (i * 73 + 17) % 11;
              const on = seed % 3 === 0 || (i < 36 && i % 7 < 4) || (i > 108 && i % 5 < 2);
              return (
                <span
                  key={i}
                  className={on ? "bg-dark dark:bg-white" : "bg-transparent"}
                />
              );
            })}
          </div>
          <p className="text-center text-xs text-dark-5 dark:text-dark-6">
            Or enter this code manually:
          </p>
          <code className="rounded-md bg-gray-2 px-3 py-2 text-center font-mono text-xs text-dark-7 dark:bg-white/5 dark:text-dark-6">
            JBSWY3DPEHPK3PXPABCDEFGH4567
          </code>
          <FormField label="6-digit verification code" htmlFor="totp">
            <input
              id="totp"
              inputMode="numeric"
              maxLength={6}
              className={`${inputClass} text-center tracking-[0.4em]`}
              placeholder="000000"
            />
          </FormField>
        </div>
      </Modal>

      {/* New API token modal */}
      <Modal
        open={newTokenModal}
        onClose={() => setNewTokenModal(false)}
        title="Create API token"
        description="Give your token a name that describes where it will be used."
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => setNewTokenModal(false)}>
              Cancel
            </Button>
            <Button onClick={createToken} disabled={!tokenName.trim()}>
              <KeyIcon className="size-4" />
              Create token
            </Button>
          </>
        }
      >
        <FormField label="Token name" htmlFor="token-name" hint="e.g. Production CI/CD">
          <input
            id="token-name"
            className={inputClass}
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
            placeholder="My new token"
          />
        </FormField>
      </Modal>
    </div>
  );
}
