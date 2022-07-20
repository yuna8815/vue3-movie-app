<template>
  <footer>
    <Logo />
    <a href="https://github.com/yuna8815/vue3-movie-app" target="_blank">(c){{ new Date().getFullYear() }} 8yuna8</a>
  </footer>
</template>

<script>
import Logo from '~/components/Logo'

export default {
  components: {
    Logo
  }
}
</script>

<style lang="scss" scoped>
footer {
  padding: 70px 0;
  text-align: center;
  opacity: .3;
  .logo {
    display: block;
    margin-bottom: 4px;
  }
}
</style>