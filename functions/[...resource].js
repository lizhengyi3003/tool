export async function onRequest(context) {
  const resourcePath = context.params.resource; // 例如 images/logo.png 或 videos/demo.mp4
  const object = await context.env.content.get(resourcePath);

  // 根据文件后缀判断 Content-Type
  function getContentType(filename) {
    if (filename.endsWith('.png')) return 'image/png';
    if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) return 'image/jpeg';
    if (filename.endsWith('.mp4')) return 'video/mp4';
    if (filename.endsWith('.ttf')) return 'font/ttf';
    // 可继续扩展
    return 'application/octet-stream';
  }

  if (object) {
    return new Response(object.body, {
      headers: {
        'Content-Type': object.httpMetadata?.contentType || getContentType(resourcePath),
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } else {
    return new Response('Not found', { status: 404 });
  }
}