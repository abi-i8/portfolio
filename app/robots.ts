import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Replace with Abijith A R's verified custom production domain once connected
  const baseUrl = 'https://abi-i8.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/static/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
