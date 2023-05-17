import { createStore } from 'vuex'
import axios from 'axios'
// import { useRouter } from 'vue-router'
import { API_URL } from './api'
// const router = useRouter()
const store = createStore({
  state: {
    // Your state properties go here
    user: null,
    authToken: null,
    isAuthenticated: true
  },
  mutations: {
    // Your mutation functions go here
    // setToken(state, token) {
    //   state.token = token
    // },
    setSnackbar(state, { text, color }) {
      state.snackbar.text = text
      state.snackbar.color = color
      state.snackbar.showing = true
    },
    setUser(state, user) {
      state.user = user
    },
    setAuthToken(state, authToken) {
      state.authToken = authToken
    },
    logout(state) {
      state.user = null
      state.authToken = null
      state.isAuthenticated = false
    },
    setAuthenticated(state, isAuthenticated) {
      if (localStorage.getItem('authToken')) {
        state.isAuthenticated = isAuthenticated
      }
    }
  },
  actions: {
    // Your action functions go here
    async login({ commit }, credentials) {
      const response = await axios.post(`${API_URL}users`, credentials)
      const { user, authToken } = response.data
      // console.log(response.data)
      // console.log(response.data.user)
      commit('setUser', user)
      commit('setAuthToken', authToken)
      commit('setAuthenticated', true)
      localStorage.setItem('authToken', authToken)
    },
    async signup({ commit }, userInfo) {
      const response = await axios.post(`${API_URL}users`, userInfo)
      const user = response.data.user
      const authToken = response.data.authToken
      commit('setUser', user)
      commit('setAuthToken', authToken)
    },
    async logout({ commit }) {
      commit('logout')
    },
    // async login({ commit }, { email, password }) {
    //   const response = await axios.post(`${API_URL}users`, {
    //     email,
    //     password
    //   })

    //   const token = response.data.token

    //   commit('setToken', token)
    //   console.log(response.data)
    //   commit()
    // },
    showSnackbar({ commit }, { text, color }) {
      commit('setSnackbar', { text, color })
    }
  },
  getters: {
    // Your getter functions go here
    isAuthenticated(state) {
      return !!state.authToken
    }
  }
})
export default store
