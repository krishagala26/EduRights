// Owner: Member 1/4 — list of learning modules (FR-02), call GET /api/modules
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Modules.css";

// "tone" picks the card colour (see .tone-* in Modules.css).
// "animated" shows the "Animated story" tag on modules that have an
// animation + quiz (Modules 3 and 4).
const modules = [
  {
    id: 1,
    title: "Module 1: The Shield of Knowledge (Education Rights)",
    name: "The Shield of Knowledge",
    topic: "Education Rights",
    icon: "📚",
    coreTheme: "The RTE Act, 2009 (Right to Free and Compulsory Education).",
    path: "/modules/education",
    tone: "sky",
  },
  {
    id: 2,
    title: "Module 2: The Body Guard Rules (Personal Safety)",
    name: "The Body Guard Rules",
    topic: "Personal Safety",
    icon: "🛡️",
    coreTheme: "The POCSO Act, 2012 (Protection from Harm & Abuse).",
    path: "/modules/personal-safety",
    tone: "coral",
  },
  {
    id: 3,
    title: "Module 3: Playgrounds, Not Factories (Anti-Child Labour)",
    name: "Playgrounds, Not Factories",
    topic: "Anti-Child Labour",
    icon: "⚽",
    coreTheme: "The Child Labour Prohibition Act.",
    path: "/modules/child-labour",
    tone: "sun",
    animated: true,
  },
  {
    id: 4,
    title: "Module 4: The Digital Shield (Internet Safety)",
    name: "The Digital Shield",
    topic: "Internet Safety",
    icon: "💻",
    coreTheme: "Online Safety, Privacy, and Cyber-Awareness.",
    path: "/modules/internet-safety",
    tone: "mint",
    animated: true,
  },
  {
    id: 5,
    title: "Module 5: Digital Complaint Boxes (NCPCR Portals)",
    name: "Digital Complaint Boxes",
    topic: "NCPCR Portals",
    icon: "📮",
    coreTheme: "How the Government listens via POCSO e-Box and e-BaalNidan.",
    path: "/modules/complaint-portals",
    tone: "grape",
  },
  {
    id: 6,
    title: "Module 6: The Magic Number (Emergency Action)",
    name: "The Magic Number",
    topic: "Emergency Action",
    icon: "📞",
    coreTheme: "Activating the 24/7 National Emergency Hotline.",
    path: "/modules/emergency-action",
    tone: "orange",
  },
];

function Owl({ size = 120 }) {
  const ink = "#24204A";
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      role="img"
      aria-label="Ollie the owl, your guide"
      className="modules-hero__owl"
    >
      <g stroke={ink} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
        <path d="M26 44 L32 14 L54 32 Z" fill="#8B6CFF" />
        <path d="M94 44 L88 14 L66 32 Z" fill="#8B6CFF" />
        <ellipse cx="60" cy="70" rx="38" ry="40" fill="#8B6CFF" />
        <ellipse cx="22" cy="78" rx="9" ry="20" fill="#6C4CF5" />
        <ellipse cx="98" cy="78" rx="9" ry="20" fill="#6C4CF5" />
        <ellipse cx="60" cy="90" rx="20" ry="17" fill="#E4DCFF" />
        <circle cx="44" cy="58" r="14" fill="#fff" />
        <circle cx="76" cy="58" r="14" fill="#fff" />
        <path d="M53 68 L67 68 L60 80 Z" fill="#FFC93C" />
        <ellipse cx="48" cy="112" rx="10" ry="4" fill="#FFC93C" />
        <ellipse cx="72" cy="112" rx="10" ry="4" fill="#FFC93C" />
      </g>
      <circle cx="46" cy="59" r="6" fill={ink} />
      <circle cx="74" cy="59" r="6" fill={ink} />
      <circle cx="48" cy="57" r="2" fill="#fff" />
      <circle cx="76" cy="57" r="2" fill="#fff" />
    </svg>
  );
}

function Modules() {
  const navigate = useNavigate();

  const openModule = (path) => {
    navigate(path);
  };

  return (
    <div className="modules-page">

      {/* Header */}
      <section className="modules-hero">
        <Owl />
        <div className="modules-hero__text">
          <span className="modules-hero__eyebrow">📚 EduRights Modules</span>
          <h1>Pick your adventure!</h1>
          <p className="modules-hero__bubble">
            Explore your rights, learn how to stay safe and earn XP along the way.
          </p>
          <ul className="modules-hero__tags">
            <li>🎬 Animated stories</li>
            <li>🎮 Fun quizzes</li>
            <li>⭐ Earn XP</li>
          </ul>
        </div>
      </section>

      {/* Core Modules */}
      <div className="modules-container">

        <h2 className="modules-container__title">🌟 Core Modules</h2>

        <div className="modules-grid">

          {modules.map((module) => (

            <div
              className={`module-card tone-${module.tone}`}
              key={module.id}
              onClick={() => openModule(module.path)}
            >

              {/* Number badge */}
              <span className="module-card__num">Module {module.id}</span>

              {/* Icon */}
              <div className="module-icon" aria-hidden="true">
                {module.icon}
              </div>

              {/* Module Title */}
              <h3>{module.name}</h3>
              <span className="module-card__topic">{module.topic}</span>

              {/* Core Theme */}
              <div className="core-theme">
                <strong>Core Theme</strong>
                <p>{module.coreTheme}</p>
              </div>

              {/* Footer */}
              <div className="module-card__footer">
                <button
                  type="button"
                  aria-label={`Start ${module.title}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    openModule(module.path);
                  }}
                >
                  Start Learning →
                </button>
                {module.animated && (
                  <span className="module-card__tag">🎬 Animated story</span>
                )}
              </div>

            </div>

          ))}

        </div>
      </div>

    </div>
  );
}

export default Modules;