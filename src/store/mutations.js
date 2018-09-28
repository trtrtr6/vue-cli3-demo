import {setSessionStore, removeSessionStore} from '../utils/commonUtils'
import { LOGIN, LOGOUT } from './mutation-types.js'
export default {
  [LOGIN] (state, adminInfo) {
    state.adminInfo = adminInfo
    setSessionStore('adminInfo', adminInfo)
  },
  [LOGOUT] (state) {
    state.adminInfo = null
    removeSessionStore('adminInfo')
  }
}
