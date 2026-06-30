"use client";
import { useState } from "react";
import { PageHeader, Card, CardHeader, CardBody, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  HelpCircle,
  CreditCard,
  Shield,
  Truck,
  RefreshCw,
  Folder,
  FolderOpen,
  FileText,
  type LucideIcon,
} from "lucide-react";

type Item = {
  id: string;
  question: string;
  answer: string;
  icon?: LucideIcon;
};

const FAQ: Item[] = [
  {
    id: "q1",
    question: "What's included in the Pro plan?",
    answer:
      "The Pro plan includes 10 active projects, unlimited collaborators, advanced analytics, priority email support, and access to the full component library. You also get 100 GB of file storage.",
    icon: CreditCard,
  },
  {
    id: "q2",
    question: "How do I invite teammates?",
    answer:
      "Open your workspace settings, click Invite member, and enter their email. They'll receive an invitation valid for 7 days. You can assign Member, Admin, or Owner roles.",
    icon: Shield,
  },
  {
    id: "q3",
    question: "What is your refund policy?",
    answer:
      "We offer a 14-day money-back guarantee on all annual plans. If you're not satisfied, contact support within 14 days of purchase for a full refund.",
    icon: RefreshCw,
  },
  {
    id: "q4",
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to over 80 countries. International orders may take 5–14 business days depending on location and customs processing.",
    icon: Truck,
  },
];

const SHIPPING = [
  {
    id: "s1",
    question: "Standard shipping (3–5 days)",
    answer: "Free on orders over $50. Otherwise $5.95. Delivered Monday–Friday via national carriers.",
  },
  {
    id: "s2",
    question: "Express shipping (1–2 days)",
    answer: "$14.95. Order before 2 PM PST for same-day dispatch. Includes tracking and signature on delivery.",
  },
  {
    id: "s3",
    question: "International shipping",
    answer: "Calculated at checkout based on weight and destination. Customs fees may apply and are the recipient's responsibility.",
  },
  {
    id: "s4",
    question: "Pickup in store",
    answer: "Free. Ready in 2 hours. Bring your order confirmation and a valid ID to any of our 240 retail locations.",
  },
];

const NESTED = [
  {
    id: "n1",
    label: "Engineering (12)",
    children: [
      { id: "n1a", label: "Frontend", desc: "React, Next.js, Tailwind" },
      { id: "n1b", label: "Backend", desc: "Node, Go, Postgres" },
      { id: "n1c", label: "Infrastructure", desc: "AWS, Docker, K8s" },
    ],
  },
  {
    id: "n2",
    label: "Design (8)",
    children: [
      { id: "n2a", label: "Product design", desc: "Figma, prototyping" },
      { id: "n2b", label: "Brand", desc: "Identity, guidelines" },
    ],
  },
  {
    id: "n3",
    label: "Operations (5)",
    children: [
      { id: "n3a", label: "People", desc: "Hiring, onboarding" },
      { id: "n3b", label: "Finance", desc: "Accounting, payroll" },
      { id: "n3c", label: "Legal", desc: "Contracts, compliance" },
    ],
  },
];

