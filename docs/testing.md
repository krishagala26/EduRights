# Testing

Every feature should ship with basic checks before a PR is opened — see the
examples below. Use Postman (or similar) for manual API testing during
development; add automated tests where time allows.

## Auth (FR-01)
- [ ] Valid credentials → login succeeds
- [ ] Wrong password → error
- [ ] Nonexistent user → error
- [ ] Empty email → validation error
- [ ] Protected route without token → 401

## Quiz (FR-03, FR-04)
- [ ] Correct answers scored correctly
- [ ] Incorrect answers scored correctly
- [ ] Score persisted to Progress
- [ ] Points updated on User
- [ ] Badge unlocked at threshold
- [ ] Level updated at threshold

## Progress (FR-05, FR-06)
- [ ] Revisiting a completed module doesn't erase prior progress
- [ ] Dashboard reflects latest score/level/badges after a quiz

## Knowledge Hub (FR-07)
- [ ] Articles/FAQs/case examples render on open

Add results/notes here as features land, so the mid-point status note is
easy to compile.
