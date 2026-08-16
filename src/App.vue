<template>
  <router-view />
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Barlow:wght@400;500;600&display=swap');

:root {
  --sporty-red: #ED1C24;
  --sporty-red-dark: #B8121A;
  --sporty-black: #17181C;
  --sporty-green: #00A651;
  --sporty-grey: #6B7280;
  --sporty-grey-light: #F4F5F7;

  --el-color-primary: var(--sporty-red);
  --el-color-primary-light-3: #f16066;
  --el-color-primary-light-5: #f58c90;
  --el-color-primary-light-7: #f9b8bb;
  --el-color-primary-light-8: #fbcdcf;
  --el-color-primary-light-9: #fde3e4;
  --el-color-primary-dark-2: var(--sporty-red-dark);
}

#app {
  font-family: 'Barlow', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--sporty-black);
  background: var(--sporty-grey-light);
  min-height: 100vh;
}

body {
  margin: 0;
}
</style>
