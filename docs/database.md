# Database Schema (MongoDB / Mongoose)

See implementation in `server/models/`.

## User
| Field | Type | Notes |
|---|---|---|
| name | String | required |
| email | String | required, unique |
| passwordHash | String | bcrypt hash, never store plain text |
| ageGroup | String | "8-11" or "12-16" |
| points | Number | default 0 |
| level | Number | default 1 |
| badges | [String] | badge names/ids earned |

## Module
| Field | Type | Notes |
|---|---|---|
| title | String | required |
| ageGroup | String | "8-11" / "12-16" / "all" |
| content | String | lesson/story body |
| order | Number | display order |
| quizId | ObjectId → Quiz | |

## Quiz
| Field | Type | Notes |
|---|---|---|
| moduleId | ObjectId → Module | required |
| questions | [{ text, options[], correctOptionIndex }] | |

## Progress
| Field | Type | Notes |
|---|---|---|
| userId | ObjectId → User | required |
| moduleId | ObjectId → Module | required |
| completed | Boolean | default false |
| bestScore | Number | default 0 |
| attempts | [{ score, attemptedAt }] | history of quiz attempts |

`(userId, moduleId)` has a unique compound index — one progress record per
user per module.

Schema may evolve after the team's system-design meeting — update this file
alongside any model change.
