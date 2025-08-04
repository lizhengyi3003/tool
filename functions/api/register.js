export async function onRequest(context) {
  const formData = await context.request.formData();
  const username = formData.get('username'); 
  const password = formData.get('password');
  const token = formData.get('cf-turnstile-response');
  const SECRET_KEY = '0x4AAAAAABnkZPrAemeKew_EP1Iu7fMmLXk';

  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailReg.test(username)) {
    return new Response('FALSE-5');
  }

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

  const { results } = await db.prepare('SELECT * FROM account WHERE mail = ?').bind(username).all();
  if (results.length > 0) {
    return new Response('FALSE-2');
  }

  const { results: idResults } = await db.prepare('SELECT MAX(id) as maxId FROM account').all();
  const nextId = (idResults[0]?.maxId || 0) + 1;

  await db.prepare('INSERT INTO account (id, mail, password, phone_number, name) VALUES (?, ?, ?, ?, ?)')
    .bind(nextId, username, password, '', '').run();

  return new Response('TRUE');
}