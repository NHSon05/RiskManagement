import axios, {type AxiosInstance} from 'axios'
import { getAccessToken, removeAccessToken } from './auth'

class Http {
  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      },
    })
    // Gắn accessToken to Header
    this.instance.interceptors.request.use(
      (config) => {
        const token = getAccessToken()
        if(token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )
    // ❌ Xử lý lỗi (auth)
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.response?.status

        if (status === 401) {
          // token hết hạn / không hợp lệ
          removeAccessToken()
          window.location.href='/login'
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http