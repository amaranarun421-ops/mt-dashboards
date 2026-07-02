import type {
  Deal, Lead, Account, Contact, SalesRep, PipelineStage, Activity, DealStage,
} from "@/types";

// ============ Sales Reps ============
export const salesReps: SalesRep[] = [
  { id: "rep-1", name: "Maya Okafor", email: "maya.okafor@nexuspro.app", initials: "MO", team: "Enterprise", region: "EMEA", quota: 2_500_000, attained: 2_180_000, deals: 14, winRate: 0.68, pipeline: 980_000, attainmentRate: 0.872 },
  { id: "rep-2", name: "Daniel Sørensen", email: "daniel.sorensen@nexuspro.app", initials: "DS", team: "Enterprise", region: "Nordics", quota: 2_500_000, attained: 2_612_000, deals: 18, winRate: 0.74, pipeline: 1_120_000, attainmentRate: 1.045 },
  { id: "rep-3", name: "Priya Venkataraman", email: "priya.v@nexuspro.app", initials: "PV", team: "Mid-Market", region: "APAC", quota: 1_800_000, attained: 1_540_000, deals: 22, winRate: 0.61, pipeline: 720_000, attainmentRate: 0.856 },
  { id: "rep-4", name: "Lucas Andrade", email: "lucas.andrade@nexuspro.app", initials: "LA", team: "Mid-Market", region: "LATAM", quota: 1_800_000, attained: 1_902_000, deals: 16, winRate: 0.72, pipeline: 640_000, attainmentRate: 1.057 },
  { id: "rep-5", name: "Hannah Whitfield", email: "hannah.w@nexuspro.app", initials: "HW", team: "SMB", region: "NA-East", quota: 1_200_000, attained: 1_044_000, deals: 31, winRate: 0.55, pipeline: 410_000, attainmentRate: 0.870 },
  { id: "rep-6", name: "Tobias Krüger", email: "tobias.kruger@nexuspro.app", initials: "TK", team: "SMB", region: "DACH", quota: 1_200_000, attained: 1_298_000, deals: 28, winRate: 0.66, pipeline: 380_000, attainmentRate: 1.082 },
  { id: "rep-7", name: "Sofia Castellano", email: "sofia.c@nexuspro.app", initials: "SC", team: "Enterprise", region: "NA-West", quota: 2_500_000, attained: 1_980_000, deals: 12, winRate: 0.70, pipeline: 1_240_000, attainmentRate: 0.792 },
  { id: "rep-8", name: "Rashid Al-Mansouri", email: "rashid.am@nexuspro.app", initials: "RA", team: "Mid-Market", region: "MEA", quota: 1_800_000, attained: 1_650_000, deals: 19, winRate: 0.63, pipeline: 580_000, attainmentRate: 0.917 },
];

