import axios from 'axios'


 export const CompanyApi = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/api/company`,
  })


  CompanyApi.interceptors.request.use(
    function (config) {
        const token = localStorage?.getItem('CompanyToken')
        config.headers.Authorization = token
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
)