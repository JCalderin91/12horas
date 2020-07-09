import axios from '@/axios.js'

export default {
  namespaced: true,
  state: {
    users: [],
    userAddresses: []
  },
  mutations: {
    SET_USERS (state, users) {
      state.users = users
    },
    SET_USER_ADDRESSES (state, addresses) {
      state.userAddresses = addresses
    }
  },
  actions : {
    fetchUsers ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/api/usuarios')
          .then((response) => {
            commit('SET_USERS', response.data)
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    },
    addUser ({ dispatch }, user ) {
      return new Promise((resolve, reject) => {
        axios.post('/api/usuarios', user)
          .then(async response => {
            await dispatch('fetchUsers')
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    },
    updateUser ({ dispatch }, user ) {
      return new Promise((resolve, reject) => {
        axios.put(`/api/usuarios/${user.idusuario}`, user)
          .then(async response => {
            await dispatch('fetchUsers')
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    },
    removeUser ({ dispatch }, idusuario ) {
      return new Promise((resolve, reject) => {
        axios.delete(`/api/usuarios/${idusuario}`)
          .then(async response => {
            await dispatch('fetchUsers')
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    },
    fetchUserAddresses ({commit}, id ) {
      return new Promise((resolve, reject) => {
        axios.get(`/api/usuarios/${id}/direcciones`)
          .then(response => {
            commit('SET_USER_ADDRESSES', response.data)
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    }
  }
}
