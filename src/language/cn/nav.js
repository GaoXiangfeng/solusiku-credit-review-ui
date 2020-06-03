
const msNavIndo = {
    //导航栏
    nav: [
        {
            name: 'Dashboard', //Home
            role: ['GLY', 'VCCMANAGER','YGDMANAGER','VCCPRE','VCCFINAL','YGDPRE','YGDFINAL','XJDMANAGER','XJDPRE','XJDFINAL','KF','TOKOPRE','TOKOFINAL','JSGLY','ORDERLISTONLY'],
            path: 'dashboard'
        },
        {
            name: '任务面板',//任务面板
            role: ['GLY', 'VCCMANAGER','YGDMANAGER','VCCPRE','VCCFINAL','YGDPRE','YGDFINAL','XJDMANAGER','XJDPRE','XJDFINAL','TOKOPRE','TOKOFINAL'],
            path: 'taskPanel',
        },
        {
            name: '订单列表',//订单列表
            role: ['GLY', 'VCCMANAGER','VCCPRE','VCCFINAL','YGDMANAGER','YGDPRE','YGDFINAL','XJDMANAGER','XJDPRE','XJDFINAL','TOKOPRE','TOKOFINAL','ORDERLISTONLY'],
            path: 'orderList',
        },
        {
            name: '客服功能',//客服
            role: ['GLY', 'VCCMANAGER','YGDMANAGER','VCCPRE','VCCFINAL','YGDPRE','YGDFINAL','XJDMANAGER','XJDPRE','XJDFINAL','KF','TOKOPRE','TOKOFINAL','JSGLY','ORDERLISTONLY'],
            path: 'cs',
        },
        {
            name: '风控管理',//风控管理
            role: ['GLY','JSGLY'],
            path: 'riskControl',
        },
        {
            name: '人员管理',//人员管理 
            role: ['GLY'],
            path: 'userManage',
        },
        {
            name: '功能模块',//功能模块 
            role: ['GLY'],
            path: 'functions',
        },
        {
            name: 'FDC 功能',//FDC 功能 
            role: ['GLY'],
            path: 'fdcFunction',
        },
    ]
}

export default msNavIndo
