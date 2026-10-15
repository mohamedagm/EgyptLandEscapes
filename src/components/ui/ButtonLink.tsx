"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/effects/Magnetic";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
  magnetic?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external,
  magnetic = variant === "primary",
}: ButtonProps) {
  const styles = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition duration-300",
    variant === "primary" &&
      "bg-nile text-white shadow-[0_12px_30px_var(--glow)] hover:bg-nile-deep",
    variant === "secondary" && "bg-shade text-paper hover:opacity-90",
    variant === "ghost" && "btn-ghost",
    className,
  );

  const node = external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles}>
      {children}
    </a>
  ) : (
    <Link href={href} className={styles}>
      {children}
    </Link>
  );

  if (!magnetic) return node;
  return <Magnetic strength={14}>{node}</Magnetic>;
}