// ============ Accounts ============
export const accounts: Account[] = [
  { id: "acc-1", name: "Helix BioSciences", industry: "Biotech", website: "helixbio.com", employees: 1240, annualRevenue: 280_000_000, tier: "enterprise", region: "NA-East", owner: "Maya Okafor", openDeals: 3, totalPipeline: 420_000, lastActivity: "2026-06-28T14:30:00Z", health: "green" },
  { id: "acc-2", name: "Northwind Logistics", industry: "Supply Chain", website: "northwind.io", employees: 880, annualRevenue: 142_000_000, tier: "enterprise", region: "EMEA", owner: "Daniel Sørensen", openDeals: 2, totalPipeline: 285_000, lastActivity: "2026-06-29T09:15:00Z", health: "yellow" },
  { id: "acc-3", name: "Aurora Mobility", industry: "Automotive", website: "auroramobility.com", employees: 540, annualRevenue: 86_000_000, tier: "mid-market", region: "Nordics", owner: "Daniel Sørensen", openDeals: 4, totalPipeline: 178_000, lastActivity: "2026-06-27T16:45:00Z", health: "green" },
  { id: "acc-4", name: "Lumen Health Group", industry: "Healthcare", website: "lumenhealth.com", employees: 2200, annualRevenue: 410_000_000, tier: "enterprise", region: "NA-West", owner: "Sofia Castellano", openDeals: 1, totalPipeline: 612_000, lastActivity: "2026-06-30T11:00:00Z", health: "green" },
  { id: "acc-5", name: "Cobalt Studios", industry: "Media", website: "cobaltstudios.tv", employees: 180, annualRevenue: 24_000_000, tier: "mid-market", region: "NA-East", owner: "Hannah Whitfield", openDeals: 2, totalPipeline: 96_000, lastActivity: "2026-06-26T19:20:00Z", health: "red" },
  { id: "acc-6", name: "Meridian Capital", industry: "Finance", website: "meridiancap.com", employees: 740, annualRevenue: 198_000_000, tier: "enterprise", region: "NA-East", owner: "Maya Okafor", openDeals: 2, totalPipeline: 240_000, lastActivity: "2026-06-29T13:45:00Z", health: "yellow" },
  { id: "acc-7", name: "Tessellate AI", industry: "AI / ML", website: "tessellate.ai", employees: 95, annualRevenue: 18_000_000, tier: "mid-market", region: "NA-West", owner: "Sofia Castellano", openDeals: 3, totalPipeline: 156_000, lastActivity: "2026-06-30T08:30:00Z", health: "green" },
  { id: "acc-8", name: "Pampas Foods", industry: "Food & Bev", website: "pampasfoods.com", employees: 1600, annualRevenue: 320_000_000, tier: "enterprise", region: "LATAM", owner: "Lucas Andrade", openDeals: 1, totalPipeline: 195_000, lastActivity: "2026-06-25T17:00:00Z", health: "yellow" },
  { id: "acc-9", name: "Indus Textiles", industry: "Manufacturing", website: "industextiles.com", employees: 420, annualRevenue: 58_000_000, tier: "mid-market", region: "APAC", owner: "Priya Venkataraman", openDeals: 2, totalPipeline: 132_000, lastActivity: "2026-06-28T10:15:00Z", health: "green" },
  { id: "acc-10", name: "Vertex Robotics", industry: "Robotics", website: "vertexrobotics.com", employees: 320, annualRevenue: 72_000_000, tier: "mid-market", region: "DACH", owner: "Tobias Krüger", openDeals: 2, totalPipeline: 168_000, lastActivity: "2026-06-29T15:30:00Z", health: "green" },
  { id: "acc-11", name: "Sahara Cloud", industry: "Cloud Infra", website: "saharacloud.io", employees: 210, annualRevenue: 36_000_000, tier: "mid-market", region: "MEA", owner: "Rashid Al-Mansouri", openDeals: 3, totalPipeline: 204_000, lastActivity: "2026-06-30T07:45:00Z", health: "green" },
  { id: "acc-12", name: "BlueArc Energy", industry: "Cleantech", website: "bluearc.energy", employees: 680, annualRevenue: 124_000_000, tier: "enterprise", region: "NA-West", owner: "Sofia Castellano", openDeals: 1, totalPipeline: 312_000, lastActivity: "2026-06-24T12:00:00Z", health: "yellow" },
];

// ============ Contacts ============
export const contacts: Contact[] = [
  { id: "ct-1", name: "Eleanor Reyes", email: "e.reyes@helixbio.com", phone: "+1 415 555 0132", title: "VP Operations", accountId: "acc-1", accountName: "Helix BioSciences", owner: "Maya Okafor", lastContacted: "2026-06-28T14:30:00Z" },
  { id: "ct-2", name: "Marcus Vetter", email: "m.vetter@northwind.io", phone: "+44 20 7946 0982", title: "Director of IT", accountId: "acc-2", accountName: "Northwind Logistics", owner: "Daniel Sørensen", lastContacted: "2026-06-29T09:15:00Z" },
  { id: "ct-3", name: "Linnea Holm", email: "l.holm@auroramobility.com", phone: "+46 8 555 01234", title: "CTO", accountId: "acc-3", accountName: "Aurora Mobility", owner: "Daniel Sørensen", lastContacted: "2026-06-27T16:45:00Z" },
  { id: "ct-4", name: "Dr. Jamal Whitaker", email: "j.whitaker@lumenhealth.com", phone: "+1 310 555 0178", title: "Chief Medical Officer", accountId: "acc-4", accountName: "Lumen Health Group", owner: "Sofia Castellano", lastContacted: "2026-06-30T11:00:00Z" },
  { id: "ct-5", name: "Yuki Tanaka", email: "yuki@cobaltstudios.tv", phone: "+1 212 555 0190", title: "Head of Production", accountId: "acc-5", accountName: "Cobalt Studios", owner: "Hannah Whitfield", lastContacted: "2026-06-26T19:20:00Z" },
  { id: "ct-6", name: "Anika Patel", email: "a.patel@meridiancap.com", phone: "+1 646 555 0145", title: "VP Risk", accountId: "acc-6", accountName: "Meridian Capital", owner: "Maya Okafor", lastContacted: "2026-06-29T13:45:00Z" },
  { id: "ct-7", name: "Wen Li", email: "wen@tessellate.ai", phone: "+1 415 555 0188", title: "Founder / CEO", accountId: "acc-7", accountName: "Tessellate AI", owner: "Sofia Castellano", lastContacted: "2026-06-30T08:30:00Z" },
  { id: "ct-8", name: "Camila Restrepo", email: "c.restrepo@pampasfoods.com", phone: "+57 1 555 0167", title: "Supply Chain Director", accountId: "acc-8", accountName: "Pampas Foods", owner: "Lucas Andrade", lastContacted: "2026-06-25T17:00:00Z" },
  { id: "ct-9", name: "Arjun Mehta", email: "a.mehta@industextiles.com", phone: "+91 80 555 0123", title: "COO", accountId: "acc-9", accountName: "Indus Textiles", owner: "Priya Venkataraman", lastContacted: "2026-06-28T10:15:00Z" },
  { id: "ct-10", name: "Klaus Becker", email: "k.becker@vertexrobotics.com", phone: "+49 89 555 0156", title: "VP Engineering", accountId: "acc-10", accountName: "Vertex Robotics", owner: "Tobias Krüger", lastContacted: "2026-06-29T15:30:00Z" },
];

