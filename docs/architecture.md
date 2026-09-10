# Architecture

```
React Frontend (client/)
        │  HTTP/REST (Axios)
        ↓
Express + Node API (server/)
        │  Mongoose
        ↓
MongoDB
```

## Layers
- **client/** — React UI, one page per feature, calls the API via `src/api/axios.js`.
- **server/routes/** — defines URL → controller mapping per feature.
- **server/controllers/** — request handling + response shaping (owners TODO).
- **server/models/** — Mongoose schemas (User, Module, Quiz, Progress).
- **server/middleware/** — auth (`protect`) and error handling.

## Auth flow
1. Client posts credentials to `/api/auth/login`.
2. Server verifies password, returns a JWT + user object.
3. Client stores the token (`localStorage`) via `AuthContext`.
4. Subsequent requests attach `Authorization: Bearer <token>` (handled by the axios interceptor).
5. Protected server routes use the `protect` middleware to verify the token.

## Ownership (see README §13)
| Area | Owner |
|---|---|
| Frontend structure, dashboard, integration | Member 1 (Lead) |
| Auth, quiz, progress APIs | Member 2 |
| DB schemas, gamification logic | Member 3 |
| Knowledge hub, content, testing/docs | Member 4 |
