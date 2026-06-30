"use client";
import { useState } from "react";
import { PageHeader, Card, CardHeader, CardBody, Switch, Badge, Label } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  Bell, Moon, Wifi, Bluetooth, Plane, Sun, Volume2,
  Camera, Mic, MapPin, Lock, Mail, MessageSquare, Smartphone,
  Check,
} from "lucide-react";

export default function SwitchesPage() {
  const [s1, setS1] = useState(true);
  const [s2, setS2] = useState(false);
  const [s3, setS3] = useState(true);
  const [s4, setS4] = useState(false);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [notifSms, setNotifSms] = useState(false);
  const [notifInApp, setNotInApp] = useState(true);
  const [dnd, setDnd] = useState(false);
  const [airplane, setAirplane] = useState(false);
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(false);
  const [location, setLocation] = useState(true);
  const [camera, setCamera] = useState(false);
  const [mic, setMic] = useState(false);
  const [volume, setVolume] = useState(60);
  const [brightness, setBrightness] = useState(75);
  const [autoUpdate, setAutoUpdate] = useState(true);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Switches"
        description="All switch variants — sizes, with labels, icons, and grouped toggles."
        breadcrumbs={[{ label: "Forms" }, { label: "Switches" }]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Sizes */}
        <Card>
          <CardHeader title="Sizes" description="Small and medium variants" />
          <CardBody className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Small switch</Label>
              <Switch size="sm" checked={s1} onChange={setS1} />
            </div>
            <div className="flex items-center justify-between">
              <Label>Medium switch (default)</Label>
              <Switch checked={s2} onChange={setS2} />
            </div>
            <div className="flex items-center justify-between">
              <Label>Disabled (on)</Label>
              <Switch checked onChange={() => {}} disabled />
            </div>
            <div className="flex items-center justify-between">
              <Label>Disabled (off)</Label>
              <Switch checked={false} onChange={() => {}} disabled />
            </div>
          </CardBody>
        </Card>

        {/* With labels */}
        <Card>
          <CardHeader title="With Labels" description="Show current state with text" />
          <CardBody className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Marketing emails</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Receive product updates and offers</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn("text-xs font-semibold", s3 ? "text-success-600 dark:text-success-400" : "text-gray-400")}>{s3 ? "On" : "Off"}</span>
                <Switch checked={s3} onChange={setS3} />
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-800">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Auto-save drafts</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Save every 30 seconds</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn("text-xs font-semibold", s4 ? "text-success-600 dark:text-success-400" : "text-gray-400")}>{s4 ? "On" : "Off"}</span>
                <Switch checked={s4} onChange={setS4} />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* With icons */}
        <Card>
          <CardHeader title="With Icons" description="Icon-adorned switches" />
          <CardBody className="space-y-3">
            {[
              { id: "wifi", label: "Wi-Fi", icon: Wifi, on: wifi, set: setWifi },
              { id: "bluetooth", label: "Bluetooth", icon: Bluetooth, on: bluetooth, set: setBluetooth },
              { id: "airplane", label: "Airplane mode", icon: Plane, on: airplane, set: setAirplane },
              { id: "location", label: "Location services", icon: MapPin, on: location, set: setLocation },
            ].map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                    s.on ? "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400" : "bg-gray-100 text-gray-400 dark:bg-gray-800"
                  )}>
                    <s.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{s.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{s.on ? "Enabled" : "Disabled"}</p>
                  </div>
                </div>
                <Switch checked={s.on} onChange={s.set} />
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Permissions */}
        <Card>
          <CardHeader title="App Permissions" description="Toggle access to device features" />
          <CardBody className="space-y-3">
            {[
              { id: "camera", label: "Camera", icon: Camera, on: camera, set: setCamera },
              { id: "mic", label: "Microphone", icon: Mic, on: mic, set: setMic },
              { id: "location", label: "Location", icon: MapPin, on: location, set: setLocation },
              { id: "lock", label: "Lock screen", icon: Lock, on: false, set: () => {} },
            ].map((s) => (
              <div key={s.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <s.icon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{s.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={s.on ? "success" : "gray"} variant="soft">{s.on ? "Allowed" : "Blocked"}</Badge>
                  <Switch checked={s.on} onChange={s.set} />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Notification preferences */}
        <Card>
          <CardHeader title="Notification Channels" description="Choose how to be notified" />
          <CardBody className="space-y-3">
            {[
              { id: "email", label: "Email", desc: "Daily summary + alerts", icon: Mail, on: notifEmail, set: setNotifEmail },
              { id: "push", label: "Push", desc: "Browser + mobile push", icon: Bell, on: notifPush, set: setNotifPush },
              { id: "sms", label: "SMS", desc: "Critical alerts only", icon: Smartphone, on: notifSms, set: setNotifSms },
              { id: "inapp", label: "In-app", desc: "Show in notification center", icon: MessageSquare, on: notifInApp, set: setNotInApp },
            ].map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <s.icon className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{s.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{s.desc}</p>
                  </div>
                </div>
                <Switch checked={s.on} onChange={s.set} />
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Slider-like */}
        <Card>
          <CardHeader title="Slider-like Switches" description="Switches with continuous values" />
          <CardBody className="space-y-5">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Volume2 className="h-4 w-4 text-gray-400" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">Volume</span>
                </div>
                <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">{volume}%</span>
              </div>
              <input type="range" min={0} max={100} value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-brand-500 dark:bg-gray-800" />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Sun className="h-4 w-4 text-gray-400" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">Brightness</span>
                </div>
                <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">{brightness}%</span>
              </div>
              <input type="range" min={0} max={100} value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-brand-500 dark:bg-gray-800" />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", autoUpdate ? "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400" : "bg-gray-100 text-gray-400 dark:bg-gray-800")}>
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Auto-update apps</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Install updates automatically</p>
                </div>
              </div>
              <Switch checked={autoUpdate} onChange={setAutoUpdate} />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", dnd ? "bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400" : "bg-gray-100 text-gray-400 dark:bg-gray-800")}>
                  <Moon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Do not disturb</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Silence non-urgent alerts</p>
                </div>
              </div>
              <Switch checked={dnd} onChange={setDnd} />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
