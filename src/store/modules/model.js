import {
    LC_CREATE_SUCCESS,
    LC_CREATE_FAILURE,

    LC_READ_SUCCESS,
    LC_READ_FAILURE,

    LC_UPDATE_SUCCESS,
    LC_UPDATE_FAILURE,

    LC_DELETE_SUCCESS,
    LC_DELETE_FAILURE,

    LC_READ_ALL_SUCCESS,
    LC_READ_ALL_FAILURE
} from '../types'

const state = {
  name: '',
  isFetching: false,
  items: []
}

const mutations = {
  [LC_READ_ALL_SUCCESS](state,action){
    state.items = action.items
  },
  [LC_CREATE_SUCCESS](state,action){
    state.items.push(action.item)
  },
  [LC_READ_ALL_SUCCESS](state){
    state.isFetching = false
    state.items = []
  }
}

export default {
  state,
  mutations
}