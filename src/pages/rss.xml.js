import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  const sortedArticles = articles.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'Fabio Souto',
    description: 'I make things for the internet.',
    site: context.site,
    items: sortedArticles.map((article) => ({
      title: article.data.title,
      pubDate: article.data.date,
      description: article.data.subtitle || '',
      link: `/articles/${article.id}/`,
    })),
  });
}
