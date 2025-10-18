export async function onRequest(context) {
  const filename = context.params.filename;
  const object = await context.env.content.get(`videos/${filename}`);
  if (object) {
    return new Response(object.body, {
      headers: {
        'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } else {
    return new Response('Not found', { status: 404 });
  }
}