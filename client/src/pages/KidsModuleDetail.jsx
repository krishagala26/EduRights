import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Play, ArrowLeft, RotateCcw, Sparkles, ExternalLink } from 'lucide-react';

import ModuleAnimation from '../components/Kidsmodule/ModuleAnimation.jsx';
import ModuleQuiz from '../components/Kidsmodule/ModuleQuiz.jsx';

import EducationRightsScene from '../components/Kidsmodule/EducationRightsScene.js';
import PersonalSafetyScene from '../components/Kidsmodule/PersonalSafetyScene.js';
import ChildLabourScene from '../components/Kidsmodule/ChildLabourScene.js';
import InternetSafetyScene from '../components/Kidsmodule/InternetSafetyScene.js';
import ComplaintPortalsScene from '../components/Kidsmodule/ComplaintPortalsScene.js';
import EmergencyActionScene from '../components/Kidsmodule/EmergencyActionScene.js';
import educationRightsQuiz from '../components/Kidsmodule/educationRightsQuiz.js';
import personalSafetyQuiz from '../components/Kidsmodule/personalSafetyQuiz.js';
import childLabourQuiz from '../components/Kidsmodule/childLabourQuiz.js';
import internetSafetyQuiz from '../components/Kidsmodule/internetSafetyQuiz.js';
import complaintPortalsQuiz from '../components/Kidsmodule/complaintPortalsQuiz.js';
import emergencyActionQuiz from '../components/Kidsmodule/emergencyActionQuiz.js';

import {
  complaintPortalsLearn,
  emergencyActionLearn,
} from '../components/Kidsmodule/moduleLearnContent.js';

import './KidsModuleDetail.css';
import './KidsModuleLearn.css';

// "theme" picks the colour set (see .theme-* in KidsModuleDetail.css).
// "learn" (optional) adds the "Learn the Key Facts" stage before the quiz.
// "exploreMorePath" (optional) is the future Knowledge & Articles route.
// Leave it null until that feature exists; the Explore More button stays
// disabled instead of linking to a broken page.
const MODULE_CONFIG = {
  'education': {
    number: 1,
    emoji: '📚',
    theme: 'sun',
    title: 'The Shield of Knowledge',
    topic: 'The RTE Act, 2009 (Right to Free and Compulsory Education)',
    blurb:
      "Hi, I'm Ollie! Watch how the Golden Book of the RTE Act unlocks the school gate, then show what you learned in a quick quiz.",
    scene: EducationRightsScene,
    quiz: educationRightsQuiz,
  },
  'personal-safety': {
    number: 2,
    emoji: '🛡️',
    theme: 'sky',
    title: 'The Body Guard Rules',
    topic: 'The POCSO Act, 2012 (Protection from Harm & Abuse)',
    blurb:
      "Hi, I'm Ollie! Watch how your Personal Safety Bubble and Trusted Adults keep you safe, then show what you learned in a quick quiz.",
    scene: PersonalSafetyScene,
    quiz: personalSafetyQuiz,
  },
  'child-labour': {
    number: 3,
    emoji: '⚽',
    theme: 'sun',
    title: 'Playgrounds, Not Factories',
    topic: 'Anti-Child Labour',
    blurb:
      "Hi, I'm Ollie! Watch Maya's short story, then show what you learned in a quick quiz.",
    scene: ChildLabourScene,
    quiz: childLabourQuiz,
  },
  'internet-safety': {
    number: 4,
    emoji: '💻',
    theme: 'sky',
    title: 'The Digital Shield',
    topic: 'Online Safety, Privacy & Cyber-Awareness',
    blurb:
      "Hi, I'm Ollie! Watch how Zee's digital shield keeps them safe, then show what you learned in a quick quiz.",
    scene: InternetSafetyScene,
    quiz: internetSafetyQuiz,
  },
  'complaint-portals': {
    number: 5,
    emoji: '📮',
    theme: 'grape',
    title: 'Digital Complaint Boxes',
    topic: 'NCPCR Portals',
    blurb:
      "Hi, I'm Ollie! Watch how Asha's message finds help, learn the key facts with me, then try a quick quiz.",
    scene: ComplaintPortalsScene,
    quiz: complaintPortalsQuiz,
    learn: complaintPortalsLearn,
    exploreMorePath: null, // e.g. '/knowledge/complaint-portals' once it exists
  },
  'emergency-action': {
    number: 6,
    emoji: '📞',
    theme: 'orange',
    title: 'The Magic Number',
    topic: 'Emergency Action',
    blurb:
      "Hi, I'm Ollie! Watch Riya learn the Magic Number 112, learn the key facts with me, then try a quick quiz.",
    scene: EmergencyActionScene,
    quiz: emergencyActionQuiz,
    learn: emergencyActionLearn,
    exploreMorePath: null, // e.g. '/knowledge/emergency-action' once it exists
  },
};

