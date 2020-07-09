
import axios from '@/axios.js'

export default {
  namespaced: true,
  state: {
    categories: []
  },
  mutations: {
    SET_CATEGORIES (state, categories) {
      state.categories = categories
    }
  },
  actions : {
    fetchCategories ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/api/categorias')
          .then((response) => {
            commit('SET_CATEGORIES', response.data)
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    },
    addCategory ({ dispatch }, category ) {
      return new Promise((resolve, reject) => {
        axios.post('/api/categorias', category)
          .then(async response => {
            await dispatch('fetchCategories')
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    },
    updateCategory ({ dispatch }, category ) {
      return new Promise((resolve, reject) => {
        axios.put(`/api/categorias/${category.idcategoria}`, category)
          .then(async response => {
            await dispatch('fetchCategories')
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    },
    removeCategory ({ dispatch }, id ) {
      return new Promise((resolve, reject) => {
        axios.delete(`/api/categorias/${id}`)
          .then(async response => {
            await dispatch('fetchCategories')
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    }
  },
}
