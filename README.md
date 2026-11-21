# FORM — Yuni’s Training Journal

A static workout website with the current three-week trainer program, Wednesday bike/swim options, Friday speed-run or generated-swim choices, workout logging, recipes, and calendar-month analytics.

## Render

Create a Render Static Site from this repository branch.

- Build command: `true`
- Publish directory: `public`

The site is public to anyone with the URL. It does not require ChatGPT sign-in. Workout logs and recipe edits stay in the visitor’s browser; they are not uploaded to Render. To move existing progress, export a backup from the old site and import it on the new site. Moving to another browser or domain does not automatically transfer progress.

The `render.yaml` file supports deploying with Render Blueprints as well.

## Local preview

Serve the `public` folder with any static HTTP server.
