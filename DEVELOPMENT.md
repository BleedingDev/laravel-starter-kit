# Development Guidelines

This repo is intentionally strict. The goal is a predictable environment where everyone knows what passes, what fails, and why.

## Quick Check (Always Run Before Share/Review)

```bash
composer lint
composer test
```

If both pass, the codebase is consistent and safe to review.

## Workflow

- Branch off `main` and keep changes small and focused.
- Red / Green / Refactor: Red = write or update a failing test, Green = minimal change to pass, Refactor = clean up while keeping tests green.
- Be a devil's advocate during review: challenge assumptions and edge cases.
- Take your time to read the requirement and the code before changing anything.

## Quality Gates (What "Green" Means)

- Tests: `composer test`
  - Runs full PHP test suite, coverage, lint checks, and static analysis.
- Linting: `composer lint`
  - Runs Rector, Pint, and frontend linting.
- Types: `composer test:types`
  - Runs PHPStan and TypeScript checks.

If anything fails, fix it before asking for review.

## Reviews

- Human review is required for all backend changes.
- Use an automated review assistant (CodeRabbit, Greptile, etc.) if available, but treat it as a second reviewer, not the final word.

## AI Usage (Backend Included)

AI is allowed to touch backend code, but only with clear boundaries:

- Define the scope up front (files, behavior, and tests).
- Require full diffs for review before merging.
- Run `composer lint` and `composer test` on any backend change.
- If the requirement is unclear, stop and ask. Do not guess.

## Predictable Environment

- Use the versions listed in `composer.json` and `package.json`.
- Use `composer setup` for a fresh local setup.
- Keep the database configuration consistent with `.env.example`.

## Issue Hygiene

When creating or splitting work into issues:

Bug report checklist:
- Steps to reproduce
- Expected vs actual behavior
- Logs or screenshots (if UI)
- Impact / severity

Feature request checklist:
- Desired behavior
- User value / reason
- Edge cases
- Acceptance criteria

## Keep AI Guidelines Current

If dependencies or core rules change, refresh the AI instructions:

- Update `CLAUDE.md` if package versions or rules changed.
- Keep `boost.json` and any `.ai/guidelines/*` files in sync with current practices.
