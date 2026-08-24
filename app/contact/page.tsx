import type { Metadata } from "next";
import { ContactPage } from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact — Shanesia Saha",
  description:
    "Get in touch with Shanesia Saha for communications strategy, digital marketing, content development, and project coordination inquiries.",
};

export default function Page() {
  return <ContactPage />;
}