// ============ Pipeline Stages ============
export const pipelineStages: PipelineStage[] = [
  { id: "prospecting", label: "Prospecting", count: 42, value: 1_840_000, weightedValue: 276_000, conversionRate: 0.15, avgDaysInStage: 9 },
  { id: "qualification", label: "Qualification", count: 28, value: 1_520_000, weightedValue: 380_000, conversionRate: 0.25, avgDaysInStage: 14 },
  { id: "proposal", label: "Proposal", count: 18, value: 1_240_000, weightedValue: 496_000, conversionRate: 0.40, avgDaysInStage: 21 },
  { id: "negotiation", label: "Negotiation", count: 11, value: 980_000, weightedValue: 588_000, conversionRate: 0.60, avgDaysInStage: 28 },
  { id: "closed-won", label: "Closed Won", count: 19, value: 1_412_000, weightedValue: 1_412_000, conversionRate: 1.00, avgDaysInStage: 0 },
  { id: "closed-lost", label: "Closed Lost", count: 7, value: 460_000, weightedValue: 0, conversionRate: 0.00, avgDaysInStage: 0 },
];

// ============ Deals ============
const dealStages: DealStage[] = ["prospecting", "qualification", "proposal", "negotiation"];
export const deals: Deal[] = [
  { id: "deal-1", title: "Helix BioSciences — Annual Platform License", account: "Helix BioSciences", contact: "Eleanor Reyes", owner: "Maya Okafor", value: 240_000, weightedValue: 144_000, stage: "proposal", probability: 0.6, expectedClose: "2026-07-18", created: "2026-05-12", age: 49, riskScore: 22, nextStep: "Send revised MSA with redlines", competitors: ["Vertex CRM", "Insiot"] },
  { id: "deal-2", title: "Northwind — Fleet Intelligence Add-On", account: "Northwind Logistics", contact: "Marcus Vetter", owner: "Daniel Sørensen", value: 168_000, weightedValue: 33_600, stage: "prospecting", probability: 0.2, expectedClose: "2026-08-30", created: "2026-06-04", age: 27, riskScore: 48, nextStep: "Discovery call with ops team" },
  { id: "deal-3", title: "Aurora Mobility — Connected Vehicle Suite", account: "Aurora Mobility", contact: "Linnea Holm", owner: "Daniel Sørensen", value: 96_000, weightedValue: 57_600, stage: "negotiation", probability: 0.6, expectedClose: "2026-07-08", created: "2026-04-22", age: 70, riskScore: 14, nextStep: "Final pricing review with CFO" },
  { id: "deal-4", title: "Lumen Health — Multi-Site Deployment", account: "Lumen Health Group", contact: "Dr. Jamal Whitaker", owner: "Sofia Castellano", value: 612_000, weightedValue: 367_200, stage: "proposal", probability: 0.6, expectedClose: "2026-08-15", created: "2026-05-30", age: 32, riskScore: 31, nextStep: "Schedule security review" },
  { id: "deal-5", title: "Cobalt Studios — Render Pipeline", account: "Cobalt Studios", contact: "Yuki Tanaka", owner: "Hannah Whitfield", value: 78_000, weightedValue: 15_600, stage: "qualification", probability: 0.2, expectedClose: "2026-09-12", created: "2026-06-18", age: 13, riskScore: 68, nextStep: "Confirm budget timing" },
  { id: "deal-6", title: "Meridian — Risk Analytics Module", account: "Meridian Capital", contact: "Anika Patel", owner: "Maya Okafor", value: 188_000, weightedValue: 75_200, stage: "qualification", probability: 0.4, expectedClose: "2026-08-22", created: "2026-06-10", age: 21, riskScore: 38, nextStep: "Compliance questionnaire" },
  { id: "deal-7", title: "Tessellate AI — Inference Platform", account: "Tessellate AI", contact: "Wen Li", owner: "Sofia Castellano", value: 124_000, weightedValue: 74_400, stage: "negotiation", probability: 0.6, expectedClose: "2026-07-05", created: "2026-05-02", age: 60, riskScore: 9, nextStep: "Sign this week — final review" },
  { id: "deal-8", title: "Pampas Foods — Distribution Suite", account: "Pampas Foods", contact: "Camila Restrepo", owner: "Lucas Andrade", value: 195_000, weightedValue: 39_000, stage: "prospecting", probability: 0.2, expectedClose: "2026-09-30", created: "2026-06-22", age: 9, riskScore: 52, nextStep: "Schedule plant visit" },
  { id: "deal-9", title: "Indus Textiles — Production Tracking", account: "Indus Textiles", contact: "Arjun Mehta", owner: "Priya Venkataraman", value: 92_000, weightedValue: 55_200, stage: "proposal", probability: 0.6, expectedClose: "2026-07-25", created: "2026-05-18", age: 44, riskScore: 27, nextStep: "Send trial access" },
  { id: "deal-10", title: "Vertex Robotics — Control Suite", account: "Vertex Robotics", contact: "Klaus Becker", owner: "Tobias Krüger", value: 132_000, weightedValue: 79_200, stage: "negotiation", probability: 0.6, expectedClose: "2026-07-12", created: "2026-04-30", age: 62, riskScore: 18, nextStep: "Legal review — final comments" },
  { id: "deal-11", title: "Sahara Cloud — Infrastructure Tier", account: "Sahara Cloud", contact: "Hassan Karimi", owner: "Rashid Al-Mansouri", value: 156_000, weightedValue: 93_600, stage: "proposal", probability: 0.6, expectedClose: "2026-07-20", created: "2026-05-22", age: 40, riskScore: 24, nextStep: "Demo to leadership" },
  { id: "deal-12", title: "BlueArc — Grid Analytics", account: "BlueArc Energy", contact: "Olivia Park", owner: "Sofia Castellano", value: 312_000, weightedValue: 62_400, stage: "qualification", probability: 0.2, expectedClose: "2026-10-15", created: "2026-06-08", age: 23, riskScore: 44, nextStep: "Technical workshop" },
  { id: "deal-13", title: "Helix BioSciences — Lab Module Add-On", account: "Helix BioSciences", contact: "Eleanor Reyes", owner: "Maya Okafor", value: 84_000, weightedValue: 50_400, stage: "negotiation", probability: 0.6, expectedClose: "2026-07-10", created: "2026-05-09", age: 53, riskScore: 16, nextStep: "Confirm scope with lab director" },
  { id: "deal-14", title: "Lumen Health — Patient Portal Expansion", account: "Lumen Health Group", contact: "Dr. Jamal Whitaker", owner: "Sofia Castellano", value: 218_000, weightedValue: 130_800, stage: "proposal", probability: 0.6, expectedClose: "2026-08-28", created: "2026-06-01", age: 30, riskScore: 29, nextStep: "Pilot results review" },
  { id: "deal-15", title: "Meridian — Portfolio Dashboard", account: "Meridian Capital", contact: "Anika Patel", owner: "Maya Okafor", value: 72_000, weightedValue: 21_600, stage: "prospecting", probability: 0.3, expectedClose: "2026-09-05", created: "2026-06-25", age: 6, riskScore: 41, nextStep: "Intro to portfolio team" },
  { id: "deal-16", title: "Tessellate AI — Training Pipeline", account: "Tessellate AI", contact: "Wen Li", owner: "Sofia Castellano", value: 88_000, weightedValue: 52_800, stage: "proposal", probability: 0.6, expectedClose: "2026-07-22", created: "2026-05-15", age: 47, riskScore: 19, nextStep: "Custom integration scoping" },
  { id: "deal-17", title: "Pampas Foods — Cold Chain Add-On", account: "Pampas Foods", contact: "Camila Restrepo", owner: "Lucas Andrade", value: 64_000, weightedValue: 19_200, stage: "qualification", probability: 0.3, expectedClose: "2026-09-20", created: "2026-06-15", age: 16, riskScore: 56, nextStep: "ROI workshop" },
  { id: "deal-18", title: "Vertex Robotics — Vision Module", account: "Vertex Robotics", contact: "Klaus Becker", owner: "Tobias Krüger", value: 96_000, weightedValue: 57_600, stage: "proposal", probability: 0.6, expectedClose: "2026-07-30", created: "2026-05-25", age: 37, riskScore: 23, nextStep: "Field test scheduling" },
];

