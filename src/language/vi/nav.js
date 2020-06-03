
const msNavIndo = {
    //导航栏
    nav: [
        {
            name: 'Dashboard', //Home
            role: ['GLY', 'VCCMANAGER','YGDMANAGER','VCCPRE','VCCFINAL','YGDPRE','YGDFINAL','XJDMANAGER','XJDPRE','XJDFINAL','KF','TOKOPRE','TOKOFINAL','JSGLY','ORDERLISTONLY'],
            path: 'dashboard'
        },
        {
            name: 'Panel Tugas',//任务面板
            role: ['GLY', 'VCCMANAGER','YGDMANAGER','VCCPRE','VCCFINAL','YGDPRE','YGDFINAL','XJDMANAGER','XJDPRE','XJDFINAL','TOKOPRE','TOKOFINAL'],
            path: 'taskPanel',
        },
        {
            name: 'Daftar Pesanan',//订单列表
            role: ['GLY', 'VCCMANAGER','VCCPRE','VCCFINAL','YGDMANAGER','YGDPRE','YGDFINAL','XJDMANAGER','XJDPRE','XJDFINAL','TOKOPRE','TOKOFINAL','ORDERLISTONLY'],
            path: 'orderList',
        },
        {
            name: 'Fungsi layanan pelanggan',//客服
            role: ['GLY', 'VCCMANAGER','YGDMANAGER','VCCPRE','VCCFINAL','YGDPRE','YGDFINAL','XJDMANAGER','XJDPRE','XJDFINAL','KF','TOKOPRE','TOKOFINAL','JSGLY','ORDERLISTONLY'],
            path: 'cs',
        },
        {
            name: 'Manajemen risiko',//风控管理
            role: ['GLY','JSGLY'],
            path: 'riskControl',
        },
        {
            name: 'User management',//人员管理
            role: ['GLY'],
            path: 'userManage',
        },
        {
            name: 'Modul fungsi',//功能模块 
            role: ['GLY'],
            path: 'functions',
        },
        {
            name: 'FDC Fungsi',//FDC 功能 
            role: ['GLY'],
            path: 'fdcFunction',
        },
    ]
}

export default msNavIndo
