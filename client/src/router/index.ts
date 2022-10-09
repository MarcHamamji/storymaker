import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import Dashboard from '../views/Dashboard.vue';
import Story from '../views/Story.vue';
import LoginSuccess from '../views/LoginSuccess.vue';
import Play from '../views/Play.vue';
import NotFound from '../views/NotFound.vue';
import useAPI from '../stores/api';
import useUser from '@/stores/user';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/success',
      name: 'success',
      component: LoginSuccess,
    },
    {
      path: '/story/:id',
      name: 'story',
      component: Story,
    },
    {
      path: '/play/:id',
      name: 'play',
      component: Play,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: NotFound,
    },
  ],
});

const restricted = ['dashboard', 'story'];

router.beforeEach(async (to, _from, next) => {
  const user = useUser();
  await user.refreshUser();
  const api = useAPI();
  const isLoggedIn = await api.isLoggedIn();

  if (to.name === 'home' && isLoggedIn) {
    return next({
      replace: true,
      name: 'dashboard',
    });
  }

  if (!restricted.includes(to.name as string)) return next();

  if (isLoggedIn) {
    return next();
  }

  return next({
    replace: true,
    name: 'home',
  });
});

export default router;
