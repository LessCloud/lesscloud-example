import Vue from 'vue';
import store from './store/index'
import router from './router/index'
import VueValidator from 'vue-validator'
import { sync } from 'vuex-router-sync'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// import '../theme/index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import './assets/style/style.less'
import Public from './views/layouts/public.vue'


  router.beforeEach((to, from, next) => {
    if (to.matched.some( m => m.meta.requiresAuth)) {
        if(localStorage.getItem('JWT')===null) {
            return next('/account/login')
        }
    }
    next()
  });

sync(store, router)

const app = new Vue({
  router,
  render: h => h(Public)
}).$mount('#app')
