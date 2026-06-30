export type Employee = {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Manager" | "Editor" | "Viewer" | "Guest";
  department: "Engineering" | "Design" | "Product" | "Marketing" | "Sales" | "Support" | "Finance" | "Operations";
  status: "Active" | "Invited" | "Suspended";
  salary: number;
  joinedAt: string; // ISO date
  country: string;
  projects: number;
};

export const employees: Employee[] = [
  { id: "EMP-001", name: "Aarav Sharma", email: "aarav.sharma@heliospro.io", role: "Owner", department: "Operations", status: "Active", salary: 240000, joinedAt: "2019-03-12", country: "India", projects: 18 },
  { id: "EMP-002", name: "Priya Nair", email: "priya.nair@heliospro.io", role: "Admin", department: "Engineering", status: "Active", salary: 182000, joinedAt: "2020-06-02", country: "India", projects: 12 },
  { id: "EMP-003", name: "Daniel Carter", email: "daniel.carter@heliospro.io", role: "Manager", department: "Product", status: "Active", salary: 156000, joinedAt: "2020-09-21", country: "United States", projects: 9 },
  { id: "EMP-004", name: "Sofia Rossi", email: "sofia.rossi@heliospro.io", role: "Manager", department: "Design", status: "Active", salary: 148000, joinedAt: "2021-01-14", country: "Italy", projects: 7 },
  { id: "EMP-005", name: "Liam O'Brien", email: "liam.obrien@heliospro.io", role: "Editor", department: "Marketing", status: "Active", salary: 92000, joinedAt: "2021-04-08", country: "Ireland", projects: 5 },
  { id: "EMP-006", name: "Yuki Tanaka", email: "yuki.tanaka@heliospro.io", role: "Editor", department: "Engineering", status: "Active", salary: 134000, joinedAt: "2021-07-19", country: "Japan", projects: 8 },
  { id: "EMP-007", name: "Emma Müller", email: "emma.muller@heliospro.io", role: "Manager", department: "Sales", status: "Active", salary: 142000, joinedAt: "2021-10-30", country: "Germany", projects: 11 },
  { id: "EMP-008", name: "Marcus Lee", email: "marcus.lee@heliospro.io", role: "Editor", department: "Support", status: "Active", salary: 78000, joinedAt: "2022-02-11", country: "Singapore", projects: 4 },
  { id: "EMP-009", name: "Layla Haddad", email: "layla.haddad@heliospro.io", role: "Editor", department: "Finance", status: "Active", salary: 118000, joinedAt: "2022-05-22", country: "UAE", projects: 6 },
  { id: "EMP-010", name: "Noah Becker", email: "noah.becker@heliospro.io", role: "Viewer", department: "Operations", status: "Invited", salary: 64000, joinedAt: "2023-01-09", country: "Germany", projects: 2 },
  { id: "EMP-011", name: "Grace Bennett", email: "grace.bennett@heliospro.io", role: "Manager", department: "Product", status: "Active", salary: 139000, joinedAt: "2022-08-15", country: "United Kingdom", projects: 9 },
  { id: "EMP-012", name: "Henrik Larsen", email: "henrik.larsen@heliospro.io", role: "Editor", department: "Engineering", status: "Active", salary: 124000, joinedAt: "2022-11-04", country: "Denmark", projects: 7 },
  { id: "EMP-013", name: "Mei Chen", email: "mei.chen@heliospro.io", role: "Admin", department: "Design", status: "Active", salary: 165000, joinedAt: "2021-12-19", country: "China", projects: 10 },
  { id: "EMP-014", name: "Rafael Costa", email: "rafael.costa@heliospro.io", role: "Editor", department: "Marketing", status: "Suspended", salary: 88000, joinedAt: "2022-03-28", country: "Brazil", projects: 3 },
  { id: "EMP-015", name: "Ingrid Nilsen", email: "ingrid.nilsen@heliospro.io", role: "Editor", department: "Sales", status: "Active", salary: 96000, joinedAt: "2022-06-17", country: "Norway", projects: 5 },
  { id: "EMP-016", name: "Tobias Frank", email: "tobias.frank@heliospro.io", role: "Viewer", department: "Support", status: "Invited", salary: 58000, joinedAt: "2023-04-26", country: "Austria", projects: 1 },
  { id: "EMP-017", name: "Amara Okafor", email: "amara.okafor@heliospro.io", role: "Editor", department: "Operations", status: "Active", salary: 102000, joinedAt: "2022-09-12", country: "Nigeria", projects: 6 },
  { id: "EMP-018", name: "Mateo Garcia", email: "mateo.garcia@heliospro.io", role: "Editor", department: "Engineering", status: "Active", salary: 115000, joinedAt: "2023-02-03", country: "Spain", projects: 5 },
  { id: "EMP-019", name: "Hana Park", email: "hana.park@heliospro.io", role: "Manager", department: "Design", status: "Active", salary: 133000, joinedAt: "2022-12-09", country: "South Korea", projects: 8 },
  { id: "EMP-020", name: "Olivia Adams", email: "olivia.adams@heliospro.io", role: "Editor", department: "Product", status: "Active", salary: 121000, joinedAt: "2023-05-18", country: "Canada", projects: 6 },
  { id: "EMP-021", name: "Ravi Patel", email: "ravi.patel@heliospro.io", role: "Editor", department: "Engineering", status: "Active", salary: 128000, joinedAt: "2023-07-24", country: "India", projects: 7 },
  { id: "EMP-022", name: "Chloe Martin", email: "chloe.martin@heliospro.io", role: "Viewer", department: "Marketing", status: "Invited", salary: 62000, joinedAt: "2024-01-15", country: "France", projects: 2 },
  { id: "EMP-023", name: "Ethan Wright", email: "ethan.wright@heliospro.io", role: "Editor", department: "Sales", status: "Active", salary: 98000, joinedAt: "2023-09-06", country: "Australia", projects: 5 },
  { id: "EMP-024", name: "Zara Khan", email: "zara.khan@heliospro.io", role: "Editor", department: "Finance", status: "Active", salary: 109000, joinedAt: "2023-11-22", country: "Pakistan", projects: 4 },
  { id: "EMP-025", name: "Leo Schmidt", email: "leo.schmidt@heliospro.io", role: "Viewer", department: "Operations", status: "Suspended", salary: 71000, joinedAt: "2024-02-10", country: "Switzerland", projects: 1 },
  { id: "EMP-026", name: "Nadia Ivanova", email: "nadia.ivanova@heliospro.io", role: "Editor", department: "Support", status: "Active", salary: 84000, joinedAt: "2023-12-14", country: "Russia", projects: 3 },
  { id: "EMP-027", name: "Omar Hassan", email: "omar.hassan@heliospro.io", role: "Manager", department: "Engineering", status: "Active", salary: 145000, joinedAt: "2022-04-29", country: "Egypt", projects: 9 },
  { id: "EMP-028", name: "Isabela Souza", email: "isabela.souza@heliospro.io", role: "Editor", department: "Design", status: "Active", salary: 94000, joinedAt: "2023-08-19", country: "Brazil", projects: 6 },
];

export const departments = [
  "Engineering", "Design", "Product", "Marketing", "Sales", "Support", "Finance", "Operations",
] as const;
export const roles = ["Owner", "Admin", "Manager", "Editor", "Viewer", "Guest"] as const;
