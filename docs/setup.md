# Setup Guide

## Prerequisites
- Node.js 18+
- MongoDB running locally, or an Atlas connection string

## 1. Clone
```bash
git clone <repo-url>
cd EduRights
```

## 2. Backend
```bash
cd server
npm install
cp .env.example .env
# edit .env: set MONGO_URI and JWT_SECRET
npm run dev
```
Confirm it's running: http://localhost:5000/api/health

## 3. Frontend
```bash
cd client
npm install
npm run dev
```
Open http://localhost:5173

## 4. Git workflow
```bash
git checkout develop
git pull origin develop
git checkout -b feature/<your-feature>

# ...work, commit...
git push -u origin feature/<your-feature>
# open a PR into develop
```

Never push directly to `main` or `develop`.

## 5. First things to check after cloning
- [ ] `server/.env` created and filled in (not committed)
- [ ] Backend health check responds
- [ ] Frontend loads and Navbar/routes render
- [ ] You can see your assigned GitHub Issue
