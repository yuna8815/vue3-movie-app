import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import About from './About'
import Movie from './Movie'
import NotFound from './NotFound'

export default createRouter({
  // Mode: Hash, History
  // https://google.com/#/search
  history: createWebHashHistory(),
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