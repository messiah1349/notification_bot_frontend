import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MainPage from '../views/MainPage.vue';
import DateTimePicker from '../views/DateChoser.vue';

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/:userId',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/date',
    name: 'DateTimePicker',
    component: DateTimePicker
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;