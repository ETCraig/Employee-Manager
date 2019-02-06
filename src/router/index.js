import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase';

import Dashboard from '@/components/Dashboard';
import EditEmployee from '@/components/EditEmployee';
import Login from '@/components/Login';
import NewEmployee from '@/components/NewEmployee';
import Register from '@/components/Register';
import ViewEmployee from '@/components/ViewEmployee';

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/Employee-Manager/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Employee-Manager/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/Employee-Manager/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/Employee-Manager/new',
      name: 'new-employee',
      component: NewEmployee,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Employee-Manager/edit/:employee_id',
      name: 'edit-employee',
      component: EditEmployee,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Employee-Manager/:employee_id',
      name: 'view-employee',
      component: ViewEmployee,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

//Guards

router.beforeEach((to, from, next) => {
  //Check for requiredAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //Check if NOT logged in
    if (!firebase.auth().currentUser) {
      //Go to login
      next({
        path: '/Employee-Manager/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      //Proceed
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    //Check if NOT logged in
    if (firebase.auth().currentUser) {
      //Go to login
      next({
        path: '/Employee-Manager/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      //Proceed
      next();
    }
  } else {
    next();
  }
});

export default router;