// ============ Leads ============
export const leads: Lead[] = [
  { id: "lead-1", name: "Ravi Subramanian", company: "Indus Textiles", email: "ravi.s@industextiles.com", phone: "+91 80 555 0190", source: "inbound", status: "qualified", score: 82, owner: "Priya Venkataraman", created: "2026-06-12", lastActivity: "2026-06-28", estimatedValue: 92_000 },
  { id: "lead-2", name: "Greta Lindqvist", company: "Aurora Mobility", email: "greta@auroramobility.com", phone: "+46 8 555 0144", source: "referral", status: "contacted", score: 71, owner: "Daniel Sørensen", created: "2026-06-15", lastActivity: "2026-06-29", estimatedValue: 48_000 },
  { id: "lead-3", name: "Diego Fernández", company: "Pampas Foods", email: "d.fernandez@pampasfoods.com", phone: "+57 1 555 0188", source: "outbound", status: "new", score: 54, owner: "Lucas Andrade", created: "2026-06-26", lastActivity: "2026-06-26", estimatedValue: 64_000 },
  { id: "lead-4", name: "Aisha Mensah", company: "Sahara Cloud", email: "aisha@saharacloud.io", phone: "+971 4 555 0167", source: "event", status: "qualified", score: 88, owner: "Rashid Al-Mansouri", created: "2026-06-08", lastActivity: "2026-06-30", estimatedValue: 156_000 },
  { id: "lead-5", name: "Henrik Olsen", company: "Northwind Logistics", email: "h.olsen@northwind.io", phone: "+45 33 555 0123", source: "inbound", status: "contacted", score: 64, owner: "Daniel Sørensen", created: "2026-06-20", lastActivity: "2026-06-27", estimatedValue: 168_000 },
  { id: "lead-6", name: "Mei-Ling Chen", company: "Tessellate AI", email: "meiling@tessellate.ai", phone: "+1 415 555 0192", source: "partner", status: "qualified", score: 91, owner: "Sofia Castellano", created: "2026-06-05", lastActivity: "2026-06-30", estimatedValue: 124_000 },
  { id: "lead-7", name: "Olivia Park", company: "BlueArc Energy", email: "o.park@bluearc.energy", phone: "+1 503 555 0177", source: "outbound", status: "new", score: 47, owner: "Sofia Castellano", created: "2026-06-28", lastActivity: "2026-06-28", estimatedValue: 312_000 },
  { id: "lead-8", name: "Felix Brunner", company: "Vertex Robotics", email: "f.brunner@vertexrobotics.com", phone: "+41 44 555 0156", source: "inbound", status: "contacted", score: 76, owner: "Tobias Krüger", created: "2026-06-14", lastActivity: "2026-06-29", estimatedValue: 132_000 },
  { id: "lead-9", name: "Naomi Adeyemi", company: "Lumen Health Group", email: "n.adeyemi@lumenhealth.com", phone: "+1 310 555 0144", source: "referral", status: "qualified", score: 84, owner: "Sofia Castellano", created: "2026-06-11", lastActivity: "2026-06-30", estimatedValue: 218_000 },
  { id: "lead-10", name: "Theo Lambert", company: "Cobalt Studios", email: "t.lambert@cobaltstudios.tv", phone: "+1 212 555 0133", source: "event", status: "new", score: 38, owner: "Hannah Whitfield", created: "2026-06-24", lastActivity: "2026-06-24", estimatedValue: 78_000 },
  { id: "lead-11", name: "Hassan Karimi", company: "Sahara Cloud", email: "hassan@saharacloud.io", phone: "+971 4 555 0188", source: "inbound", status: "qualified", score: 79, owner: "Rashid Al-Mansouri", created: "2026-06-10", lastActivity: "2026-06-29", estimatedValue: 96_000 },
  { id: "lead-12", name: "Eleanor Reyes", company: "Helix BioSciences", email: "e.reyes@helixbio.com", phone: "+1 415 555 0132", source: "referral", status: "converted", score: 95, owner: "Maya Okafor", created: "2026-05-12", lastActivity: "2026-06-28", estimatedValue: 240_000 },
  { id: "lead-13", name: "Marcus Vetter", company: "Northwind Logistics", email: "m.vetter@northwind.io", phone: "+44 20 7946 0982", source: "outbound", status: "unqualified", score: 22, owner: "Daniel Sørensen", created: "2026-05-20", lastActivity: "2026-06-15", estimatedValue: 0 },
  { id: "lead-14", name: "Anika Patel", company: "Meridian Capital", email: "a.patel@meridiancap.com", phone: "+1 646 555 0145", source: "inbound", status: "qualified", score: 86, owner: "Maya Okafor", created: "2026-06-09", lastActivity: "2026-06-29", estimatedValue: 188_000 },
];

