export interface ProjectCaseStudy {
  title: string;
  category: 'mathematical tooling' | 'knowledge systems' | 'academic infrastructure';
  period: string;
  status: string;
  summary: string;
  details: string[];
  primaryLink: {
    href: string;
    label: string;
  };
  secondaryLink?: {
    href: string;
    label: string;
  };
}

export interface RepositoryCard {
  name: string;
  href: string;
  description: string;
  updated: string;
  area: string;
  stack: string;
}

export const PROJECT_CASE_STUDIES: readonly ProjectCaseStudy[] = [
  {
    title: 'Academic website',
    category: 'academic infrastructure',
    period: '2026',
    status: 'ongoing',
    summary:
      'A deliberately austere personal website for presenting mathematical work, notes, and a research trajectory without portfolio theatrics.',
    details: [
      'Built as a static Astro system with strict TypeScript, handwritten CSS, and content collections.',
      'Structured around academic primitives: notes, CV, writing, projects, repositories, teaching.',
      'Designed to read like a research dossier rather than a startup landing page.',
    ],
    primaryLink: {
      href: 'https://github.com/rouvenjahnke/personal-website',
      label: 'Repository',
    },
  },
  {
    title: 'Obsidian Lean Integration',
    category: 'mathematical tooling',
    period: '2025',
    status: 'prototype',
    summary:
      'An attempt to bring theorem-prover workflows closer to mathematical note-taking through Lean 4 integration inside Obsidian.',
    details: [
      'Combines syntax support, language-server ideas, and proof-state visualisation.',
      'Relevant as infrastructure for rigorous mathematical writing and formal experimentation.',
      'Represents the overlap of mathematics, tooling, and interface design.',
    ],
    primaryLink: {
      href: 'https://github.com/rouvenjahnke/obsidian-lean-integration',
      label: 'GitHub',
    },
  },
  {
    title: 'Study Analytics',
    category: 'knowledge systems',
    period: '2025',
    status: 'working system',
    summary:
      'A self-tracking environment for focused study sessions, summaries, and retrospective analysis.',
    details: [
      'Centred on Pomodoro-based session tracking and daily/weekly review generation.',
      'Useful as a meta-project on long-horizon intellectual work and disciplined study.',
      'Closer to operational research on learning habits than to a conventional app showcase.',
    ],
    primaryLink: {
      href: 'https://github.com/rouvenjahnke/study-analytics',
      label: 'GitHub',
    },
  },
  {
    title: 'Markwhen File Sync',
    category: 'knowledge systems',
    period: '2025',
    status: 'released',
    summary:
      'A bridge between structured Obsidian metadata and Markwhen timeline files for chronological views of knowledge work.',
    details: [
      'Automates synchronisation instead of forcing manual timeline maintenance.',
      'Built around explicit file-based workflows rather than opaque SaaS abstractions.',
      'Fits the broader theme of durable personal research infrastructure.',
    ],
    primaryLink: {
      href: 'https://github.com/rouvenjahnke/markwhen-file-sync',
      label: 'GitHub',
    },
  },
] as const;

export const REPOSITORY_CARDS: readonly RepositoryCard[] = [
  {
    name: 'personal-website',
    href: 'https://github.com/rouvenjahnke/personal-website',
    description:
      'Static academic website built with Astro and strict TypeScript; current public research profile.',
    updated: '2026-04-17',
    area: 'academic infrastructure',
    stack: 'Astro · TypeScript · CSS',
  },
  {
    name: 'goal-planning-vault',
    href: 'https://github.com/rouvenjahnke/goal-planning-vault',
    description:
      'Public vault of templates, scripts, and workflow examples for structured planning and knowledge work.',
    updated: '2026-04-03',
    area: 'knowledge systems',
    stack: 'Obsidian · Markdown · automation',
  },
  {
    name: 'obsidian-lean-integration',
    href: 'https://github.com/rouvenjahnke/obsidian-lean-integration',
    description:
      'Lean 4 integration ideas for Obsidian, including syntax support and goal visualisation.',
    updated: '2026-02-05',
    area: 'mathematical tooling',
    stack: 'TypeScript · Lean · Obsidian',
  },
  {
    name: 'study-analytics',
    href: 'https://github.com/rouvenjahnke/study-analytics',
    description:
      'Session tracking and retrospective analysis for disciplined long-form study.',
    updated: '2025-09-22',
    area: 'learning systems',
    stack: 'analytics · study workflows',
  },
  {
    name: 'markwhen-file-sync',
    href: 'https://github.com/rouvenjahnke/markwhen-file-sync',
    description:
      'File synchronisation between Obsidian note metadata and Markwhen timeline files.',
    updated: '2025-11-10',
    area: 'knowledge systems',
    stack: 'TypeScript · filesystems · Obsidian',
  },
] as const;
