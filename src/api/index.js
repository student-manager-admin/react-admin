import axios from 'axios'
const pre = 'http://localhost:7001'
export const AxiosGet = (url,params) => {
  return new Promise((resolev, reject) => {
    axios.get(pre + url, {params:params}).then(response => {
      if (response.status === 200) {
        resolev(response.data)
      } else {
        reject(response.data.message)
      }
    })
  })
}
export const AxiosPOST = (url, params={}) => {
  return new Promise((resolev, reject) => {
    axios.post(pre + url, params).then(response => {
      if (response.status === 200) {
        resolev(response.data)
      } else {
        reject(response.data.message)
      }
    }).catch(err=>{
      console.log(err)
    })
  })
}