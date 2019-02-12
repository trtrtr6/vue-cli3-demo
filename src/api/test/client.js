import axios from 'axios'
import authInterceptor from '@/api/interceptors/auth'
import responseInterceptor from '@/api/interceptors/response'

export default responseInterceptor(authInterceptor(axios.create()))
