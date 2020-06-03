const protocol = window.location.protocol
const qiniuHost = 'https://oic74zs8j.qnssl.com/'
const opapiHost = `${protocol}//solusiku-audit-api.solusi-ku.id` //线上环境
let LoginUrl = `${protocol}/login` // 登录页
let domain = ''

export default {
    qiniuHost,
    opapiHost,
    LoginUrl,
    domain
}
