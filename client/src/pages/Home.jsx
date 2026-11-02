
import { useContext, useState, createContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  LogIn,
  UserPlus,
  LayoutDashboard,
  BookOpen,
  Compass,
  Shield,
  Trophy,
  Zap,
  Brain,
  Target,
  Gamepad2,
  Star,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Flame,
  Award,
  Lightbulb
} from 'lucide-react';

import * as AuthModule from '../context/AuthContext';
import '../Home.css';

/* -------------------------------------------------------
   AUTHENTICATION
------------------------------------------------------- */

const FallbackContext = createContext(null);

const useAuthHook =
  typeof AuthModule.useAuth === 'function'
    ? AuthModule.useAuth
    : () => useContext(AuthModule.AuthContext || FallbackContext);

function readStoredUser() {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const KIDS_DASHBOARD_PATH = '/kids-dashboard';
export const TEEN_DASHBOARD_PATH = '/teen-dashboard';
export const MAIN_DASHBOARD_PATH = '/dashboard';

export function getDashboardPath(user) {
  if (!user) return MAIN_DASHBOARD_PATH;

  const raw = [
    user.role,
    user.ageGroup,
    user.age_group,
    user.userType
  ]
    .filter(Boolean)
    .map(v => String(v).toLowerCase().replace(/\s/g, ''));

  const value = raw.join('|');

  if (/(kid|child|8-12|8–12)/.test(value)) {
    return KIDS_DASHBOARD_PATH;
  }

  if (/(teen|13-16|13–16|13-18|13–18)/.test(value)) {
    return TEEN_DASHBOARD_PATH;
  }

  return MAIN_DASHBOARD_PATH;
}

/* -------------------------------------------------------
   OLLIE - FRIENDLY OWL FOR KIDS
------------------------------------------------------- */

function Owl({ size = 180 }) {
  const ink = '#24204A';

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      role="img"
      aria-label="Ollie the owl"
    >
      <g
        stroke={ink}
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path d="M26 44 L32 14 L54 32 Z" fill="#8B6CFF" />
        <path d="M94 44 L88 14 L66 32 Z" fill="#8B6CFF" />
        <ellipse cx="60" cy="70" rx="38" ry="40" fill="#8B6CFF" />
        <ellipse cx="22" cy="78" rx="9" ry="20" fill="#6C4CF5" />
        <ellipse cx="98" cy="78" rx="9" ry="20" fill="#6C4CF5" />
        <ellipse cx="60" cy="90" rx="20" ry="17" fill="#E4DCFF" />
        <circle cx="44" cy="58" r="14" fill="white" />
        <circle cx="76" cy="58" r="14" fill="white" />
        <path d="M53 68 L67 68 L60 80 Z" fill="#FFC93C" />
        <ellipse cx="48" cy="112" rx="10" ry="4" fill="#FFC93C" />
        <ellipse cx="72" cy="112" rx="10" ry="4" fill="#FFC93C" />
      </g>

      <circle cx="46" cy="59" r="6" fill={ink} />
      <circle cx="74" cy="59" r="6" fill={ink} />
      <circle cx="48" cy="57" r="2" fill="white" />
      <circle cx="76" cy="57" r="2" fill="white" />
    </svg>
  );
}

/* -------------------------------------------------------
   SHERRY - TEEN RIGHTS DEFENDER
------------------------------------------------------- */

