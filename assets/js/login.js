document.querySelector('.log-in-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  const res = await fetch(form.action, {
    method: 'POST',
    body: formData
  });
  const text = await res.text();

  let statusDiv = document.querySelector('.log-in-status');
  statusDiv.innerHTML = '';
  statusDiv.style.display = 'block';
  statusDiv.style.textAlign = 'center';
  statusDiv.style.fontWeight = 'bold';
  statusDiv.style.fontSize = '1.1em';

  if (text.trim() === 'TRUE') {
    statusDiv.textContent = '登录成功，正在跳转回主页面...';
    statusDiv.style.color = '#388e3c';
    setTimeout(() => {
      window.location.href = '../tool.html'; 
    }, 1500);
  } else {
    statusDiv.textContent = '账号或者密码错误！请重试。';
    statusDiv.style.color = '#e53935';
  }
});