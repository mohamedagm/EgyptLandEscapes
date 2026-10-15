"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  morphId?: string;
};

export function MorphLink({ href, children, className, morphId }: Props) {
  const router = useRouter();

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => unknown;
    };

    if (typeof doc.startViewTransition !== "function") return;

    event.preventDefault();

    if (morphId) {
      document
        .querySelectorAll<HTMLElement>("[data-morph-active]")
        .forEach((node) => {
          node.style.viewTransitionName = "none";
          node.removeAttribute("data-morph-active");
        });
      const host = event.currentTarget.querySelector<HTMLElement>("[data-morph]");
      if (host) {
        host.style.viewTransitionName = morphId;
        host.setAttribute("data-morph-active", "true");
      }
    }

    doc.startViewTransition(() => {
      router.push(href);
    });
  };

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
