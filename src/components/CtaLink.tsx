import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import type { ReactNode } from "react";

export interface CtaLinkProps {
  href: string;
  variant?: "solid" | "outline";
  rel?: string;
  className?: string;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<NonNullable<CtaLinkProps["variant"]>, string> = {
  solid: "bg-primary-500 text-white hover:bg-primary-600",
  outline:
    "border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700",
};

export default function CtaLink({
  href,
  variant = "solid",
  rel = "noopener noreferrer",
  className = "",
  children,
}: CtaLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel={rel}
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors duration-150 ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {children}
      <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
    </a>
  );
}
