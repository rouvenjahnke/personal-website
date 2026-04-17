# rouvenjahnke.com

Personal academic website for Rouven Jahnke. Built with [Astro 5][astro] and
deployed to [Cloudflare Pages][cf-pages] from this repository's `main`
branch.

The site is intentionally austere: hand-written CSS, system-feeling type
(EB Garamond + Inter), no JavaScript on pages that don't need it, no analytics,
no dark mode. The aesthetic target is "future mathematician", not "startup
founder".

[astro]: https://astro.build
[cf-pages]: https://pages.cloudflare.com

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Astro 5 (static output) |
| Language | TypeScript, strict mode |
| Content | Markdown / MDX via Astro Content Collections, Zod-validated |
| Math | KaTeX (server-side) via `remark-math` + `rehype-katex` |
| Type | EB Garamond (body, italic) + Inter (headings/UI), self-hosted via `@fontsource-variable` |
| Styling | Hand-written CSS with custom properties, no Tailwind |
| Hosting | Cloudflare Pages, GitHub-driven deploys |

Total transferred size per page (gzipped, excluding fonts) is under 15&nbsp;KB.

## Prerequisites

- Node.js 20.10 or newer (22 LTS recommended)
- [pnpm][pnpm] 10+ (or npm 10+ — both work; pnpm is faster)

[pnpm]: https://pnpm.io

## Local development

```sh
pnpm install
pnpm dev                # http://localhost:4321
pnpm typecheck          # astro check (TypeScript strict)
pnpm build              # static site → ./dist
pnpm preview            # serve ./dist locally
```

The build runs `astro check` first; warnings or type errors fail the
build. That is intentional — the site must build cleanly on a fresh clone.

If you prefer npm:

```sh
npm install
npm run dev
npm run build
npm run preview
```

## Project layout

```
.
├── astro.config.mjs       — Astro + remark/rehype config
├── public/                — static assets (favicons, /cv.pdf, OG image)
├── src/
│   ├── consts.ts          — site metadata + owner identifiers (single source of truth)
│   ├── content.config.ts  — Zod schemas for content collections
│   ├── content/
│   │   ├── README.md      — content authoring guide (start here when editing)
│   │   ├── papers/        — preprints / papers (frontmatter only)
│   │   ├── talks/         — talks given
│   │   ├── notes/         — informal MDX notes (RSS feed, KaTeX-enabled)
│   │   └── cv/            — CV rows, grouped by `section`
│   ├── components/        — Astro components (header, footer, paper entry, …)
│   ├── layouts/Base.astro — global <head>, layout primitives, SEO metadata
│   ├── pages/             — file-system routes
│   └── styles/
│       ├── tokens.css     — design tokens (colour, type scale, spacing, layout)
│       ├── reset.css
│       ├── base.css       — typography & base elements
│       ├── layout.css     — header, footer, prose, entry list
│       ├── print.css      — A4 print stylesheet (/cv prints cleanly)
│       └── katex-overrides.css
└── README.md              — this file
```

## Personalising the site

All identifiers and bio fragments are written as `[PLACEHOLDER: name]` so
they are greppable. Replace them in this order:

```sh
grep -rn '\[PLACEHOLDER:' src public
```

Things to fill in:

- `src/consts.ts` — `OWNER.email`, `OWNER.emailReversed`, `OWNER.orcid`,
  `OWNER.github`, `OWNER.institutionalAddress`, `OWNER.currentAffiliation`.
- `src/pages/index.astro` — `[PLACEHOLDER: bio_paragraph]`.
- `src/pages/research.astro` — `[PLACEHOLDER: research_statement]` and the
  in-progress list.
- `src/pages/contact.astro` — PGP fingerprint placeholder.
- `src/content/papers/`, `src/content/cv/`, `src/content/talks/` — replace
  placeholder entries with real ones, or delete them.
- `public/cv.pdf` — replace with the real CV PDF.

