"use client";

import { useState } from "react";
import Header from "@/components/Header";
import "./aiseo-styles.css";

const PHASES = [
  {
    id: "foundation",
    phase: "Phase 1",
    title: "The Foundation",
    owner: "Brand / PMM",
    objective: "Define what the business is — the foundational entity set for the LLM.",
    task: "Narrative & Entity Definition",
    output: "Canonical Entity Brief",
    description:
      "The prerequisite for all other work. The output is not a campaign, but a canonical Entity Brief that defines the brand and its offerings with absolute clarity.",
    entityBrief: {
      sections: [
        {
          num: "01",
          title: "Core Brand Identity",
          desc: "The LLM-ready canonical description — a single, precise sentence defining what the brand is. This is what PR pitches, SEO encodes in schema, and Content reinforces everywhere.",
          example:
            '"Semrush is an online visibility management SaaS platform that enables businesses to run SEO, content marketing, competitor research, advertising, and social media campaigns."',
        },
        {
          num: "02",
          title: "Brand Narrative & Positioning",
          desc: "The 'why we exist' story and key pillars all messaging ladders up to.",
          pillars: [
            "All-in-One Platform",
            "Data-Driven Insights",
            "Actionable & Accessible",
            "AI-Powered Intelligence",
          ],
        },
        {
          num: "03",
          title: "Target Audience Personas",
          desc: "Defines problems the brand solves in human language — how people describe needs to AI assistants.",
          personas: [
            "In-House Marketing Manager (SMB)",
            "SEO/Marketing Specialist (Enterprise)",
            "Agency Professional",
          ],
        },
        {
          num: "04",
          title: "Core Product Entities",
          desc: "The canonical product taxonomy. Used by SEO for schema, Content for topic clusters, PR for product mentions.",
        },
        {
          num: "05",
          title: "Key Concepts & Associations",
          desc: "Terms that should consistently co-occur with the brand. LLMs build knowledge graphs from repeated concept associations across authoritative sources.",
        },
        {
          num: "06",
          title: "Competitive Positioning",
          desc: 'How to talk about the category and competition. LLMs constantly get asked "what\'s the best alternative to X" — your positioning must be consistent and widely distributed.',
        },
      ],
    },
  },
  {
    id: "engine",
    phase: "Phase 2",
    title: "The Content Engine",
    owner: "Content Team",
    objective:
      "Produce the tangible content that will be distributed — blog posts, videos, webinar decks, sales materials.",
    task: "Multi-channel Asset Creation",
    output: "Content Asset Library",
    description:
      "The central production hub. Takes the Entity Brief from Phase 1 and transforms it into a library of multi-channel assets that embody the core narrative.",
    assets: [
      { icon: "📝", label: "Blog Posts & Articles" },
      { icon: "🎬", label: "Video Content" },
      { icon: "📊", label: "Webinar Decks" },
      { icon: "📄", label: "Sales Materials" },
      { icon: "📚", label: "Guides & Playbooks" },
      { icon: "🎙️", label: "Podcast Episodes" },
    ],
  },
  {
    id: "activation",
    phase: "Phase 3",
    title: "Activation & Distribution",
    owner: "Execution Teams",
    objective: "Amplify a consistent message across channels — not inventing new ones.",
    task: "Multi-channel Distribution",
    output: "Distributed Brand Signal",
    description:
      "These teams take the assets produced by the Content Engine and make them visible and authoritative across their respective channels.",
    teams: [
      {
        name: "SEO + Web Dev",
        task: "Technical Schema & Linked Data",
        type: "onsite",
        objective: "Translate entity definitions into structured data for error-free model ingestion.",
      },
      {
        name: "PR",
        task: "PR & External Mentions",
        type: "offsite-earned",
        objective: "Build external consensus by placing the narrative in reputable third-party sources.",
      },
      {
        name: "Partnerships",
        task: "Partnerships & Affiliations",
        type: "offsite-owned",
        objective: "Link brand entities to high-authority partners via co-marketing.",
      },
      {
        name: "Social / Community",
        task: "Community & Forum Presence",
        type: "offsite-earned",
        objective: "Spark human-led discussions that LLMs use to gauge sentiment.",
      },
      {
        name: "Influencers",
        task: "Paid Influencer Programs",
        type: "offsite-owned",
        objective: "Amplify narrative by seeding content with creators for third-party mentions.",
      },
    ],
  },
];

