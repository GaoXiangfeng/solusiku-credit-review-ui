import axios from '../http.service'
import qs from 'qs'
import config from '../../config'
const ApiBaseUrl = `${config.opapiHost}`
export default {
    //查询工单列表
    getTicketList: (params) => {
        return axios.post(`${ApiBaseUrl}/query/getOrderListByTicketOptions`, qs.stringify(params))
    },
    //查询订单列表
    getOrderList: (params) => {
        return axios.post(`${ApiBaseUrl}/query/getOrderListByOptions`, qs.stringify(params))
    },
    //导出数据
    exportExcelData: (params) => {
        return axios.post(`${ApiBaseUrl}/ex/query/exportOrderByTime`, params, { headers: { 'Content-Type': 'application/json' }, responseType: 'blob' })
    },
}