For the email: `OWNER.email` should be the address forwards (e.g.
`me@example.org`); `OWNER.emailReversed` is currently unused, kept for
future migration. The `<ObfuscatedEmail>` component reverses the address
client-side, so the forward form never appears in the HTML source.

## Adding content

See [`src/content/README.md`](./src/content/README.md). In short:

- Drop a markdown / MDX file into the right collection directory.
- The schema in `src/content.config.ts` validates frontmatter at build
  time. A bad field fails the build — that is the point.

## Deployment — Cloudflare Pages

The site is purely static; any static host works. Cloudflare Pages is the
intended target.

### One-time setup

1. **Create the GitHub repository** (if not already done):
   - On GitHub, create a new repository (e.g. `rouvenjahnke/personal-website`).
   - Push this directory to it (see "First push" at the bottom of this
     README).

2. **Connect Cloudflare Pages to the repository**:
   - Cloudflare Dashboard → Workers & Pages → Create → Pages → *Connect to Git*.
   - Select the GitHub repository.
   - Project name: `rouvenjahnke-com` (or anything — the public hostname
     comes from your custom domain, not this name).
   - Production branch: `main`.

3. **Build settings**:

   | Field | Value |
   | --- | --- |
   | Framework preset | Astro |
   | Build command | `pnpm install --frozen-lockfile && pnpm build` |
   | Build output directory | `dist` |
   | Root directory | *(leave blank)* |
   | Node version | `22` (set `NODE_VERSION=22` in *Environment variables* if needed) |

   Cloudflare auto-detects most of this when you choose the Astro preset,
   but the explicit values above always work.

4. **First deploy**: Cloudflare runs `pnpm install && pnpm build` and
   serves `./dist`. Within a minute you have a `*.pages.dev` URL.

### Custom domain — `rouvenjahnke.com`

Apex (`rouvenjahnke.com`) plus `www → apex` redirect.

1. **Add the domain to Cloudflare** as a zone (if not already managed by
   Cloudflare DNS). Update the registrar's nameservers to Cloudflare's.
2. **In the Pages project** → *Custom domains* → *Set up a custom domain*:
   - Add `rouvenjahnke.com` — Cloudflare creates a `CNAME` (flattened to
     A/AAAA at the apex) automatically.
   - Add `www.rouvenjahnke.com` — same wizard.
3. **www → apex redirect**:
   - Cloudflare Dashboard → *Rules* → *Redirect Rules* → *Create rule*.
   - Match: hostname equals `www.rouvenjahnke.com`.
   - Action: `Static → 301`, target URL
     `https://rouvenjahnke.com${http.request.uri.path}`.
   - Save and deploy.
4. **Always Use HTTPS**: SSL/TLS → *Edge Certificates* → enable.
5. **HSTS** (optional but recommended once you're sure the domain stays
   on HTTPS): SSL/TLS → *Edge Certificates* → *Enable HSTS*.

### After the first deploy

Every push to `main` triggers a rebuild. Pull-request branches build to
preview URLs automatically.

## Quality bar

The build is expected to satisfy:

- `astro check` — zero errors, zero warnings, zero hints.
- Lighthouse — Performance / Accessibility / Best Practices / SEO all
  ≥&nbsp;95 on the home page and on a representative note page.
- Per-page transferred size under 100&nbsp;KB excluding fonts.
- WCAG&nbsp;AA contrast minimum.

Verify locally:

```sh
pnpm build
pnpm preview &
npx lighthouse http://localhost:4321/ \
  --only-categories=performance,accessibility,best-practices,seo \
  --chrome-flags="--headless"
```

## License

All site **content** (text, CV entries, notes) is © Rouven Jahnke and not
licensed for reuse. The **template / scaffolding** (configuration, design
system, components) is released under the MIT licence — see `LICENSE` if
present, or open an issue.

## Acknowledgements

Aesthetic calibration drew on Peter Scholze's homepage, Terence Tao's
*What's New*, the Stacks Project, and Edward Tufte's print typography
(via Tufte CSS). None of those sites are copied; the influence is in
restraint, not pixels.
