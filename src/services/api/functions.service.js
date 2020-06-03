import axios from '../http.service'
import qs from 'qs'
import config from '../../config'
const ApiBaseUrl = config.opapiHost

export default {
    //隐藏用户信息
    hiddenUserInfo:(params) => {
        return axios.get(`${ApiBaseUrl}/function/hideUserInfo`, {params: params})
    },
    //结清订单
    finishOrder:(params) => {
        return axios.post(`${ApiBaseUrl}/function/completeOrder`, qs.stringify(params))
    },
    //取消订单
    cancelOrder:(params) => {
        return axios.post(`${ApiBaseUrl}/function/cancelOrder`, qs.stringify(params))
    },
    //获取公告
    getBroadCast:() => {
        return axios.get(`${ApiBaseUrl}/function/getLastAnnouncement`)
    },
    //公告发布
    broadCast:(params) => {
        return axios.post(`${ApiBaseUrl}/function/announce`, qs.stringify(params))
    },
    //获取TKB
    getTKB:(params) => {
        return axios.get(`${ApiBaseUrl}/function/getTkb`, {params: params})
    },
    //更新TKB
    updateTKB:(params) => {
        return axios.post(`${ApiBaseUrl}/auth/resetPassword`, qs.stringify(params))
    },
}
