import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CreateParent from '../views/CreateParent.vue'
import CreateChild from '../views/CreateChild.vue'
import Joke from '../views/Joke.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create-parent',
    name: 'CreateParent',    
    component: CreateParent
  },
  {
    path: '/create-child',
    name: 'CreateChild',    
    component: CreateChild
  },
  {
    path: '/joke',
    name: 'Joke',    
    component: Joke
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
