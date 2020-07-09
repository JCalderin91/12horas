import axios from '@/axios.js'

export default {
  namespaced: true,
  state: {
    banners: []
  },
  mutations: {
    SET_BANNERS (state, banners) {
      state.banners = banners
    }
  },
  actions : {
    fetchBanners ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/api/banners')
          .then((response) => {
            commit('SET_BANNERS', response.data)
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    },
    addBanner ({ dispatch }, banner ) {
      return new Promise((resolve, reject) => {
        axios.post('/api/banners', banner)
          .then(async response => {
            await dispatch('fetchBanners')
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    },
    updateBanner ({ dispatch }, banner ) {
      return new Promise((resolve, reject) => {
        axios.put(`/api/banners/${banner.idbanner}`, banner)
          .then(async response => {
            await dispatch('fetchBanners')
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    },
    removeBanner ({ dispatch }, idbanner ) {
      return new Promise((resolve, reject) => {
        axios.delete(`/api/banners/${idbanner}`)
          .then(async response => {
            await dispatch('fetchBanners')
            resolve(response)
          }) 
          .catch((error) => { reject(error) })
      })
    }
  },
}
