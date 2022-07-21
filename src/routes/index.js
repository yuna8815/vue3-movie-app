import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import About from './About'
import Movie from './Movie'
import NotFound from './NotFound'

export default createRouter({
  // Mode: Hash, History
  // https://google.com/#/search
  history: createWebHashHistory(),
  // 페에지 이동 시 스크롤 위치가 0인 상태로 시작
  scrollBehavior() {
    return { top: 0 }
  },
  // pages
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/movie/:id',
      component: Movie
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ]
})