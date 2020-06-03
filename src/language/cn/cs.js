const msCs = {
    searchCondition: {
        orderId: '订单号',//订单号
        phonNo: '手机号',//手机号
        idCard: '身份证号',//身份证号
        vaNum: 'VA号码',//VA号码
        search: '查询',//查询
        type: '业务类型',//业务类型
    },
    tabLoanRecord: {
        title: '借款记录',//借款记录
    },
    colLoanRecord:[
        '操作',//操作
        '业务类型',//业务类型
        '手机号',//手机号
        '订单号',//订单号
        '申请时间',//申请时间
        '借款金额',//借款金额
        '借款期限',//借款期限
        '利率',//利率
        '订单状态',//订单状态
    ],
    //还款方式
    repayWay:{
        1: '线上'
    },
    colRepayPlan:[
        '期数',//期数
        '还款状态',//还款状态
        '应还金额',//应还金额
        '本息服',//本息服
        '逾期费用',//逾期费用
        '逾期天数',//逾期天数
        '实还金额',//实还金额
        '剩余待还',//剩余待还        
        '最后还款日',//最后还款日
    ],
    colRepayRecord:[
        '还款时间',//还款时间
        '还款金额',//还款金额
        '还款方式',//还款方式
        '催收减免',//催收减免
        '还款渠道',//还款渠道
    ],

    orderInfo: {
        title: '订单信息',//订单信息

    },
    orderInfoList:[
        '订单号',//订单号
        '订单状态',//订单状态
        '申请渠道',//申请渠道
        '申请时间',//申请时间
        '借款金额',//借款金额
        '借款期限',//借款期限
        '到账金额',//到账金额
        '到账时间',//到账时间
    ],
    userInfoList:[
        '姓名',//姓名
        '电话号码',//电话号码
        '身份信息',//身份信息
        '性别',//性别
        '邮箱',//邮箱
        '银行名称',//银行名称
        '银行账户',//银行账户
        '持卡人姓名',//持卡人姓名
        '虚拟账号',//虚拟账号
    ],

    userInfo: {
        title: '用户信息',//用户信息
    },
    repayRecord: {
        title: '还款记录',//还款记录
    },
    repayPlan: {
        title: '还款计划',//还款计划
    },
    collRecord: {//催收记录
        title: '催收记录',//催收记录
    },
    collRecordTableTitle:[
        '催收时间',//催收时间
        '催收人',//催收人
        '催收状态',//催收状态
        '预计还款时间',//预计还款时间
        '反馈'//反馈
    ],
    collectionStatus:[ //催收状态
        '未催收',
        '失联',
        '欺诈',
        '无还款意愿',
        '承诺还款',
        '上门催收',
        '联系人转告',
    ],

    //订单列表-列表中的订单状态(VCC申请)
    orderStatusVCC: {
        1: "待放款", //待放款
        2: "放款失败", //放款失败
        3: "待还款", //待还款
        4: "订单结清", //订单结清
        6: '提现拒绝',//提现拒绝
    },


    //订单列表-列表中的订单状态(员工贷)
    orderStatusYGD: {
        0: "未申请订单", //未申请订单
        1: "申请成功", //申请成功
        2: "审核中", //审核中
        3: "审核拒绝", //审核拒绝
        4: "审核通过", //审核通过
        5: "放款失败", //放款失败
        6: "放款成功", //放款成功
        7: "贷款结清" //贷款结清
    },
    //业务类型
    businessType: [
        {
            key: "VCC", //
            value: "1"
        },
        {
            key: "员工贷", //员工贷
            value: "2"
        },
        {
            key: "现金贷产品", //现金贷产品
            value: "3"
        }
    ],
    //性别
    genderText: {
        0: "女", //女
        1: "男" //男
    },
    //还款状态
    repayStatus: {
        0: "待还款", //待还款
        1: "已逾期", //已逾期
        2: "已结清" //已结清
    },
    //是否减免还款
    isCutText: {
        "0": "否",//否
        "1": "是"//是
    },


    commonData: {
        watch: '查看',
        nodata: '没有数据',//没有数据
        canBeNull: '业务类型和业务id不能为空',//业务类型和业务id不能为空
    },
}

export default msCs
