// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../ModuleDetail.css";

// const SCENARIOS = [
//   {
//     id: 1,
//     title: "Scenario 1: The Gaming Request",
//     character: "🎮 GamerZone App",
//     question:
//       "A popular online game asks for your full real name, home address, and phone number to unlock a free rare character skin. What do you do?",
//     options: [
//       {
//         text: "Fill in my real name and address to get the rare skin quickly!",
//         correct: false,
//         feedback:
//           "Oops! Never give away personal data like address or real name for game perks. Strangers could track your real location.",
//         points: 0,
//       },
//       {
//         text: "Ask a parent/guardian first, or use a nickname and skip sharing personal details.",
//         correct: true,
//         feedback:
//           "Awesome choice! Protecting personal details keeps you safe from online tracking.",
//         points: 25,
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: "Scenario 2: The Social Photo Post",
//     character: "📸 School Group Chat",
//     question:
//       "Your classmate posts a funny photo of another student looking embarrassed without asking them first. People are laughing. What do you do?",
//     options: [
//       {
//         text: "Share the photo with your other friends so everyone can laugh.",
//         correct: false,
//         feedback:
//           "Sharing photos without permission damages trust and contributes to cyberbullying.",
//         points: 0,
//       },
//       {
//         text: "Do not forward it. Politely ask the sender to delete it or report it to a trusted adult.",
//         correct: true,
//         feedback:
//           "Spot on! Respecting others' privacy online builds a safer community.",
//         points: 25,
//       },
//     ],
//   },
//   {
//     id: 3,
//     title: "Scenario 3: Creating a Super Password",
//     character: "🔐 Account Guardian",
//     question:
//       "Which of these passwords is the strongest and safest for your EduRights profile?",
//     options: [
//       {
//         text: "myname1234",
//         correct: false,
//         feedback:
//           "Too simple! Easy passwords can be guessed quickly by automated tools.",
//         points: 0,
//       },
//       {
//         text: "S2h2i3e!l#d99",
//         correct: true,
//         feedback:
//           "Great job! Mixing uppercase, lowercase, numbers, and symbols makes a strong password shield.",
//         points: 25,
//       },
//     ],
//   },
//   {
//     id: 4,
//     title: "Scenario 4: The Suspicious Link",
//     character: "📩 Unknown Email Message",
//     question:
//       "You get a message saying: 'CONGRATS! You won a free tablet! Click this link right now!' What is your move?",
//     options: [
//       {
//         text: "Click the link immediately before the gift expires!",
//         correct: false,
//         feedback:
//           "Watch out! Suspicious links often download malware or steal your account info.",
//         points: 0,
//       },
//       {
//         text: "Close the message, don't click the link, and show it to a parent or teacher.",
//         correct: true,
//         feedback: "Perfect instinct! You dodged a phishing link safely.",
//         points: 25,
//       },
//     ],
//   },
// ];

// function ModuleDetail() {
//   const navigate = useNavigate();
//   const [currentStage, setCurrentStage] = useState(0);
//   const [score, setScore] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [showFeedback, setShowFeedback] = useState(false);
//   const [isCompleted, setIsCompleted] = useState(false);

//   const activeScenario = SCENARIOS[currentStage];

//   const handleSelectOption = (option) => {
//     if (showFeedback) return;
//     setSelectedOption(option);
//     setShowFeedback(true);
//     if (option.correct) {
//       setScore((prev) => prev + option.points);
//     }
//   };

//   const handleNext = () => {
//     setShowFeedback(false);
//     setSelectedOption(null);
//     if (currentStage + 1 < SCENARIOS.length) {
//       setCurrentStage((prev) => prev + 1);
//     } else {
//       setIsCompleted(true);
//     }
//   };

//   const handleRestart = () => {
//     setCurrentStage(0);
//     setScore(0);
//     setSelectedOption(null);
//     setShowFeedback(false);
//     setIsCompleted(false);
//   };

//   return (
//     <div className="module-detail-page">
//       {/* Header */}
//       <div className="module-detail-header">
//         <button className="back-btn" onClick={() => navigate("/modules")}>
//           ← Back to Modules
//         </button>
//         <h1>💻 Module 4: The Digital Shield</h1>
//         <p>Master online safety, protect your privacy, and beat cyber threats!</p>
//       </div>