function Owl({ size = 110 }) {
  const ink = '#24204A';
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      role="img"
      aria-label="Ollie the owl, your guide"
      className="module-detail__owl"
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

// "Learn the Key Facts" stage (Modules 5 and 6).
function LearnSection({ learn, explorePath, onStartQuiz, onExplore }) {
  return (
    <div className="module-learn">
      <h2 className="module-learn__heading">{learn.heading}</h2>
      <p className="module-learn__intro">{learn.intro}</p>

      <ul className="module-learn__cards">
        {learn.cards.map((card) => (
          <li key={card.id} className="module-learn__card">
            <span className="module-learn__card-emoji" aria-hidden="true">
              {card.emoji}
            </span>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </li>
        ))}
      </ul>

      <aside className="module-learn__remember" aria-labelledby="remember-heading">
        <h3 id="remember-heading">Remember This! 🦉</h3>
        <ul>
          {learn.remember.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </aside>

      <section className="module-learn__links" aria-labelledby="official-heading">
        <h3 id="official-heading">Official websites (for you and a grown-up)</h3>
        <ul>
          {learn.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
                <ExternalLink size={14} aria-hidden="true" />
                <span className="module-learn__sr"> (opens in a new tab)</span>
              </a>
              <span className="module-learn__link-note">{link.note}</span>
            </li>
          ))}
        </ul>
      </section>

      <p className="module-learn__disclaimer">{learn.disclaimer}</p>

      <div className="module-learn__actions">
        <button
          type="button"
          className="module-detail__start-btn"
          onClick={onStartQuiz}
        >
          <Play size={22} fill="currentColor" />
          Start Quiz
        </button>
        <button
          type="button"
          className="module-detail__btn module-detail__btn--ghost"
          onClick={onExplore}
          disabled={!explorePath}
          title={explorePath ? undefined : 'Knowledge & Articles is coming soon'}
        >
          {explorePath ? 'Explore More' : 'Explore More (coming soon)'}
        </button>
      </div>
    </div>
  );
}

