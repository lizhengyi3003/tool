export async function onRequestPost({ request, env }) {
  const { email } = await request.json();
  if (!email) return new Response('邮箱不能为空', { status: 400 });

  const code = Math.random().toString().slice(2, 8);
  await env.REGISTER_KV.put(`verify:${email}`, code, { expirationTtl: 300 });

  const mailRes = await fetch('https://register-mail.<你的worker子域>/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code })
  });
  if (!mailRes.ok) return new Response('邮件发送失败', { status: 500 });

  return new Response('验证码已发送');
}