//       {/* Main Interactive Card */}
//       <div className="module-detail-container">
//         {!isCompleted ? (
//           <>
//             {/* Progress Bar */}
//             <div className="status-bar">
//               <div className="stage-indicator">
//                 Scenario {currentStage + 1} of {SCENARIOS.length}
//               </div>
//               <div className="score-meter">
//                 🛡️ Safety Score: <strong>{score} / 100 PTS</strong>
//               </div>
//             </div>

//             {/* Scenario Display */}
//             <div className="scenario-card">
//               <div className="badge-tag">{activeScenario.character}</div>
//               <h2>{activeScenario.title}</h2>
//               <p className="question-text">{activeScenario.question}</p>

//               {/* Options */}
//               <div className="options-grid">
//                 {activeScenario.options.map((option, idx) => (
//                   <button
//                     key={idx}
//                     className={`option-card ${
//                       selectedOption === option
//                         ? option.correct
//                           ? "correct-choice"
//                           : "wrong-choice"
//                         : ""
//                     }`}
//                     onClick={() => handleSelectOption(option)}
//                     disabled={showFeedback}
//                   >
//                     <span className="option-number">
//                       {idx === 0 ? "A" : "B"}
//                     </span>
//                     <span>{option.text}</span>
//                   </button>
//                 ))}
//               </div>

//               {/* Feedback Alert */}
//               {showFeedback && (
//                 <div
//                   className={`feedback-box ${
//                     selectedOption?.correct ? "success" : "warning"
//                   }`}
//                 >
//                   <h4>
//                     {selectedOption?.correct
//                       ? "✅ Excellent Defense!"
//                       : "⚠️ Shield Alert!"}
//                   </h4>
//                   <p>{selectedOption?.feedback}</p>
//                   <button className="next-btn" onClick={handleNext}>
//                     {currentStage + 1 < SCENARIOS.length
//                       ? "Next Challenge →"
//                       : "Finish Module 🏆"}
//                   </button>
//                 </div>
//               )}
//             </div>
//           </>
//         ) : (
//           /* Completion Screen */
//           <div className="completion-card">
//             <div className="trophy-icon">🏆</div>
//             <h2>Module Completed!</h2>
//             <p>
//               You earned the <strong>Digital Shield Defender Badge</strong>!
//             </p>
//             <div className="final-score">
//               Final Score: <span>{score} / 100</span>
//             </div>

//             <div className="key-takeaways">
//               <h3>Key Rules to Remember:</h3>
//               <ul>
//                 <li>
//                   🔹 <strong>Keep it Secret:</strong> Never share passwords, home
//                   address, or personal info online.
//                 </li>
//                 <li>
//                   🔹 <strong>Ask Before Posting:</strong> Respect other people's
//                   privacy and photos.
//                 </li>
//                 <li>
//                   🔹 <strong>Don't Click Unknown Links:</strong> Beware of
//                   suspicious free offers or popups.
//                 </li>
//                 <li>
//                   🔹 <strong>Report Cyberbullying:</strong> Tell a trusted adult
//                   or use safe reporting portals.
//                 </li>
//               </ul>
//             </div>

//             <div className="action-buttons">
//               <button className="retry-btn" onClick={handleRestart}>
//                 🔄 Replay Module
//               </button>
//               <button
//                 className="finish-btn"
//                 onClick={() => navigate("/modules")}
//               >
//                 Return to All Modules
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ModuleDetail;


// Owner: Module 3 & Module 4 (Playgrounds Not Factories / The Digital Shield)
// Shows a short Three.js animation, then a gamified quiz, for the module
// matching the URL slug. Other module slugs show a "coming soon" placeholder
// so teammates' routes don't break while their modules aren't built yet.

// import { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Play, ArrowLeft, Sparkles } from 'lucide-react';

// import ModuleAnimation from '../components/modules/ModuleAnimation.jsx';
// import ModuleQuiz from '../components/modules/ModuleQuiz.jsx';

// import ChildLabourScene from '../components/modules/ChildLabourScene.js';
// import InternetSafetyScene from '../components/modules/InternetSafetyScene.js';

// import childLabourQuiz from '../components/modules/childLabourQuiz.js';
// import internetSafetyQuiz from '../components/modules/internetSafetyQuiz.js';

// import './ModuleDetail.css';

