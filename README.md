# FORM — Yuni’s Training Journal

A static workout website with the current three-week trainer program, Wednesday bike/swim options, Friday speed-run or generated-swim choices, workout logging, optional Sunday shoulder/lower-back mobility, calendar-month analytics, and a dimensional monthly habit/highlights journal.

## Render

Create a Render Static Site from this repository branch.

- Build command: `true`
- Publish directory: `public`

The entry page requires the shared password. A successful unlock lasts exactly 24 hours in that browser from the time of entry (no sliding renewal), then re-locks. A Lock button ends the session immediately. The app payload is encrypted with AES-256-GCM and a password-derived PBKDF2-SHA256 key. The password is never included in the published assets or saved to browser storage; only an expiring derived access key is retained. This is a browser-side personal access lock, not server-side account authentication. Do not use it as a secure vault: the source repository remains public and local journal data is not encrypted. It does not require ChatGPT sign-in. The frontend stays on Render. Workout logs and journal entries also save locally and sync to a separate Cloudflare Worker and D1 database. Only encrypted snapshots are uploaded. Open the same canonical Render URL on each device and use the existing shared password. Wait for the header to say Synced before switching devices. Offline changes remain local until the site reconnects. A first connection combines existing checkoffs and distinct notes, and asks the user to review differing nonempty values before merging. Export/import remains available for independent backups. This is a single personal journal shared by anyone with the password, not multiple user accounts.

The `render.yaml` file supports deploying with Render Blueprints as well.

## Local preview

Serve the `public` folder with any static HTTP server.

## Editing and packaging

Edit app files in `src/`. Run `node scripts/package.mjs` and supply the existing password on stdin to regenerate the encrypted `public/vault.json`. Do not put the password in the repository or build logs. Keep the published salt stable across updates so an existing 24-hour session remains valid. Serve only `public/`, which contains the entry page, access controller, styling, and encrypted payload. Render continues serving the checked-in package with build command `true`.

The monthly journal is included in Export backup / Import backup. Habits and insights are isolated by calendar month; a new month copies the most recent earlier month’s visible habits without copying checkoffs or reflections. Days start at 1 at the top. Future habit checkoffs are disabled, while highlights can be written ahead. Hiding a habit preserves its existing entries.

## Notebook and sleep

The graph-paper notebook uses compact numbered rows, a highlights column, vertical habit headings, and a day-aligned sleep constellation. Its default habits are Reading my Bible, Movement, 80 oz of water daily, Shoulder rehab, Prayer, Reading, and Nutrition. Existing current/future months receive this preset once, retaining matching habit IDs and completions; unused starter habits remain hidden. Historical months and customized habits are preserved. Later edits are copied into newly created months.

Sleep is manual entry, with no Oura API connection. A row represents the morning of waking: Oura score (whole number 0–100) and previous-night hours (0–24). Each logged hours value becomes a star aligned to that row; only consecutive recorded nights connect. Missing hours remain gaps. The horizontal hours scale expands above 12 if needed. Monthly averages use actual recorded values, including zero, and exclude missing and future entries. Sleep values are included in the existing backup / restore flow.

## Monthly pages

Habit journal opens a library of saved monthly pages. Each page has its own route (`#journal/2026-11`), preserves the existing month-keyed data, and can be reopened after refreshing or using browser Back. Previous / Next turns between calendar-month pages, creating only an empty new page with the earlier month’s habit names. A month card shows consistency, checkoff and reflection totals; a breakdown within the page lists each habit’s completed days. Past-month consistency uses all calendar days; the current month excludes future days. Day order is a saved display preference (ascending or descending) that never remaps stored dates, and the sleep constellation follows the chosen order. The day column is wider and the notebook grid is kept level so digits stay aligned with their row. The dimensional cover, spine, page shadows, and page-turn transition preserve the notebook style. All pages save locally, are included in cloud sync, and remain included in backup / restore.

Monthly pages now start with day 1 at the top, as requested. A one-time display-preference migration sets existing pages to ascending order without moving any stored day records or changing their checkoffs, notes, or sleep values.

The Recipes feature, seeded meal content, meal imagery, navigation, training-page promotion, and recipe editors have been removed. New backups contain training and journal data only. Older backups are still accepted, and an old Recipes bookmark returns to training.

## Cloud sync

The backend uses Cloudflare Workers Free and D1 Free. The Workers plan must stay Free: no paid upgrade is needed or configured. Free limits can temporarily stop sync; the local copy remains available. The source config allows only the canonical Render origin. Browser requests authenticate with a separate one-way proof derived from the existing 24-hour access key, then receive a token capped at that unlock expiry. The encryption key itself is never sent to Cloudflare. A separate HKDF key encrypts snapshots with AES-256-GCM in the browser; compression is applied before encryption where supported. Backend secrets live in Cloudflare secrets, never in this repository.

Each browser keeps a replica with field timestamps and deletion tombstones. Stable item IDs merge arrays; workout-session epochs isolate new sessions from stale checkoffs. D1 saves use atomic compare-and-swap revisions and retain the current and previous ciphertext snapshots. No plaintext journal, password, key, or token is logged. Remote updates defer rendering while the user is typing or editing a dialog; local deltas preserve unseen remote changes. Foreground polling runs every ten seconds, with debounced uploads and reconnection retries.

Worker source, schema and deployment config are in `cloud-sync/`. Set `src/sync-config.js` to the deployed Worker URL, rebuild the encrypted frontend, and commit the public package to trigger Render’s existing deployment. Keep the vault salt stable: changing the password or salt requires a planned encrypted-data migration and new server authentication proof. Never replace or delete the production D1 database during routine updates.
