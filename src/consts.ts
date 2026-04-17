/**
 * Site-wide constants. Single source of truth for metadata, navigation,
 * and externally surfaced identifiers.
 *
 * Placeholders are written exactly as `[PLACEHOLDER: name]` so they remain
 * greppable across the codebase.
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
 * Owner identifiers. Hard placeholders for greppability — replace by editing
 * this single file rather than chasing strings through templates.
 */
export const OWNER = {
  fullName: 'Rouven Jahnke', // [PLACEHOLDER: full_name]
  currentAffiliation: '[PLACEHOLDER: current_affiliation]',
  futureAffiliation: 'Universität Bonn', // [PLACEHOLDER: future_affiliation] (from Oct 2026)
  email: '[PLACEHOLDER: email]',
  // Email obfuscation: for the public site we reverse the address client-side.
  // The reversed form here is itself a placeholder until a real address is set.
  emailReversed: ']liame :REDLOHECALP[',
  orcid: '[PLACEHOLDER: orcid_id]',
  orcidUrl: 'https://orcid.org/[PLACEHOLDER: orcid_id]',
  github: '[PLACEHOLDER: github_username]',
  githubUrl: 'https://github.com/[PLACEHOLDER: github_username]',
  mathstodon: '', // optional
  institutionalAddress: '[PLACEHOLDER: institutional_address]', // from Oct 2026
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
