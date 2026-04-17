/**
 * Content collection schemas.
 *
 * All long-form content lives in `src/content/<collection>/`. Frontmatter is
 * validated at build time by Zod. Adding a new entry: see
 * `src/content/README.md`.
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const linkObject = z.object({
  pdf: z.string().url().optional(),
  arxiv: z.string().optional(),       // arXiv identifier, e.g. "2401.12345"
  doi: z.string().optional(),          // bare DOI, e.g. "10.1000/xyz"
  bibtex: z.string().optional(),       // path to .bib file in /public, or URL
  url: z.string().url().optional(),    // catch-all
});

const papers = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/papers' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).default(['Rouven Jahnke']),
    year: z.number().int().min(2000).max(2100),
    /** Free-form, e.g. "preprint", "submitted", "to appear in J. Algebra", "PhD thesis". */
    status: z.string(),
    /** Venue or journal name; falls back to status if absent. */
    venue: z.string().optional(),
    abstract: z.string().optional(),
    links: linkObject.default({}),
    /** Sort tiebreaker within a year (lower = earlier). */
    order: z.number().int().default(0),
    /** Hide entry without deleting the file. */
    draft: z.boolean().default(false),
  }),
});

const talks = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/talks' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    venue: z.string(),
    location: z.string().optional(),
    /** "invited", "contributed", "seminar", "expository", … */
    kind: z.string().default('seminar'),
    abstract: z.string().optional(),
    slidesUrl: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    /** Optional updated date for revisions. */
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

/** A single CV row. Sectioned at render time. */
const cv = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/cv' }),
  schema: z.object({
    section: z.enum([
      'education',
      'experience',
      'talks',
      'awards',
      'service',
      'languages',
      'skills',
    ]),
    title: z.string(),
    organization: z.string().optional(),
    location: z.string().optional(),
    /** ISO date or year string for the start. */
    start: z.string(),
    /** ISO date / year / "present" / undefined (for instantaneous events). */
    end: z.string().optional(),
    /** Sort key within a section — higher floats to top. */
    order: z.number().int().default(0),
    url: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { papers, talks, notes, cv };
