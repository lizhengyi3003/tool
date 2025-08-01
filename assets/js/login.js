document.addEventListener('DOMContentLoaded', function () {
  // 初始全部隐藏
  document.querySelector('.log-in-status-TRUE').style.display = 'none';
  document.querySelector('.log-in-status-FALSE').style.display = 'none';
});

// 表单提交事件
document.querySelector('.log-in-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  // 隐藏所有状态
  document.querySelector('.log-in-status-TRUE').style.display = 'none';
  document.querySelector('.log-in-status-FALSE').style.display = 'none';

  const form = e.target;
  const formData = new FormData(form);

  const res = await fetch(form.action, {
    method: 'POST',
    body: formData
  });
  const text = await res.text();

  // 动画前先移除动画类
  document.querySelector('.log-in-status-TRUE').classList.remove('slide-down');
  document.querySelector('.log-in-status-FALSE').classList.remove('slide-down');

  if (text.trim() === 'TRUE') {
    const statusTrue = document.querySelector('.log-in-status-TRUE');
    statusTrue.style.display = 'block';
    // 触发动画
    void statusTrue.offsetWidth; // 触发重绘
    statusTrue.classList.add('slide-down');
    setTimeout(() => {
      window.location.href = '../tool.html';
    }, 2000);
  } else if (text.trim() === 'FALSE') {
    const statusFalse = document.querySelector('.log-in-status-FALSE');
    statusFalse.style.display = 'block';
    // 触发动画
    void statusFalse.offsetWidth;
    statusFalse.classList.add('slide-down');
  }
});