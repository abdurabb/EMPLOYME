import axios from 'axios'


export const AdminApi = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api/admin`,
})

AdminApi.interceptors.request.use(
  function (config) {
      const token = localStorage?.getItem('AdminToken')
      config.headers.Authorization = token
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
)
