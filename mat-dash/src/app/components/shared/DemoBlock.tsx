"use client";
import { ReactNode } from "react";

interface DemoBlockProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

const DemoBlock = ({
  title,
  description,
  children,
  className = "",
}: DemoBlockProps) => {
  return (
    <div className={`rounded-xl bg-background border border-defaultBorder p-6 transition-shadow hover:shadow-md ${className}`}>
      {title && (
        <div className="mb-4 pb-3 border-b border-defaultBorder">
          <h5 className="card-title">{title}</h5>
          {description && (
            <p className="text-xs text-link dark:text-darklink opacity-70 mt-1.5 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

interface VariantRowProps {
  label: string;
  children: ReactNode;
}

const VariantRow = ({ label, children }: VariantRowProps) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-3 py-3 border-b border-defaultBorder last:border-b-0">
    <div className="sm:w-40 text-sm text-link dark:text-darklink opacity-80 shrink-0 font-medium">
      {label}
    </div>
    <div className="flex flex-wrap items-center gap-3">{children}</div>
  </div>
);

interface PropTableProps {
  rows: { prop: string; type: string; default?: string; description: string }[];
}

const PropTable = ({ rows }: PropTableProps) => (
  <div className="overflow-x-auto mt-2 rounded-lg border border-defaultBorder">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-lightgray dark:bg-dark border-b border-defaultBorder text-left">
          <th className="py-2.5 px-4 font-semibold">Prop</th>
          <th className="py-2.5 px-4 font-semibold">Type</th>
          <th className="py-2.5 px-4 font-semibold">Default</th>
          <th className="py-2.5 px-4 font-semibold">Description</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.prop} className="border-b border-defaultBorder last:border-b-0 hover:bg-lightgray/50 dark:hover:bg-dark/40 transition-colors">
            <td className="py-2.5 px-4 font-mono text-primary text-xs">{r.prop}</td>
            <td className="py-2.5 px-4 font-mono text-xs opacity-80">{r.type}</td>
            <td className="py-2.5 px-4 font-mono text-xs opacity-60">{r.default ?? "—"}</td>
            <td className="py-2.5 px-4 opacity-80">{r.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export { DemoBlock, VariantRow, PropTable };
