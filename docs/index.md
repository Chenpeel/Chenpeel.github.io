---

# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Chenpeel
  text: 乐只君子&nbsp&nbsp福履将之
  tagline: 料峭春风吹酒醒，微冷，山头斜照却相迎
  image:
      src: /logo.png
      alt: Chenpeel
  actions:
    - theme: brand
      text: '\ (>_<) /'
      link: /about

features:
  - title: 开源代码
    link: https://github.com/chenpeel/
  - title: 通过电子邮件联系
    link: mailto:chenpeel@foxmail.com
  - title: 通过Telegram联系
    link: https://t.me/Chenpeel
---

<br>
<br>
<RecentPost />

<br>
<br>


<script setup>
import RecentPost from './.vitepress/theme/components/RecentPost.vue';
</script>
