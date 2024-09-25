import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MainView from '../views/MainView.vue'
import AddClientView from '../views/AddClientView.vue'
import AddDepositView from '../views/AddDepositView.vue'
import ListClientsView from '../views/ListClientsView.vue'
// Импортировать другие компоненты, если нужно

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/main',
    name: 'main',
    component: MainView
  },
  {
    path: '/add-client',
    name: 'add-client',
    component: AddClientView
  },
  {
    path: '/add-deposit',
    name: 'add-deposit',
    component: AddDepositView
  },
  {
    path: '/list-clients',
    name: 'list-clients',
    component: ListClientsView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
