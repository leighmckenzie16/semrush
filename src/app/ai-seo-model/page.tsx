import type { Metadata } from "next";
import AISEOModel from "@/components/AISEOModel";

export const metadata: Metadata = {
  title: "The AI SEO Operating Model | Semrush",
  description:
    "A sequential process flowing from strategic definition to asset creation to multi-channel distribution — the complete AI SEO operating model.",
};

export default function AISEOModelPage() {
  return <AISEOModel />;
}
