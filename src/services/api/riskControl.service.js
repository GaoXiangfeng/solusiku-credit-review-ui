import axios from '../http.service'
import qs from 'qs'
import config from '../../config'
const ApiBaseUrl = `${config.opapiHost}`
export default {
    //规则组
    getRiskGroupList: () => {
        return axios.get(`${ApiBaseUrl}/audit/management/getRiskGroupList`)
    },
    // 机审规则
    getRiskRuleByRiskGroup: (params) =>{
        return axios.get(`${ApiBaseUrl}/audit/management/getRiskRuleByRiskGroup`,{params:params})
    },
    // 获取三方规则
    getThirdPartyRuleByRiskGroup: (params) =>{
        return axios.get(`${ApiBaseUrl}/audit/management/getThirdPartyRuleByRiskGroup`,{params:params})
    },
    // 根据三方规则ID获取三方规则的组合规则
    getThirdPartyCombinationRuleByThirdPartyId: (params) =>{
        return axios.get(`${ApiBaseUrl}/audit/management/getThirdPartyCombinationRuleByThirdPartyId`,{params:params})
    },
    // 根据进参更改机审规则
    getsaveOrUpdateRiskRule: (params) =>{
        return axios.post(`${ApiBaseUrl}/audit/management/saveOrUpdateRiskRule`,params,{headers: {'Content-Type': 'application/json'}})
    },
     // 根据进参更改三方规则
     getsaveOrUpdateThirdPartyRule: (params) =>{
        return axios.post(`${ApiBaseUrl}/audit/management/saveOrUpdateThirdPartyRule`,params,{headers: {'Content-Type': 'application/json'}})
    },
    // 根据进参更改三方组合规则
    getsaveOrUpdateThirdPartyCombinationRule: (params) =>{
        return axios.post(`${ApiBaseUrl}/audit/management/saveOrUpdateThirdPartyCombinationRule`,params,{headers: {'Content-Type': 'application/json'}})
    }
}
