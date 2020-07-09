import axios from '@/axios.js'

export default {
  namespaced: true,
  isRegistered: false,
  state: {
    products: []
  },
  mutations: {
    SET_PRODUCTS (state, products) {
      state.products = products
    }
  },
  actions: {
    addProduct ({ dispatch }, item) {
      return new Promise((resolve, reject) => {
        axios.post('/api/productos', item)
          .then(async response => {
            await dispatch('fetchProducts')
            resolve(response)
          })
          .catch((error) => { reject(error) })
      })
    },
    fetchProducts ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/api/productos')
          .then((response) => {
            commit('SET_PRODUCTS', response.data)
            resolve(response)
          })
          .catch((error) => { reject(error) })
      })
    },
    removeProduct ({ dispatch }, id) {
      return new Promise((resolve, reject) => {
        axios.delete(`/api/productos/${id}`)
          .then(async response => {
            await dispatch('fetchProducts')
            resolve(response)
          })
          .catch((error) => { reject(error) })
      })
    },
    updateProduct ({ dispatch }, product) {
      return new Promise((resolve, reject) => {
        axios.put(`/api/productos/${product.idproducto}`, product)
          .then(async response => {
            await dispatch('fetchProducts')
            resolve(response)
          })
          .catch((error) => { reject(error) })
      })
    }
  }
}

