import BreadcrumbComp from "../breadcrumb/BreadcrumbComp";
import { ReactNode } from "react";

interface PageContainerProps {
  title: string;
  breadcrumb?: { to?: string; title: string }[];
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  maxWidth?: "default" | "wide" | "narrow";
}

const PageContainer = ({
  title,
  breadcrumb = [{ to: "/", title: "Home" }, { title }],
  description,
  actions,
  children,
  maxWidth = "default",
}: PageContainerProps) => {
  const widthClass =
    maxWidth === "wide"
      ? "max-w-[1600px]"
      : maxWidth === "narrow"
      ? "max-w-[960px]"
      : "";

  return (
    <>
      <BreadcrumbComp title={title} items={breadcrumb} />
      {(description || actions) && (
        <div
          className={`mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${widthClass}`}
        >
          {description && (
            <p className="text-sm text-link dark:text-darklink opacity-80 max-w-2xl">
              {description}
            </p>
          )}
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className={widthClass}>{children}</div>
    </>
  );
};

export default PageContainer;
