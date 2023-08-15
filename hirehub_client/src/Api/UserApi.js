import axios from 'axios'


 export const UserApi = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
  })

  UserApi.interceptors.request.use(
    function (config) {
        const token = localStorage?.getItem('UserToken')
        config.headers.Authorization = token
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
)
