
import { renderMailTemplate } from '../../assets/mail/mailTemplate.js';

// 直接用 fetch 调用第三方邮件API（如 SendGrid），不再用 nodemailer、fs、path

export async function onRequestPost({ request, env }) {
  const { email } = await request.json();
  if (!email) return new Response('邮箱不能为空', { status: 400 });

  const code = Math.random().toString().slice(2, 8);
  await env['tool-kv'].put(`verify:${email}`, code, { expirationTtl: 300 });

  // 渲染邮件内容
  const html = renderMailTemplate(code);
  const subject = '您的注册验证码';

  // 用 Resend API 发送邮件（推荐，支持 fetch，免费额度高）
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'feichuan613@foxmail.com', 
      to: [email],
      subject,
      html
    })
  });
  if (!res.ok) return new Response('邮件发送失败', { status: 500 });
  return new Response('验证码已发送');
}
