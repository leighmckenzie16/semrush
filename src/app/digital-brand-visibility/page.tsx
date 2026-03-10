import type { Metadata } from "next";
import DigitalBrandVisibility from "@/components/DigitalBrandVisibility";

export const metadata: Metadata = {
  title: "Digital Brand Visibility Framework | Semrush",
  description:
    "Brand, Product Marketing, and AI SEO as interconnected disciplines — ensuring your organization is discoverable, understood, and actionable across every AI-powered surface.",
};

export default function DigitalBrandVisibilityPage() {
  return <DigitalBrandVisibility />;
}
