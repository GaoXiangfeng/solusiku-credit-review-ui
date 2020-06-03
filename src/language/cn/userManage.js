const msUserManage = {
    modalDisplay: {
        title: '用户信息',//用户信息
        confirm: '确认',//确认
        cancel: '取消',//取消
        useName: '用户名:',//用户名
        passWord: '密码:',//密码
        auth: '权限:',//权限
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
         add: '添加',//添加
         modify: '修改',//修改
         stop: '停用',//停用
         enable: '启用',//启用
    },
    columnsTitle: [
        '编号',//编号
        '账户',//账户
        '权限',//权限
        '状态',//状态、
        '挂起订单',//挂起订单
        '创建时间',//创建时间
        '操作',//操作
    ],
    //表格数据
    orderTableData: {
        0: '查看', //查看
        1: '暂无数据',//先息后本
        2: '暂无数据' ,//'暂无数据'
        3: '暂无数据' ,//'暂无筛选数据'
        4: '暂无数据'
    },
}

export default msUserManage