function Sherry({ size = 190 }) {
  const ink = '#24204A';

  return (
    <svg
      viewBox="0 0 160 190"
      width={size}
      height={size}
      role="img"
      aria-label="Sherry the teen rights defender"
    >
      <g stroke={ink} strokeWidth="3.5" strokeLinejoin="round">
        {/* Hair */}
        <path
          d="M35 66 Q24 12 80 12 Q136 12 125 70
             L132 116 L28 116 Z"
          fill="#29233E"
        />

        {/* Face */}
        <ellipse cx="80" cy="70" rx="37" ry="44" fill="#D9956E" />

        {/* Hair fringe */}
        <path
          d="M43 53 Q48 12 91 25 Q115 28 118 57
             Q94 40 80 48 Q58 60 43 53"
          fill="#29233E"
        />

        {/* Eyes */}
        <ellipse cx="66" cy="70" rx="4" ry="5" fill={ink} />
        <ellipse cx="94" cy="70" rx="4" ry="5" fill={ink} />

        {/* Smile */}
        <path
          d="M70 88 Q80 98 91 88"
          fill="none"
          stroke={ink}
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Headphones */}
        <path
          d="M36 73 Q26 12 80 10 Q134 12 124 73"
          fill="none"
          stroke="#FFC93C"
          strokeWidth="7"
        />
        <rect x="28" y="61" width="13" height="27" rx="6" fill="#8B6CFF" />
        <rect x="119" y="61" width="13" height="27" rx="6" fill="#8B6CFF" />

        {/* Neck */}
        <rect x="67" y="107" width="26" height="20" rx="8" fill="#D9956E" />

        {/* Hoodie */}
        <path
          d="M48 119 Q80 105 112 119 L143 177
             Q80 190 17 177 Z"
          fill="#8B6CFF"
        />

        {/* Hoodie pocket */}
        <path
          d="M54 148 Q80 162 106 148 L101 174 L59 174 Z"
          fill="#6C4CF5"
        />

        {/* Hoodie strings */}
        <path d="M69 124 L65 148 M91 124 L95 148"
          stroke="white"
          strokeWidth="3"
          fill="none"
        />

        {/* Star badge */}
        <path
          d="M80 135 L84 144 L94 145 L87 152 L89 162
             L80 157 L71 162 L73 152 L66 145 L76 144 Z"
          fill="#FFC93C"
        />
      </g>
    </svg>
  );
}

/* -------------------------------------------------------
   GAME FEATURES
------------------------------------------------------- */

const GAMES = [
  {
    icon: <Target size={30} />,
    title: 'Case Files',
    tag: 'REAL-LIFE MYSTERIES',
    description:
      'Investigate everyday situations, identify violated rights and find the correct legal solution.',
    color: 'pink',
    reward: 'Earn Detective XP'
  },
  {
    icon: <Brain size={30} />,
    title: 'Law or Myth?',
    tag: 'FACT CHECK CHALLENGE',
    description:
      'Can you separate legal facts from common myths? Test your knowledge and unlock new levels.',
    color: 'blue',
    reward: 'Unlock Knowledge Badges'
  },
  {
    icon: <Zap size={30} />,
    title: 'Rights Rush',
    tag: 'BEAT THE CLOCK',
    description:
      'Answer quick-fire questions about child rights, safety, equality and important laws.',
    color: 'yellow',
    reward: 'Build Your XP'
  },
  {
    icon: <Compass size={30} />,
    title: 'Choose Your Move',
    tag: 'INTERACTIVE STORIES',
    description:
      'Make decisions in real-world scenarios and discover the consequences of every choice.',
    color: 'green',
    reward: 'Become a Rights Defender'
  }
];

/* -------------------------------------------------------
   QUICK KNOWLEDGE CHALLENGE
------------------------------------------------------- */

const QUESTIONS = [
  {
    question: 'Which Indian law gives children aged 6–14 the right to free and compulsory education?',
    options: [
      'POCSO Act',
      'Right to Education Act',
      'Consumer Protection Act'
    ],
    answer: 1,
    explanation:
      'Correct! The Right to Education Act, 2009 guarantees free and compulsory elementary education for children aged 6–14.'
  },
  {
    question: 'What should you do if someone asks for your password online?',
    options: [
      'Share it with them',
      'Post it publicly',
      'Keep it private'
    ],
    answer: 2,
    explanation:
      'Exactly! Passwords are private. Never share them with strangers or publish them online.'
  },
  {
    question: 'Which law protects children from sexual offences in India?',
    options: [
      'POCSO Act, 2012',
      'RTE Act, 2009',
      'Motor Vehicles Act'
    ],
    answer: 0,
    explanation:
      'Correct! The POCSO Act, 2012 provides legal protection to children against sexual offences.'
  }
];

/* -------------------------------------------------------
   MAIN HOME PAGE
------------------------------------------------------- */

