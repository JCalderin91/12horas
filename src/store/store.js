import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

import banner from './modules/banner'
import category from './modules/category'
import configuration from './modules/configuration'
import favorite from './modules/favorite'
import product from './modules/product'
import user from './modules/user'
import module from './modules/module'
import permission from './modules/permission'
import role from './modules/role'
import address from './modules/address'


export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  modules: {
    banner,
    category,
    configuration,
    favorite,
    product,
    user,
    module,
    permission,
    role,
    address,
  },
  strict: process.env.NODE_ENV !== 'production'
})
