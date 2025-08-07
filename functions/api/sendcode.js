
import nodemailer from 'nodemailer';
import { renderMailTemplate } from '../../assets/mail/mailTemplate.js';

// QQ邮箱SMTP配置（请替换为你的实际信息）
const smtpConfig = {
  host: 'smtp.qq.com',
  port: 465,
  secure: true,
  auth: {
    user: 'feichuan613@foxmail.com', // 发件人邮箱
    pass: 'ynwjztkjcggudgbj' // QQ邮箱SMTP授权码
  }
};

async function sendMail({ to, subject, html }) {
  let transporter = nodemailer.createTransport(smtpConfig);
  try {
    await transporter.sendMail({
      from: smtpConfig.auth.user,
      to,
      subject,
      html
    });
    return true;
  } catch (e) {
    return false;
  }
}

export async function onRequestPost({ request, env }) {
  const { email } = await request.json();
  if (!email) return new Response('邮箱不能为空', { status: 400 });

  const code = Math.random().toString().slice(2, 8);
  await env.REGISTER_KV.put(`verify:${email}`, code, { expirationTtl: 300 });

  // 渲染邮件内容
  const html = renderMailTemplate(code);
  const subject = '您的注册验证码';
  const mailOk = await sendMail({ to: email, subject, html });
  if (!mailOk) return new Response('邮件发送失败', { status: 500 });
  return new Response('验证码已发送');
}
