document.addEventListener('DOMContentLoaded', function () {
  const statusTrue = document.querySelector('.register-status-TRUE');
  const statusFalse1 = document.querySelector('.register-status-FALSE-1');
  const statusFalse2 = document.querySelector('.register-status-FALSE-2');
  const statusFalse3 = document.querySelector('.register-status-FALSE-3');
  const statusFalse4 = document.querySelector('.register-status-FALSE-4');
  const statusFalse5 = document.querySelector('.register-status-FALSE-5');
  [statusTrue, statusFalse1, statusFalse2, statusFalse3, statusFalse4, statusFalse5].forEach(el => {
    if (el) el.style.display = 'none';
  });

  const form = document.querySelector('.register-form');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      [statusTrue, statusFalse1, statusFalse2, statusFalse3, statusFalse4, statusFalse5].forEach(el => {
        if (el) {
          el.style.display = 'none';
          el.classList.remove('slide-down');
        }
      });

      const email = document.getElementById('username').value;
      const pwd = document.getElementById('password').value;
      const pwdNext = document.getElementById('password-next').value;
      const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailReg.test(email)) {
        if (statusFalse5) {
          statusFalse5.style.display = 'block';
          void statusFalse5.offsetWidth;
          statusFalse5.classList.add('slide-down');
        }
        return;
      }
      if (pwd !== pwdNext) {
        if (statusFalse1) {
          statusFalse1.style.display = 'block';
          void statusFalse1.offsetWidth;
          statusFalse1.classList.add('slide-down');
        }
        return;
      }

      const formData = new FormData(form);
      const res = await fetch(form.action, {
        method: 'POST',
        body: formData
      });
      const text = await res.text();

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
      } else if (text.trim() === 'FALSE-4' && statusFalse4) { 
        statusFalse4.style.display = 'block';
        void statusFalse4.offsetWidth;
        statusFalse4.classList.add('slide-down');
      } else if (text.trim() === 'FALSE-5' && statusFalse5) {
        statusFalse5.style.display = 'block';
        void statusFalse5.offsetWidth;
        statusFalse5.classList.add('slide-down');
      }
    });
  }
});