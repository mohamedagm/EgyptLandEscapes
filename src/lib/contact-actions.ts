"use server";

import { Resend } from "resend";
import { siteConfig } from "@/data/site";

export type ContactResult = {
  ok: boolean;
  message: string;
};

export async function submitContactForm(
  formData: FormData,
): Promise<ContactResult> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !subject || !message) {
    return {
      ok: false,
      message: "Please complete the required fields.",
    };
  }

  const payload = {
    name,
    email,
    phone,
    subject,
    message,
    receivedAt: new Date().toISOString(),
  };

  console.log("[Egypt Land Escapes enquiry]", payload);

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || siteConfig.contact.email;
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ||
    "Egypt Land Escapes <onboarding@resend.dev>";

  if (!apiKey) {
    return {
      ok: true,
      message:
        "Thanks — enquiry logged in demo mode. Add RESEND_API_KEY to send real email, or continue on WhatsApp for a faster reply.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `[ELE Enquiry] ${subject}`,
      text: [
        `New enquiry from ${siteConfig.name}`,
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone / WhatsApp: ${phone || "—"}`,
        `Subject: ${subject}`,
        "",
        message,
        "",
        `Received: ${payload.receivedAt}`,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact email error]", error);
      return {
        ok: false,
        message:
          "We could not send the email right now. Please try WhatsApp or email us directly.",
      };
    }

    return {
      ok: true,
      message:
        "Thanks — your message was emailed to our team. For a faster reply, you can also continue on WhatsApp.",
    };
  } catch (error) {
    console.error("[contact email exception]", error);
    return {
      ok: false,
      message:
        "Something went wrong sending your message. Please try WhatsApp instead.",
    };
  }
}