const FEEDBACK = {
  tag: "Continuous Loop",
  title: "Auditing & Feedback",
  owner: "SEO + Brand",
  objective:
    "Continuously monitor how entities appear in LLM responses and feed findings back to all teams to refine strategy.",
};

const TYPE_COLORS: Record<string, { bg: string; label: string }> = {
  onsite: { bg: "#8B5CF6", label: "Onsite" },
  "offsite-owned": { bg: "#4F46E5", label: "Offsite Owned" },
  "offsite-earned": { bg: "#059669", label: "Offsite Earned" },
};

type Section = {
  num: string;
  title: string;
  desc: string;
  example?: string;
  pillars?: string[];
  personas?: string[];
};

function FlowArrow({ active }: { active: boolean }) {
  return (
    <div className="aiseo-arrow-wrap">
      <div className={`aiseo-arrow-line ${active ? "aiseo-arrow-active" : ""}`}>
        <div className="aiseo-arrow-head" />
        {active && <div className="aiseo-arrow-dot" />}
      </div>
    </div>
  );
}

function EntityBriefPanel({ sections }: { sections: Section[] }) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="aiseo-entity-panel">
      <div className="aiseo-entity-panel-header">
        <div className="aiseo-entity-dot" />
        <span className="aiseo-entity-panel-title">
          Canonical Entity Brief — Semrush Example
        </span>
      </div>
      {sections.map((s) => (
        <div
          key={s.num}
          className={`aiseo-entity-section ${activeSection === s.num ? "aiseo-entity-open" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setActiveSection(activeSection === s.num ? null : s.num);
          }}
        >
          <div className="aiseo-entity-section-row">
            <span className="aiseo-entity-num">{s.num}</span>
            <span className="aiseo-entity-name">{s.title}</span>
            <span className="aiseo-entity-chevron">›</span>
          </div>
          {activeSection === s.num && (
            <div className="aiseo-entity-detail">
              <p className="aiseo-entity-desc">{s.desc}</p>
              {s.example && (
                <div className="aiseo-entity-example">{s.example}</div>
              )}
              {s.pillars && (
                <div className="aiseo-pills">
                  {s.pillars.map((p) => (
                    <span key={p} className="aiseo-pill">{p}</span>
                  ))}
                </div>
              )}
              {s.personas && (
                <div className="aiseo-persona-list">
                  {s.personas.map((p) => (
                    <div key={p} className="aiseo-persona-item">
                      <div className="aiseo-persona-dot" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

type Phase = (typeof PHASES)[number];

function PhaseCard({
  phase,
  isActive,
  onClick,
  children,
}: {
  phase: Phase;
  isActive: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`aiseo-phase-card ${isActive ? "aiseo-phase-active" : ""}`}
      onClick={onClick}
    >
      <div className="aiseo-phase-header">
        <span className="aiseo-phase-badge">{phase.phase}</span>
        <h3 className="aiseo-phase-title">{phase.title}</h3>
        <span className="aiseo-phase-owner">{phase.owner}</span>
        <span className={`aiseo-phase-chevron ${isActive ? "aiseo-chevron-open" : ""}`}>▾</span>
      </div>
      {isActive && (
        <div className="aiseo-phase-body">
          <p className="aiseo-phase-description">{phase.description}</p>
          <div className="aiseo-phase-meta">
            <div>
              <div className="aiseo-meta-item-label">Task</div>
              <div className="aiseo-meta-item-value">{phase.task}</div>
            </div>
            <div>
              <div className="aiseo-meta-item-label">AI Visibility Objective</div>
              <div className="aiseo-meta-item-value">{phase.objective}</div>
            </div>
            <div>
              <div className="aiseo-meta-item-label">Output</div>
              <div className="aiseo-meta-item-value aiseo-meta-output">{phase.output}</div>
            </div>
          </div>
          {children}
        </div>
      )}
    </div>
  );
}

export default function AISEOModel() {
  const [activePhase, setActivePhase] = useState<string | null>("foundation");
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <div className="aiseo-wrapper">
      <Header />

      {/* Hero */}
      <section className="aiseo-hero">
        <div className="aiseo-hero-stripes" aria-hidden="true">
          <div className="aiseo-stripe" />
          <div className="aiseo-stripe" />
          <div className="aiseo-stripe" />
          <div className="aiseo-stripe" />
        </div>
        <div className="aiseo-hero-content">
          <div className="aiseo-eyebrow">AI SEO Framework</div>
          <h1 className="aiseo-h1">The AI SEO Operating Model</h1>
          <p className="aiseo-hero-subtitle">
            A sequential process flowing from strategic definition to asset creation to multi-channel distribution.
          </p>
        </div>
      </section>

      {/* Flow Diagram */}
      <section className="aiseo-flow-section">
        <div className="aiseo-flow-content">

          {/* Umbrella goal */}
          <div className="aiseo-goal-pill-wrap">
            <div className="aiseo-goal-pill">
              <div className="aiseo-goal-dot" />
              <span className="aiseo-goal-label">Digital Brand Visibility</span>
            </div>
          </div>

          <FlowArrow active={activePhase === "foundation"} />

          {/* Phase 1 */}
          <PhaseCard
            phase={PHASES[0]}
            isActive={activePhase === "foundation"}
            onClick={() => setActivePhase(activePhase === "foundation" ? null : "foundation")}
          >
            <EntityBriefPanel sections={PHASES[0].entityBrief.sections} />
          </PhaseCard>

          <FlowArrow active={activePhase === "engine"} />

          {/* Phase 2 */}
          <PhaseCard
            phase={PHASES[1]}
            isActive={activePhase === "engine"}
            onClick={() => setActivePhase(activePhase === "engine" ? null : "engine")}
          >
            <div className="aiseo-assets-grid">
              {PHASES[1].assets.map((a) => (
                <div key={a.label} className="aiseo-asset-card">
                  <span className="aiseo-asset-icon">{a.icon}</span>
                  <span className="aiseo-asset-label">{a.label}</span>
                </div>
              ))}
            </div>
          </PhaseCard>

          <FlowArrow active={activePhase === "activation"} />

          {/* Phase 3 */}
          <PhaseCard
            phase={PHASES[2]}
            isActive={activePhase === "activation"}
            onClick={() => setActivePhase(activePhase === "activation" ? null : "activation")}
          >
            <div className="aiseo-legend">
              {Object.entries(TYPE_COLORS).map(([key, val]) => (
                <div key={key} className="aiseo-legend-item">
                  <div className="aiseo-legend-dot" style={{ background: val.bg }} />
                  {val.label}
                </div>
              ))}
            </div>
            <div className="aiseo-teams-list">
              {PHASES[2].teams.map((t) => (
                <div
                  key={t.name}
                  className="aiseo-team-row"
                  style={{ borderLeft: `3px solid ${TYPE_COLORS[t.type].bg}` }}
                >
                  <div className="aiseo-team-left">
                    <div className="aiseo-team-name">{t.name}</div>
                    <div className="aiseo-team-task">{t.task}</div>
                  </div>
                  <div className="aiseo-team-objective">{t.objective}</div>
                </div>
              ))}
            </div>
          </PhaseCard>

          {/* Feedback Loop */}
          <div className="aiseo-feedback-section" style={{ marginTop: 16 }}>
            <div
              className={`aiseo-feedback-card ${showFeedback ? "aiseo-feedback-open" : ""}`}
              onClick={() => setShowFeedback(!showFeedback)}
            >
              <div className="aiseo-feedback-icon-wrap">
                <div className="aiseo-feedback-spinner" />
              </div>
              <div className="aiseo-feedback-body">
                <div className="aiseo-feedback-labels">
                  <span className="aiseo-feedback-tag">{FEEDBACK.tag}</span>
                  <span className="aiseo-feedback-title">{FEEDBACK.title}</span>
                </div>
                {showFeedback && (
                  <div className="aiseo-feedback-detail">
                    <p className="aiseo-feedback-desc">
                      <strong>{FEEDBACK.owner}</strong> — {FEEDBACK.objective}
                    </p>
                    <div className="aiseo-feedback-phases">
                      {["Phase 1: Foundation", "Phase 2: Engine", "Phase 3: Activation"].map((p) => (
                        <div key={p} className="aiseo-feedback-phase-tag">
                          <span>↩</span> {p}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <span className={`aiseo-feedback-chevron ${showFeedback ? "aiseo-chevron-open" : ""}`}>▾</span>
            </div>
          </div>

        </div>
      </section>

      <div className="aiseo-hint">Click each phase to explore · Entity Brief sections are expandable</div>
    </div>
  );
}
