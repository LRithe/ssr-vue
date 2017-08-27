/**
 * Created by lin on 2017/8/24.
 */

import * as types from '../mutation-types'
import * as API from '@/api'

const state = {
  books: {},
  total: 0,
  bookInfo: {}
}

const getters = {
  totalPages: state => Math.ceil(state.total/8)
}

const mutations = {
  [types.GET_BOOK_LIST] (state, data) {
    state.books = data.books
    state.total = data.total
  },
  [types.GET_BOOK_INFO] (state, data) {
    state.bookInfo = data
  }
}

const actions = {
  getBookList ({ commit }, queryData) {
    API.getBookList(queryData).then((response) => {
      if (response.status === 200) {
        commit(types.GET_BOOK_LIST, response.data)
      }
    })
  },
  getBookInfo ({ commit }, queryData) {
    API.getBookInfo(queryData).then((response) => {
      if (response.status === 200) {
        commit(types.GET_BOOK_INFO, response.data)
      }
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
