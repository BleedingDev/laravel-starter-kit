# Update Plan (Strict + Validated)

This plan follows the staged order requested. Each phase has **hard gates** (tests/builds) and a **dev-browser validation** step with screenshots.

## Status (as of 2026-01-06)

- Phase 0: done (bootstrap + baseline validation)
- Phase 1: done (PHP deps updated + tests + dev-browser screenshots)
- Phase 2: done (frontend deps updated + tests/build + dev-browser screenshots)
- Phase 3+: pending

## Phase 0 — Environment + Baseline

1. Install prerequisites
   - PHP 8.4+ (brew)
   - Composer 2.x
   - Node 22+ / npm
2. Bootstrap project
   - `composer install`
   - `npm install`
   - `cp .env.example .env`
   - `php artisan key:generate`
   - `touch database/database.sqlite`
   - `php artisan migrate`
3. Start app
   - `composer dev` (or `php artisan serve` + `npm run dev`)
4. Baseline validation (hard gate)
   - `npm run test:lint`
   - `npm run test:types`
   - `npm run build`
   - `npm run build:ssr`
   - `composer test`
5. Baseline dev-browser screenshots
   - `/` (welcome)
   - `/login`
   - `/register` (create user)
   - `/dashboard`
   - `/settings/profile`
   - `/settings/password`
   - `/settings/appearance`
   - `/settings/two-factor`

## Phase 1 — PHP Updates

1. `composer outdated --direct`
2. Update PHP deps (strict): `composer bump` then `composer update --with-all-dependencies`
3. Fix regressions
4. Validation gate
   - `composer test`
   - `npm run build`
5. dev-browser screenshots (same routes)

## Phase 2 — Frontend Updates

1. `npx npm-check-updates` (review)
2. `npx npm-check-updates -u` + `npm install`
3. Fix regressions
4. Validation gate
   - `npm run test:lint`
   - `npm run test:types`
   - `npm run build`
   - `npm run build:ssr`
   - `composer test`
5. dev-browser screenshots (same routes)

## Phase 3 — Ultracite + Oxlint Migration

1. Init Ultracite with Oxlint provider
2. Configure Oxlint + keep Prettier for Tailwind ordering
3. Fix regressions / rule parity
4. Validation gate
   - `npm run lint` (new pipeline)
   - `npm run test:types`
   - `npm run build`
   - `npm run build:ssr`
   - `composer test`
5. dev-browser screenshots (same routes)

## Phase 4 — Base UI (Shadcn) Migration

1. Re-init shadcn using preset (Base UI + Mira + gray/blue + hugeicons + noto-sans)
2. Replace Radix components and update CSS/theme
3. Fix regressions
4. Validation gate
   - `npm run build`
   - `npm run build:ssr`
   - `npm run test:types`
   - `composer test`
5. dev-browser screenshots (expect visual diffs; report but allow)

## Phase 5 — Lefthook Hooks

1. Add `lefthook.yml` with:
   - pre-commit: `npm run test:lint` + `npm run test:types`
   - pre-push: `composer test`
2. `npx lefthook install`
3. Verify hooks via `npx lefthook run pre-commit --all-files` and `npx lefthook run pre-push`