function AccordionItem({
  item,
  open,
  onToggle,
  withArrow = true,
  showIcon = false,
}: {
  item: Item;
  open: boolean;
  onToggle: () => void;
  withArrow?: boolean;
  showIcon?: boolean;
}) {
  const Icon = item.icon;
  return (
    <div className={cn("rounded-xl border transition-colors", open ? "border-brand-200 dark:border-brand-700" : "border-gray-200 dark:border-gray-800")}>
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3 p-4 text-left"
        aria-expanded={open}
      >
        {showIcon && Icon && (
          <div className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
            open ? "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400" : "bg-gray-100 text-gray-500 dark:bg-gray-800"
          )}>
            <Icon className="h-4 w-4" />
          </div>
        )}
        <span className={cn(
          "flex-1 text-sm font-semibold",
          open ? "text-brand-700 dark:text-brand-300" : "text-gray-900 dark:text-white"
        )}>
          {item.question}
        </span>
        {withArrow && (
          <ChevronDown className={cn(
            "h-4 w-4 shrink-0 text-gray-400 transition-transform duration-300",
            open && "rotate-180 text-brand-500"
          )} />
        )}
      </button>
      <div className={cn(
        "grid transition-all duration-300 ease-out",
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      )}>
        <div className="overflow-hidden">
          <p className="px-4 pb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AccordionsPage() {
  const [single, setSingle] = useState<string | null>("q1");
  const [multiple, setMultiple] = useState<string[]>(["s1", "s3"]);
  const [nested, setNested] = useState<string[]>(["n1"]);
  const [nestedChild, setNestedChild] = useState<string[]>(["n1a"]);

  const toggleSingle = (id: string) => setSingle((cur) => (cur === id ? null : id));
  const toggleMultiple = (id: string) =>
    setMultiple((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  const toggleNested = (id: string) =>
    setNested((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  const toggleNestedChild = (id: string) =>
    setNestedChild((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  return (
    <div className="space-y-4">
      <PageHeader
        title="Accordions"
        description="Single-open, multiple-open, with icons, with arrow, and nested — all built inline with state."
        breadcrumbs={[{ label: "UI Components" }, { label: "Accordions" }]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Single open (FAQ) */}
        <Card>
          <CardHeader title="Single Open" description="Only one item open at a time — FAQ style" action={<Badge tone="brand" variant="soft">{single ? "1 open" : "All closed"}</Badge>} />
          <CardBody className="space-y-2">
            {FAQ.map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                open={single === item.id}
                onToggle={() => toggleSingle(item.id)}
                showIcon
              />
            ))}
          </CardBody>
        </Card>

        {/* Multiple open (shipping) */}
        <Card>
          <CardHeader title="Multiple Open" description="Open as many as you want at once" action={<Badge tone="purple" variant="soft">{multiple.length} open</Badge>} />
          <CardBody className="space-y-2">
            {SHIPPING.map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                open={multiple.includes(item.id)}
                onToggle={() => toggleMultiple(item.id)}
              />
            ))}
          </CardBody>
        </Card>

        {/* With icon */}
        <Card>
          <CardHeader title="With Icon" description="Leading icon in the header — switches color when open" />
          <CardBody className="space-y-2">
            {FAQ.map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                open={single === item.id}
                onToggle={() => toggleSingle(item.id)}
                showIcon
                withArrow={false}
              />
            ))}
          </CardBody>
        </Card>

        {/* With arrow */}
        <Card>
          <CardHeader title="With Arrow" description="Rotating chevron indicator on the right" />
          <CardBody className="space-y-2">
            {SHIPPING.map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                open={multiple.includes(item.id)}
                onToggle={() => toggleMultiple(item.id)}
                withArrow
              />
            ))}
          </CardBody>
        </Card>
      </div>

      {/* Nested accordion */}
      <Card>
        <CardHeader
          title="Nested Accordion"
          description="Departments expand to reveal teams — two levels deep"
          action={<Badge tone="orange" variant="soft">{nested.length + nestedChild.length} open</Badge>}
        />
        <CardBody>
          <div className="space-y-2">
            {NESTED.map((group) => {
              const open = nested.includes(group.id);
              return (
                <div key={group.id} className={cn("rounded-xl border transition-colors", open ? "border-brand-200 dark:border-brand-700" : "border-gray-200 dark:border-gray-800")}>
                  <button
                    onClick={() => toggleNested(group.id)}
                    className="flex w-full items-center gap-3 p-4 text-left"
                    aria-expanded={open}
                  >
                    {open ? (
                      <FolderOpen className="h-4 w-4 text-brand-500" />
                    ) : (
                      <Folder className="h-4 w-4 text-gray-400" />
                    )}
                    <span className={cn(
                      "flex-1 text-sm font-semibold",
                      open ? "text-brand-700 dark:text-brand-300" : "text-gray-900 dark:text-white"
                    )}>
                      {group.label}
                    </span>
                    <ChevronDown className={cn(
                      "h-4 w-4 text-gray-400 transition-transform duration-300",
                      open && "rotate-180 text-brand-500"
                    )} />
                  </button>
                  <div className={cn(
                    "grid transition-all duration-300 ease-out",
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}>
                    <div className="overflow-hidden">
                      <div className="space-y-1.5 px-4 pb-4 pl-11">
                        {group.children.map((child) => {
                          const childOpen = nestedChild.includes(child.id);
                          return (
                            <div key={child.id} className="rounded-lg border border-gray-100 dark:border-gray-800">
                              <button
                                onClick={() => toggleNestedChild(child.id)}
                                className="flex w-full items-center gap-3 p-3 text-left"
                                aria-expanded={childOpen}
                              >
                                <FileText className="h-3.5 w-3.5 text-gray-400" />
                                <span className={cn(
                                  "flex-1 text-sm font-medium",
                                  childOpen ? "text-brand-700 dark:text-brand-300" : "text-gray-700 dark:text-gray-300"
                                )}>
                                  {child.label}
                                </span>
                                <ChevronDown className={cn(
                                  "h-3.5 w-3.5 text-gray-400 transition-transform duration-300",
                                  childOpen && "rotate-180 text-brand-500"
                                )} />
                              </button>
                              <div className={cn(
                                "grid transition-all duration-300 ease-out",
                                childOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                              )}>
                                <div className="overflow-hidden">
                                  <p className="px-3 pb-3 pl-9 text-xs text-gray-500">{child.desc}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>

      {/* Plain list-style accordion */}
      <Card>
        <CardHeader title="Help Center Style" description="Borderless, minimal, with leading question icon" />
        <CardBody>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {FAQ.map((item) => {
              const open = single === item.id;
              return (
                <div key={item.id}>
                  <button
                    onClick={() => toggleSingle(item.id)}
                    className="flex w-full items-center gap-3 py-3 text-left"
                    aria-expanded={open}
                  >
                    <HelpCircle className={cn("h-4 w-4 shrink-0", open ? "text-brand-500" : "text-gray-400")} />
                    <span className={cn(
                      "flex-1 text-sm font-medium",
                      open ? "text-brand-700 dark:text-brand-300" : "text-gray-700 dark:text-gray-300"
                    )}>
                      {item.question}
                    </span>
                    <ChevronDown className={cn(
                      "h-4 w-4 shrink-0 text-gray-400 transition-transform duration-300",
                      open && "rotate-180 text-brand-500"
                    )} />
                  </button>
                  <div className={cn(
                    "grid transition-all duration-300 ease-out",
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}>
                    <div className="overflow-hidden">
                      <p className="pb-3 pl-7 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
