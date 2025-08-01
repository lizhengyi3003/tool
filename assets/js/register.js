document.addEventListener('DOMContentLoaded', function () {
  // 初始全部隐藏
  const statusTrue = document.querySelector('.register-status-TRUE');
  const statusFalse1 = document.querySelector('.register-status-FALSE-1');
  const statusFalse2 = document.querySelector('.register-status-FALSE-2');
  const statusFalse3 = document.querySelector('.register-status-FALSE-3');
  [statusTrue, statusFalse1, statusFalse2, statusFalse3].forEach(el => {
    if (el) el.style.display = 'none';
  });

  const form = document.querySelector('.register-form');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      // 隐藏所有状态
      [statusTrue, statusFalse1, statusFalse2, statusFalse3].forEach(el => {
        if (el) {
          el.style.display = 'none';
          el.classList.remove('slide-down');
        }
      });

      // 前端校验两次密码是否一致
      const pwd = document.getElementById('password').value;
      const pwdNext = document.getElementById('password-next').value;
      if (pwd !== pwdNext) {
        if (statusFalse1) {
          statusFalse1.style.display = 'block';
          void statusFalse1.offsetWidth;
          statusFalse1.classList.add('slide-down');
        }
        return;
      }

      // 提交表单
      const formData = new FormData(form);
      const res = await fetch(form.action, {
        method: 'POST',
        body: formData
      });
      const text = await res.text();

      // 根据后端返回结果显示不同提示
      if (text.trim() === 'TRUE' && statusTrue) {
        statusTrue.style.display = 'block';
        void statusTrue.offsetWidth;
        statusTrue.classList.add('slide-down');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
      } else if (text.trim() === 'FALSE-2' && statusFalse2) {
        statusFalse2.style.display = 'block';
        void statusFalse2.offsetWidth;
        statusFalse2.classList.add('slide-down');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
      } else if (text.trim() === 'FALSE-3' && statusFalse3) {
        statusFalse3.style.display = 'block';
        void statusFalse3.offsetWidth;
        statusFalse3.classList.add('slide-down');
      }
    });
  }
});