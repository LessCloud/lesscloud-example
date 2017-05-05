import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

var Main = () => System.import('../views/main/index.vue')
var Dashboard = () => System.import('../views/dashboard/index.vue')
var DataGrid = () => System.import('../views/dashboard/DataGrid.vue')
var Account = () => System.import('../views/account/index.vue')
var Register = () => System.import('../views/account/register.vue')
var Login = () => System.import('../views/account/login.vue')

export default new Router({
  mode: 'history',
  history: true,
  linkActiveClass: 'selected',
  saveScrollPosition: true,
  suppressTransitionError: true,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { name: 'account', path: '/account', component: Account, 
        children:[
          { name: 'account.register', path: 'register', component: Register },
          { name: 'account.login', path: 'login', component: Login }
        ]
    },
    { name: 'main', path: '/', component: Main },
    { name: 'dashboard', path: '/dashboard', component: Dashboard, meta: { requiresAuth: true },
        children: [
        {
          name: 'dashboard.model',
          path: 'model/:name',
          component: DataGrid,
          children: [{
            name: 'dashboard.model.page',
            path: ':page',
            component: DataGrid,
          }]
        }]
    }
  ]
})