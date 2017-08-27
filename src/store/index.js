import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'
import share from './modules/share'
import bookList from './modules/bookList'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
    },
    actions,
    mutations,
    modules: {
      share,
      bookList
    },
    getters
  })
}
