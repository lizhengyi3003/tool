import fs from 'fs';
import path from 'path';

// 你需要在 Cloudflare Pages Functions 环境下使用第三方邮件API（如SendGrid、Mailgun、QQ邮箱SMTP等）
// 下面以伪代码形式演示，具体API调用请替换 sendMail 函数

async function sendMail({ to, subject, html }) {
  // 这里请替换为你实际的邮件发送API调用
  // 例如 fetch('https://api.sendgrid.com/v3/mail/send', ...)
  // 或 SMTP 客户端调用
  // 返回 true 表示成功，false 表示失败
  return false;
}

export async function onRequestPost({ request, env }) {
  const { email } = await request.json();
  if (!email) return new Response('邮箱不能为空', { status: 400 });

  const code = Math.random().toString().slice(2, 8);
  await env.REGISTER_KV.put(`verify:${email}`, code, { expirationTtl: 300 });

  // 读取HTML模板并渲染
  const templatePath = path.join(process.cwd(), 'assets/mail/mailTemplate.html');
  let html = fs.readFileSync(templatePath, 'utf8');
  html = html.replace('{{code}}', code);

  // 邮件主题
  const subject = '您的注册验证码';

  // 发送邮件
  const mailOk = await sendMail({ to: email, subject, html });
  if (!mailOk) return new Response('邮件发送失败', { status: 500 });

  return new Response('验证码已发送');
}
