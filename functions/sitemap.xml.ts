interface Env {
  DB?: any;
  SITE_URL?: string;
}

function escapeXml(unsafe: any): string {
  if (unsafe == null) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const INITIAL_SLUGS = [
  { slug: 'panduan-lengkap-pola-asuh-demokratis-anak-masa-kini', updatedAt: '2026-08-08' },
  { slug: '5-aktivitas-sensory-play-seru-untuk-melatih-motorik-balita', updatedAt: '2026-08-09' },
  { slug: 'mengenal-bahaya-stunting-dan-cara-pencegahannya-sejak-1000-hpk', updatedAt: '2026-08-10' },
];

export const onRequest: PagesFunction<Env> = async (context) => {
  const { env } = context;
  const requestUrl = new URL(context.request.url);

  // Perbaikan: abaikan SITE_URL yang masih berisi example.com / domain.com
  let rawSiteUrl = env.SITE_URL || requestUrl.origin;
  if (
    !rawSiteUrl ||
    rawSiteUrl.includes('example.com') ||
    rawSiteUrl.includes('domain.com')
  ) {
    rawSiteUrl = requestUrl.origin || 'https://parenting.my.id';
  }
  const siteUrl = rawSiteUrl.replace(/\/$/, '');

  let posts: { slug: string; updatedAt: string }[] = INITIAL_SLUGS;
  let products: { slug: string; updatedAt: string }[] = [];
  let productsNavPath = '/produk';

  if (env.DB) {
    try {
      const { results } = await env.DB.prepare(
        "SELECT slug, updated_at as updatedAt FROM posts WHERE status = 'published' ORDER BY id DESC"
      ).all();
      if (results && results.length > 0) {
        posts = results.map((r: any) => ({
          slug: r.slug,
          updatedAt: r.updatedAt
            ? r.updatedAt.split('T')[0]
            : new Date().toISOString().split('T')[0],
        }));
      }

      const prodRes = await env.DB.prepare(
        "SELECT slug, updated_at as updatedAt FROM products WHERE status = 'available' ORDER BY id DESC"
      ).all();
      if (prodRes?.results && prodRes.results.length > 0) {
        products = prodRes.results.map((r: any) => ({
          slug: r.slug,
          updatedAt: r.updatedAt
            ? r.updatedAt.split('T')[0]
            : new Date().toISOString().split('T')[0],
        }));
      }

      const pathRow = await env.DB.prepare(
        "SELECT value FROM configs WHERE key = 'products_nav_path'"
      ).first<string>('value');
      if (pathRow) {
        productsNavPath = pathRow.startsWith('/') ? pathRow : `/${pathRow}`;
      }
    } catch (e) {
      console.error('Error fetching posts or products for sitemap:', e);
    }
  }

  const urls = posts
    .map(
      (p) => `
  <url>
    <loc>${escapeXml(`${siteUrl}/baca/${encodeURIComponent(p.slug)}`)}</loc>
    <lastmod>${escapeXml(p.updatedAt)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('');

  const productUrls = products
    .map(
      (p) => `
  <url>
    <loc>${escapeXml(`${siteUrl}${productsNavPath}/${encodeURIComponent(p.slug)}`)}</loc>
    <lastmod>${escapeXml(p.updatedAt)}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`
    )
    .join('');

  const staticPages = [
    { url: `${siteUrl}/privacy`, priority: '0.5' },
    { url: `${siteUrl}/about`, priority: '0.6' },
    { url: `${siteUrl}/contact`, priority: '0.6' },
    { url: `${siteUrl}/disclaimer`, priority: '0.5' },
    { url: `${siteUrl}/terms`, priority: '0.5' },
  ];

  const staticUrls = staticPages
    .map(
      (p) => `
  <url>
    <loc>${escapeXml(p.url)}</loc>
    <changefreq>monthly</changefreq>
    <priority>${escapeXml(p.priority)}</priority>
  </url>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${escapeXml(siteUrl)}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>${staticUrls}${urls}${productUrls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
};
