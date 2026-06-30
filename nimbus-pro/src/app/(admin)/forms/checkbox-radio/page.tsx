"use client";
import { useState } from "react";
import { PageHeader, Card, CardHeader, CardBody, Checkbox, Switch, Badge, Label } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Check, Star, Heart, Bell, Mail, MessageSquare, Smartphone, Moon } from "lucide-react";

export default function CheckboxRadioPage() {
  const [checked, setChecked] = useState(true);
  const [indeterminate, setIndeterminate] = useState(true);
  const [group, setGroup] = useState<string[]>(["apple", "banana"]);
  const [card, setCard] = useState<string[]>(["pro"]);
  const [radio, setRadio] = useState("monthly");
  const [radioCard, setRadioCard] = useState("starter");
  const [segmented, setSegmented] = useState("grid");

  // notification toggles
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [notifSms, setNotifSms] = useState(false);
  const [notifInApp, setNotInApp] = useState(true);
  const [dnd, setDnd] = useState(false);
  const [quiet, setQuiet] = useState(false);
  const [sound, setSound] = useState(true);
  const [vibrate, setVibrate] = useState(false);

  const toggleGroup = (id: string) => setGroup((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  const toggleCard = (id: string) => setCard((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Checkboxes & Radios"
        description="All variants: basic, indeterminate, grouped, cards, segmented, and switch lists."
        breadcrumbs={[{ label: "Forms" }, { label: "Checkbox & Radio" }]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Basic checkbox */}
        <Card>
          <CardHeader title="Checkboxes" description="Basic, indeterminate, and grouped variants" />
          <CardBody className="space-y-4">
            <div className="space-y-2">
              <Checkbox checked={checked} onChange={setChecked} label="I agree to the Terms of Service" />
              <Checkbox checked={false} onChange={() => {}} label="Subscribe to weekly newsletter" />
              <Checkbox checked={true} onChange={() => {}} label="Allow marketing emails" disabled />
            </div>

            <div className="space-y-2 border-t border-gray-100 pt-3 dark:border-gray-800">
              <Checkbox
                checked={indeterminate}
                onChange={setIndeterminate}
                label={indeterminate ? "Select all (indeterminate)" : "Select all (unchecked)"}
              />
              <div className="ml-6 space-y-1.5">
                {["Item A", "Item B", "Item C"].map((i) => (
                  <Checkbox key={i} checked={indeterminate} onChange={() => {}} label={i} />
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Checkbox group */}
        <Card>
          <CardHeader title="Checkbox Group" description="Select multiple fruits" />
          <CardBody>
            <Label className="mb-3">Fruits you like</Label>
            <div className="space-y-2">
              {[
                { id: "apple", label: "Apple", count: 24 },
                { id: "banana", label: "Banana", count: 18 },
                { id: "cherry", label: "Cherry", count: 12 },
                { id: "mango", label: "Mango", count: 32 },
                { id: "orange", label: "Orange", count: 9 },
              ].map((f) => (
                <label key={f.id} className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-100 p-2.5 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/40">
                  <div className="flex items-center gap-2.5">
                    <Checkbox checked={group.includes(f.id)} onChange={() => toggleGroup(f.id)} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{f.label}</span>
                  </div>
                  <Badge tone="gray" variant="soft">{f.count}</Badge>
                </label>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Checkbox cards */}
        <Card>
          <CardHeader title="Checkbox Cards" description="Larger selectable cards" />
          <CardBody>
            <Label className="mb-3">Choose plan add-ons</Label>
            <div className="space-y-2">
              {[
                { id: "pro", label: "Pro analytics", desc: "Advanced charts and exports", price: "$12/mo" },
                { id: "team", label: "Team seats", desc: "Up to 25 additional users", price: "$48/mo" },
                { id: "support", label: "Priority support", desc: "24/7 dedicated help", price: "$24/mo" },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => toggleCard(c.id)}
                  className={cn("flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all",
                    card.includes(c.id) ? "border-brand-300 bg-brand-50/40 dark:border-brand-700 dark:bg-brand-500/10" : "border-gray-200 hover:border-brand-300 dark:border-gray-800"
                  )}
                >
                  <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg border-2", card.includes(c.id) ? "border-brand-500 bg-brand-500 text-white" : "border-gray-300 dark:border-gray-700")}>
                    {card.includes(c.id) && <Check className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{c.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{c.desc}</p>
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{c.price}</span>
                </button>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Radio */}
        <Card>
          <CardHeader title="Radio Buttons" description="Single-choice selection" />
          <CardBody className="space-y-4">
            <div>
              <Label className="mb-2">Billing cycle</Label>
              <div className="space-y-2">
                {["monthly", "yearly", "lifetime"].map((r) => (
                  <label key={r} className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-100 p-2.5 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/40">
                    <button
                      type="button"
                      role="radio"
                      aria-checked={radio === r}
                      onClick={() => setRadio(r)}
                      className={cn("flex h-4.5 w-4.5 items-center justify-center rounded-full border-2 transition-all", radio === r ? "border-brand-500" : "border-gray-300 dark:border-gray-600")}
                      style={{ width: 18, height: 18 }}
                    >
                      {radio === r && <span className="h-2 w-2 rounded-full bg-brand-500" />}
                    </button>
                    <span className="text-sm font-medium capitalize text-gray-700 dark:text-gray-300">{r}</span>
                  </label>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Radio cards */}
        <Card>
          <CardHeader title="Radio Cards" description="Larger selectable cards" />
          <CardBody>
            <Label className="mb-3">Pick a starter template</Label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {[
                { id: "starter", label: "Starter", desc: "5 pages" },
                { id: "pro", label: "Pro", desc: "20 pages" },
                { id: "ultimate", label: "Ultimate", desc: "Unlimited" },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setRadioCard(c.id)}
                  className={cn("rounded-xl border p-4 text-left transition-all",
                    radioCard === c.id ? "border-brand-500 bg-brand-50 dark:bg-brand-500/10" : "border-gray-200 hover:border-brand-300 dark:border-gray-800"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{c.label}</span>
                    {radioCard === c.id && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-white"><Check className="h-3 w-3" /></span>}
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{c.desc}</p>
                </button>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Segmented */}
        <Card>
          <CardHeader title="Segmented Control" description="Tab-like single select" />
          <CardBody className="space-y-4">
            <div>
              <Label className="mb-2">View as</Label>
              <div className="inline-flex items-center gap-1 rounded-lg border border-gray-200 p-1 dark:border-gray-800">
                {["grid", "list", "table"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSegmented(s)}
                    className={cn("rounded-md px-3 py-1.5 text-xs font-semibold capitalize transition-colors",
                      segmented === s ? "bg-brand-500 text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    )}
                  >{s}</button>
                ))}
              </div>
            </div>
            <div>
              <Label className="mb-2">Rating</Label>
              <div className="inline-flex items-center gap-1 rounded-lg border border-gray-200 p-1 dark:border-gray-800">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setRadio(String(n))}
                    className={cn("flex h-9 w-9 items-center justify-center rounded-md transition-colors",
                      radio === String(n) ? "bg-warning-500 text-white" : "text-gray-400 hover:text-warning-500"
                    )}
                  ><Star className={cn("h-4 w-4", radio === String(n) && "fill-current")} /></button>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Switch list */}
        <Card className="lg:col-span-2">
          <CardHeader title="Toggle Switches List" description="Notification channel preferences" />
          <CardBody>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { id: "email", label: "Email notifications", desc: "Daily summary and alerts", icon: Mail, on: notifEmail, set: setNotifEmail },
                { id: "push", label: "Push notifications", desc: "Browser and mobile alerts", icon: Bell, on: notifPush, set: setNotifPush },
                { id: "sms", label: "SMS alerts", desc: "Critical-only via SMS", icon: Smartphone, on: notifSms, set: setNotifSms },
                { id: "inapp", label: "In-app notifications", desc: "Show in notification center", icon: MessageSquare, on: notifInApp, set: setNotInApp },
                { id: "dnd", label: "Do not disturb", desc: "Silence non-urgent alerts", icon: Moon, on: dnd, set: setDnd },
                { id: "quiet", label: "Quiet hours", desc: "10pm – 7am IST", icon: Heart, on: quiet, set: setQuiet },
                { id: "sound", label: "Sound effects", desc: "Play sound on new events", icon: Bell, on: sound, set: setSound },
                { id: "vibrate", label: "Vibrate", desc: "On mobile devices", icon: Smartphone, on: vibrate, set: setVibrate },
              ].map((t) => (
                <div key={t.id} className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                      <t.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{t.desc}</p>
                    </div>
                  </div>
                  <Switch checked={t.on} onChange={t.set} />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
