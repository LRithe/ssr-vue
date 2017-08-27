import * as types from '../mutation-types'
import * as API from '@/api'

const state = {
  drawDetail: {},
  share_part: 'this file named share',
  winningRecords: {},
  totalPages: 0
}

const getters = {
  title: state => state.drawDetail.title
}

const mutations = {
  [types.DRAW_DETAIL] (state, data) {
    state.drawDetail = data
  },
  [types.CHANGE_PAGE] (state, data) {
    state.winningRecords = data.data
    state.totalPages = data.meta.last_page
  }
}

const actions = {
  getDrawDetail ({ commit }, queryData) {
    API.getDrawDetail(queryData).then((response) => {
      if (response.status === 200) {
        commit(types.DRAW_DETAIL, response.data.data)
      }
    })
  },
  changePage ({ commit }, queryData) {
    API.changePage(queryData).then((response) => {
      if (response.status === 200) {
        commit(types.CHANGE_PAGE, response.data)
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
