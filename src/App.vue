<script setup>
// No imports needed
</script>

<template>
  <router-view />
</template>

<style>
/* Import Google Noto Sans SC font for better Chinese character support */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100;300;400;500;700&display=swap');

/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 强制使用浅色模式，覆盖系统夜览模式设置 */
html {
  color-scheme: light only !important;
}

html, body, #app {
  width: 100%;
  height: 100%;
  font-family: 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  color: #000000;
}

/* 覆盖CSS媒体查询以确保所有元素在黑暗模式下仍使用浅色模式样式 */
@media (prefers-color-scheme: dark) {
  /* 佛教主页保持浅色背景 */
  html, body, #app, .main-container.buddhism-page, .content-wrapper {
    background-color: #f5f2ee !important;
    color: #000000 !important;
  }
  
  /* 首页保持黑色背景和白色文字 */
  .main-container:not(.buddhism-page) {
    background-color: #000000 !important;
    color: white !important;
  }
  
  /* 首页所有文字强制为白色 */
  .date, .foundation, .main-title, .subtitle {
    color: white !important;
  }
  
  /* 确保佛教主页的文字为黑色 */
  .buddhism-page .main-title, .buddhism-page .instruction-text, .buddhism-page .back-button {
    color: #000000 !important;
  }
}
</style>
