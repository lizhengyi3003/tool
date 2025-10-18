// 纯JS模板渲染函数，供 Worker 或 API 端调用
export function renderMailTemplate(code) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:400px;margin:40px auto;background:#fff;border-radius:8px;box-shadow:0 2px 8px #eee;padding:32px;">
      <h2 style="color:#0078d7;">您的注册验证码</h2>
      <div style="font-size:2em;color:#e67e22;letter-spacing:4px;margin:16px 0;">${code}</div>
      <div style="font-size:0.95em;color:#888;margin-top:24px;">请在 5 分钟内输入验证码完成注册。<br>如非本人操作请忽略此邮件。</div>
    </div>
  `;
}
