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
}
</style>
