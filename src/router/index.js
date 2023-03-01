import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import SpecificCocktail from '../views/SpecificCocktail.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/',
        name: 'Main',
        component: Main 
    },
    {
        path: '/cocktail/:id',
        name: 'Cocktail',
        component: SpecificCocktail,
        props: true
    },
  ]
})

export default router