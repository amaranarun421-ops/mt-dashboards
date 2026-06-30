export type Session = {
  id: string;
  device: string;
  browser: string;
  location: string;
  ip: string;
  lastActive: string;
  current: boolean;
};

export type ApiToken = {
  id: string;
  name: string;
  prefix: string;
  scopes: string[];
  createdAt: string;
  lastUsed: string;
  expiresAt: string;
};

export type LoginHistoryEntry = {
  id: string;
  device: string;
  browser: string;
  location: string;
  ip: string;
  timestamp: string;
  status: "Success" | "Failed" | "2FA challenge";
};

export const activeSessions: Session[] = [
  {
    id: "SES-1",
    device: "MacBook Pro 16\"",
    browser: "Chrome 128 · macOS 14",
    location: "Bengaluru, IN",
    ip: "203.0.113.42",
    lastActive: "Active now",
    current: true,
  },
  {
    id: "SES-2",
    device: "iPhone 15 Pro",
    browser: "Helios Pro iOS · 4.2.1",
    location: "Bengaluru, IN",
    ip: "203.0.113.42",
    lastActive: "12 minutes ago",
    current: false,
  },
  {
    id: "SES-3",
    device: "iPad Air",
    browser: "Safari 17 · iPadOS 17",
    location: "Bengaluru, IN",
    ip: "203.0.113.42",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    id: "SES-4",
    device: "Windows Desktop",
    browser: "Edge 122 · Windows 11",
    location: "Mumbai, IN",
    ip: "49.205.71.18",
    lastActive: "Yesterday",
    current: false,
  },
];

export const apiTokens: ApiToken[] = [
  {
    id: "TKN-1",
    name: "Production CI/CD",
    prefix: "hlp_live_8f2a",
    scopes: ["orders:write", "products:read", "billing:read"],
    createdAt: "Nov 02, 2024",
    lastUsed: "4 minutes ago",
    expiresAt: "Nov 02, 2025",
  },
  {
    id: "TKN-2",
    name: "Analytics export job",
    prefix: "hlp_live_91ce",
    scopes: ["reports:read", "exports:write"],
    createdAt: "Dec 18, 2024",
    lastUsed: "Yesterday",
    expiresAt: "Dec 18, 2025",
  },
  {
    id: "TKN-3",
    name: "Support widget (staging)",
    prefix: "hlp_test_2b7d",
    scopes: ["tickets:write"],
    createdAt: "Jan 22, 2025",
    lastUsed: "3 days ago",
    expiresAt: "Feb 22, 2025",
  },
];

export const loginHistory: LoginHistoryEntry[] = [
  {
    id: "LH-1",
    device: "MacBook Pro 16\"",
    browser: "Chrome 128 · macOS 14",
    location: "Bengaluru, IN",
    ip: "203.0.113.42",
    timestamp: "Feb 14, 2025 · 09:42",
    status: "Success",
  },
  {
    id: "LH-2",
    device: "Unknown",
    browser: "Chrome 128 · Unknown OS",
    location: "Unknown",
    ip: "45.227.18.92",
    timestamp: "Feb 13, 2025 · 14:11",
    status: "Failed",
  },
  {
    id: "LH-3",
    device: "iPhone 15 Pro",
    browser: "Helios Pro iOS · 4.2.1",
    location: "Bengaluru, IN",
    ip: "203.0.113.42",
    timestamp: "Feb 13, 2025 · 08:02",
    status: "Success",
  },
  {
    id: "LH-4",
    device: "MacBook Pro 16\"",
    browser: "Chrome 128 · macOS 14",
    location: "Bengaluru, IN",
    ip: "203.0.113.42",
    timestamp: "Feb 12, 2025 · 22:48",
    status: "2FA challenge",
  },
  {
    id: "LH-5",
    device: "Windows Desktop",
    browser: "Edge 122 · Windows 11",
    location: "Mumbai, IN",
    ip: "49.205.71.18",
    timestamp: "Feb 12, 2025 · 11:14",
    status: "Success",
  },
  {
    id: "LH-6",
    device: "Unknown",
    browser: "Chrome 128 · Unknown OS",
    location: "Unknown",
    ip: "193.27.14.88",
    timestamp: "Feb 10, 2025 · 21:05",
    status: "Failed",
  },
];
