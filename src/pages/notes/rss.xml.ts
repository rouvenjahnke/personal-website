import type { APIContext } from 'astro';
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '~/consts';

export async function GET(context: APIContext) {
  const notes = await getCollection('notes', ({ data }) => !data.draft);
  const sorted = notes.sort((a, b) => +b.data.date - +a.data.date);
  const site = context.site?.toString() ?? SITE.url;

  return rss({
    title: `${SITE.name} — Notes`,
    description: 'Informal mathematical notes by Rouven Jahnke.',
    site,
    items: sorted.map((note) => ({
      title: note.data.title,
      pubDate: note.data.date,
      description: note.data.summary ?? '',
      link: `/notes/${note.id}`,
    })),
    customData: '<language>en-us</language>',
  });
}
