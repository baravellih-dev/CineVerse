import { createRouter, createWebHistory } from 'vue-router'
import MoviesView from '@/views/MoviesView.vue'
import MovieDetailsView from '@/views/MovieDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/filmes',
    },
    {
      path: '/filmes',
      name: 'filmes',
      component: MoviesView,
    },
    {
      path: '/filmes/:id',
      name: 'detalhes-filme',
      component: MovieDetailsView,
    },
  ],
})

export default router
