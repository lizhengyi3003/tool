document.addEventListener('DOMContentLoaded', function () {
  const statusTrue = document.querySelector('.log-in-status-TRUE');
  const statusFalse = document.querySelector('.log-in-status-FALSE');
  if (statusTrue) statusTrue.style.display = 'none';
  if (statusFalse) statusFalse.style.display = 'none';

  const form = document.querySelector('.log-in-form');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      if (statusTrue) statusTrue.style.display = 'none';
      if (statusFalse) statusFalse.style.display = 'none';

      const formData = new FormData(form);

      const res = await fetch(form.action, {
        method: 'POST',
        body: formData
      });
      const text = await res.text();

      if (statusTrue) statusTrue.classList.remove('slide-down');
      if (statusFalse) statusFalse.classList.remove('slide-down');

      if (text.trim() === 'TRUE' && statusTrue) {
        statusTrue.style.display = 'block';
        void statusTrue.offsetWidth;
        statusTrue.classList.add('slide-down');
        setTimeout(() => {
          window.location.href = '../tool.html';
        }, 1000);
      } else if (text.trim() === 'FALSE' && statusFalse) {
        statusFalse.style.display = 'block';
        void statusFalse.offsetWidth;
        statusFalse.classList.add('slide-down');
      }
    });
  } else {
    console.error('未找到 .log-in-form 元素，无法绑定登录事件');
  }
});