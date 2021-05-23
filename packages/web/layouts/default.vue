<template>
  <div>
    <Nuxt />
  </div>
</template>

<style lang="postcss">
@import url("https://fonts.googleapis.com/css?family=Luckiest+Guy&display=swap");
.font-lucky{
  position: relative;
  top: 3px;
}
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.container {
  max-width: 640px;
  margin: 0 auto;
}

.lucky {
  font-family: 'Luckiest Guy';
}

input.lucky {
  padding-top: 15px !important;
}

h1 {
  @apply text-6xl text-center pt-10;
  font-family: 'Luckiest Guy';
}
h2 {
  @apply text-4xl;
  font-family: 'Luckiest Guy';
}
h3 {
  @apply text-2xl;
  font-family: 'Luckiest Guy';
  position: relative;
  top: 3px;
}


.main-menu {
  margin: 0 auto;
}

@media (max-width: 768px) {
  .main-menu {
    margin: 0 20px;
  }
}

@media (min-width: 768px){
  .main-menu {
    width: 500px;
  }
}
</style>
