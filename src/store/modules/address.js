import axios from '@/axios.js'

export default {
  namespaced: true,
  state: {
    addresses: []    
  },
  mutations: {
    SET_ADDRESS (state, addresses) {
      state.addresses = addresses
    }
  },
  actions : {
    fetchAddresses ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/api/direcciones')
          .then((response) => {
            commit('SET_ADDRESS', response.data)
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    },
    addAddress ({ dispatch }, address ) {
      return new Promise((resolve, reject) => {
        axios.post('/api/direcciones', address)
          .then(async response => {
            await dispatch('fetchAddresses')
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    },
    updateAddress ({ dispatch }, address ) {
      return new Promise((resolve, reject) => {
        axios.put(`/api/direcciones/${address.iddireccion}`, address)
          .then(async response => {
            await dispatch('fetchAddresses')
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    },
    removeAddress (store, id ) {
      return new Promise((resolve, reject) => {
        axios.delete(`/api/direcciones/${id}`)
          .then(response => {
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    }    
  }
}
