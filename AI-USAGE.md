# AI Usage Notes

This project was built with **GitHub Copilot (agent mode, Claude Sonnet 4.5)** in VS Code, end to end.

## How it helped

- **Scaffolding**: generated the Vue 3 + TypeScript + Vuex + Vue Router project via Vue CLI with an inline preset, then installed and wired up Element Plus, axios, Less/Sass, and Playwright.
- **Implementation**: wrote the API service layer (`src/api`), Vuex modules for leagues/filtering and badge caching (`src/store/modules`), and all Vue components/views (`SearchBar`, `SportFilter`, `LeagueCard`, `BadgeModal`, `HomeView`).
- **Testing**: authored the Playwright smoke test (`tests/smoke.spec.ts`), including mocking the two TheSportsDB endpoints for deterministic, fast test runs.
- **Debugging**: diagnosed and fixed a TypeScript version incompatibility (Element Plus / `@types/lodash` type declarations require TS 4.7+ syntax, the CLI-scaffolded default was TS 4.5) and a port conflict between the dev server and an unrelated local project already running on port 8080.
- **PWA**: added `@vue/cli-plugin-pwa` (manifest, generated icons, Workbox service worker via `registerServiceWorker.ts`) and an offline/online network watcher (`src/networkStatus.ts`) that shows an Element Plus notification when the app loses connectivity and another when it reconnects.
- **Styling fix**: tracked down a filter-row height mismatch to `.el-input__wrapper` defaulting to `box-sizing: content-box` while `.el-select__wrapper` used `border-box` with a `min-height`; fixed by pinning both to `box-sizing: border-box; height: 36px`.
- **Docs**: this file and the project README were drafted by Copilot and reviewed by me.

## Design decisions

- Vue 3 (Composition API) + Element Plus + Vuex 4 + Vue Router 4, matching the target stack while using the modern Vue 3 line (Element UI is Vue 2-only; Element Plus is its Vue 3 counterpart).
- Vue CLI (Webpack-based) scaffold rather than Vite, per the required "Webpack" tooling.
- Season badge cache lives in Vuex, in-memory, keyed by league id, including caching "no badge found" so repeat clicks on the same league never re-hit the API.
- Single route/view — the assignment describes one filterable list screen, so extra routing wasn't added.
- One Playwright smoke test (with mocked API responses) rather than a full test suite, given the assignment's ~90 minute time-box.
- PWA offline/online notifications are directional by design: an offline warning fires immediately, but the "back online" success toast only fires if an offline notification was shown first, avoiding a spurious toast on first page load.
