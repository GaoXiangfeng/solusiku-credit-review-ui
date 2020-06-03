import axios from '../http.service'
import qs from 'qs'
import config from '../../config'
const ApiBaseUrl = config.opapiHost

export default {
    //获取信息
    getInfo:(params) => {
        return axios.get(`${ApiBaseUrl}/function/inquiry`, {params: params})
    },
    //压缩密码
    zipPassword:(params) => {
        return axios.get(`${ApiBaseUrl}/function/resetZipPassWord`)
    },
}