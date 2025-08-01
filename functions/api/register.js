export async function onRequest(context) {
  if (context.request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }
  const formData = await context.request.formData();

  // 1. 获取 Turnstile token
  const token = formData.get('cf-turnstile-response');
  const SECRET_KEY = '你的密钥'; // 用你的Secret Key替换

  // 2. 校验 Turnstile token
  const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: new URLSearchParams({
      secret: SECRET_KEY,
      response: token,
      // remoteip: context.request.headers.get('CF-Connecting-IP') // 可选
    })
  });
  const verifyData = await verifyRes.json();
  if (!verifyData.success) {
    return new Response('Turnstile 校验失败', { status: 400 });
  }

  // 3. 校验通过后，继续你的注册逻辑
  // ...你的注册逻辑...
}