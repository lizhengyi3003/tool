export async function onRequest(context) {
  const filename = context.params.filename;
  const object = await context.env.content.get(`images/${filename}`);
  if (object) {
    return new Response(object.body, {
      headers: {
        'Content-Type': object.httpMetadata?.contentType || 'image/png',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } else {
    return new Response('Not found', { status: 404 });
  }
}