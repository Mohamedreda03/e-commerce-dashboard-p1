# Repository Guidelines

## Project Structure & Module Organization
The Next.js 16 App Router code lives in `app/`, with `layout.tsx` providing global wrappers and `globals.css` aggregating Tailwind 4 tokens. Feature routes sit under route groups such as `app/(auth)` for sign-in flows, while reusable UI elements stay in `components/ui/` (Button, Input, Label, Form). Validation schemas belong to `schema/` (e.g., `auth.schema.ts`) and light helpers land in `lib/utils.ts`. Static assets should be added to `public/`, and shared configs (ESLint, Tailwind, TypeScript, shadcn `components.json`) remain at the repo root for tooling clarity.

## Build, Test, and Development Commands
```
npm run dev    # Hot-reload dev server at http://localhost:3000
npm run build  # Production compile plus route analysis
npm run start  # Serve the output of `npm run build`
npm run lint   # ESLint with eslint-config-next and Tailwind plugins
```
Use the npm scripts directly so the experimental Tailwind/PostCSS pipeline matches the repo defaults.

## Coding Style & Naming Conventions
Write TypeScript-first React components; default to Server Components and opt into `"use client"` only when hooks (React Query, Zustand, react-hook-form) are required. Component files currently use lowercase (e.g., `components/ui/button.tsx`) while exported component names stay PascalCase; utilities and hooks use camelCase, and schema objects mirror their feature (`authFormSchema`). Keep JSX indented with two spaces, prefer semantic Tailwind stacks, and run `npm run lint` before every PR. When touching forms, reuse the shared `Form`, `Input`, and `Label` wrappers plus resolvers from `schema/` to ensure consistent validation.

## Testing Guidelines
Automated tests are not yet wired in; when adding them, colocate component tests next to the source (`components/ui/button.test.tsx`) using a Next-compatible Jest or Vitest setup, and keep workflow tests under `tests/` to cover flows defined in `app/(auth)`. Target functional assertions (validation messages, mutation states) rather than snapshots, and document any new npm scripts required to execute the suite so CI can mirror them.

## Commit & Pull Request Guidelines
Keep commits focused with short, imperative subjects similar to the existing `init` history (`add auth schema validation`, `refine dashboard cards`). Reference issue numbers in the body when applicable and describe the user-facing impact plus local verification. Pull requests should include: a summary paragraph, screenshots or GIFs for UI work, links to affected routes, and explicit notes about schema/config migrations so reviewers can rerun `npm run lint` and `npm run build` confidently.
