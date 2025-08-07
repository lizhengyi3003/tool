// 纯JS模板渲染函数，供 Worker 或 API 端调用
const fs = require('fs');
const path = require('path');

function renderMailTemplate(code) {
  const templatePath = path.join(__dirname, '../../assets/mail/mailTemplate.html');
  let html = fs.readFileSync(templatePath, 'utf8');
  return html.replace('{{code}}', code);
}

module.exports = { renderMailTemplate };