export default function Home() {
  const ctx = useAuthHook();

  const ctxUser =
    ctx && typeof ctx === 'object' && 'user' in ctx
      ? ctx.user
      : ctx;

  const loading = Boolean(ctx && ctx.loading);

  const user =
    ctxUser && typeof ctxUser === 'object'
      ? ctxUser
      : readStoredUser();

  const loggedIn = Boolean(user);
  const dashboardPath = getDashboardPath(user);

  const firstName = loggedIn
    ? String(
        user.name || user.fullName || user.username || ''
      ).split(' ')[0]
    : '';

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  const currentQuestion = QUESTIONS[questionIndex];
  const answered = selected !== null;
  const correct = selected === currentQuestion.answer;

  function handleAnswer(index) {
    if (answered) return;

    setSelected(index);

    if (index === currentQuestion.answer) {
      setScore(prev => prev + 1);
    }
  }

  function nextQuestion() {
    setQuestionIndex(prev => (prev + 1) % QUESTIONS.length);
    setSelected(null);
  }

  return (
    <main className="home">

      {/* HERO */}

      <section className="home-hero">

        <div className="home-hero__content">

          <div className="home-pill">
            <Sparkles size={17} />
            THE ULTIMATE RIGHTS ADVENTURE
          </div>

          <h1>
            Know your rights.
            <br />
            <span>Own your power!</span>
          </h1>

          <p className="home-hero__lead">
            Forget boring textbooks! Enter a world of stories,
            challenges and exciting missions. Learn the laws
            that protect you while having fun.
          </p>

          <div className="home-hero__stats">
            <span><Gamepad2 size={18} /> Play</span>
            <span><Star size={18} /> Earn XP</span>
            <span><Trophy size={18} /> Level Up</span>
          </div>

          {!loading && (
            <div className="home-cta">
              {loggedIn ? (
                <>
                  <Link
                    to={dashboardPath}
                    className="home-btn home-btn--primary"
                  >
                    <LayoutDashboard size={19} />
                    My Dashboard
                    <ArrowRight size={18} />
                  </Link>
                  {firstName && (
                    <span className="home-welcome">
                      Welcome back, {firstName}! 👋
                    </span>
                  )}
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="home-btn home-btn--primary"
                  >
                    <UserPlus size={19} />
                    Start Your Adventure
                    <ArrowRight size={18} />
                  </Link>

                  <Link
                    to="/login"
                    className="home-btn home-btn--ghost"
                  >
                    <LogIn size={19} />
                    Log In
                  </Link>
                </>
              )}
            </div>
          )}

        </div>

        {/* TWO MASCOTS */}

        <div className="home-characters">

          <div className="home-character home-character--ollie">
            <div className="home-character__bubble">
              Hoo-hoo! Ready to learn something awesome?
            </div>
            <div className="home-character__image home-owl">
              <Owl size={165} />
            </div>
            <div className="home-character__name">
              <strong>OLLIE</strong>
              <span>Friendly Guide 🦉</span>
              <small>AGES 8–12</small>
            </div>
          </div>

          <div className="home-character home-character--zara">
            <div className="home-character__bubble">
              Your rights. Your voice. Your power!
            </div>
            <div className="home-character__image home-zara">
              <Sherry size={180} />
            </div>
            <div className="home-character__name">
              <strong>SHERRY</strong>
              <span>Teen Defender ⚡</span>
              <small>AGES 13–16</small>
            </div>
          </div>

        </div>

        <span className="home-float home-float--one">⭐</span>
        <span className="home-float home-float--two">⚖️</span>
        <span className="home-float home-float--three">✨</span>

      </section>

      {/* GAME ARCADE */}

      <section className="home-section" id="arcade">

        <div className="home-section-label">
          <Gamepad2 size={18} />
          ENTER THE GAME ZONE
        </div>

        <h2 className="home-title">
          Choose Your Challenge!
        </h2>

        <p className="home-sub">
          Every challenge teaches you something new.
          Every correct move makes you stronger.
        </p>

        <div className="home-grid">

          {GAMES.map((game, index) => (
            <article
              key={game.title}
              className={`home-game home-game--${game.color}`}
            >
              <div className="home-game__top">
                <div className="home-game__icon">
                  {game.icon}
                </div>
                <span>0{index + 1}</span>
              </div>

              <span className="home-game__tag">
                {game.tag}
              </span>

              <h3>{game.title}</h3>

              <p>{game.description}</p>

              <div className="home-game__reward">
                <Star size={16} />
                {game.reward}
              </div>
            </article>
          ))}

        </div>

        <p className="home-game-note">
          <Lightbulb size={18} />
          More missions, challenges and rewards await inside your dashboard!
        </p>

      </section>

      {/* QUICK QUIZ */}

      <section className="home-quiz-section">

        <div className="home-quiz">

          <div className="home-quiz__left">

            <div className="home-section-label">
              <Brain size={18} />
              QUICK BRAIN CHALLENGE
            </div>

            <h2>
              Think You Know Your Rights?
            </h2>

            <p>
              Take a quick challenge. Test your legal knowledge
              and see how many questions you can get right!
            </p>

            <div className="home-quiz__score">
              <Trophy size={19} />
              Your score: {score}/{QUESTIONS.length}
            </div>

          </div>

          <div className="home-quiz__right">

            <div className="home-quiz__progress">
              <span>QUESTION {questionIndex + 1} OF {QUESTIONS.length}</span>
              <span><Flame size={16} /> QUICK QUEST</span>
            </div>

            <div className="home-quiz__bar">
              <span
                style={{
                  width: `${((questionIndex + 1) / QUESTIONS.length) * 100}%`
                }}
              />
            </div>

            <h3>{currentQuestion.question}</h3>

            <div className="home-quiz__options">

              {currentQuestion.options.map((option, index) => {

                let className = 'home-quiz__option';

                if (answered && index === currentQuestion.answer) {
                  className += ' is-correct';
                } else if (answered && index === selected) {
                  className += ' is-wrong';
                }

                return (
                  <button
                    type="button"
                    key={option}
                    className={className}
                    onClick={() => handleAnswer(index)}
                    disabled={answered}
                  >
                    <span>{String.fromCharCode(65 + index)}</span>
                    {option}

                    {answered && index === currentQuestion.answer && (
                      <CheckCircle2 size={19} />
                    )}

                    {answered &&
                      index === selected &&
                      !correct && (
                        <XCircle size={19} />
                      )}
                  </button>
                );
              })}

            </div>

            {answered && (
              <div className={`home-quiz__feedback ${correct ? 'success' : 'error'}`}>
                <strong>
                  {correct ? 'Brilliant! 🎉' : 'Not quite! Keep learning.'}
                </strong>
                <p>{currentQuestion.explanation}</p>

                <button
                  type="button"
                  onClick={nextQuestion}
                  className="home-btn home-btn--primary home-quiz__next"
                >
                  Next Question <ArrowRight size={17} />
                </button>
              </div>
            )}

          </div>

        </div>

      </section>

      {/* LEARNING JOURNEY */}

      <section className="home-section home-section--journey">

        <div className="home-section-label">
          <Award size={18} />
          YOUR JOURNEY
        </div>

        <h2 className="home-title">
          Learn. Play. Become a Defender.
        </h2>

        <p className="home-sub">
          Knowledge is your superpower. Here's how your adventure works.
        </p>

        <div className="home-journey">

          <div className="home-journey__item">
            <div className="home-journey__number">01</div>
            <BookOpen size={30} />
            <h3>Discover</h3>
            <p>Explore your rights, important laws and real-life stories.</p>
          </div>

          <div className="home-journey__item">
            <div className="home-journey__number">02</div>
            <Brain size={30} />
            <h3>Challenge</h3>
            <p>Solve puzzles, answer quizzes and make smart decisions.</p>
          </div>

          <div className="home-journey__item">
            <div className="home-journey__number">03</div>
            <Trophy size={30} />
            <h3>Earn Rewards</h3>
            <p>Collect XP, unlock badges and celebrate your progress.</p>
          </div>

          <div className="home-journey__item">
            <div className="home-journey__number">04</div>
            <Shield size={30} />
            <h3>Stand Up</h3>
            <p>Use your knowledge to make safer and smarter choices.</p>
          </div>

        </div>

        <div className="home-bottom-cta">

          <div>
            <h2>Ready to become a Rights Defender?</h2>
            <p>Your next adventure starts here. Let's go!</p>
          </div>

          {!loading && (
            loggedIn ? (
              <Link
                to={dashboardPath}
                className="home-btn home-btn--primary"
              >
                Continue Playing <ArrowRight size={18} />
              </Link>
            ) : (
              <Link
                to="/register"
                className="home-btn home-btn--primary"
              >
                Join EduRights Free <ArrowRight size={18} />
              </Link>
            )
          )}

        </div>

      </section>

      {/* FOOTER */}

      <footer className="home-footer">
        <div className="home-footer__brand">
          <Shield size={23} />
          EduRights
        </div>

        <p>
          Every child has rights. Every voice matters. 💜
        </p>

        <span>Learn your rights. Protect your future.</span>
      </footer>

    </main>
  );
}
