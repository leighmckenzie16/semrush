import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
      <Header />

      <main className="flex-1 flex items-start justify-center pt-16 pb-20 px-6">
        <div className="w-full max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4 leading-[1.1]">
            Semrush Pages
          </h1>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-10">
            Select a page below.
          </p>

          <div className="space-y-4">
            <Link
              href="/semrush-wizard"
              className="block rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] p-6 transition-colors"
            >
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                Semrush Wizard
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                Find the right Semrush setup for your business — Semrush One or Enterprise.
              </p>
            </Link>

            <Link
              href="/industry/ecommerce"
              className="block rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] p-6 transition-colors"
            >
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                Industry: Ecommerce
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                How Semrush helps ecommerce teams dominate search across the entire buyer journey.
              </p>
            </Link>

            <Link
              href="/operating-system"
              className="block rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] p-6 transition-colors"
            >
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                The AI Search Operating System
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                The complete playbook for winning visibility in AI search — 20+ guides, templates, and frameworks.
              </p>
            </Link>

            <Link
              href="/ai-seo-model"
              className="block rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] p-6 transition-colors"
            >
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                The AI SEO Operating Model
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                A sequential process flowing from strategic definition to asset creation to multi-channel distribution.
              </p>
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-[var(--border-light)] py-5">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs text-[var(--text-muted)]">
          Powered by Semrush
        </div>
      </footer>
    </div>
  );
}
