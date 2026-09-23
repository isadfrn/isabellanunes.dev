import type { CSSProperties, ReactNode } from "react";

export interface CardProps {
  revealDelay?: number;
  children: ReactNode;
}

export default function Card({ revealDelay = 0, children }: CardProps) {
  return (
    <div
      data-reveal
      style={{ "--reveal-delay": `${revealDelay}ms` } as CSSProperties}
      className="flex flex-col rounded-lg border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
    >
      {children}
    </div>
  );
}
