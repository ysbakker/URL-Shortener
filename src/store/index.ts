import Vue from 'vue'
import Vuex from 'vuex'
import { url } from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { url },
})
