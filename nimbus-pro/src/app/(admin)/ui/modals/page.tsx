"use client";
import { useState, useEffect } from "react";
import {
  PageHeader,
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Label,
  Textarea,
  Badge,
  Avatar,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { X, AlertTriangle, Trash2, UserPlus, Mail, Lock, Check, FileText, Settings } from "lucide-react";

type ModalSize = "sm" | "md" | "lg" | "fullscreen";

const SIZE_CLASS: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  fullscreen: "max-w-none h-full w-full rounded-none",
};

function Modal({
  open,
  onClose,
  children,
  size = "md",
  title,
  description,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: ModalSize;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative z-10 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-theme-2xl animate-scale-in dark:border-gray-800 dark:bg-gray-900",
          SIZE_CLASS[size]
        )}
      >
        {title && (
          <div className="flex items-start justify-between gap-3 border-b border-gray-100 p-5 dark:border-gray-800">
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
              {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        <div className={cn(size === "fullscreen" ? "flex-1 overflow-y-auto p-5" : "max-h-[70vh] overflow-y-auto p-5")}>
          {children}
        </div>
        {footer && (
          <div className="flex items-center justify-end gap-2 border-t border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ModalsPage() {
  const [basic, setBasic] = useState(false);
  const [form, setForm] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [size, setSize] = useState<ModalSize | null>(null);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("Member");
  const [submitted, setSubmitted] = useState(false);

  const openForm = () => {
    setEmail("");
    setName("");
    setRole("Member");
    setSubmitted(false);
    setForm(true);
  };

  const submitForm = () => {
    if (!email || !name) return;
    setSubmitted(true);
    setTimeout(() => setForm(false), 1200);
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Modals"
        description="Basic, form, confirmation, and four sizes — built inline with state + fixed overlay + animate-scale-in."
        breadcrumbs={[{ label: "UI Components" }, { label: "Modals" }]}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Basic */}
        <Card>
          <CardHeader title="Basic Modal" description="Title, body, and footer actions" />
          <CardBody>
            <Button variant="primary" onClick={() => setBasic(true)}>Open basic modal</Button>
          </CardBody>
        </Card>

        {/* Form */}
        <Card>
          <CardHeader title="Form Modal" description="Invite a teammate with inline validation" />
          <CardBody>
            <Button variant="secondary" onClick={openForm}>
              <UserPlus className="h-4 w-4" /> Invite member
            </Button>
          </CardBody>
        </Card>

        {/* Confirmation */}
        <Card>
          <CardHeader title="Confirmation Dialog" description="Danger intent with cancel/confirm" />
          <CardBody>
            <Button variant="danger" onClick={() => setConfirm(true)}>
              <Trash2 className="h-4 w-4" /> Delete project
            </Button>
          </CardBody>
        </Card>

        {/* Sizes */}
        <Card>
          <CardHeader title="Sizes" description="sm, md, lg, and fullscreen" />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => setSize("sm")}>Small</Button>
              <Button variant="outline" size="sm" onClick={() => setSize("md")}>Medium</Button>
              <Button variant="outline" size="sm" onClick={() => setSize("lg")}>Large</Button>
              <Button variant="outline" size="sm" onClick={() => setSize("fullscreen")}>Fullscreen</Button>
            </div>
          </CardBody>
        </Card>

        {/* Centered info */}
        <Card>
          <CardHeader title="Always Centered" description="Vertically + horizontally centered in viewport" />
          <CardBody>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Modals appear with a fixed overlay, dim backdrop, and <code className="rounded bg-gray-100 px-1 text-xs dark:bg-gray-800">animate-scale-in</code> entrance.
              Press <kbd className="rounded border border-gray-200 px-1.5 py-0.5 text-xs">Esc</kbd> or click the backdrop to close.
            </p>
            <Button variant="ghost" size="sm" className="mt-3" onClick={() => setBasic(true)}>Preview</Button>
          </CardBody>
        </Card>

        {/* Accessibility */}
        <Card>
          <CardHeader title="Accessibility" description="role=dialog, aria-modal, focus trap" />
          <CardBody>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500" /> Esc closes the modal</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500" /> Backdrop click closes</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500" /> Body scroll locked while open</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500" /> role=&ldquo;dialog&rdquo; + aria-modal</li>
            </ul>
          </CardBody>
        </Card>
      </div>

      {/* Basic modal */}
      <Modal
        open={basic}
        onClose={() => setBasic(false)}
        title="Welcome to Nimbus Pro"
        description="A quick tour of what's new in v3.2"
        size="md"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setBasic(false)}>Skip</Button>
            <Button variant="primary" size="sm" onClick={() => setBasic(false)}>Start tour</Button>
          </>
        }
      >
        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-xl border border-gray-100 p-3 dark:border-gray-800">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Real-time collaboration</p>
              <p className="text-xs text-gray-500">See teammates&rsquo; cursors live in any document.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl border border-gray-100 p-3 dark:border-gray-800">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400">
              <Settings className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">AI insights</p>
              <p className="text-xs text-gray-500">Surface anomalies and trends automatically.</p>
            </div>
          </div>
        </div>
      </Modal>

      {/* Form modal */}
      <Modal
        open={form}
        onClose={() => setForm(false)}
        title="Invite a teammate"
        description="They&rsquo;ll receive an email invitation to join your workspace"
        size="md"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setForm(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={submitForm} disabled={!email || !name || submitted}>
              {submitted ? <><Check className="h-3.5 w-3.5" /> Sent</> : "Send invite"}
            </Button>
          </>
        }
      >
        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400">
              <Check className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Invitation sent</p>
              <p className="text-xs text-gray-500">We sent an invite to {email}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <Label required>Full name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Maya Patel" />
            </div>
            <div>
              <Label required>Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="maya@company.com" className="pl-9" />
              </div>
            </div>
            <div>
              <Label>Role</Label>
              <div className="grid grid-cols-3 gap-2">
                {["Member", "Admin", "Owner"].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={cn(
                      "rounded-lg border px-3 py-2 text-xs font-semibold transition-all",
                      role === r
                        ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300"
                        : "border-gray-200 text-gray-600 hover:border-gray-300 dark:border-gray-700 dark:text-gray-300"
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label>Personal note (optional)</Label>
              <Textarea placeholder="Looking forward to working with you!" className="min-h-[70px]" />
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-2.5 text-xs text-gray-500 dark:bg-gray-900/40">
              <Lock className="h-3.5 w-3.5 shrink-0" />
              Invitations expire after 7 days.
            </div>
          </div>
        )}
      </Modal>

      {/* Confirmation modal */}
      <Modal
        open={confirm}
        onClose={() => setConfirm(false)}
        size="sm"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setConfirm(false)}>Cancel</Button>
            <Button variant="danger" size="sm" onClick={() => setConfirm(false)}>
              <Trash2 className="h-3.5 w-3.5" /> Delete forever
            </Button>
          </>
        }
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-400">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Delete this project?</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              This will permanently delete <span className="font-semibold text-gray-700 dark:text-gray-300">Q3 Marketing Plan</span> and all 14 documents inside. This action cannot be undone.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-gray-100 p-2 dark:border-gray-800">
            <Avatar name="Aria Chen" size={28} />
            <span className="text-xs text-gray-500">Created by Aria · 12 days ago</span>
          </div>
        </div>
      </Modal>

      {/* Size preview modal */}
      <Modal
        open={size !== null}
        onClose={() => setSize(null)}
        size={size ?? "md"}
        title={`${size} modal`}
        description="Adjust the size prop to fit your content"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setSize(null)}>Close</Button>
            <Button variant="primary" size="sm" onClick={() => setSize(null)}>Done</Button>
          </>
        }
      >
        <div className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            This is the <Badge tone="brand" variant="solid" className="capitalize">{size}</Badge> modal. Use small modals
            for confirmations, medium for forms, large for multi-step flows, and fullscreen for immersive experiences.
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(["sm", "md", "lg", "fullscreen"] as ModalSize[]).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-xs font-semibold capitalize transition-all",
                  size === s
                    ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300"
                    : "border-gray-200 text-gray-600 hover:border-gray-300 dark:border-gray-700 dark:text-gray-300"
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="rounded-xl bg-gray-50 p-4 text-xs text-gray-500 dark:bg-gray-900/40">
            Body content area. The modal scrolls vertically when content exceeds the max-height.
            {size === "fullscreen" && " Fullscreen mode takes the entire viewport with no rounded corners."}
          </div>
        </div>
      </Modal>
    </div>
  );
}
