# Sporty Leagues

A single-page app that lists sports leagues from [TheSportsDB](https://www.thesportsdb.com/free_sports_api), with search and sport-type filtering. Clicking a league fetches (and caches) its season badge image.

## Stack

Vue 3 + TypeScript, Vuex 4, Vue Router 4, Vue CLI (Webpack), Element Plus, Less + Sass, axios, Playwright.

## Project setup

```
npm install
```

### Compile and hot-reload for development

```
npm run serve
```

Runs at [http://localhost:5180](http://localhost:5180).

### Compile and minify for production

```
npm run build
```

### Lint

```
npm run lint
```

### Run the end-to-end smoke test

```
npm run test:e2e
```

This starts the dev server automatically, mocks both API endpoints, and verifies: the league list renders, the search bar filters it, the sport dropdown filters it, and clicking a league shows its season badge.

## Architecture

```
src/
  api/            axios client + fetchAllLeagues / fetchSeasonBadge
  types/          shared League / SeasonBadge TypeScript interfaces
  store/modules/  leagues.ts (list, search text, sport filter, derived getters)
                  badges.ts (per-league badge cache, keyed by league id)
  components/     SearchBar, SportFilter, LeagueCard, BadgeModal
  views/          HomeView.vue - composes everything
tests/
  smoke.spec.ts   Playwright e2e smoke test (API mocked)
```

- **Filtering** is derived state in the `leagues` Vuex module (`filteredLeagues` getter combines search text + selected sport, `sportOptions` getter derives the dropdown values from the fetched leagues).
- **Badge caching**: `badges` module stores results in a `Record<idLeague, SeasonBadge | null>`. `fetchBadge` checks the cache first and only calls the API on a cache miss; a `null` result ("no badge found") is cached too so a league without a badge isn't re-fetched on every click. Cache is in-memory only (cleared on page reload) — no `localStorage` persistence.
- Both **Less** and **Sass** are used across components (per the target tech stack) to confirm both pre-processors are wired up in the Webpack build.

## Known limitations / time-boxing notes

- Badge cache is in-memory (per session) only, not persisted across reloads.
- Only one Playwright smoke test covers the core flow (search, sport filter, badge-on-click); no unit tests were added.
- No pagination/virtualization for the league list (the API returns a few hundred leagues, rendered as a plain grid).
- Minimal visual polish — Element Plus defaults are used as-is beyond basic responsive grid/flex layout.

See [AI-USAGE.md](./AI-USAGE.md) for details on AI tool usage during this assignment.
