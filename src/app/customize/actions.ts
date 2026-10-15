"use server";

import { siteConfig } from "@/data/site";
import type { CustomizePayload } from "@/lib/customize";

export type CustomizeResult = {
  ok: boolean;
  message: string;
};

export async function submitCustomizeForm(
  data: CustomizePayload,
): Promise<CustomizeResult> {
  if (!data.name.trim() || !data.email.trim()) {
    return {
      ok: false,
      message: "Please add your name and email.",
    };
  }

  console.log("[Egypt Land Escapes customize request]", {
    ...data,
    receivedAt: new Date().toISOString(),
    to: siteConfig.contact.email,
  });

  return {
    ok: true,
    message:
      "Request received (demo mode). Continue on WhatsApp for the fastest written proposal.",
  };
}
