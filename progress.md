# Progress

## 2026-04-17

Branch: `test-phd-academic-redesign`

Completed:
- Repositioned the site as an academic dossier for an early-stage mathematics researcher rather than a generic personal homepage.
- Rebuilt the global visual system with a sober paper-like palette, dossier panels, restrained navigation, and a research-oriented homepage layout.
- Reworked `index`, `research`, `writing`, `teaching`, and `cv` so the public narrative consistently points toward a research career.
- Removed fake public output from the visible surface by hiding placeholder papers, talks, and awards.
- Added the public GitHub profile link and updated the build config so `astro check` ignores the `github-page/` Jekyll reference folder.

Verification:
- `pnpm build` passed successfully on 2026-04-17.

Next:
- Replace `public/prof_pic.svg` with a real portrait when available.
- Add real talks, awards, service, and publication entries as they exist.
- Review the branch in a browser on desktop and mobile before merging.
