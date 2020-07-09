import axios from '@/axios.js'


const actions = {
  retrieveToken (state, user) {
    return new Promise((resolve, reject) => {
      axios.post('/api/login', user)
        .then(({data}) => {
          resolve(data)
        }) 
        .catch((error) => { 
          reject(error) 
        })
    })
  }
}

export default actions
