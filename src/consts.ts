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
const ORCID_ID = '0009-0009-7520-2719';
const GITHUB_USERNAME = 'rouvenjahnke';
const EMAIL_ADDRESS = 'rouven.jahnke@web.de';

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

  mathstodon: '@rjahnke@mathstodon.xyz',
  mathstodonUrl: 'https://mathstodon.xyz/@rjahnke',

  institutionalAddress: '', // e.g. 'Mathematisches Institut, Universität Bonn'
} as const;

/**
 * Convenience flags for templates.
 *
 * Compared via a helper so the argument widens to `string`; otherwise the
 * `as const` literal types above would make `x !== ''` a compile error
 * (ts 2367) once any of the fields is filled in.
 */
const isSet = (s: string): boolean => s !== '';

export const HAS = {
  email: isSet(OWNER.email),
  orcid: isSet(OWNER.orcid),
  github: isSet(OWNER.github),
  mathstodon: isSet(OWNER.mathstodon),
  address: isSet(OWNER.institutionalAddress),
} as const;

export const NAV: ReadonlyArray<{ href: string; label: string }> = [
  { href: '/', label: 'Home' },
  { href: '/research', label: 'Research' },
  { href: '/writing', label: 'Writing' },
  { href: '/teaching', label: 'Teaching' },
  { href: '/notes', label: 'Notes' },
  { href: '/cv', label: 'CV' },
  { href: '/contact', label: 'Contact' },
];
