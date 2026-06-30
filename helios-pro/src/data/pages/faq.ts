export type FaqCategory =
  | "Getting Started"
  | "Billing"
  | "Security"
  | "Integrations"
  | "API";

export type FaqItem = {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
};

export const faqCategories: FaqCategory[] = [
  "Getting Started",
  "Billing",
  "Security",
  "Integrations",
  "API",
];

export const faqItems: FaqItem[] = [
  {
    id: "gs-1",
    category: "Getting Started",
    question: "What is Helios Pro and who is it for?",
    answer:
      "Helios Pro is a premium Next.js 16 admin dashboard UI kit built with TypeScript, Tailwind CSS v4, and a refined emerald + amber design system. It ships with 100+ pages, advanced data tables, charts, apps, ecommerce, auth, and error screens. It is built for product teams, agencies and solo founders who want a polished production-grade starting point.",
  },
  {
    id: "gs-2",
    category: "Getting Started",
    question: "How do I install and run the kit locally?",
    answer:
      "Clone the repository, run `bun install` to fetch dependencies, then `bun run dev` to start the development server on port 3000. The kit ships in demo mode — no database or auth provider is required to explore the UI. Connect Prisma and NextAuth later when you are ready to ship.",
  },
  {
    id: "gs-3",
    category: "Getting Started",
    question: "Which Node.js and bun versions are required?",
    answer:
      "Node.js 20+ and bun 1.1+ are recommended. The kit has been tested against Node 20 LTS and bun 1.1.29. Earlier versions may work but are not officially supported.",
  },
  {
    id: "gs-4",
    category: "Getting Started",
    question: "Can I customise the theme and brand colours?",
    answer:
      "Yes. Every color is exposed as a CSS custom property in `src/css/style.css` under the `@theme` block. Update `--color-primary`, `--color-accent` and the neutrals to match your brand. The Theme Customizer (top right) also lets you live-preview palettes and density modes.",
  },
  {
    id: "bl-1",
    category: "Billing",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards (Visa, Mastercard, AMEX, Discover) through Stripe. For Enterprise plans we also support wire transfer, ACH and invoiced billing with NET-30 terms.",
  },
  {
    id: "bl-2",
    category: "Billing",
    question: "Can I switch between monthly and yearly billing?",
    answer:
      "Yes — at any time. Upgrading to yearly applies a 20% discount and immediately credits the unused balance from your current monthly cycle toward the next renewal. Downgrading from yearly to monthly takes effect at the next renewal date.",
  },
  {
    id: "bl-3",
    category: "Billing",
    question: "What is your refund policy?",
    answer:
      "We offer a no-questions-asked 14-day refund window from the date of purchase. Contact billing@heliospro.io with your invoice number and we will process the refund within 2 business days.",
  },
  {
    id: "bl-4",
    category: "Billing",
    question: "Do you offer discounts for startups or non-profits?",
    answer:
      "Yes. Eligible early-stage startups (< $1M ARR, < 2 years old) and registered non-profits get 40% off any plan for the first 12 months. Email us with your proof of status to claim the discount.",
  },
  {
    id: "se-1",
    category: "Security",
    question: "How is my data encrypted?",
    answer:
      "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Database snapshots, backups and object storage all inherit the same encryption envelope. Customer-managed encryption keys are available on the Enterprise plan.",
  },
  {
    id: "se-2",
    category: "Security",
    question: "Are you SOC 2 Type II compliant?",
    answer:
      "Yes — Helios Pro is SOC 2 Type II certified. Our annual audit covers Security, Availability and Confidentiality. The latest report is available under NDA on request from security@heliospro.io.",
  },
  {
    id: "se-3",
    category: "Security",
    question: "Do you support single sign-on (SSO) and SCIM?",
    answer:
      "SAML 2.0 SSO with Okta, Azure AD, Google Workspace and OneLogin is included on the Pro and Enterprise plans. SCIM 2.0 user provisioning and de-provisioning is Enterprise-only.",
  },
  {
    id: "se-4",
    category: "Security",
    question: "Where are your data centers located?",
    answer:
      "We run on AWS in `us-east-1`, `eu-west-1` (Ireland) and `ap-southeast-1` (Singapore). Enterprise customers can pin their primary region and choose EU-only or US-only data residency.",
  },
  {
    id: "in-1",
    category: "Integrations",
    question: "Which integrations ship out of the box?",
    answer:
      "Helios Pro includes first-party integrations for Stripe, Shopify, HubSpot, Salesforce, Slack, Notion, GitHub, Linear, Postgres, BigQuery, Snowflake and Segment. Each connector is bi-directional and supports webhooks.",
  },
  {
    id: "in-2",
    category: "Integrations",
    question: "Can I build my own custom integration?",
    answer:
      "Absolutely. Use the typed SDK (`@heliospro/sdk`) to register custom connectors that conform to the `Connector` interface. Custom connectors can be private to your workspace or published to the marketplace for other teams to install.",
  },
  {
    id: "in-3",
    category: "Integrations",
    question: "How often do integrations sync data?",
    answer:
      "Most integrations sync every 15 minutes by default. Realtime connectors (Stripe webhooks, Segment, Postgres CDC) sync within 5 seconds. You can adjust the cadence per connector from the integrations settings page.",
  },
  {
    id: "ap-1",
    category: "API",
    question: "Is there a public REST and GraphQL API?",
    answer:
      "Yes. Every action you can take in the UI is also available through the REST API (`/api/v1/...`) and the GraphQL endpoint (`/api/graphql`). Both use the same OAuth2 access tokens and rate limits.",
  },
  {
    id: "ap-2",
    category: "API",
    question: "What are the API rate limits?",
    answer:
      "The default limit is 600 requests per minute per workspace, with a 2x burst for up to 10 seconds. Pro plans get 2,000 RPM, Enterprise plans get 10,000 RPM and dedicated capacity. Limits are returned in the `X-RateLimit-*` headers on every response.",
  },
  {
    id: "ap-3",
    category: "API",
    question: "How do I generate an API key?",
    answer:
      "Open Settings > API Keys > New key. Keys are scoped to a workspace and can be limited to read-only, read-write or admin scopes. Keys are shown only once at creation time — store them securely.",
  },
  {
    id: "ap-4",
    category: "API",
    question: "Do you have official SDKs?",
    answer:
      "Yes — official SDKs are available for TypeScript/JavaScript, Python, Go and Ruby. Community SDKs for PHP, Rust and Java are linked from the docs. All SDKs are MIT-licensed and open source on GitHub.",
  },
];
