import messagesCn from '../language/cn/nav'
import messagesVi from '../language/vi/nav'
import localStorage from '../services/localStorage.service'
import config from '../config'
const opRedirectUrl = config.LoginUrl

let user = localStorage.get('user')
let menuCn = messagesCn.nav.slice(0)
let menuEn = messagesVi.nav.slice(0)
let menuVi = messagesVi.nav.slice(0)
let role = []
let roleText = {
    1: 'GLY',
    2: 'VCCMANAGER',
    3: 'YGDMANAGER',
    4: 'VCCPRE',
    5: 'VCCFINAL',
    6: 'YGDPRE',
    7: 'YGDFINAL',
    9: 'XJDMANAGER',
    10: 'XJDPRE',
    11: 'XJDFINAL',
    12: 'KF',//客服
    13: 'TOKOPRE',//toko_pre
    14: 'TOKOFINAL',//toko_final
    15: 'JSGLY',
    17: 'ORDERLISTONLY',//只能查看订单列表
}

let loopNav = (menu) => {
    for (let k = 0; k < menu.length; k++) {
        let num = 0
        for (let i = 0; i < role.length; i++) {
            if (menu[k].role) {
                if (menu[k].role.indexOf(role[i]) === -1) {
                    num++
                    if (num === role.length) {
                        menu.splice(k, 1)
                        --k
                        continue
                    }
                }
            }

            if (!menu[k].role) {
                menu.splice(k, 1)
                --k
                continue
            }

            if (menu[k].children) {
                loopNav(menu[k].children)
            }
        }
    }
}

if (user && user.role) {
    role.push(roleText[user.role])
} else {
    window.location.href = opRedirectUrl
    location.reload()
}

//不管是不是管理员都需要全部遍历菜单项目
//if (role.length > 0 && role.indexOf('GLY_DX') === -1) {
    // 如果非管理员，只能访问，当前权限的
    loopNav(menuCn)
    loopNav(menuEn)
    loopNav(menuVi)
//}

export default {
    menuCn, menuEn, menuVi
}