export default function KidsModuleDetail() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // Use the :id param, or fall back to the last part of the URL
  // (e.g. /modules/education -> "education").
  const slug = id ?? pathname.split('/').filter(Boolean).pop();
  const config = MODULE_CONFIG[slug];

  // intro -> animation -> (learn, Modules 5 & 6 only) -> quiz -> done
  const [stage, setStage] = useState('intro');
  const [result, setResult] = useState(null);
  // Changing "round" remounts the animation / quiz so they start fresh
  const [round, setRound] = useState(0);

  const goBack = () => navigate('/modules');

  // Modules 1, 2, 5, 6 land here until a teammate builds them.
  if (!config) {
    return (
      <div className="module-detail theme-sky">
        <div className="module-detail__inner">
          <button type="button" className="module-detail__back" onClick={goBack}>
            <ArrowLeft size={18} /> Back to Modules
          </button>
          <div className="module-detail__placeholder-card">
            <Sparkles size={34} />
            <h2>Coming soon!</h2>
            <p>This module is still being built by the team. Check back soon.</p>
          </div>
        </div>
      </div>
    );
  }

  const total = config.quiz.questions.length;
  const maxXp = config.quiz.questions.reduce((sum, q) => sum + q.xp, 0);

  const steps = [
    {
      emoji: '🎬',
      title: 'Watch the story',
      text: config.learn
        ? 'A short animation, then key facts with Ollie.'
        : 'A short animation, under 1 minute.',
    },
    { emoji: '🎮', title: 'Play the quiz', text: `${total} quick questions.` },
    { emoji: '⭐', title: 'Earn XP', text: `Win up to ${maxXp} XP.` },
  ];

  // Animation finished (or Skip pressed): go to the learn stage if this
  // module has one, otherwise straight to the quiz (Modules 3 and 4).
  const handleAnimationComplete = () => {
    setStage(config.learn ? 'learn' : 'quiz');
  };

  const handleFinishQuiz = (res) => {
    setResult(res);
    setStage('done');
  };

  const replayStory = () => {
    setRound((r) => r + 1);
    setResult(null);
    setStage('animation');
  };

  const retryQuiz = () => {
    setRound((r) => r + 1);
    setResult(null);
    setStage('quiz');
  };

  const exploreMore = () => {
    if (config.exploreMorePath) navigate(config.exploreMorePath);
  };

  // Results screen values
  const ratio = result ? result.correctCount / result.total : 0;
  const starCount = ratio === 1 ? 3 : ratio >= 0.5 ? 2 : 1;
  const headline = ratio === 1 ? 'Perfect score!' : ratio >= 0.5 ? 'Great job!' : 'Good try!';
  const cheer =
    ratio === 1
      ? 'You are a rights superstar!'
      : ratio >= 0.5
      ? 'You know a lot already. Keep going!'
      : 'Watch the story again and give it another go.';

  return (
    <div className={`module-detail theme-${config.theme}`}>
      <div className="module-detail__inner">
        <button type="button" className="module-detail__back" onClick={goBack}>
          <ArrowLeft size={18} /> Back to Modules
        </button>

        {/* Banner */}
        <section className="module-detail__banner">
          <Owl />
          <div className="module-detail__banner-text">
            <span className="module-detail__badge">
              {config.emoji} Module {config.number}
            </span>
            <h1>{config.title}</h1>
            <p className="module-detail__topic">{config.topic}</p>
          </div>
        </section>

        {/* Intro */}
        {stage === 'intro' && (
          <section className="module-detail__stage module-detail__intro">
            <p className="module-detail__bubble">{config.blurb}</p>

            <ol className="module-detail__steps">
              {steps.map((s, i) => (
                <li key={s.title} className="module-detail__step">
                  <span className="module-detail__step-num">{i + 1}</span>
                  <span className="module-detail__step-emoji" aria-hidden="true">
                    {s.emoji}
                  </span>
                  <b>{s.title}</b>
                  <span>{s.text}</span>
                </li>
              ))}
            </ol>

            <div className="module-detail__start">
              <button
                type="button"
                className="module-detail__start-btn"
                onClick={() => setStage('animation')}
              >
                <Play size={22} fill="currentColor" />
                Watch &amp; Start
              </button>
              <span className="module-detail__note">Takes about 1 minute</span>
            </div>
          </section>
        )}

        {/* Animation */}
        {stage === 'animation' && (
          <section className="module-detail__stage">
            <ModuleAnimation
              key={`anim-${round}`}
              scene={config.scene}
              onComplete={handleAnimationComplete}
            />
          </section>
        )}

        {/* Learn the Key Facts (Modules 5 & 6) */}
        {stage === 'learn' && config.learn && (
          <section className="module-detail__stage">
            <LearnSection
              learn={config.learn}
              explorePath={config.exploreMorePath}
              onStartQuiz={() => setStage('quiz')}
              onExplore={exploreMore}
            />
          </section>
        )}

        {/* Quiz */}
        {stage === 'quiz' && (
          <section className="module-detail__stage">
            <ModuleQuiz key={`quiz-${round}`} quiz={config.quiz} onFinish={handleFinishQuiz} />
          </section>
        )}

        {/* Results */}
        {stage === 'done' && result && (
          <section className="module-detail__stage module-detail__done">
            <div className="module-detail__trophy" aria-hidden="true">🏆</div>
            <div
              className="module-detail__stars"
              role="img"
              aria-label={`${starCount} out of 3 stars`}
            >
              {[1, 2, 3].map((n) => (
                <span key={n} className={n <= starCount ? 'on' : ''} aria-hidden="true">
                  ★
                </span>
              ))}
            </div>
            <h2>{headline}</h2>
            <p className="module-detail__score">
              You got {result.correctCount} of {result.total} right
            </p>
            <p className="module-detail__cheer">{cheer}</p>
            <div className="module-detail__xp-pill">⚡ +{result.totalXp} XP earned</div>

            <div className="module-detail__actions">
              <button type="button" className="module-detail__btn" onClick={goBack}>
                Back to Modules
              </button>
              <button
                type="button"
                className="module-detail__btn module-detail__btn--ghost"
                onClick={replayStory}
              >
                <RotateCcw size={16} /> Replay story
              </button>
              <button
                type="button"
                className="module-detail__btn module-detail__btn--ghost"
                onClick={retryQuiz}
              >
                <RotateCcw size={16} /> Try quiz again
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
