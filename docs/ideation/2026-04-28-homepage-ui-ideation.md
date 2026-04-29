---
date: 2026-04-28
topic: homepage-ui
focus: homepage ui
---

# Ideation: Homepage UI

## Codebase Context

**Project shape**
- Vite + React 19 + Tailwind v4 frontend in `frontend/`, deployed to Vercel.
- `src/pages/Home.jsx` is a single ~650-line file containing nav, hero, stats, features, problem/solution, workflow, testimonials, FAQ, CTA, and footer.
- Routes: `/`, `/apply`, `/thesis`, `/install`, `/tutorial`. Hero CTAs both link to `/install`; the `/apply` waitlist route is not surfaced from the hero.

**Design language**
- Pure-black background (`#000000`), white text, `InputMono` monospace everywhere, lowercase copy, square borders, `[bracketed]` section labels.
- Framer-motion fade/slide-in on every section. Stats use a custom `AnimatedCounter` that fires on mount, not on viewport entry.
- Three / `@react-three/fiber` / `@react-three/drei` are installed; `components/ui/ascii-cube.jsx` and `canvas.jsx` exist but are not imported by `Home.jsx`.

**Notable risks / leverage points**
- Testimonials are fabricated personas (Sarah Chen, Marcus Reid, Elena Voss) on a waitlist site — credibility risk.
- Stats are small and abstract (20+ teams, 300+ files, 99% uptime, 2+ integrations) — read as weak rather than impressive.
- No inline email capture on the homepage; the page bounces visitors to `/install` to convert.
- No product visual anywhere — testimonials and stats do all the persuasion for a visual design tool.
- `index.html` sets `onselectstart="return false"` and `ondragstart="return false"`; `index.css` adds site-wide `user-select: none`. Hostile to accessibility, copy/paste, SEO snippeting.
- Geist font is preloaded in `index.html` but `InputMono` overrides it everywhere — wasted bytes.
- `og:image` is not declared in `index.html`.
- The actual wedge ("Rhino 7 & 8 on macOS") only appears inside FAQ #1 — missing from hero copy.

**Past learnings**
- No `docs/solutions/` or `docs/learnings/` directory in this repo. No prior ideation artifacts.

## Ranked Ideas

### 1. Rewrite the hero around a live product preview, sharp wedge headline, and inline waitlist
**Description:** Replace the current "one source of truth for 3D design teams" hero with: (a) a wedge-specific headline like "git for Rhino. on macOS." with the current generic line demoted to subhead, (b) a hero visual driven by either the existing `ascii-cube.jsx` or a small live three.js scene showing branch/version-history motion, (c) a single inline email-capture field where the two CTAs sit today, and (d) sharper differentiation if two CTAs remain (e.g. "join waitlist" primary, "read the thesis" → `/thesis` secondary).
**Rationale:** The homepage is a waitlist site whose hero currently leaks intent — it has no product visual, no email field, and a generic value prop. Three failure modes compound: visitors can't convert in place, can't see the product, and can't tell what specifically it is. The fix is the highest-leverage change on the page.
**Downsides:** A live three.js hero introduces perf and motion-slop risk on mobile; ascii-cube is the safer first cut. Inline email capture requires wiring `@emailjs/browser` (already a dep) into Home, replicating logic that likely lives on `/install`.
**Confidence:** 90%
**Complexity:** Medium
**Status:** Unexplored

### 2. Replace fabricated testimonials and weak stats with real credibility
**Description:** Cut the three-persona testimonial grid and the four-counter stats row. Replace with: (a) a founders block with photo + one-line bio that links to `/thesis`, (b) a named beta-studio list (real firms only, even if there are only two), (c) a single live waitlist counter ("X firms applying"), and (d) optional press/community mentions when they exist.
**Rationale:** "Sarah Chen, Principal, Chen Architecture" reads as fabricated to anyone who pattern-matches stock testimonials, and a 20+ teams / 300+ files counter framed as a flex undermines momentum rather than projecting it. Pre-launch, the founders + a single honest waitlist number outperform fake quotes.
**Downsides:** Requires real photos, real beta firms, and a waitlist count source. If those don't exist yet, the section shrinks to just the founders block — which is still better than the current state but visually thinner.
**Confidence:** 85%
**Complexity:** Low–Medium
**Status:** Unexplored

### 3. Lead with the problem — reorder so problem/solution sits immediately after the hero
**Description:** Move the problem/solution section (currently section 4 of 9) to position 2, immediately after the hero. Demote stats to a thin one-line "X firms applying" strip near the CTA section, or remove until numbers are real.
**Rationale:** The problem/solution block is the strongest argument on the page — concrete, specific, emotionally resonant ("project_final_v7.3dm"). It's currently buried behind stats and features. Pages that lead with the problem convert better than pages that lead with abstract claims.
**Downsides:** Disrupts the current rhythm; some visitors might want feature breadth before problem framing. Easily reversible.
**Confidence:** 80%
**Complexity:** Low
**Status:** Unexplored

