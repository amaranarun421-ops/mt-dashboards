export type Role = "Owner" | "Admin" | "Manager" | "Editor" | "Viewer" | "Billing";

export type TeamStatus = "Active" | "Invited" | "Suspended";

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: TeamStatus;
  department: string;
  location: string;
  lastActive: string;
  joinedAt: string;
  avatarSrc?: string;
  twoFactor: boolean;
};

export const teamMembers: TeamMember[] = [
  {
    id: "U-001",
    name: "Aarav Mehta",
    email: "aarav.mehta@heliospro.io",
    role: "Owner",
    status: "Active",
    department: "Executive",
    location: "Bengaluru, IN",
    lastActive: "2 minutes ago",
    joinedAt: "Jan 14, 2021",
    twoFactor: true,
  },
  {
    id: "U-002",
    name: "Priya Nair",
    email: "priya.nair@heliospro.io",
    role: "Admin",
    status: "Active",
    department: "Engineering",
    location: "Bengaluru, IN",
    lastActive: "14 minutes ago",
    joinedAt: "Mar 22, 2021",
    twoFactor: true,
  },
  {
    id: "U-003",
    name: "Daniel Okoro",
    email: "daniel.okoro@heliospro.io",
    role: "Manager",
    status: "Active",
    department: "Operations",
    location: "Lagos, NG",
    lastActive: "1 hour ago",
    joinedAt: "Jun 09, 2021",
    twoFactor: true,
  },
  {
    id: "U-004",
    name: "Sofia Marquez",
    email: "sofia.marquez@heliospro.io",
    role: "Manager",
    status: "Active",
    department: "Marketing",
    location: "Madrid, ES",
    lastActive: "3 hours ago",
    joinedAt: "Aug 02, 2021",
    twoFactor: false,
  },
  {
    id: "U-005",
    name: "Liam O'Connor",
    email: "liam.oconnor@heliospro.io",
    role: "Editor",
    status: "Active",
    department: "Content",
    location: "Dublin, IE",
    lastActive: "Yesterday",
    joinedAt: "Nov 16, 2021",
    twoFactor: true,
  },
  {
    id: "U-006",
    name: "Yuki Tanaka",
    email: "yuki.tanaka@heliospro.io",
    role: "Editor",
    status: "Active",
    department: "Design",
    location: "Tokyo, JP",
    lastActive: "Yesterday",
    joinedAt: "Feb 28, 2022",
    twoFactor: true,
  },
  {
    id: "U-007",
    name: "Emma Larsen",
    email: "emma.larsen@heliospro.io",
    role: "Billing",
    status: "Active",
    department: "Finance",
    location: "Oslo, NO",
    lastActive: "2 days ago",
    joinedAt: "Apr 11, 2022",
    twoFactor: true,
  },
  {
    id: "U-008",
    name: "Marcus Hale",
    email: "marcus.hale@heliospro.io",
    role: "Viewer",
    status: "Invited",
    department: "Sales",
    location: "Austin, US",
    lastActive: "—",
    joinedAt: "Invited 2d ago",
    twoFactor: false,
  },
  {
    id: "U-009",
    name: "Layla Haddad",
    email: "layla.haddad@heliospro.io",
    role: "Editor",
    status: "Active",
    department: "Support",
    location: "Amman, JO",
    lastActive: "4 hours ago",
    joinedAt: "Jul 18, 2022",
    twoFactor: true,
  },
  {
    id: "U-010",
    name: "Noah Bauer",
    email: "noah.bauer@heliospro.io",
    role: "Viewer",
    status: "Suspended",
    department: "Sales",
    location: "Munich, DE",
    lastActive: "1 week ago",
    joinedAt: "Sep 30, 2022",
    twoFactor: false,
  },
  {
    id: "U-011",
    name: "Ingrid Nilsson",
    email: "ingrid.nilsson@heliospro.io",
    role: "Manager",
    status: "Invited",
    department: "Operations",
    location: "Stockholm, SE",
    lastActive: "—",
    joinedAt: "Invited 5h ago",
    twoFactor: false,
  },
  {
    id: "U-012",
    name: "Rafael Costa",
    email: "rafael.costa@heliospro.io",
    role: "Editor",
    status: "Active",
    department: "Engineering",
    location: "São Paulo, BR",
    lastActive: "27 minutes ago",
    joinedAt: "Dec 12, 2022",
    twoFactor: true,
  },
];

export const teamStats = {
  total: teamMembers.length,
  active: teamMembers.filter((m) => m.status === "Active").length,
  invited: teamMembers.filter((m) => m.status === "Invited").length,
  twoFactor: teamMembers.filter((m) => m.twoFactor).length,
};

export const roleOptions: Role[] = ["Owner", "Admin", "Manager", "Editor", "Viewer", "Billing"];
