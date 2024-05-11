// 封装axios
import axios from 'axios'
import { message } from 'antd';

const http = axios.create({
  baseURL: '',
  timeout: 5000,
})

// 拦截器
http.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    message.error('This is an error message');
    return Promise.reject(error)
  }
)

export { http }