### 4. Visualize the file-chaos pain directly on the homepage
**Description:** Add a small visual to the problem/solution section showing a real folder-listing of `project_final_v7.3dm`, `project_final_v7_REAL.3dm`, `project_final_v7_REAL_FINAL.3dm` collapsing/morphing into a single `main` branch. Use either a static SVG or a short framer-motion sequence triggered on viewport.
**Rationale:** The page already names this pain in copy ("no more _final_final_v7.3dm files"). Visualizing it converts the strongest line on the page from a claim into a demonstration. Concrete pain that the audience recognizes from their desktop right now.
**Downsides:** Risk of looking gimmicky if the animation is heavy. SVG-only version with a single fade transition is the safer first cut.
**Confidence:** 75%
**Complexity:** Low
**Status:** Unexplored

### 5. Strip selection blockers and add reduced-motion + semantic-landmark fallbacks
**Description:** Remove `onselectstart="return false"` and `ondragstart="return false"` from `index.html`, and remove the site-wide `user-select: none` rule from `index.css`. Add a `prefers-reduced-motion: reduce` block that disables the framer-motion entrance animations. Audit heading hierarchy — feature/workflow card titles use `<h3>` inside `<motion.div>` without a clear parent `<h2>`.
**Rationale:** The selection blockers actively break copy/paste, screen-reader navigation, link-share tooling, and search-engine snippet extraction — for no clear gain. Reduced-motion is a baseline accessibility expectation when motion is the spine of the page. Heading hierarchy affects SEO and a11y both.
**Downsides:** Removing the selection blocker is a deliberate aesthetic choice the team may want to keep; flag for confirmation. Reduced-motion fallback adds a few CSS lines but no design cost.
**Confidence:** 95%
**Complexity:** Low
**Status:** Unexplored

### 6. Performance & shipping hygiene bundle
**Description:** Five small fixes that ship together: (a) drop the Geist `<link>` preloads from `index.html` since `InputMono` overrides everywhere, (b) wrap `AnimatedCounter` in an `IntersectionObserver` so counts animate when seen, not on mount, (c) lazy-load testimonials/FAQ/CTA sections via `React.lazy` or simple viewport-gated mounting, (d) add `og:image` and `twitter:image` meta tags pointing at a real preview asset, (e) lock the type scale to ≤3 sizes (currently mixes `text-base`, `text-sm`, `text-xs`, `text-lg`, `text-xl`, `text-3xl`, `text-4xl`, `text-5xl`, `text-6xl`).
**Rationale:** Each item alone is small; together they materially reduce first-paint weight, fix a real bug (counters fire and then re-fire weirdly when the user scrolls past quickly), and make link-shares look right. The OG image is the single biggest "free win" once a preview asset exists.
**Downsides:** Type-scale tightening is the largest item — touches many components and benefits from a quick design pass before edits. Lazy loading adds a small layout-shift risk if not handled with min-heights.
**Confidence:** 85%
**Complexity:** Low–Medium
**Status:** Unexplored

### 7. CTA copy and routing cleanup
**Description:** Replace "contact sales" in the final CTA section with "join waitlist" or "email founders" — this is a pre-launch waitlist, not a sales product. Differentiate the two hero CTAs by intent: primary "join waitlist" (inline form or → `/apply`), secondary "read the thesis" → `/thesis`. Today both buttons go to `/install`, which collapses the choice into a coin flip.
**Rationale:** Cheapest leverage on the page. The two-CTA pattern only works when the secondary serves a different visitor segment (skeptics who want to read more) — currently both serve the same segment. "Contact sales" actively misrepresents the product stage.
**Downsides:** None significant. Pure copy/href change; reversible in one diff.
**Confidence:** 95%
**Complexity:** Low
**Status:** Unexplored

## Rejection Summary

| # | Idea | Reason Rejected |
|---|------|-----------------|
| 1 | Add a static product screenshot to the hero | Subsumed by Idea 1 (live preview is a superset) |
| 2 | Hide stats section until numbers are real | Weaker than Idea 2's replacement plan |
| 3 | Replace stats with feature tiles | Redundant — page already has a features section |
| 4 | Logo strip of beta firms / press mentions | Not actionable pre-launch with no logos to show |
| 5 | Sticky bottom-bar CTA on mobile | Conventional; covered by hero email capture in Idea 1 |
| 6 | Animate hero headline word-by-word | Polish-tier, not leverage; competes with Idea 1's hero rewrite |
| 7 | Procedural mouse-driven background motion | High cost, high slop risk; Idea 1's ascii-cube path covers brand motion at lower cost |
| 8 | "For whom" audience filter (solo / studio / production) | Strategic positioning question, not a UI ideation; better surfaced in /apply |
| 9 | 0studio vs Dropbox vs git LFS comparison row | Lower leverage than Idea 2; the FAQ already covers it textually |
| 10 | Add semantic landmarks audit as standalone idea | Folded into Idea 5 |
| 11 | Drop Geist preload as standalone idea | Folded into Idea 6 |
| 12 | IntersectionObserver for counter as standalone idea | Folded into Idea 6 |
| 13 | Lazy-load below-fold as standalone idea | Folded into Idea 6 |
| 14 | OG/Twitter image as standalone idea | Folded into Idea 6 |
| 15 | Type-scale audit as standalone idea | Folded into Idea 6 |
| 16 | "Contact sales" rename as standalone idea | Folded into Idea 7 |
| 17 | Hero CTA differentiation as standalone idea | Folded into Idea 7 |

## Session Log
- 2026-04-28: Initial ideation — ~33 candidates generated, 7 survived after consolidation and adversarial filtering.
