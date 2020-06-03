import axios from '../http.service'
import qs from 'qs'
import config from '../../config'
const ApiBaseUrl = config.opapiHost
const translateHost = config.translateHost
export default {
    //工单详情
    ordersDetail: (params)=>{
        return axios.get(`${ApiBaseUrl}/credit_audit/findOrderDetailByOrderId`,{params:params})
    },

    //用户详情
    userDetail: (params)=>{
        return axios.get(`${ApiBaseUrl}/credit_audit/findUserDetailByOrderId`,{params:params})
    },

    //翻译接口
    transition: (params)=>{
        return axios.get(`${translateHost}/translate`,{params:params})
    },
    //联系次数
    contactCount: (params)=> {
        return axios.get(`${ApiBaseUrl}/credit_audit/getLinkmanCountByOrderId`,{params:params})
    },

    //获取拒绝类型
    getRejectType: (params)=> {
        return axios.get(`${ApiBaseUrl}/query/getRefuseReasonTypeInfo`,{params:params})
    },
    //获取详细拒绝原因
    getRejectReasonDetail: (params)=> {
        return axios.get(`${ApiBaseUrl}/query/getRefuseReasonInfoByRefuseTypeCode`,{params:params})
    },

    //***************************************************/
    //获取同盾数据
    getTDData: (params)=>{
        return axios.get(`${ApiBaseUrl}/query/getTongDunResultBySourceTypeAndSourceId`,{params:params})
    },
    //增加审核分
    addAuditScore: (params)=>{
        return axios.post(`${ApiBaseUrl}/query/addAuditScore`,qs.stringify(params))
    },
    //获得审核分
    getAuditScoreBySourceTypeAndSourceId: (params) => {
        return axios.get(`${ApiBaseUrl}/query/getAuditScoreBySourceTypeAndSourceId`, {params:params})
    },
    //审核初审工单
    auditPreOrders: (params)=>{ 
        return axios.post(`${ApiBaseUrl}/credit_audit/update/preAuditTicket`,qs.stringify(params))
    },
    //审核终审工单
    auditFinalOrders: (params)=>{
        return axios.post(`${ApiBaseUrl}/credit_audit/update/finalAuditTicket`,qs.stringify(params))
    },
    //获取借款详情
    getDetailInfo: (params) => {
        return axios.get(`${ApiBaseUrl}/query/findLoanDetailBySourceTypeAndSourceId`, {params:params})
    },
    //增加电核记录
    addCallRecord: (params)=>{
        return axios.post(`${ApiBaseUrl}/ec/addCallRecord`,qs.stringify(params))
    },
    //获取工单审核记录
    findAuditTicketRecords: (params) => {
        return axios.get(`${ApiBaseUrl}/query/findAuditTicketRecords`, {params:params})
    },
    //获取balance数据
    getBalance: (params) => {
        return axios.get(`${ApiBaseUrl}/ex/query/balance`, {params:params})
    },
    //获取人脸识别
    faceMatching: (params) => {
        return axios.get(`${ApiBaseUrl}/ex/query/faceMatching`, {params:params})
    },
    //历史借贷数据获取
    getHistoryLoanList: (params) => {
        return axios.post(`${ApiBaseUrl}/ex/query/historyOrderList`, params,{headers: {'Content-Type': 'application/json'}})
    },
    //更新用户信息字段
    updateUserInfo: (params) => {
        return axios.post(`${ApiBaseUrl}/credit_audit/update/auditTicket `, params,{headers: {'Content-Type': 'application/json'}})
    },
}
