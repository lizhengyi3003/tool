export async function onRequest(context) {
  const formData = await context.request.formData();
  const username = formData.get('username'); // 邮箱
  const password = formData.get('password');
  const token = formData.get('cf-turnstile-response');
  const SECRET_KEY = '0x4AAAAAABnkZPrAemeKew_EP1Iu7fMmLXk';

  // 校验 Turnstile，未通过或未完成都返回 FALSE-3
  if (!token) {
    return new Response('FALSE-3');
  }
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

  const db = context.env.mysql;

  // 检查邮箱是否已存在
  const { results } = await db.prepare('SELECT * FROM account WHERE mail = ?').bind(username).all();
  if (results.length > 0) {
    return new Response('FALSE-2');
  }

  // 获取当前最大id
  const { results: idResults } = await db.prepare('SELECT MAX(id) as maxId FROM account').all();
  const nextId = (idResults[0]?.maxId || 0) + 1;

  // 插入新用户，phone_number和name填空
  await db.prepare('INSERT INTO account (id, mail, password, phone_number, name) VALUES (?, ?, ?, ?, ?)')
    .bind(nextId, username, password, '', '').run();

  return new Response('TRUE');
}