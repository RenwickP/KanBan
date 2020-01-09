import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router/index'
import AuthService from '../AuthService'

Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 7000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: []
  },
  mutations: {
    resetState(state) {
      state.user = {},
        state.boards = [],
        state.activeBoard = {},
        state.lists = [],
        state.tasks = []
    },
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setLists(state, list) {
      state.lists.push(list)
    },

    listsByBoardId(state, list) {
      state.lists = list;
    },
    setTasks(state, payload) {

      // state.tasks.push(payload)
      Vue.set(state.tasks, payload.listData.id, payload.body)
    },

    setTask(state, data) {
      state.tasks.push(data)
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    async register({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Register(creds)
        commit('setUser', user)
        router.push({ name: "boards" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    async login({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Login(creds)
        commit('setUser', user)
        router.push({ name: "boards" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    async logout({ commit, dispatch }) {
      try {
        let success = await AuthService.Logout()
        if (!success) { }
        commit('resetState')
        router.push({ name: "login" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    //#endregion


    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    async deleteBoard({ commit, dispatch }, board) {
      await api.delete('boards/' + board)
      dispatch('getBoards')
    },
    //#endregion


    //#region -- LISTS --
    async createList({ commit, dispatch }, newList) {
      let res = await api.post('lists', newList)
      commit('setLists', res.data)
    },
    async getListsByBoard({ commit, dispatch }, boardId) {
      let res = await api.get('boards/' + boardId + '/lists')
      commit('listsByBoardId', res.data)
    },
    async deleteList({ commit, dispatch }, data) {
      console.log("from store delete", data.boardId)
      await api.delete('lists/' + data.id)
      dispatch("getListsByBoard", data.boardId)

    },
    //#endregion

    //#region -- TASKS --
    async createTask({ commit, dispatch }, newTask) {
      let res = await api.post('tasks', newTask)
      commit('setTask', res.data)
    },
    async getTasks({ commit, dispatch }, listData) {
      let res = await api.get('lists/' + listData.id + '/tasks')
      let payload = {
        body: res.data,
        listData: listData
      }
      commit('setTasks', payload)
    },
    async deleteTask({ commit, dispatch }, taskData) {
      await api.delete('tasks/' + taskData._id)
      dispatch('getTasks', { id: taskData.listId })
    }
    //#endregion
  }
})