// ============ Activities ============
export const activities: Activity[] = [
  { id: "act-1", type: "call", title: "Discovery call with Eleanor Reyes", description: "30-min call covering platform capabilities and pilot scope for Helix BioSciences.", actor: "Maya Okafor", relatedTo: "deal-1", timestamp: "2026-06-28T14:30:00Z", outcome: "positive" },
  { id: "act-2", type: "email", title: "Sent revised MSA redlines", description: "Forwarded legal-reviewed MSA to Helix BioSciences legal team. Awaiting response within 48h.", actor: "Maya Okafor", relatedTo: "deal-1", timestamp: "2026-06-27T11:00:00Z", outcome: "neutral" },
  { id: "act-3", type: "meeting", title: "Technical workshop — Tessellate AI", description: "Deep dive on inference platform integration. Wen Li confirmed buy-in from engineering.", actor: "Sofia Castellano", relatedTo: "deal-7", timestamp: "2026-06-30T08:30:00Z", outcome: "positive" },
  { id: "act-4", type: "task", title: "Prepare pilot results deck for Lumen", description: "Compile pilot metrics for Patient Portal Expansion presentation.", actor: "Sofia Castellano", relatedTo: "deal-14", timestamp: "2026-06-29T16:00:00Z", outcome: "neutral" },
  { id: "act-5", type: "note", title: "Competitor mentioned: Vertex CRM", description: "Marcus Vetter mentioned Vertex CRM is also being evaluated. Need to schedule ROI demo.", actor: "Daniel Sørensen", relatedTo: "deal-2", timestamp: "2026-06-29T09:15:00Z", outcome: "negative" },
  { id: "act-6", type: "deal", title: "Deal moved to Negotiation", description: "Aurora Mobility — Connected Vehicle Suite moved from Proposal to Negotiation.", actor: "Daniel Sørensen", relatedTo: "deal-3", timestamp: "2026-06-27T16:45:00Z", outcome: "positive" },
  { id: "act-7", type: "call", title: "Check-in call with Klaus Becker", description: "Vertex Robotics legal team has 3 final comments on the contract.", actor: "Tobias Krüger", relatedTo: "deal-10", timestamp: "2026-06-29T15:30:00Z", outcome: "positive" },
  { id: "act-8", type: "email", title: "Sent compliance questionnaire to Meridian", description: "Forwarded SOC2 + HIPAA questionnaire to Anika Patel for Risk Analytics Module.", actor: "Maya Okafor", relatedTo: "deal-6", timestamp: "2026-06-28T10:00:00Z", outcome: "neutral" },
  { id: "act-9", type: "meeting", title: "CFO pricing review — Aurora Mobility", description: "Linnea Holm and CFO approved final pricing. Verbal commit received.", actor: "Daniel Sørensen", relatedTo: "deal-3", timestamp: "2026-06-26T13:00:00Z", outcome: "positive" },
  { id: "act-10", type: "task", title: "Schedule plant visit — Pampas Foods", description: "Coordinate with Camila Restrepo for on-site discovery at Bogotá facility.", actor: "Lucas Andrade", relatedTo: "deal-8", timestamp: "2026-06-25T17:00:00Z", outcome: "neutral" },
];

