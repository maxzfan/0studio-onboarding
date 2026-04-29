# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**0studio Onboarding** — a landing page and waitlist/application site for 0studio, an AI-powered design collaboration platform. Built with React/Vite, deployable to Vercel, and optionally packaged as a macOS Electron desktop app.

All source lives under `frontend/`. Use `pnpm` (v9.15.4) as the package manager.

## Commands

Run from `frontend/`:

```bash
pnpm run dev              # Vite dev server at localhost:5173
pnpm run build            # Production build
pnpm run lint             # ESLint
pnpm run preview          # Preview production build locally

# Vercel (requires Vercel CLI)
pnpm run vercel-dev       # Local dev with serverless API functions

# Electron / Desktop
pnpm run electron:dev     # Concurrent: Vite + Electron (dev mode)
pnpm run electron         # Run Electron against built files
pnpm run electron:build   # Build + package Electron app
pnpm run electron:build:mac  # Build macOS DMG specifically
```

## Environment

See `frontend/BUILD_DMG.md` for macOS DMG build steps.

## Architecture

### Routes

Defined in `src/App.jsx` with React Router v7:

| Path | Page | Purpose |
|------|------|---------|
| `/` | `Home.jsx` | Landing page |
| `/apply` | `Apply.jsx` | Multi-step application form (6 steps) |
| `/thesis` | `Thesis.jsx` | About/manifesto page |
| `/download` | `Download.jsx` | macOS DMG download links |

### API

Single Vercel serverless function at `api/submit-application.js`:
- Accepts POST with form fields: `name`, `email`, `birthday`, `instagram`, `tiktok`, `vibes`, `otherVibe`, `videoFileName`
- Validates age server-side and sends a notification email

The Vite dev server proxies `/api` calls to avoid CORS issues (configured in `vite.config.js`).

### Key Patterns

- **Styling:** Tailwind CSS v4 utility classes + Framer Motion for animations. Dark theme (black background). Custom font: InputMono (loaded from `public/`).
- **State:** React hooks only — no global state manager. Each page manages its own state.
- **Class merging:** `cn()` helper from `src/lib/utils.js` (clsx + tailwind-merge).
- **Path alias:** `@` resolves to `src/` (configured in `vite.config.js`).
- **Electron:** In dev mode loads from `http://localhost:5173`; in production bundles the Vite build. Targets macOS ARM64 + Intel.
- **3D components:** Three.js via `@react-three/fiber` + `@react-three/drei` (used in `src/components/ui/`).
