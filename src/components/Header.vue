<template>
  <header>
    <div class="container">
      <Logo />
      <div class="nav">
        <div
          v-for="nav in navigations"
          :key="nav.name"
          class="nav-item">
          <RouterLink
            :to="nav.href"
            active-class="active"
            :class="{ active: isMatch(nav.path) }"
            class="nav-link">
            {{ nav.name }}
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import Logo from '~/components/Logo'

export default {
  components: {
    Logo
  },
  data() {
    return {
      navigations: [
        {
          name: 'Search',
          href: '/'
        },
        {
          name: 'Movie',
          href: '/movie/tt4520988',
          path: /^\/movie/  // '/movie'로 시작하는 정규식
        },
        {
          name: 'About',
          href: '/about'
        }
      ]
    }
  },
  computed: {
    ...mapState('about', [
      'image',
      'name'
    ])
    // image() {
    //   return this.$store.state.about.image
    // },
    // name() {
    //   return this.$store.state.about.name
    // }
  },
  methods: {
    isMatch(path) {
      if(!path) return false
      console.log(this.$route)
      return path.test(this.$route.fullPath)
    },
    toAbout() {
      this.$router.push('/about')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/scss/main";

header {
  position: sticky;
  top: 0;
  width: 100%;
  background: rgba(18, 24, 41, 0.8);
  .container {
    padding: 16px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .nav-link {
      color: #A8AEBF;
      &.active {
        color: $primary
      }
    }
  }

  @include media-breakpoint-down(sm) {
    .nav {
      display: none;
    }
  }
}
</style>