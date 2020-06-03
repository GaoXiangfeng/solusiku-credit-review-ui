const msUserManage = {
    modalDisplay: {
        title: 'Informasi pengguna',//用户信息
        confirm: 'Konfirmasi',//确认
        cancel: 'Batalkan',//取消
        useName: 'Nama Pengguna:',//用户名
        passWord: 'Kata Sandi:',//密码
        auth: 'Izin:',//权限
    },
    authList: {
        2: "VCC管理员角色",
        3: "员工贷管理员角色",
        4: "VCC初审角色",
        5: "VCC终审角色",
        6: "员工贷初审角色",
        7: "员工贷终审角色",
        9: "现金贷管理员角色(除toko)",
        10: "现金贷初审角色(除toko)",
        11: "现金贷终审角色(除toko)",
        12: "客服",
        13: "现金贷toko初审角色",
        14: "现金贷toko终审角色",
        15: "信审规则后台管理角色",
        17: "检查员角色",
    },
    operation: {
         add: 'Tambah',//添加
         modify: 'Ubah',//修改
         stop: 'Nonaktifkan',//停用
         enable: 'Aktifkan',//启用
    },
    columnsTitle: [
        'Nomor',//编号
        'Akun',//账户
        'Izin',//权限
        'Negara',//状态
        'Pesanan tertunda',//挂起订单
        'Waktu pembuatan',//创建时间
        'Operasi',//操作
    ],
    //表格数据
    orderTableData: {
        0: 'Lihat', //查看
        1: 'Tidak ada data',//先息后本
        2: 'Tidak ada data' ,//'暂无数据'
        3: 'Tidak ada data' ,//'暂无筛选数据'
        4: 'Tidak ada data'
    },
}

export default msUserManage
