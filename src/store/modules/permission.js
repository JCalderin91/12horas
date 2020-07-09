import axios from '@/axios.js'

export default {
  namespaced: true,
  state: {
    permissions: []
  },
  mutations: {
    SET_PERMISSION (state, permissions) {
      state.permissions = permissions
    }
  },
  actions : {
    fetchPermissions ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/api/permisos')
          .then((response) => {
            commit('SET_PERMISSION', response.data)
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    },
    addPermission ({ dispatch }, permission ) {
      return new Promise((resolve, reject) => {
        axios.post('/api/permisos', permission)
          .then(async response => {
            await dispatch('fetchPermissions')
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    },
    updatePermission ({ dispatch }, permission ) {
      return new Promise((resolve, reject) => {
        axios.put(`/api/permisos/${permission.id}`, permission)
          .then(async response => {
            await dispatch('fetchPermissions')
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    },
    removePermission ({ dispatch }, id ) {
      return new Promise((resolve, reject) => {
        axios.delete(`/api/permisos/${id}`)
          .then(async response => {
            await dispatch('fetchPermissions')
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    }
  },
}
