# FORM — Yuni’s Training Journal

A static workout website with the current three-week trainer program, Wednesday bike/swim options, Friday speed-run or generated-swim choices, workout logging, optional Sunday shoulder/lower-back mobility, recipes, calendar-month analytics, and a dimensional monthly habit/highlights journal.

## Render

Create a Render Static Site from this repository branch.

- Build command: `true`
- Publish directory: `public`

The entry page requires the shared password. A successful unlock lasts exactly 24 hours in that browser from the time of entry (no sliding renewal), then re-locks. A Lock button ends the session immediately. The app payload is encrypted with AES-256-GCM and a password-derived PBKDF2-SHA256 key. The password is never included in the published assets or saved to browser storage; only an expiring derived access key is retained. This is a browser-side personal access lock, not server-side account authentication. Do not use it as a secure vault: the source repository remains public and local journal data is not encrypted. It does not require ChatGPT sign-in. Workout logs and recipe edits stay in the visitor’s browser; they are not uploaded to Render. To move existing progress, export a backup from the old site and import it on the new site. Moving to another browser or domain does not automatically transfer progress.

The `render.yaml` file supports deploying with Render Blueprints as well.

## Local preview

Serve the `public` folder with any static HTTP server.

## Editing and packaging

Edit app files in `src/`. Run `node scripts/package.mjs` and supply the existing password on stdin to regenerate the encrypted `public/vault.json`. Do not put the password in the repository or build logs. Keep the published salt stable across updates so an existing 24-hour session remains valid. Serve only `public/`, which contains the entry page, access controller, styling, and encrypted payload. Render continues serving the checked-in package with build command `true`.

The monthly journal is included in Export backup / Import backup. Habits and insights are isolated by calendar month; a new month copies the most recent earlier month’s visible habits without copying checkoffs or reflections. Days are numbered high to low. Future habit checkoffs are disabled, while highlights can be written ahead. Hiding a habit preserves its existing entries.

## Notebook and sleep

The graph-paper notebook uses compact numbered rows, a highlights column, vertical habit headings, and a day-aligned sleep constellation. Its default habits are Reading my Bible, Movement, 80 oz of water daily, Shoulder rehab, Prayer, Reading, and Nutrition. Existing current/future months receive this preset once, retaining matching habit IDs and completions; unused starter habits remain hidden. Historical months and customized habits are preserved. Later edits are copied into newly created months.

Sleep is manual entry, with no Oura API connection. A row represents the morning of waking: Oura score (whole number 0–100) and previous-night hours (0–24). Each logged hours value becomes a star aligned to that row; only consecutive recorded nights connect. Missing hours remain gaps. The horizontal hours scale expands above 12 if needed. Monthly averages use actual recorded values, including zero, and exclude missing and future entries. Sleep values are included in the existing backup / restore flow.
