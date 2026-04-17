# Content authoring guide

All long-form content for the site lives here. Each subdirectory is a
[content collection](https://docs.astro.build/en/guides/content-collections/)
with a Zod-validated schema in `../content.config.ts`. The build will fail
loudly if any frontmatter field is missing or wrongly typed — that is the
intended behaviour.

```
src/content/
├── papers/   — preprints, papers, expository notes for /writing
├── talks/    — talks given (used by /cv and, eventually, /research)
├── notes/    — informal notes, MDX, KaTeX-enabled, RSS feed at /notes/rss.xml
└── cv/       — CV rows, grouped by `section` field on /cv
```

File names are not exposed in URLs except for `notes/`, where the slug is
derived from the file name (without extension). Use a sortable prefix
(`YYYY-MM-DD-…`) for chronological collections.

---

## papers/

```yaml
---
title: 'Title of the paper'
authors: ['Rouven Jahnke', 'Coauthor One']      # optional, defaults to you
year: 2026
status: 'preprint'                              # free text: preprint / submitted / to appear in … / published
venue: 'arXiv'                                  # optional
abstract: |                                     # optional, currently unused on /writing
  ...
links:
  arxiv: '2401.12345'                           # arXiv identifier (no leading "arXiv:")
  doi: '10.1000/xyz'                            # bare DOI
  pdf: 'https://example.org/paper.pdf'          # any URL
  bibtex: '/papers/2026-title.bib'              # path under /public
order: 0                                        # tiebreak within a year, larger = first
draft: false
---
```

The body is rendered as markdown only on a per-paper detail page (not yet
implemented). For now the listing on `/writing` uses only frontmatter.

## talks/

```yaml
---
title: 'A short title'
date: 2026-03-14
venue: 'Algebraic Geometry Seminar'
location: 'Universität Hamburg'
kind: 'seminar'                                 # invited / contributed / seminar / expository
abstract: 'Optional one-paragraph abstract.'
slidesUrl: 'https://example.org/slides.pdf'
draft: false
---
```

## notes/

```yaml
---
title: 'A clear, descriptive title'
date: 2026-04-15
summary: 'One sentence shown in /notes index and RSS.'
updated: 2026-04-20
draft: false
---

Body in **MDX**. Math via KaTeX:

Inline: $E = mc^2$.

Display:

$$
\sum_{n=1}^\infty \frac{1}{n^2} = \frac{\pi^2}{6}.
$$
```

The slug used in the URL is the file name without the `.md`/`.mdx` extension.

## cv/

One file per row in your CV. Files are grouped by `section` at render time
and sorted within each section by `order` (descending), then by `start`
(descending).

```yaml
---
section: education      # education | experience | talks | awards | service | languages | skills
title: 'BSc Mathematics'
organization: 'Universität Bonn'
location: 'Bonn, Germany'
start: '2026-10'
end: 'present'          # optional; omit for an instantaneous event
order: 100              # higher floats to top within the section
url: 'https://www.uni-bonn.de'
draft: false
---

Optional markdown body for one or two sentences of context. Most rows
don't need one.
```

---

## Adding a new entry

1. Drop a new file in the appropriate directory.
2. `pnpm dev` — the dev server reloads.
3. `pnpm build` — Zod validates frontmatter; failures point at the file.

## Removing an entry

Either delete the file or set `draft: true` in its frontmatter.
