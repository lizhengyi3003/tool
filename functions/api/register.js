export async function onRequestPost({ request, env }) {
  const form = await request.formData();
  const email = form.get('username');
  const code = form.get('verifyCode');
  // ...其他注册参数

  const realCode = await env['tool-kv'].get(`verify:${email}`);
  if (!realCode || realCode !== code) {
    return new Response('FALSE-4'); // 验证码错误
  }
  // 验证通过，写入数据库，完成注册
  // ...（此处补充你的注册逻辑）
  // 注册成功后可删除验证码
  await env['tool-kv'].delete(`verify:${email}`);
  return new Response('TRUE');
}
