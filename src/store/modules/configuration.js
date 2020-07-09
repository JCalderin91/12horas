import axios from '@/axios.js'

export default {
  namespaced: true,
  state: {
    configurations: []
  },
  mutations: {
    SET_CONFIGURATIONS (state, configurations) {
      state.configurations = configurations
    }
  },
  actions : {
    fetchConfigurations ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/api/configuraciones')
          .then((response) => {
            commit('SET_CONFIGURATIONS', response.data)
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    },
    addConfiguration ({ dispatch }, configuration ) {
      return new Promise((resolve, reject) => {
        axios.post('/api/configuraciones', configuration)
          .then(async response => {
            await dispatch('fetchConfigurations')
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    },
    updateConfiguration ({ dispatch }, configuration ) {
      return new Promise((resolve, reject) => {
        axios.put(`/api/configuraciones/${configuration.idconfiguracion}`, configuration)
          .then(async response => {
            await dispatch('fetchConfigurations')
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    },
    removeConfiguration ({ dispatch }, idconfiguration ) {
      return new Promise((resolve, reject) => {
        axios.delete(`/api/configuraciones/${idconfiguration}`)
          .then(async response => {
            await dispatch('fetchConfigurations')
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    }
  },
}
