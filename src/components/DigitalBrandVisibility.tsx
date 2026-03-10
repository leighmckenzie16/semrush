"use client";

import { useState } from "react";
import Header from "@/components/Header";

// --- BRAND TOKENS ---
// Semrush palette
const C = {
  // Classic Search — blue
  classicColor: "#1570EF",
  classicBg: "#EFF6FF",
  classicBorder: "#B2DDFF",
  // AI Search — Semrush purple
  aiColor: "#8A38F5",
  aiBg: "#F3EBFF",
  aiBorder: "#C9A0FF",
  // Agentic Search — Semrush orange
  agenticColor: "#FF642D",
  agenticBg: "#FFF3EE",
  agenticBorder: "#FFBDAB",
  // Pillars
  brandColor: "#00B67A",
  brandBg: "#F0FDF9",
  brandBorder: "#6EE7C7",
  pmColor: "#FF642D",
  pmBg: "#FFF3EE",
  pmBorder: "#FFBDAB",
  aiSeoColor: "#8A38F5",
  aiSeoBg: "#F3EBFF",
  aiSeoBorder: "#C9A0FF",
  // Neutrals
  dark: "#191b23",
  textPrimary: "#191b23",
  textSecondary: "#575a6a",
  textMuted: "#8e919e",
  border: "#e2e4ea",
  borderLight: "#eef0f4",
  bgPrimary: "#f0f1f3",
  bgCard: "#ffffff",
};

// --- DATA ---
const aiSeoLenses = [
  {
    id: "classic",
    label: "Classic Search",
    color: C.classicColor,
    bg: C.classicBg,
    border: C.classicBorder,
    icon: "🔍",
    tagline: "Be found when people search",
    goal: "Rank in search engine results and drive click-through traffic to your properties",
    userBehavior: "Keyword and phrase-based queries typed into a search engine",
    platforms: ["Google", "Bing", "Yahoo", "YouTube", "Maps"],
    exampleQueries: ['"email marketing tools"', '"best CRM for small business"', '"how to fix a leaky faucet"'],
    metrics: ["Organic traffic & CTR", "Keyword rankings", "Domain authority"],
    keyFactors: ["Backlinks & domain authority", "On-page optimization", "Technical crawlability", "Content depth & topical authority"],
    maturity: "Established",
    era: "2000s – Present",
    humanRole: "Human searches, human clicks, human decides",
    acronyms: ["SEO"],
  },
  {
    id: "ai-search",
    label: "AI Search",
    color: C.aiColor,
    bg: C.aiBg,
    border: C.aiBorder,
    icon: "✨",
    tagline: "Be cited, quoted, and recommended by AI",
    goal: "Become a trusted source that AI platforms cite, reference, and synthesize into answers",
    userBehavior: "Conversational, context-rich questions directed at AI interfaces",
    platforms: ["ChatGPT", "Perplexity", "Google AI Mode", "AI Overviews", "Gemini", "Copilot", "Siri"],
    exampleQueries: ['"Which CRM is best for a 10-person startup?"', '"Compare Mailchimp vs ConvertKit for nonprofits"', '"Best waterproof jacket under $100?"'],
    metrics: ["Brand mention share in AI outputs", "Citation frequency & accuracy", "Answer selection rate"],
    keyFactors: ["Entity clarity & consistency", "Citation breadth & authority", "Structured data & schema", "Quotable passages & direct answers", "Brand sentiment across sources"],
    maturity: "Emerging",
    era: "2023 – Present",
    humanRole: "Human asks, AI synthesizes, human evaluates",
    acronyms: ["GEO", "AEO", "LLMO", "AIO"],
    subsumes: "Consolidates what the industry has fragmented into GEO (Generative Engine Optimization), AEO (Answer Engine Optimization), LLMO (Large Language Model Optimization), and AIO. Different acronyms, same core challenge: be visible and accurately represented when AI generates answers.",
  },
  {
    id: "agentic",
    label: "Agentic Search",
    color: C.agenticColor,
    bg: C.agenticBg,
    border: C.agenticBorder,
    icon: "🤖",
    tagline: "Be chosen and transacted with by AI agents",
    goal: "Be the source AI agents autonomously select, integrate with, and transact on behalf of users",
    userBehavior: "Task delegation to autonomous agents that research, compare, decide, and act",
    platforms: ["ChatGPT Actions", "Operator", "Perplexity Agents", "Browser agents", "Copilot", "Enterprise agents"],
    exampleQueries: ['"Book me a round trip to Lisbon under $700"', '"Find and buy the best-reviewed standing desk under $500"', '"Schedule demos with the top 3 PM tools for our team"'],
    metrics: ["Agent selection rate", "API call volume", "Agent-mediated transactions"],
    keyFactors: ["API accessibility & interoperability", "Machine-readable product data", "Trust signals & verification", "Transactable interfaces & pricing", "Reliable real-time data feeds"],
    maturity: "Nascent",
    era: "2025 – Future",
    humanRole: "Human delegates, agent acts, human reviews outcome",
    acronyms: ["Agentic EO"],
    distinction: "Related to AI Search but fundamentally different: AI Search still has a human evaluating the output. Agentic Search removes that step — the agent selects and acts autonomously. Your brand must be machine-trustworthy, not just machine-readable.",
  },
];

