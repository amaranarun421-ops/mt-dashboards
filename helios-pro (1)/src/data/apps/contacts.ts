export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  location: string;
  tags: string[];
  lastContact: string;
  status: "active" | "lead" | "dormant";
  starred: boolean;
};

export const contacts: Contact[] = [
  { id: "c1", name: "Aarav Sharma", email: "aarav.sharma@heliospro.io", phone: "+1 415 555 0142", company: "Helios Pro", role: "Staff Engineer", location: "San Francisco, US", tags: ["engineering", "platform"], lastContact: "2 hours ago", status: "active", starred: true },
  { id: "c2", name: "Priya Patel", email: "priya.patel@heliospro.io", phone: "+1 415 555 0188", company: "Helios Pro", role: "VP Engineering", location: "San Francisco, US", tags: ["leadership", "engineering"], lastContact: "1 day ago", status: "active", starred: true },
  { id: "c3", name: "Daniel Chen", email: "daniel.chen@heliospro.io", phone: "+1 206 555 0119", company: "Helios Pro", role: "Security Lead", location: "Seattle, US", tags: ["security"], lastContact: "3 hours ago", status: "active", starred: false },
  { id: "c4", name: "Sofia Mendes", email: "sofia.mendes@heliospro.io", phone: "+351 21 555 0144", company: "Helios Pro", role: "Product Designer", location: "Lisbon, PT", tags: ["design"], lastContact: "Yesterday", status: "active", starred: true },
  { id: "c5", name: "Liam Walsh", email: "liam.walsh@heliospro.io", phone: "+44 20 7946 0991", company: "Helios Pro", role: "Data Analyst", location: "London, UK", tags: ["data", "analytics"], lastContact: "5 days ago", status: "active", starred: false },
  { id: "c6", name: "Yuki Tanaka", email: "yuki.tanaka@heliospro.io", phone: "+81 3 5555 0182", company: "Helios Pro", role: "Security Engineer", location: "Tokyo, JP", tags: ["security", "audit"], lastContact: "2 days ago", status: "active", starred: false },
  { id: "c7", name: "Emma Reyes", email: "emma.reyes@heliospro.io", phone: "+1 310 555 0166", company: "Helios Pro", role: "Marketing Manager", location: "Los Angeles, US", tags: ["marketing"], lastContact: "1 day ago", status: "active", starred: false },
  { id: "c8", name: "Marcus Bell", email: "marcus.bell@heliospro.io", phone: "+1 312 555 0173", company: "Helios Pro", role: "AI Platform Lead", location: "Chicago, US", tags: ["ai", "platform"], lastContact: "Yesterday", status: "active", starred: true },
  { id: "c9", name: "Layla Hassan", email: "layla.hassan@heliospro.io", phone: "+971 4 555 0128", company: "Helios Pro", role: "Support Engineer", location: "Dubai, AE", tags: ["support"], lastContact: "3 days ago", status: "active", starred: false },
  { id: "c10", name: "Noah Kim", email: "noah.kim@heliospro.io", phone: "+82 2 5555 0152", company: "Helios Pro", role: "People Operations", location: "Seoul, KR", tags: ["people"], lastContact: "1 week ago", status: "active", starred: false },
  { id: "c11", name: "Grace Okoro", email: "grace.okoro@northwind.io", phone: "+234 1 555 0193", company: "Northwind Labs", role: "CTO", location: "Lagos, NG", tags: ["customer", "enterprise"], lastContact: "4 days ago", status: "lead", starred: true },
  { id: "c12", name: "Henrik Vogel", email: "henrik.vogel@altavista.de", phone: "+49 30 5555 0148", company: "Altavista GmbH", role: "Head of IT", location: "Berlin, DE", tags: ["customer", "smb"], lastContact: "2 weeks ago", status: "lead", starred: false },
  { id: "c13", name: "Mei Lin", email: "mei.lin@brightwave.cn", company: "Brightwave", phone: "+86 21 5555 0381", role: "Procurement", location: "Shanghai, CN", tags: ["customer", "enterprise"], lastContact: "3 weeks ago", status: "dormant", starred: false },
  { id: "c14", name: "Rafael Costa", email: "rafael.costa@meridian.br", phone: "+55 11 5555 0177", company: "Meridian SA", role: "Founder", location: "São Paulo, BR", tags: ["customer", "startup"], lastContact: "1 month ago", status: "dormant", starred: false },
  { id: "c15", name: "Ingrid Solberg", email: "ingrid.solberg@fjordtech.no", phone: "+47 22 555 0123", company: "Fjord Tech", role: "VP Eng", location: "Oslo, NO", tags: ["customer", "enterprise"], lastContact: "Yesterday", status: "active", starred: true },
  { id: "c16", name: "Tobias Frank", email: "tobias.frank@quantix.co", phone: "+1 646 555 0149", company: "Quantix", role: "Engineering Manager", location: "New York, US", tags: ["customer", "smb"], lastContact: "6 days ago", status: "lead", starred: false },
];

export const contactFilters: { key: string; label: string; tone: "primary" | "accent" | "violet" | "info" | "neutral" | "success" | "danger" }[] = [
  { key: "active", label: "Active", tone: "primary" },
  { key: "lead", label: "Lead", tone: "accent" },
  { key: "dormant", label: "Dormant", tone: "neutral" },
  { key: "starred", label: "Starred", tone: "violet" },
];
