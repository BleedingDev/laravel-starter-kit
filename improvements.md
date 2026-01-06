# Improvements Backlog (Laravel Starter Kit - Inertia + React)

> Purpose: Capture stricter / higher-signal improvements for later adoption.
> Scope: Linting, formatting, type safety, runtime strictness, tooling.

## Front-end (ESLint / TypeScript / Prettier)

### 1) Enable type-aware ESLint rules (high value)
**Why:** current ESLint config is non-type-aware, so it misses a class of issues (`no-floating-promises`, `no-misused-promises`, unsafe `any` usage, etc.).
**Current state:** `eslint.config.js` uses `typescript-eslint` recommended, but no `parserOptions.project` or type-checked config.
**Change:**
- Add a dedicated `tsconfig.eslint.json` with `extends: "./tsconfig.json"` and `include` for `resources/js`.
- Switch to `typescript-eslint` type-checked configs:
  - `...typescript.configs.recommendedTypeChecked`
  - `...typescript.configs.strictTypeChecked`
  - optionally `...typescript.configs.stylisticTypeChecked` if you want style rules.
- Set `languageOptions.parserOptions.project` to the new `tsconfig.eslint.json`.
**Trade-off:** slower lint; some rules will require changes in existing code.

### 2) Make React hooks exhaustive deps an error
**Why:** stale deps create subtle runtime bugs; warnings are easy to ignore.
**Current state:** `react-hooks/exhaustive-deps` is `warn`.
**Change:** set to `error` in `eslint.config.js`.
**Trade-off:** more noise in complex hooks.

### 3) Tighten TypeScript compiler flags
**Why:** `strict: true` is on, but several safety flags are still off.
**Current state:** `allowJs: true`, `skipLibCheck: true`, and many strict flags are commented.
**Change ideas (tsconfig.json):**
- Enable: `noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitOverride`, `useUnknownInCatchVariables`, `noUncheckedSideEffectImports`.
- Consider: `allowJs: false` (if you want full TS). Remove legacy JS.
- Consider: `skipLibCheck: false` for maximum strictness.
**Trade-off:** more failures from third-party types and legacy JS.

### 4) Run Prettier on the entire repo (not just resources)
**Why:** Prettier currently only runs on `resources/` and ignores shadcn UI components. Config files are only ESLinted (and Prettier rules are disabled in ESLint).
**Current state:** `npm run lint` runs `prettier --write resources/`.
**Change:** use `prettier --write .` and rely on `.prettierignore` for shadcn and mail views.
**Trade-off:** may reformat config files and scripts; ensure ignore list is correct.

### 5) Add Stylelint for CSS
**Why:** Tailwind + custom CSS currently has no linting. Stylelint can catch invalid CSS or rule misuse.
**Change:** add Stylelint with the Tailwind config plugin and lint `resources/css`.
**Trade-off:** extra tooling and config.


## Back-end (PHPStan / Pint / Rector)

### 6) Include tests in PHPStan analysis
**Why:** test code is currently not checked by PHPStan, which can hide type issues.
**Current state:** `phpstan.neon` paths exclude `tests/`.
**Change:** add `tests` to `parameters.paths`.
**Trade-off:** fixes needed in tests, but improves reliability.

### 7) Enable stricter PHPStan flags
**Why:** some of the most useful safety checks are opt-in.
**Change ideas (phpstan.neon):**
- `checkExplicitMixed: true`
- `checkMissingVarTagType: true`
- `checkMissingIterableValueType: true`
- `checkGenericClassInNonGenericObjectType: true`
- `reportUnmatchedIgnoredErrors: true`
**Trade-off:** more findings; may require docblocks or type fixes.

### 8) Enforce Eloquent runtime strictness
**Why:** prevent runtime surprises like lazy-loading and attribute issues.
**Change:** in `AppServiceProvider::boot()` call:
- `Model::shouldBeStrict()`
- `Model::preventLazyLoading()`
(If already enforced by `nunomaduro/essentials`, confirm before adding.)
**Trade-off:** more runtime exceptions until all lazy-loads are fixed.


## Workflow / CI strictness

### 9) Add pre-commit hooks (lint + tests)
**Why:** reduce CI failures and keep the repo consistently formatted.
**Change:** add `husky` + `lint-staged` to run `npm run test:lint` and `composer test:lint` on staged files.
**Trade-off:** slower commits; but higher consistency.

### 10) Keep CI strict but fast
**Why:** this repo already has strict CI; tune for speed without dropping checks.
**Change ideas:**
- Cache Node modules or use `npm ci` + caching.
- Cache `vendor` via composer cache or `composer install --prefer-dist` (already used).
- Confirm Playwright cache behavior to avoid redundant installs.


## Optional / Advanced

### 11) ESLint import / a11y / unicorn rules
**Why:** add more correctness and accessibility guarantees.
**Change:** add:
- `eslint-plugin-jsx-a11y`
- `eslint-plugin-import`
- `eslint-plugin-unicorn`
**Trade-off:** more rules, sometimes opinionated.

### 12) Stricter formatting consistency for shadcn files
**Why:** current shadcn components use different style; they are excluded from Prettier.
**Change:** either keep them ignored (recommended) or remove from `.prettierignore` and accept reformatting.
**Trade-off:** if reformatting, future shadcn updates may conflict.

### 13) Remove deprecated Rector strictBooleans set
**Why:** current Rector config emits deprecation warnings for `strictBooleans` (new Rector versions).
**Change:** drop `strictBooleans` from `rector.php` prepared sets and rely on `codeQuality` + `codingStyle`.
**Trade-off:** some boolean strictness rules may change or relax.

### 14) Make SSR toggles explicit in env
**Why:** SSR is enabled by default but not obvious; tests required a hard disable.
**Change:** document `INERTIA_SSR_ENABLED` / `INERTIA_SSR_URL` in `.env.example` and default local to false if desired.
**Trade-off:** dev SSR becomes opt-in, so teams relying on SSR must turn it on explicitly.


## Notes and references

- ESLint config: `eslint.config.js`
- TS config: `tsconfig.json`
- Prettier config: `.prettierrc` / `.prettierignore`
- PHPStan config: `phpstan.neon`
- Pint config: `pint.json`
- Rector config: `rector.php`
- CI workflow: `.github/workflows/tests.yml`
