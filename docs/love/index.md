---
layout: false
title: Love Page - 我们的爱情故事
head:
  - - meta
    - name: viewport
      content: width=device-width, initial-scale=1.0
  - - script
    - {}
    - |
      // 子域名重定向逻辑（仅在生产环境）
      (function() {
        if (typeof window !== 'undefined') {
          const currentHost = window.location.hostname;
          const currentPath = window.location.pathname;
          const isLocalDev = currentHost === 'localhost' || currentHost === '127.0.0.1' || currentHost.includes('192.168');

          // 只在非本地开发环境执行重定向
          if (!isLocalDev && currentHost !== 'love.oooo.blog' && (currentPath.includes('/love') || currentPath === '/love.html')) {
            const protocol = window.location.protocol;
            const search = window.location.search;
            const hash = window.location.hash;
            const redirectUrl = `${protocol}//love.oooo.blog/${search}${hash}`;

            console.log('重定向到:', redirectUrl);
            window.location.replace(redirectUrl);
          } else if (isLocalDev) {
            console.log('本地开发环境，跳过重定向');
          }
        }
      })();
---

<LovePage />

<script setup>
import LovePage from '../.vitepress/theme/components/LovePage.vue'

// 本地开发时的调试信息
if (typeof window !== 'undefined') {
  console.log('Love Page 加载完成');
  console.log('当前域名:', window.location.hostname);
  console.log('当前路径:', window.location.pathname);
}
</script>

import "../.vitepress/theme/css/love.css"