const pillars = [
  {
    id: "brand",
    label: "Brand",
    color: C.brandColor,
    bg: C.brandBg,
    border: C.brandBorder,
    icon: "🎯",
    desc: "How you're perceived across every touchpoint",
    responsibilities: ["Brand narrative & positioning", "Visual identity & voice consistency", "Reputation & sentiment management", "Thought leadership & PR"],
    aiConnection: "Brand signals directly influence how AI models represent you. Consistent narrative across sources = better AI understanding of who you are.",
  },
  {
    id: "product-marketing",
    label: "Product Marketing",
    color: C.pmColor,
    bg: C.pmBg,
    border: C.pmBorder,
    icon: "🚀",
    desc: "How your offering is positioned & communicated",
    responsibilities: ["Product positioning & messaging", "Competitive differentiation", "Sales enablement & collateral", "Launch strategy & GTM"],
    aiConnection: "Product data, comparisons, and messaging are what AI pulls into answers and recommendations. Clear differentiation = better AI representation.",
  },
  {
    id: "content",
    label: "Content",
    color: C.aiSeoColor,
    bg: C.aiSeoBg,
    border: C.aiSeoBorder,
    icon: "🧠",
    desc: "Optimizing discovery across search, LLMs, answer engines & agents",
    responsibilities: ["Classic search optimization", "AI search visibility (LLMs, answer engines)", "Agentic search readiness"],
    aiConnection: "The operational discipline that ensures brand and product signals are discoverable, structured, and actionable across every AI-powered surface.",
  },
];

const intersections = [
  {
    from: "brand",
    to: "content",
    insight: "Brand authority fuels AI citations. Content ensures brand narrative is consistently surfaced. Entity consistency across platforms is where these meet.",
  },
  {
    from: "product-marketing",
    to: "content",
    insight: "Product positioning shapes what content gets optimized. Structured product data enables agent transactions. Competitive messaging influences AI comparisons.",
  },
  {
    from: "brand",
    to: "product-marketing",
    insight: "Brand perception frames product reception. Product experience reinforces brand promise. Together they define how AI models understand your market position.",
  },
];

// --- SHARED STYLES ---
const pill = (bg: string, color: string): React.CSSProperties => ({
  display: "inline-block",
  fontSize: "0.65rem",
  fontWeight: 600,
  padding: "0.2rem 0.5rem",
  borderRadius: "9999px",
  backgroundColor: bg,
  color,
  marginRight: "0.25rem",
  marginBottom: "0.25rem",
});

const monoLabel: React.CSSProperties = {
  fontFamily: "ui-monospace, 'Fira Code', monospace",
  fontSize: "0.65rem",
  color: C.textMuted,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginBottom: "0.4rem",
  fontWeight: 600,
};

