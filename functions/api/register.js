export async function onRequest(context) {
  const formData = await context.request.formData();
  const token = formData.get('cf-turnstile-response');
  const SECRET_KEY = '0x4AAAAAABnkZPrAemeKew_EP1Iu7fMmLXk';

  const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: new URLSearchParams({
      secret: SECRET_KEY,
      response: token,
      remoteip: context.request.headers.get('CF-Connecting-IP')
    })
  });
  const verifyData = await verifyRes.json();

  return new Response(verifyData.success ? 'TRUE' : 'FALSE');
}










import mysql from 'mysql2/promise';

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

  // 2. 连接数据库
  const connection = await mysql.createConnection({
    host: '你的数据库地址',
    user: '你的数据库用户名',
    password: '你的数据库密码',
    database: '你的数据库名'
  });

  // 3. 检查邮箱是否已存在
  const [rows] = await connection.execute('SELECT * FROM users WHERE mail = ?', [username]);
  if (rows.length > 0) {
    await connection.end();
    return new Response('FALSE-2'); // 邮箱已存在
  }

  // 4. 插入新用户
  await connection.execute('INSERT INTO users (mail, password) VALUES (?, ?)', [username, password]);
  await connection.end();
  return new Response('TRUE');
}