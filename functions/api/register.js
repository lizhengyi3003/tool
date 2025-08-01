document.addEventListener('DOMContentLoaded', function () {
  // 动态加载 Turnstile 脚本
  if (!document.getElementById('turnstile-script')) {
    const script = document.createElement('script');
    script.id = 'turnstile-script';
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }

  // 渲染 Turnstile 验证组件
  function renderTurnstile() {
    if (window.turnstile && document.getElementById('turnstile')) {
      window.turnstile.render('#cf-turnstile', {
        sitekey: '0x4AAAAAABnkZJTigol9Njs-' // 替换为你的sitekey
      });
    }
  }

  // Turnstile 脚本加载后自动渲染
  window.onloadTurnstileCallback = renderTurnstile;
  // 兼容脚本已加载的情况
  setTimeout(renderTurnstile, 1000);
});