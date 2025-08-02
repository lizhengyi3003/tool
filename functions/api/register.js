export async function onRequest(context) {
  const formData = await context.request.formData();
  const username = formData.get('username'); // 邮箱
  const password = formData.get('password');
  const token = formData.get('cf-turnstile-response');
  const SECRET_KEY = '0x4AAAAAABnkZPrAemeKew_EP1Iu7fMmLXk';

  // 1. 校验 Turnstile
  const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: new URLSearchParams({
      secret: SECRET_KEY,
      response: token,
      remoteip: context.request.headers.get('CF-Connecting-IP')
    })
  });
  const verifyData = await verifyRes.json();
  if (!verifyData.success) {
    return new Response('FALSE-3');
  }

  // 2. 连接 D1 数据库（context.env.mysql 为 D1 绑定名）
  const db = context.env.mysql;

  // 3. 检查邮箱是否已存在
  const { results } = await db.prepare('SELECT * FROM users WHERE mail = ?').bind(username).all();
  if (results.length > 0) {
    return new Response('FALSE-2'); // 邮箱已存在
  }

  // 4. 插入新用户
  await db.prepare('INSERT INTO users (mail, password) VALUES (?, ?)').bind(username, password).run();

  return new Response('TRUE');
}