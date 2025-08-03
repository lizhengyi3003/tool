export async function onRequest(context) {
  const url = new URL(context.request.url);
  const fontName = url.pathname.split('/').pop();

  const object = await context.env.content.get(`fonts/${fontName}`);
  if (!object) {
    return new Response('Not Found', { status: 404 });
  }

  let contentType = 'application/octet-stream';
  if (fontName.endsWith('.ttf')) contentType = 'font/ttf';
  if (fontName.endsWith('.woff')) contentType = 'font/woff';
  if (fontName.endsWith('.woff2')) contentType = 'font/woff2';
  if (fontName.endsWith('.otf')) contentType = 'font/otf';

  return new Response(object.body, {
    headers: {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Security-Policy': "frame-ancestors 'none'"
    }
  });
}