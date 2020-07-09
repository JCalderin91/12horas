import axios from '@/axios.js'

export default {
  namespaced: true,
  state: {
    modules: [], 
    modulePermissions: []
  },
  mutations: {
    SET_MODULES (state, modules) {
      state.modules = modules
    },
    SET_MODULES_PERMISSIONS (state, permissions) {
      state.modulePermissions = permissions
    }
  },
  actions : {
    fetchModules ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/api/modulos')
          .then((response) => {
            commit('SET_MODULES', response.data)
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    },
    addModule ({ dispatch }, module ) {
      return new Promise((resolve, reject) => {
        axios.post('/api/modulos', module)
          .then(async response => {
            await dispatch('fetchModules')
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    },
    updateModule ({ dispatch }, module ) {
      return new Promise((resolve, reject) => {
        axios.put(`/api/modulos/${module.id}`, module)
          .then(async response => {
            await dispatch('fetchModules')
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    },
    removeModule ({ dispatch }, id ) {
      return new Promise((resolve, reject) => {
        axios.delete(`/api/modulos/${id}`)
          .then(async response => {
            await dispatch('fetchModules')
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    },
    fetchModulePermissions ({commit}, id ) {
      return new Promise((resolve, reject) => {
        axios.get(`/api/modulos/${id}/permisos`)
          .then(async response => {
            commit('SET_MODULES_PERMISSIONS', response.data)
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    }
  }
}
