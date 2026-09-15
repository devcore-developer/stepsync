import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/study', '/performance', '/questions', '/review', '/readiness', '/assistant', '/accountability', '/notifications', '/profile', '/settings', '/subscription'],
    },
    sitemap: 'https://stepsync.app/sitemap.xml',
  };
}