// const MODULE_CONFIG = {
//   'child-labour': {
//     title: 'Playgrounds, Not Factories',
//     subtitle: 'Module 3 — Anti-Child Labour',
//     blurb:
//       "Watch Maya's short story, then answer a few quick questions to earn XP and RightPoints.",
//     scene: ChildLabourScene,
//     quiz: childLabourQuiz,
//   },
//   'internet-safety': {
//     title: 'The Digital Shield',
//     subtitle: 'Module 4 — Online Safety, Privacy & Cyber-Awareness',
//     blurb:
//       "Watch Zee activate their digital shield, then answer a few quick questions to earn XP and RightPoints.",
//     scene: InternetSafetyScene,
//     quiz: internetSafetyQuiz,
//   },
// };

// export default function ModuleDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const config = MODULE_CONFIG[id];

//   // intro -> animation -> quiz -> done
//   const [stage, setStage] = useState('intro');
//   const [result, setResult] = useState(null);

//   const handleFinishQuiz = (res) => {
//     setResult(res);
//     setStage('done');
//   };

//   // Modules 1, 2, 5, 6 land here until a teammate builds them.
//   if (!config) {
//     return (
//       <div className="module-detail module-detail--placeholder">
//         <button type="button" className="module-detail__back" onClick={() => navigate('/modules')}>
//           <ArrowLeft size={18} /> Back to Modules
//         </button>
//         <div className="module-detail__placeholder-card">
//           <Sparkles size={32} />
//           <h2>Coming soon!</h2>
//           <p>This module is still being built by the team. Check back soon.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="module-detail">
//       <button type="button" className="module-detail__back" onClick={() => navigate('/modules')}>
//         <ArrowLeft size={18} /> Back to Modules
//       </button>

//       <div className="module-detail__header">
//         <span className="module-detail__eyebrow">{config.subtitle}</span>
//         <h1>{config.title}</h1>
//         <p>{config.blurb}</p>
//       </div>

//       {stage === 'intro' && (
//         <div className="module-detail__intro-card">
//           <button
//             type="button"
//             className="module-detail__start-btn"
//             onClick={() => setStage('animation')}
//           >
//             <Play size={20} fill="currentColor" />
//             Watch &amp; Start
//           </button>
//         </div>
//       )}

//       {stage === 'animation' && (
//         <ModuleAnimation scene={config.scene} onComplete={() => setStage('quiz')} />
//       )}

//       {stage === 'quiz' && <ModuleQuiz quiz={config.quiz} onFinish={handleFinishQuiz} />}

//       {stage === 'done' && result && (
//         <div className="module-detail__done-card">
//           <h2>Module complete! 🎉</h2>
//           <p>
//             You scored {result.correctCount} / {result.total} and earned{' '}
//             <strong>{result.totalXp} XP</strong>.
//           </p>
//           <button
//             type="button"
//             className="module-detail__back-dashboard-btn"
//             onClick={() => navigate('/modules')}
//           >
//             Back to Modules
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// Owner: Module 3 & Module 4 (Playgrounds Not Factories / The Digital Shield)
// Shows a short Three.js animation, then a gamified quiz, for the module
// matching the URL slug. Other module slugs show a "coming soon" placeholder
// so teammates' routes don't break while their modules aren't built yet.

// import { useState } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import { Play, ArrowLeft, Sparkles } from 'lucide-react';

// import ModuleAnimation from '../components/modules/ModuleAnimation.jsx';
// import ModuleQuiz from '../components/modules/ModuleQuiz.jsx';

// import ChildLabourScene from '../components/modules/ChildLabourScene.js';
// import InternetSafetyScene from '../components/modules/InternetSafetyScene.js';

// import childLabourQuiz from '../components/modules/childLabourQuiz.js';
// import internetSafetyQuiz from '../components/modules/internetSafetyQuiz.js';

// import './ModuleDetail.css';

// const MODULE_CONFIG = {
//   'child-labour': {
//     title: 'Playgrounds, Not Factories',
//     subtitle: 'Module 3 — Anti-Child Labour',
//     blurb:
//       "Watch Maya's short story, then answer a few quick questions to earn XP and RightPoints.",
//     scene: ChildLabourScene,
//     quiz: childLabourQuiz,
//   },
//   'internet-safety': {
//     title: 'The Digital Shield',
//     subtitle: 'Module 4 — Online Safety, Privacy & Cyber-Awareness',
//     blurb:
//       "Watch Zee activate their digital shield, then answer a few quick questions to earn XP and RightPoints.",
//     scene: InternetSafetyScene,
//     quiz: internetSafetyQuiz,
//   },
// };

