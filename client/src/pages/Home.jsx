import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Sparkles, LogIn, UserPlus, LayoutDashboard, Phone, BookOpen, Compass, Shield } from 'lucide-react';
import * as AuthModule from '../context/AuthContext';
import './Home.css';

/* ------------------------------------------------------------------ */
/* Auth helpers                                                        */
/* ------------------------------------------------------------------ */

// AuthContext.jsx may export `useAuth`, `AuthContext`, or both. We use whichever exists,
// so this page works without knowing the exact export name.
function useAuthSafe() {
  /* eslint-disable react-hooks/rules-of-hooks */
  // These checks are constant for the life of the app, so hook order never changes.
  if (AuthModule.AuthContext) return useContext(AuthModule.AuthContext);
  if (typeof AuthModule.useAuth === 'function') return AuthModule.useAuth();
  /* eslint-enable react-hooks/rules-of-hooks */
  return null;
}

function readStoredUser() {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Returns '/kids-dashboard', '/teen-dashboard' or '/dashboard'.
// Change these three strings if your routes in App.jsx are spelled differently.
export const KIDS_DASHBOARD_PATH = '/kids-dashboard';
export const TEEN_DASHBOARD_PATH = '/teen-dashboard';
export const MAIN_DASHBOARD_PATH = '/dashboard';

export function getDashboardPath(user) {
  if (!user) return MAIN_DASHBOARD_PATH;
  const raw = [user.role, user.ageGroup, user.age_group, user.userType]
    .filter(Boolean)
    .map((v) => String(v).toLowerCase().replace(/\s/g, ''))
    .join('|');

  if (/(kid|child|8-12|8–12)/.test(raw)) return KIDS_DASHBOARD_PATH;
  if (/(teen|13-18|13–18)/.test(raw)) return TEEN_DASHBOARD_PATH;
  return MAIN_DASHBOARD_PATH;
}

/* ------------------------------------------------------------------ */
/* Mascot                                                              */
/* ------------------------------------------------------------------ */

function Owl({ size = 130 }) {
  const ink = '#24204A';
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} role="img" aria-label="Ollie the owl, your guide">
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

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

// NOTE: Modules 3 and 4 paths are my best guess. Make them match your App.jsx routes.
const MODULES = [
  {
    id: 1,
    icon: '📚',
    title: 'The Shield of Knowledge',
    law: 'The RTE Act, 2009',
    blurb:
      'Every child aged 6 to 14 has the right to free and compulsory education. Help Aarav unlock the school gate with the Golden Book-Key!',
    hero: 'Aarav',
    path: '/modules/education',
    tone: 'gold',
  },
  {
    id: 2,
    icon: '🛡️',
    title: 'The Body Guard Rules',
    law: 'The POCSO Act, 2012',
    blurb:
      'Your body belongs to YOU. Meet Asha, build a Safety Bubble, learn to say a strong NO! and find your Trusted Adult Safe Circle.',
    hero: 'Asha',
    path: '/modules/personal-safety',
    tone: 'teal',
  },
  {
    id: 3,
    icon: '⚽',
    title: 'Playgrounds, Not Factories',
    law: 'Anti-Child Labour Laws',
    blurb: "Children belong in classrooms and playgrounds. Follow Maya's story and learn why childhood is protected.",
    hero: 'Maya',
    path: '/modules/child-labour',
    tone: 'green',
  },
  {
    id: 4,
    icon: '💻',
    title: 'The Digital Shield',
    law: 'Online Safety, Privacy & Cyber-Awareness',
    blurb: "Stay smart and safe online. Join Zee and build a digital shield that protects your privacy.",
    hero: 'Zee',
    path: '/modules/internet-safety',
    tone: 'blue',
  },
];

const ROLES = [
  {
    icon: <Compass size={28} />,
    title: 'Kids Explorer',
    age: 'Ages 8–12',
    text: 'Short, friendly 3D stories, easy quizzes and XP rewards. Learn your rights like an adventure.',
    tone: 'gold',
  },
  {
    icon: <Shield size={28} />,
    title: 'Teen Defender',
    age: 'Ages 13–18',
    text: 'Deeper stories on real laws, tougher quiz challenges and tools to stand up for yourself and others.',
    tone: 'violet',
  },
  {
    icon: <BookOpen size={28} />,
    title: 'Knowledge Hub',
    age: 'Everyone',
    text: 'A friendly library of rights, laws and helplines for children, parents and teachers.',
    tone: 'teal',
  },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Home() {
  const navigate = useNavigate();
  const ctx = useAuthSafe();

  const ctxUser = ctx && typeof ctx === 'object' && 'user' in ctx ? ctx.user : ctx;
  const loading = Boolean(ctx && ctx.loading);
  const user = ctxUser && typeof ctxUser === 'object' ? ctxUser : readStoredUser();
  const loggedIn = Boolean(user);
  const dashboardPath = getDashboardPath(user);
  const firstName = loggedIn ? String(user.name || user.fullName || user.username || '').split(' ')[0] : '';

  const openModule = (m) => navigate(loggedIn ? m.path : '/login', { state: loggedIn ? undefined : { from: m.path } });

  return (
    <main className="home">
      {/* ---------------- HERO ---------------- */}
      <section className="home-hero">
        <span className="home-float home-float--a" aria-hidden="true">⭐</span>
        <span className="home-float home-float--b" aria-hidden="true">📖</span>
        <span className="home-float home-float--c" aria-hidden="true">✨</span>

        <div className="home-hero__text">
          <p className="home-pill">
            <Sparkles size={16} /> Learn your rights through 3D stories
          </p>
          <h1>
            Know your rights.
            <br />
            <span>Be your own hero!</span>
          </h1>
          <p className="home-hero__lead">
            Watch short animated adventures, then take a fun quiz and earn XP. EduRights helps children and teens in
            India learn about the laws that protect them.
          </p>

          {loading ? null : loggedIn ? (
            <div className="home-cta">
              <Link to={dashboardPath} className="home-btn home-btn--primary">
                <LayoutDashboard size={20} /> Go to My Dashboard
              </Link>
              {firstName && <span className="home-welcome">Welcome back, {firstName}! 👋</span>}
            </div>
          ) : (
            <div className="home-cta">
              <Link to="/register" className="home-btn home-btn--primary">
                <UserPlus size={20} /> Sign Up Free
              </Link>
              <Link to="/login" className="home-btn home-btn--ghost">
                <LogIn size={20} /> Log In
              </Link>
            </div>
          )}
        </div>

        <div className="home-hero__mascot">
          <div className="home-bubble" role="note">
            Hoo-hoo! I'm <strong>Ollie</strong>. Ready for your rights adventure? 🦉
          </div>
          <div className="home-owl">
            <Owl size={190} />
          </div>
        </div>
      </section>


      {/* ---------------- MODULES ---------------- */}
      <section className="home-section" id="modules">
        {!loggedIn && !loading && (
          <p className="home-unlock">
            New here? <Link to="/register">Create a free account</Link> or <Link to="/login">log in</Link>.
          </p>)}
        <h2 className="home-title">Four Adventures to Explore</h2>
        <p className="home-sub">
          {loggedIn ? 'Pick a story and press play!' : 'Sign up then log in to unlock every story.'}
        </p>
        <div className="home-grid home-grid--4">
          {MODULES.map((m) => (
            <article key={m.id} className={`home-card home-module home-module--${m.tone}`}>
              <div className="home-module__top">
                <span className="home-module__icon" aria-hidden="true">{m.icon}</span>
                <span className="home-module__num">Module {m.id}</span>
              </div>
              <h3>{m.title}</h3>
              <p className="home-module__law">{m.law}</p>
              <p className="home-module__blurb">{m.blurb}</p>
              <p className="home-module__hero">Starring {m.hero}</p>

              <button
                type="button"
                className={`home-btn ${loggedIn ? 'home-btn--primary' : 'home-btn--locked'} home-btn--block`}
                onClick={() => openModule(m)}
              >
                {loggedIn ? (
                  <>Start Adventure</>
                ) : (
                  <>
                    <Lock size={18} /> Log in to unlock
                  </>
                )}
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* ---------------- ROLES ---------------- */}
      <section className="home-section home-section--tint">
        <h2 className="home-title">Made For You</h2>
        <p className="home-sub">EduRights changes to fit your age and role.</p>

        <div className="home-grid home-grid--3">
          {ROLES.map((r) => (
            <article key={r.title} className={`home-card home-role home-role--${r.tone}`}>
              <div className="home-role__icon">{r.icon}</div>
              <h3>{r.title}</h3>
              <p className="home-role__age">{r.age}</p>
              <p>{r.text}</p>
            </article>
          ))}
        </div>

        <div className="home-center">
          {loggedIn ? (
            <Link to="/knowledge-hub" className="home-btn home-btn--ghost-dark">
              <BookOpen size={18} /> Open the Knowledge Hub
            </Link>
          ) : (
            <Link to="/register" className="home-btn home-btn--primary">
              <UserPlus size={18} /> Join EduRights Free
            </Link>
          )}
        </div>
      </section>

      {/* ---------------- CHILDLINE ---------------- */}
      <section className="home-section">
        <div className="home-childline" role="region" aria-label="Childline 1098 helpline">
          <div className="home-childline__icon" aria-hidden="true">
            <Phone size={34} />
          </div>
          <div className="home-childline__text">
            <h2>Need help? You are never alone.</h2>
            <p>
              Call <strong>Childline 1098</strong>, India's free helpline for children. It is open 24 hours a day,
              every day. You can call for yourself or for a friend.
            </p>
          </div>
          <a href="tel:1098" className="home-childline__call">
            Call 1098
          </a>
        </div>
      </section>

      <footer className="home-footer">EduRights · Every child has rights. 💜</footer>
    </main>
  );
}
