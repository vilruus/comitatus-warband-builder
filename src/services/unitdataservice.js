import axios from 'axios'

const baseUrl = 'http://localhost:3001/nations'

const getAll = () => {
  axios
    .get(baseUrl)
    .then(response => {
      const nationsData = response.data
      return nationsData
  })
}

export default { getAll }