// export default function ModuleDetail() {
//   const { id } = useParams();
//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   // Use the :id param, or fall back to the last part of the URL
//   // (e.g. /modules/internet-safety -> "internet-safety").
//   const slug = id ?? pathname.split('/').filter(Boolean).pop();
//   const config = MODULE_CONFIG[slug];

//   // intro -> animation -> quiz -> done
//   const [stage, setStage] = useState('intro');
//   const [result, setResult] = useState(null);

//   const handleFinishQuiz = (res) => {
//     setResult(res);
//     setStage('done');
//   };

//   // Modules 1, 2, 5, 6 land here until a teammate builds them.
//   if (!config) {
//     return (
//       <div className="module-detail module-detail--placeholder">
//         <button type="button" className="module-detail__back" onClick={() => navigate('/modules')}>
//           <ArrowLeft size={18} /> Back to Modules
//         </button>
//         <div className="module-detail__placeholder-card">
//           <Sparkles size={32} />
//           <h2>Coming soon!</h2>
//           <p>This module is still being built by the team. Check back soon.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="module-detail">
//       <button type="button" className="module-detail__back" onClick={() => navigate('/modules')}>
//         <ArrowLeft size={18} /> Back to Modules
//       </button>

//       <div className="module-detail__header">
//         <span className="module-detail__eyebrow">{config.subtitle}</span>
//         <h1>{config.title}</h1>
//         <p>{config.blurb}</p>
//       </div>

//       {stage === 'intro' && (
//         <div className="module-detail__intro-card">
//           <button
//             type="button"
//             className="module-detail__start-btn"
//             onClick={() => setStage('animation')}
//           >
//             <Play size={20} fill="currentColor" />
//             Watch &amp; Start
//           </button>
//         </div>
//       )}

//       {stage === 'animation' && (
//         <ModuleAnimation scene={config.scene} onComplete={() => setStage('quiz')} />
//       )}

//       {stage === 'quiz' && <ModuleQuiz quiz={config.quiz} onFinish={handleFinishQuiz} />}

//       {stage === 'done' && result && (
//         <div className="module-detail__done-card">
//           <h2>Module complete! 🎉</h2>
//           <p>
//             You scored {result.correctCount} / {result.total} and earned{' '}
//             <strong>{result.totalXp} XP</strong>.
//           </p>
//           <button
//             type="button"
//             className="module-detail__back-dashboard-btn"
//             onClick={() => navigate('/modules')}
//           >
//             Back to Modules
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// Owner: Module 3 & Module 4 (Playgrounds Not Factories / The Digital Shield)
// Shows a short Three.js animation, then a gamified quiz, for the module
// matching the URL slug. Other module slugs show a "coming soon" placeholder
// so teammates' routes don't break while their modules aren't built yet.

import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Play, ArrowLeft, RotateCcw, Sparkles } from 'lucide-react';

import ModuleAnimation from '../components/modules/ModuleAnimation.jsx';
import ModuleQuiz from '../components/modules/ModuleQuiz.jsx';

import ChildLabourScene from '../components/modules/ChildLabourScene.js';
import InternetSafetyScene from '../components/modules/InternetSafetyScene.js';

import childLabourQuiz from '../components/modules/childLabourQuiz.js';
import internetSafetyQuiz from '../components/modules/internetSafetyQuiz.js';

import './ModuleDetail.css';

// "theme" picks the colour set (see .theme-* in ModuleDetail.css).
const MODULE_CONFIG = {
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

export default function ModuleDetail() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // Use the :id param, or fall back to the last part of the URL
  // (e.g. /modules/internet-safety -> "internet-safety").
  const slug = id ?? pathname.split('/').filter(Boolean).pop();
  const config = MODULE_CONFIG[slug];

  // intro -> animation -> quiz -> done
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
    { emoji: '🎬', title: 'Watch the story', text: 'A short animation, under 1 minute.' },
    { emoji: '🎮', title: 'Play the quiz', text: `${total} quick questions.` },
    { emoji: '⭐', title: 'Earn XP', text: `Win up to ${maxXp} XP.` },
  ];

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
              onComplete={() => setStage('quiz')}
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