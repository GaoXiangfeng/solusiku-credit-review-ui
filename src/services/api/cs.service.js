import axios from '../http.service'
import qs from 'qs'
import config from '../../config'
const ApiBaseUrl = `${config.opapiHost}`
export default {
    //获取借款记录
    getLoanRecordList: (params) => {
        return axios.post(`${ApiBaseUrl}/ex/query/getOrderInfoByParams`,qs.stringify(params))
    },
    //获取订单信息
    getOrderInfo: (params) => {
        return axios.post(`${ApiBaseUrl}/ex/query/getLastOrderInfoByOrderId`,qs.stringify(params))
    },
    //获取还款记录
    getRepayRecordList: (params) => {
        return axios.post(`${ApiBaseUrl}/ex/query/getLastRepayplanAndRepayrecordByQuery`,qs.stringify(params))
    },
    //获取催收记录
    getCollRecordList: (params) => {
        return axios.post(`${ApiBaseUrl}/ex/query/findCollectionRecordsByOrderId`,params,{headers: {'Content-Type': 'application/json'}})
    },
}
