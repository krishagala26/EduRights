# EduRights — Gamified Legal Awareness Platform for Children

Interactive MERN web platform that teaches children (8–16) about their legal
rights through story-based modules, quizzes, points, levels and badges.

## 1. Problem
Children rarely encounter legal-rights concepts in an accessible, engaging
format. EduRights closes that gap with gamified, self-paced learning.

## 2. Solution
A web app where kids register, work through learning modules, take quizzes,
earn points/badges/levels, and browse a knowledge hub of articles and FAQs.

## 3. Features (MVP scope — see docs/requirements.md for full MoSCoW list)
- Registration / login + personalised dashboard (FR-01)
- Interactive learning modules (FR-02)
- Quizzes per module (FR-03)
- Points, levels, badges (FR-04, FR-05)
- Revisit completed topics (FR-06)
- Knowledge hub — articles, FAQs, case examples (FR-07)

## 4. Tech Stack
- **Frontend:** React (Vite), React Router, Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT

## 5. System Architecture
See `docs/architecture.md`.

```
React Frontend  →  Express/Node API  →  MongoDB
```

## 6. Screenshots
_Add once UI exists._

## 7. Installation

Clone and install both apps:

```bash
git clone <repo-url>
cd EduRights

cd server && npm install
cd ../client && npm install
```

## 8. Environment Variables
Copy `server/.env.example` to `server/.env` and fill in values. Never commit
`.env` files (see `.gitignore`).

## 9. Running Locally

```bash
# terminal 1
cd server
npm run dev

# terminal 2
cd client
npm run dev
```

Client runs on http://localhost:5173, API on http://localhost:5000.

## 10. API Documentation
See `docs/api.md`.

## 11. Database
See `docs/database.md`.

## 12. Testing
See `docs/testing.md`.

## 13. Team
| Name | Role |
|---|---|
| You | Team Lead + Frontend/Integration |
| Member 2 | Backend / API |
| Member 3 | Database + Gamification |
| Member 4 | Knowledge Hub + Content + Testing/Docs |

## 14. Branching
- `main` — stable, always demoable
- `develop` — integration branch
- `feature/<name>` — one branch per feature, PR into `develop`

## 15. Future Scope
Multilingual content, external legal-info APIs, comments/feedback on
modules, adaptive difficulty.
