/**
 * Site-wide constants. Single source of truth for metadata, navigation,
 * and externally surfaced identifiers.
 *
 * Identifiers default to the empty string. Templates *must* check truthiness
 * before rendering links / email so that empty fields disappear from the
 * page entirely instead of leaking placeholder strings into URLs.
 */

export const SITE = {
  name: 'Rouven Jahnke',
  url: 'https://rouvenjahnke.com',
  title: 'Rouven Jahnke',
  description:
    'Personal page of Rouven Jahnke — mathematics student, working in algebraic geometry.',
  language: 'en',
  locale: 'en_US',
} as const;

/**
 * Owner identifiers. Fill in below as fields become real.
 *
 *   - Empty string → field is hidden everywhere on the public site.
 *   - For URL-bearing fields, the URL is derived from the identifier and is
 *     only emitted when the identifier is non-empty.
 *
 * The string `[TODO]` is used in inline visible places where the user must
 * write content themselves (e.g. PGP fingerprint). It is greppable so the
 * remaining work is easy to find.
 */
const ORCID_ID = '';                           // e.g. '0000-0002-1825-0097'
const GITHUB_USERNAME = '';                    // e.g. 'rouvenjahnke'
const EMAIL_ADDRESS = '';                      // e.g. 'me@rouvenjahnke.com'

const reverseEmail = (s: string): string =>
  s ? s.split('').reverse().join('') : '';

export const OWNER = {
  fullName: 'Rouven Jahnke',
  currentAffiliation: 'Universität Hamburg',
  futureAffiliation: 'Universität Bonn',
  startsBonn: 'October 2026',

  email: EMAIL_ADDRESS,
  emailReversed: reverseEmail(EMAIL_ADDRESS),

  orcid: ORCID_ID,
  orcidUrl: ORCID_ID ? `https://orcid.org/${ORCID_ID}` : '',

  github: GITHUB_USERNAME,
  githubUrl: GITHUB_USERNAME ? `https://github.com/${GITHUB_USERNAME}` : '',

  mathstodon: '',          // e.g. '@you@mathstodon.xyz'
  mathstodonUrl: '',       // derived if you set this; left manual on purpose

  institutionalAddress: '', // e.g. 'Mathematisches Institut, Universität Bonn'
} as const;

/** Convenience flags for templates. */
export const HAS = {
  email: OWNER.email !== '',
  orcid: OWNER.orcid !== '',
  github: OWNER.github !== '',
  mathstodon: OWNER.mathstodon !== '',
  address: OWNER.institutionalAddress !== '',
} as const;

// al-folio convention: lowercase nav labels, "about" instead of "home".
export const NAV: ReadonlyArray<{ href: string; label: string }> = [
  { href: '/', label: 'about' },
  { href: '/notes', label: 'blog' },
  { href: '/writing', label: 'publications' },
  { href: '/research', label: 'research' },
  { href: '/teaching', label: 'teaching' },
  { href: '/cv', label: 'cv' },
];
