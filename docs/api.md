# API Contract (draft — confirm as a team before building against it)

All responses follow: `{ "success": boolean, ...data }` or `{ "success": false, "message": "..." }`.

## Auth
```
POST /api/auth/register
Body: { name, email, password, ageGroup }
Response: { success, user: { id, name, level, points, badges }, token }

POST /api/auth/login
Body: { email, password }
Response: { success, user: { id, name, level, points, badges }, token }
```

## Modules
```
GET /api/modules
Response: { success, modules: [{ id, title, ageGroup, order }] }

GET /api/modules/:id
Response: { success, module: { id, title, content, quizId } }
```

## Quizzes
```
GET /api/quizzes/:moduleId
Response: { success, quiz: { id, questions: [{ text, options }] } }
  # correctOptionIndex is never sent to the client

POST /api/quizzes/:id/submit   (auth required)
Body: { answers: [optionIndex, ...] }
Response: { success, score, pointsAwarded, newLevel, newBadges: [] }
```

## Progress
```
GET /api/progress   (auth required)
Response: { success, progress: [{ moduleId, completed, bestScore }] }

PUT /api/progress   (auth required)
Body: { moduleId, completed, score }
Response: { success, progress: { moduleId, completed, bestScore } }
```

Update this file whenever a request/response shape changes — this is what
prevents "frontend expected X, backend sent Y" mismatches.
