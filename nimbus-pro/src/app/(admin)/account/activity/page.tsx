"use client";
import { useState } from "react";
import { PageHeader, Card, CardBody, Badge, Button, SearchInput, Select } from "@/components/ui";
import { ACTIVITY_LOG } from "@/data/mock";
import { cn } from "@/lib/utils";
import {
  LogIn, LogOut, Settings, Key, Download, Upload, Trash2, AlertCircle,
  ChevronLeft, ChevronRight, Calendar, Monitor, MapPin,
} from "lucide-react";

const ACTION_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  login: LogIn,
  logout: LogOut,
  settings: Settings,
  password: Key,
  export: Download,
  upload: Upload,
  delete: Trash2,
};

// Build a richer activity list by reusing ACTIVITY_LOG and adding more entries
const ENTRIES = [
  ...ACTIVITY_LOG,
  { id: 6, user: "System", action: "Sent weekly digest email", ip: "internal", device: "—", time: "2026-06-27 09:00", status: "success" },
  { id: 7, user: "Aaroh Sharma", action: "Enabled 2FA on account", ip: "103.21.42.18", device: "MacOS · Chrome", time: "2026-06-26 11:24", status: "success" },
  { id: 8, user: "Aaroh Sharma", action: "Revoked session on Android", ip: "103.21.42.18", device: "MacOS · Chrome", time: "2026-06-26 11:18", status: "success" },
  { id: 9, user: "System", action: "Failed login attempt", ip: "129.126.42.18", device: "Unknown · Curl", time: "2026-06-26 07:09", status: "failed" },
  { id: 10, user: "Aaroh Sharma", action: "Connected Slack integration", ip: "103.21.42.18", device: "MacOS · Chrome", time: "2026-06-25 16:42", status: "success" },
  { id: 11, user: "Aaroh Sharma", action: "Updated profile photo", ip: "103.21.42.18", device: "iOS · Safari", time: "2026-06-25 14:22", status: "success" },
  { id: 12, user: "System", action: "Auto-renewed subscription", ip: "internal", device: "—", time: "2026-06-22 00:00", status: "success" },
];

export default function ActivityPage() {
  const [search, setSearch] = useState("");
  const [actionType, setActionType] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [page, setPage] = useState(0);
  const pageSize = 6;

  const filtered = ENTRIES.filter((e) => {
    const matchesSearch = !search.trim() ? true : e.action.toLowerCase().includes(search.toLowerCase()) || e.ip.includes(search);
    const matchesAction = actionType === "all" ? true : actionType === "failed" ? e.status === "failed" : e.action.toLowerCase().includes(actionType);
    const matchesUser = userFilter === "all" ? true : e.user === userFilter;
    return matchesSearch && matchesAction && matchesUser;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages - 1);
  const paged = filtered.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Activity Log"
        description="Audit trail of all account and workspace events."
        breadcrumbs={[{ label: "Account" }, { label: "Activity" }]}
        actions={<Button variant="secondary"><Download className="h-4 w-4" /> Export CSV</Button>}
      />

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <SearchInput value={search} onChange={setSearch} placeholder="Search activity..." />
          <Select value={userFilter} onChange={(e) => setUserFilter(e.target.value)}>
            <option value="all">All users</option>
            <option value="Aaroh Sharma">Aaroh Sharma</option>
            <option value="System">System</option>
          </Select>
          <Select value={actionType} onChange={(e) => setActionType(e.target.value)}>
            <option value="all">All actions</option>
            <option value="login">Login</option>
            <option value="password">Password</option>
            <option value="export">Export</option>
            <option value="failed">Failed</option>
          </Select>
          <Button variant="outline"><Calendar className="h-4 w-4" /> Date range</Button>
        </div>
      </Card>

      {/* Timeline */}
      <Card>
        <CardBody className="space-y-1">
          {paged.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
              <AlertCircle className="h-6 w-6 text-gray-300 dark:text-gray-600" />
              <p className="text-sm text-gray-500">No activity matches your filters</p>
            </div>
          ) : (
            <ol className="relative space-y-1">
              {paged.map((e) => {
                const Icon = e.status === "failed" ? AlertCircle : ACTION_ICON.login;
                return (
                  <li key={e.id} className="flex flex-col gap-3 rounded-xl p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/40 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3 sm:w-56">
                      <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                        e.status === "failed" ? "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-400" : "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400"
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{e.user}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{e.time}</p>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">{e.action}</p>
                      <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1"><Monitor className="h-3 w-3" /> {e.device}</span>
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> <span className="font-mono">{e.ip}</span></span>
                      </p>
                    </div>
                    <div>
                      {e.status === "success" ? (
                        <Badge tone="success" variant="soft" dot>Success</Badge>
                      ) : (
                        <Badge tone="error" variant="soft" dot>Failed</Badge>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </CardBody>
        <div className="flex items-center justify-between border-t border-gray-100 p-4 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-700 dark:text-gray-300">{Math.min(filtered.length, currentPage * pageSize + 1)}</span>
            –<span className="font-semibold text-gray-700 dark:text-gray-300">{Math.min(filtered.length, (currentPage + 1) * pageSize)}</span> of{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-300">{filtered.length}</span>
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 disabled:opacity-40 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            ><ChevronLeft className="h-4 w-4" /></button>
            <span className="px-2 text-xs font-medium text-gray-600 dark:text-gray-400">Page {currentPage + 1} / {totalPages}</span>
            <button
              onClick={() => setPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage >= totalPages - 1}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 disabled:opacity-40 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            ><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </Card>
    </div>
  );
}
