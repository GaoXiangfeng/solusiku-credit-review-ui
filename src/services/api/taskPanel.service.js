import axios from '../http.service'
import qs from 'qs'
import config from '../../config'
const ApiBaseUrl = `${config.opapiHost}`
export default {
    //工单数、未审核工单数
    orderCount: () => {
        return axios.get(`${ApiBaseUrl}/query/findNoAuditCounts`)
    },
    //领取初审工单
    preAudit: ()=> {
        return axios.get(`${ApiBaseUrl}/credit_audit/findNext/preAuditTicket`)
    },
    //领取终审工单
    finalAudit: ()=> {
        return axios.get(`${ApiBaseUrl}/credit_audit/findNext/finalAuditTicket`)
    },
    //挂起
    hang: (params)=> {
        return axios.post(`${ApiBaseUrl}/credit_audit/hang`,qs.stringify(params))
    },
    //我的案件
    myTickets(){
        return axios.get(`${ApiBaseUrl}/credit_audit/findNext/myTickets`)
    },
    //释放工单
    releaseOrders: ()=>{
        return axios.post(`${ApiBaseUrl}/auth/release`)
    },
    //获取我的案件
    myHangTicketList:  ()=> {
        return axios.get(`${ApiBaseUrl}/credit_audit/myHangTicketLists`)
    },
     //挂机池释放前30分钟弹窗提醒
     greaterThanMinutes: () => {
        return axios.get(`${ApiBaseUrl}/query/releaseOrderReminder`)
    },
}
