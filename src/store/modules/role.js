import axios from '@/axios.js'

export default {
  namespaced: true,
  state: {
    roles: [],
    roleModules: []
  },
  mutations: {
    SET_ROLES (state, roles) {
      state.roles = roles
    },
    SET_ROLE_MODULES (state, modules) {
      state.roleModules = modules
    }
  },
  actions : {
    fetchRoles ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/api/roles')
          .then((response) => {
            commit('SET_ROLES', response.data)
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    },
    addRole ({ dispatch }, role ) {
      return new Promise((resolve, reject) => {
        axios.post('/api/roles', role)
          .then(async response => {
            await dispatch('fetchRoles')
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    },
    updateRole ({ dispatch }, role ) {
      return new Promise((resolve, reject) => {
        axios.put(`/api/roles/${role.id}`, role)
          .then(async response => {
            await dispatch('fetchRoles')
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    },
    removeRole ({ dispatch }, id ) {
      return new Promise((resolve, reject) => {
        axios.delete(`/api/roles/${id}`)
          .then(async response => {
            await dispatch('fetchRoles')
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    },
    fetchRoleModules ({commit}, id ) {
      return new Promise((resolve, reject) => {
        axios.get(`/api/roles/${id}/modulos`)
          .then(response => {
            commit('SET_ROLE_MODULES', response.data)
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    }
  },
}
