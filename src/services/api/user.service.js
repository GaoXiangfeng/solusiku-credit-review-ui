import axios from '../http.service'
import qs from 'qs'
import config from '../../config'
const ApiBaseUrl = config.opapiHost
export default {
    //登录
    login: (params) => {
        params.password = window.btoa(params.password)
        return axios.post(`${ApiBaseUrl}/auth/login`, qs.stringify(params))
    },
    //退出
    logout: () => {
        return axios.get(`${ApiBaseUrl}/auth/logout`)
    },
    //重置密码
    resetPassWord:(params) => {
        params.oldPassword = window.btoa(params.oldPassword)
        params.newPassword = window.btoa(params.newPassword)
        return axios.post(`${ApiBaseUrl}/auth/resetPassword`, qs.stringify(params))
    },
}
