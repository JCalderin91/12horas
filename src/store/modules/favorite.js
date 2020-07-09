import axios from '@/axios.js'

export default {
  namespaced: true,
  state: {
    favorities: []
  },
  mutations: {
    SET_FAVORITIES (state, favorities) {
      state.favorities = favorities
    }
  },
  actions : {
    fetchFavorities ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/api/favoritos')
          .then((response) => {
            commit('SET_FAVORITIES', response.data)
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    },
    addFavorite ({ dispatch }, favorie ) {
      return new Promise((resolve, reject) => {
        axios.post('/api/favoritos', favorie)
          .then(async response => {
            await dispatch('fetchFavorities')
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    },
    updateFavorite ({ dispatch }, favorie ) {
      return new Promise((resolve, reject) => {
        axios.put(`/api/favoritos/${favorie.idfavorito}`, favorie)
          .then(async response => {
            await dispatch('fetchFavorities')
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    },
    removeFavorite ({ dispatch }, favorie ) {
      return new Promise((resolve, reject) => {
        axios.delete(`/api/favoritos/${favorie.idfavorito}`, favorie)
          .then(async response => {
            await dispatch('fetchFavorities')
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    }
  },
}