const card = (borderColor?: string): React.CSSProperties => ({
  background: C.bgCard,
  borderRadius: "0.75rem",
  border: `1px solid ${borderColor || C.border}`,
  padding: "1.25rem",
});

// --- FRAMEWORK TAB ---
const UmbrellaView = () => {
  const [activePillar, setActivePillar] = useState<string | null>(null);
  const active = pillars.find((p) => p.id === activePillar);

  return (
    <div>
      <div style={{ fontSize: "1.25rem", fontWeight: 800, color: C.textPrimary, marginBottom: "0.25rem" }}>The Framework</div>
      <div style={{ fontSize: "0.85rem", color: C.textSecondary, marginBottom: "1.5rem", lineHeight: 1.5 }}>
        Digital Brand Visibility is the umbrella. Three disciplines work together to ensure your brand is discoverable, understood, and actionable across every surface — human and AI.
      </div>

      {/* Umbrella visual */}
      <div style={{ background: C.dark, borderRadius: "1rem", padding: "2rem", marginBottom: "1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <div style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.15em", color: C.aiSeoBorder, marginBottom: "0.35rem" }}>Umbrella</div>
          <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "white" }}>Digital Brand Visibility</div>
          <div style={{ fontSize: "0.8rem", color: "#94A3B8", marginTop: "0.25rem" }}>Be discoverable, understood, and actionable — everywhere</div>
        </div>

        <div style={{ width: "2px", height: "1.5rem", background: "#334155", margin: "0 auto" }} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginTop: "0.75rem" }}>
          {pillars.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePillar(activePillar === p.id ? null : p.id)}
              style={{
                background: activePillar === p.id ? p.bg : "rgba(255,255,255,0.04)",
                border: `1.5px solid ${activePillar === p.id ? p.border : "rgba(255,255,255,0.1)"}`,
                borderRadius: "0.75rem",
                padding: "1.25rem 1rem",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.2s",
              }}
            >
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{p.icon}</div>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: activePillar === p.id ? p.color : "white", marginBottom: "0.2rem" }}>{p.label}</div>
              <div style={{ fontSize: "0.7rem", color: activePillar === p.id ? C.textSecondary : "#94A3B8", lineHeight: 1.4 }}>{p.desc}</div>
            </button>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "1rem" }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: "2px", height: "0.75rem", background: "#334155" }} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "0.25rem" }}>
          <span style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.6rem", color: "#94A3B8", letterSpacing: "0.1em" }}>INTERDEPENDENT · REINFORCING · ALIGNED</span>
        </div>
      </div>

      {/* Expanded pillar detail */}
      {active && (
        <div style={{ ...card(active.border), borderLeft: `3px solid ${active.color}`, marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "1.25rem" }}>{active.icon}</span>
            <span style={{ fontSize: "1rem", fontWeight: 700, color: active.color }}>{active.label}</span>
          </div>
          <div style={monoLabel}>Responsibilities</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1rem" }}>
            {active.responsibilities.map((r, i) => (
              <span key={i} style={pill(active.bg, active.color)}>{r}</span>
            ))}
          </div>
          <div style={monoLabel}>AI Connection</div>
          <div style={{ fontSize: "0.85rem", color: C.textSecondary, lineHeight: 1.5, background: active.bg, borderRadius: "0.5rem", padding: "0.75rem" }}>
            {active.aiConnection}
          </div>
        </div>
      )}

      {/* Intersections */}
      <div style={monoLabel}>Where Disciplines Intersect</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem" }}>
        {intersections.map((ix, i) => {
          const fromP = pillars.find((p) => p.id === ix.from)!;
          const toP = pillars.find((p) => p.id === ix.to)!;
          return (
            <div key={i} style={{ ...card(), background: C.bgPrimary }}>
              <div style={{ display: "flex", gap: "0.35rem", marginBottom: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                <span style={pill(fromP.bg, fromP.color)}>{fromP.label}</span>
                <span style={{ fontSize: "0.7rem", color: C.textMuted }}>×</span>
                <span style={pill(toP.bg, toP.color)}>{toP.label}</span>
              </div>
              <div style={{ fontSize: "0.8rem", color: C.textSecondary, lineHeight: 1.5 }}>{ix.insight}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- AI SEO TAB ---
const AISeoView = () => {
  const [activeLens, setActiveLens] = useState<string | null>(null);
  const active = aiSeoLenses.find((l) => l.id === activeLens);
  const actionWords = ["Rank", "Cite & Answer", "Act"];

  return (
    <div>
      <div style={{ fontSize: "1.25rem", fontWeight: 800, color: C.textPrimary, marginBottom: "0.25rem" }}>AI SEO: Three Lenses</div>
      <div style={{ fontSize: "0.85rem", color: C.textSecondary, marginBottom: "1.5rem", lineHeight: 1.5 }}>
        One discipline viewed through three lenses — each representing a fundamentally different way people and machines discover, evaluate, and interact with your brand.
      </div>

      {/* Three-lens selector */}
      <div style={{ background: C.bgCard, borderRadius: "1rem", border: `1px solid ${C.border}`, padding: "1.5rem", marginBottom: "1.5rem" }}>
        <div style={monoLabel}>The AI SEO Continuum</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
          {aiSeoLenses.map((d, i) => (
            <button
              key={d.id}
              onClick={() => setActiveLens(activeLens === d.id ? null : d.id)}
              style={{
                background: activeLens === d.id ? d.bg : C.bgCard,
                border: `2px solid ${activeLens === d.id ? d.color : d.border}`,
                borderRadius: "0.75rem",
                padding: "1.25rem 1rem",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.15s",
              }}
            >
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{d.icon}</div>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: d.color, marginBottom: "0.15rem" }}>{d.label}</div>
              <div style={{ fontSize: "0.7rem", color: C.textSecondary, lineHeight: 1.4 }}>{d.tagline}</div>
              <div style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.6rem", color: d.color, fontWeight: 700, marginTop: "0.5rem", letterSpacing: "0.05em" }}>{actionWords[i]}</div>
              <div style={{ display: "flex", justifyContent: "center", gap: "0.25rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
                {d.acronyms.map((a, j) => (
                  <span key={j} style={pill(d.bg, d.color)}>{a}</span>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Autonomy spectrum */}
        <div style={{ marginTop: "1.25rem", padding: "0.75rem 1rem", background: C.bgPrimary, borderRadius: "0.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
            <span style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.55rem", color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Human-Driven</span>
            <span style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.55rem", color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Machine-Autonomous</span>
          </div>
          <div style={{ height: "6px", borderRadius: "3px", background: `linear-gradient(to right, ${C.classicColor}, ${C.aiColor}, ${C.agenticColor})` }} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.35rem" }}>
            {aiSeoLenses.map((d) => (
              <span key={d.id} style={{ fontSize: "0.6rem", color: d.color, fontWeight: 600 }}>{d.label}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Expanded lens detail */}
      {active && (
        <div style={{ ...card(active.border), borderTop: `3px solid ${active.color}`, marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "1.25rem" }}>{active.icon}</span>
              <span style={{ fontSize: "1.1rem", fontWeight: 700, color: active.color }}>{active.label}</span>
              {active.acronyms.map((a, i) => <span key={i} style={pill(active.bg, active.color)}>{a}</span>)}
            </div>
            <div style={{ display: "flex", gap: "0.35rem" }}>
              <span style={pill(active.bg, active.color)}>{active.maturity}</span>
              <span style={pill(C.bgPrimary, C.textMuted)}>{active.era}</span>
            </div>
          </div>

          <div style={{ fontSize: "0.85rem", color: C.textSecondary, marginBottom: "0.75rem", lineHeight: 1.5 }}>{active.goal}</div>

          {"subsumes" in active && active.subsumes && (
            <div style={{ background: active.bg, borderRadius: "0.5rem", padding: "0.75rem", marginBottom: "1rem", borderLeft: `3px solid ${active.color}` }}>
              <div style={{ fontSize: "0.8rem", color: C.textSecondary, lineHeight: 1.5 }}>{active.subsumes}</div>
            </div>
          )}
          {"distinction" in active && active.distinction && (
            <div style={{ background: active.bg, borderRadius: "0.5rem", padding: "0.75rem", marginBottom: "1rem", borderLeft: `3px solid ${active.color}` }}>
              <div style={{ fontSize: "0.8rem", color: C.textSecondary, lineHeight: 1.5 }}>{active.distinction}</div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <div style={monoLabel}>Platforms</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
                {active.platforms.map((p, i) => <span key={i} style={pill(active.bg, active.color)}>{p}</span>)}
              </div>
            </div>
            <div>
              <div style={monoLabel}>User Behavior</div>
              <div style={{ fontSize: "0.8rem", color: C.textSecondary, lineHeight: 1.4 }}>{active.userBehavior}</div>
            </div>
            <div>
              <div style={monoLabel}>Success Metrics</div>
              {active.metrics.map((m, i) => (
                <div key={i} style={{ fontSize: "0.8rem", color: C.textSecondary, marginBottom: "0.15rem" }}>· {m}</div>
              ))}
            </div>
            <div>
              <div style={monoLabel}>Key Factors</div>
              {active.keyFactors.map((f, i) => (
                <div key={i} style={{ fontSize: "0.8rem", color: C.textSecondary, marginBottom: "0.15rem" }}>· {f}</div>
              ))}
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <div style={monoLabel}>Example Queries</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {active.exampleQueries.map((q, i) => (
                  <div key={i} style={{ fontSize: "0.75rem", fontStyle: "italic", color: C.textSecondary, background: C.bgPrimary, borderRadius: "0.5rem", padding: "0.4rem 0.75rem", border: `1px solid ${C.border}` }}>{q}</div>
                ))}
              </div>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <div style={monoLabel}>Human Role</div>
              <div style={{ fontSize: "0.85rem", fontWeight: 600, color: active.color }}>{active.humanRole}</div>
            </div>
          </div>
        </div>
      )}

      {/* Unifying message */}
      <div style={{ background: `linear-gradient(135deg, ${C.aiSeoBg}, ${C.agenticBg})`, borderRadius: "1rem", padding: "1.5rem", border: `1px solid ${C.border}`, textAlign: "center" }}>
        <div style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.15em", color: C.textMuted, marginBottom: "0.35rem" }}>One Discipline. Three Lenses.</div>
        <div style={{ fontSize: "1rem", fontWeight: 700, color: C.textPrimary }}>AI SEO = Classic Search + AI Search + Agentic Search</div>
        <div style={{ fontSize: "0.8rem", color: C.textSecondary, marginTop: "0.35rem", maxWidth: "36rem", margin: "0.35rem auto 0", lineHeight: 1.5 }}>
          Not competing acronyms. One evolving discipline that expands as AI moves from surfacing information to taking action.
        </div>
      </div>
    </div>
  );
};

// --- COMPARISON TAB ---
const ComparisonView = () => {
  const aspects = [
    { key: "goal", label: "Primary Goal" },
    { key: "humanRole", label: "Human Role" },
    { key: "exampleQueries", label: "Example Queries" },
    { key: "metrics", label: "Success Metrics" },
    { key: "keyFactors", label: "Key Factors" },
    { key: "platforms", label: "Platforms" },
    { key: "maturity", label: "Maturity" },
  ];

  return (
    <div>
      <div style={{ fontSize: "1.25rem", fontWeight: 800, color: C.textPrimary, marginBottom: "0.25rem" }}>Comparison</div>
      <div style={{ fontSize: "0.85rem", color: C.textSecondary, marginBottom: "1.5rem", lineHeight: 1.5 }}>How the three lenses of AI SEO differ across key dimensions.</div>
      <div style={{ overflowX: "auto", borderRadius: "0.75rem", border: `1px solid ${C.border}`, background: C.bgCard }}>
        <table style={{ width: "100%", fontSize: "0.8rem", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "0.75rem", background: C.bgPrimary, fontWeight: 600, color: C.textMuted, width: "9rem", position: "sticky", left: 0, zIndex: 5, fontSize: "0.75rem" }}>Aspect</th>
              {aiSeoLenses.map((d) => (
                <th key={d.id} style={{ padding: "0.75rem", textAlign: "center", fontWeight: 700, minWidth: "12rem", background: d.bg, color: d.color, borderBottom: `2px solid ${d.color}` }}>
                  <span style={{ marginRight: "0.25rem" }}>{d.icon}</span>{d.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {aspects.map((aspect, i) => (
              <tr key={aspect.key}>
                <td style={{ padding: "0.75rem", fontWeight: 600, color: C.textSecondary, fontSize: "0.75rem", background: i % 2 === 0 ? C.bgCard : C.bgPrimary, position: "sticky", left: 0, zIndex: 5, backgroundColor: i % 2 === 0 ? C.bgCard : C.bgPrimary }}>{aspect.label}</td>
                {aiSeoLenses.map((d) => (
                  <td key={d.id} style={{ padding: "0.75rem", color: C.textSecondary, background: i % 2 === 0 ? C.bgCard : C.bgPrimary, verticalAlign: "top" }}>
                    {Array.isArray((d as Record<string, unknown>)[aspect.key])
                      ? ((d as Record<string, unknown>)[aspect.key] as string[]).map((item, j) => (
                          <span key={j} style={{ ...pill(d.bg, d.color), display: "block", marginBottom: "0.2rem", textAlign: "left" }}>{item}</span>
                        ))
                      : <span style={{ fontSize: "0.8rem" }}>{String((d as Record<string, unknown>)[aspect.key])}</span>
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- STRATEGY TAB ---
const StrategyView = () => {
  const implications = [
    {
      icon: "🏛️",
      title: "Org Design Shifts",
      desc: "AI SEO can't live in a silo. It requires coordination with brand (narrative consistency), product marketing (structured data, positioning), and engineering (APIs, schema).",
    },
    {
      icon: "📊",
      title: "New KPI Stack",
      desc: "Traffic alone doesn't capture value. Add: brand mention share in AI outputs, citation accuracy, answer selection rates, and agent transaction volume.",
    },
    {
      icon: "🔗",
      title: "Content Becomes Infrastructure",
      desc: "Content must serve humans AND machines. Quotable passages for LLMs, structured data for answer engines, machine-readable APIs for agents — all from the same source of truth.",
    },
    {
      icon: "🧩",
      title: "Brand Is the Moat",
      desc: "When AI surfaces flatten the playing field, brand strength determines who gets cited, recommended, and transacted with. Brand investment compounds across every AI surface.",
    },
    {
      icon: "🚀",
      title: "Product Marketing Fuels AI Answers",
      desc: "Clear product positioning and competitive differentiation translate directly into how AI models compare and recommend. Ambiguous messaging = invisible in AI outputs.",
    },
    {
      icon: "🌐",
      title: "Multi-Surface Research",
      desc: "Monitor visibility across Google, ChatGPT, Perplexity, Copilot, and agent ecosystems simultaneously. Different surfaces, one integrated strategy.",
    },
  ];

  return (
    <div>
      <div style={{ fontSize: "1.25rem", fontWeight: 800, color: C.textPrimary, marginBottom: "0.25rem" }}>Strategy Implications</div>
      <div style={{ fontSize: "0.85rem", color: C.textSecondary, marginBottom: "1.5rem", lineHeight: 1.5 }}>What this framework means for how teams organize, measure, and invest.</div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0.75rem", marginBottom: "2rem" }}>
        {implications.map((item, i) => (
          <div key={i} style={card()}>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <div style={{ fontSize: "1.35rem", flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontWeight: 700, color: C.textPrimary, marginBottom: "0.25rem", fontSize: "0.9rem" }}>{item.title}</div>
                <div style={{ fontSize: "0.8rem", color: C.textSecondary, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom summary */}
      <div style={{ background: C.dark, borderRadius: "1rem", padding: "2rem", color: "white" }}>
        <div style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.15em", color: C.aiSeoBorder, marginBottom: "0.5rem" }}>The Model</div>
        <div style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: "0.75rem" }}>Digital Brand Visibility</div>
        <div style={{ fontSize: "0.85rem", color: "#94A3B8", lineHeight: 1.6, marginBottom: "1.5rem", maxWidth: "36rem" }}>
          Three disciplines — Brand, Product Marketing, and AI SEO — working in concert to ensure your organization is discoverable, understood, and actionable across every human and AI-powered surface.
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
          {pillars.map((p) => (
            <div key={p.id} style={{ textAlign: "center", padding: "1rem", borderRadius: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: "1.25rem", marginBottom: "0.35rem" }}>{p.icon}</div>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: p.border }}>{p.label}</div>
              {p.id === "content" && (
                <div style={{ display: "flex", justifyContent: "center", gap: "0.35rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
                  {aiSeoLenses.map((d) => (
                    <span key={d.id} style={{ fontSize: "0.55rem", fontWeight: 600, padding: "0.15rem 0.4rem", borderRadius: "9999px", background: "rgba(255,255,255,0.08)", color: d.border }}>{d.label}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- MAIN ---
const tabs = [
  { id: "framework", label: "Framework" },
  { id: "ai-seo", label: "AI SEO Breakdown" },
  { id: "comparison", label: "Comparison" },
  { id: "strategy", label: "Strategy" },
];

export default function DigitalBrandVisibility() {
  const [activeTab, setActiveTab] = useState("framework");

  return (
    <div style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: C.bgPrimary, minHeight: "100vh", color: C.textPrimary }}>
      <Header />

      {/* Page header */}
      <div style={{ background: C.dark, color: "white", padding: "2.5rem 2rem 2rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        {/* Purple glow */}
        <div style={{ position: "absolute", top: "-4rem", right: "-4rem", width: "20rem", height: "20rem", borderRadius: "50%", background: "radial-gradient(circle, rgba(138,56,245,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "72rem", margin: "0 auto" }}>
          <div style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.15em", color: C.aiSeoBorder, marginBottom: "0.5rem" }}>Strategic Framework</div>
          <div style={{ fontSize: "1.75rem", fontWeight: 800, lineHeight: 1.15, marginBottom: "0.5rem" }}>Digital Brand Visibility</div>
          <div style={{ fontSize: "0.9rem", color: "#94A3B8", maxWidth: "40rem", lineHeight: 1.5 }}>
            Brand, Product Marketing, and AI SEO as interconnected disciplines — ensuring your organization is discoverable, understood, and actionable across every AI-powered surface.
          </div>
        </div>
      </div>

      {/* Tab nav */}
      <div style={{ background: C.bgCard, borderBottom: `1px solid ${C.borderLight}`, position: "sticky", top: 0, zIndex: 50, overflowX: "auto" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", display: "flex", gap: "0.25rem", padding: "0.75rem 2rem" }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.8rem",
              fontWeight: activeTab === t.id ? 700 : 500,
              color: activeTab === t.id ? C.aiColor : C.textMuted,
              background: activeTab === t.id ? C.aiSeoBg : "transparent",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.15s",
            }}
          >
            {t.label}
          </button>
        ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "2rem" }}>
        {activeTab === "framework" && <UmbrellaView />}
        {activeTab === "ai-seo" && <AISeoView />}
        {activeTab === "comparison" && <ComparisonView />}
        {activeTab === "strategy" && <StrategyView />}
      </div>

      <div style={{ borderTop: `1px solid ${C.borderLight}`, background: C.bgCard, padding: "0.75rem 2rem", textAlign: "center" }}>
        <span style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.6rem", color: C.textMuted }}>Digital Brand Visibility Framework · Brand + Product Marketing + AI SEO (Classic · AI · Agentic)</span>
      </div>
    </div>
  );
}
