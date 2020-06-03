const protocol = window.location.protocol
const qiniuHost = 'https://oic74zs8j.qnssl.com/'
// const opapiHost = `${protocol}//172.16.3.36:9412` //岑达开发环境
// const opapiHost = `${protocol}//172.16.3.8:9412` //tonny开发环境
// const opapiHost = `${protocol}//172.16.3.28:9412` //晓航开发环境
// const opapiHost = `${protocol}//101.201.238.13:9012` //测试环境
// const opapiHost = `${protocol}//solusiku-audit-api-test1.xiaoxinfen.com` //新测试环境
const opapiHost = `${protocol}//solusiku-audit-api-test1.xiaoxinfen.com` //新测试环境

let LoginUrl = `${protocol}/login` //登录页
let domain = ''

export default{
    qiniuHost,
    opapiHost,
    LoginUrl,
    domain
}