// ============ Sales Overview (KPIs + time series) ============
export const salesOverview = {
  kpis: {
    pipelineValue: 6_580_000,
    pipelineValueDelta: 0.124,
    weightedForecast: 2_786_400,
    weightedForecastDelta: 0.087,
    closedWonMTD: 1_412_000,
    closedWonMTDDelta: 0.182,
    quotaAttainment: 0.902,
    quotaAttainmentDelta: 0.045,
    avgDealSize: 88_250,
    avgDealSizeDelta: 0.063,
    salesVelocity: 42_180,
    salesVelocityDelta: 0.094,
    winRate: 0.631,
    winRateDelta: 0.024,
    dealAging: 38,
    dealAgingDelta: -0.067,
  },
  // Monthly closed-won vs forecast vs quota, last 12 months
  monthly: [
    { name: "Jul", closedWon: 920_000, forecast: 1_050_000, quota: 1_080_000 },
    { name: "Aug", closedWon: 1_080_000, forecast: 1_120_000, quota: 1_080_000 },
    { name: "Sep", closedWon: 1_240_000, forecast: 1_180_000, quota: 1_200_000 },
    { name: "Oct", closedWon: 1_060_000, forecast: 1_240_000, quota: 1_200_000 },
    { name: "Nov", closedWon: 1_380_000, forecast: 1_320_000, quota: 1_320_000 },
    { name: "Dec", closedWon: 1_540_000, forecast: 1_420_000, quota: 1_440_000 },
    { name: "Jan", closedWon: 1_180_000, forecast: 1_280_000, quota: 1_320_000 },
    { name: "Feb", closedWon: 1_320_000, forecast: 1_340_000, quota: 1_320_000 },
    { name: "Mar", closedWon: 1_460_000, forecast: 1_380_000, quota: 1_440_000 },
    { name: "Apr", closedWon: 1_220_000, forecast: 1_420_000, quota: 1_440_000 },
    { name: "May", closedWon: 1_540_000, forecast: 1_460_000, quota: 1_560_000 },
    { name: "Jun", closedWon: 1_412_000, forecast: 1_520_000, quota: 1_560_000 },
  ] as Array<{ name: string; closedWon: number; forecast: number; quota: number }>,
  // Stage conversion funnel
  funnel: pipelineStages.map((s) => ({
    stage: s.label,
    value: s.value,
    count: s.count,
    conversionRate: s.conversionRate,
  })),
  // Win/loss reasons (last 90d)
  winLossReasons: [
    { reason: "Product fit", won: 18, lost: 2 },
    { reason: "Price", won: 6, lost: 9 },
    { reason: "Timing", won: 4, lost: 5 },
    { reason: "Competitor", won: 1, lost: 6 },
    { reason: "No decision", won: 0, lost: 4 },
    { reason: "Champion left", won: 0, lost: 3 },
  ],
  // Lead source attribution
  leadSources: [
    { source: "Inbound", value: 1_240_000, count: 42 },
    { source: "Outbound", value: 980_000, count: 28 },
    { source: "Referral", value: 720_000, count: 18 },
    { source: "Event", value: 420_000, count: 12 },
    { source: "Partner", value: 360_000, count: 9 },
  ],
  // Territory performance
  territories: [
    { name: "NA-East", pipeline: 1_280_000, closed: 1_080_000, attainment: 0.91 },
    { name: "NA-West", pipeline: 1_540_000, closed: 1_320_000, attainment: 0.94 },
    { name: "EMEA", pipeline: 1_120_000, closed: 920_000, attainment: 0.82 },
    { name: "Nordics", pipeline: 640_000, closed: 720_000, attainment: 1.06 },
    { name: "DACH", pipeline: 580_000, closed: 640_000, attainment: 1.08 },
    { name: "APAC", pipeline: 720_000, closed: 540_000, attainment: 0.86 },
    { name: "LATAM", pipeline: 380_000, closed: 460_000, attainment: 1.05 },
    { name: "MEA", pipeline: 320_000, closed: 280_000, attainment: 0.92 },
  ],
};
