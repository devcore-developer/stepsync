import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://stepsync.app', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://stepsync.app/login', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://stepsync.app/register', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];
}