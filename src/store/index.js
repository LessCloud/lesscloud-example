import Vue from 'vue'
import Vuex from 'vuex'
import model from './modules/model'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
Vue.config.debug = debug
Vue.config.warnExpressionErrors = false

export default new Vuex.Store({
  modules: {
    model
    // showmsg
  },
  strict: debug,
  // middlewares
})
