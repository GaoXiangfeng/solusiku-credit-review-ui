const msCs = {
    searchCondition: {
        orderId: 'Nomor Pesanan',//订单号
        phonNo: 'Nomor Telepon',//手机号
        idCard: 'Nomor Identitas',//身份证号
        vaNum: 'Nomor VA',//VA号码
        search: 'Permintaan',//查询
        type: 'Jenis Usaha',//业务类型
    },
    tabLoanRecord: {
        title: 'Riwayat pinjaman',//借款记录
    },
    colLoanRecord:[
        'Operasi',//操作
        'Jenis bisnis',//业务类型
        'Nomor Telepon',//手机号
        'Nomor Pesanan',//订单号
        'Waktu pengajuan',//申请时间
        'Jumlah pinjaman',//借款金额
        'lama pinjaman',//借款期限
        'Suku Bunga',//利率
        'Status pengajuan',//订单状态
    ],
    //还款方式
    repayWay:{
        1: 'Online'
    },
    colRepayPlan:[
        'Jumlah periode',//期数
        'Status pelunasan',//还款状态
        'Total tagihan',//应还金额
        'jumlah keseluruhan ',//本息服
        'Biaya tunggakan',//逾期费用
        'Jumlah hari terlambat',//逾期天数
        'Jumlah tagihan',//实还金额
        'Total Perlu kembali',//剩余待还
        'Waktu pembayaran terakhir',//最后还款日
    ],
    colRepayRecord:[
        'Waktu pelunasan',//还款时间
        'Jumlah pelunasan',//还款金额
        'Metode pelunasan',//还款方式
        'Pengurangan koleksi',//催收减免
        'Jenis pelunasan',//还款渠道
    ],

    orderInfo: {
        title: 'Informasi Pesanan',//订单信息

    },
    orderInfoList:[
        'Nomor Pesanan',//订单号
        'Status pengajuan',//订单状态
        'Cara pengajuan',//申请渠道
        'Waktu pengajuan',//申请时间
        'Jumlah pinjaman',//借款金额
        'Lama pinjaman',//借款期限
        'Jumlah Diterima',//到账金额
        'Waktu diterima',//到账时间
    ],
    userInfoList:[
        'Nama Asli',//姓名
        'Nomor Telepon',//电话号码
        'Nomor Identitas',//身份信息
        'Jenis Kelamin',//性别
        'Email',//邮箱
        'Nama Bank',//银行名称
        'Rekening Bank',//银行账户
        'Nama Pemegang Kartu',//持卡人姓名
        'Nomor VA',//虚拟账号
    ],

    userInfo: {
        title: 'Informasi Pengguna',//用户信息
    },
    repayRecord: {
        title: 'Riwayat pelunasan',//还款记录
    },
    repayPlan: {
        title: 'Rencana pembayaran',//还款计划
    },
    collRecord: {//催收记录
        title: 'Catatan koleksi',//催收记录
    },
    collRecordTableTitle:[
        'Waktu pengumpulan',//催收时间
        'Kolektor',//催收人
        'Status pengumpulan',//催收状态
        'Perkiraan waktu pembayaran',//预计还款时间
        'Umpan balik'//反馈
    ],
    collectionStatus:[ //催收状态
        'Belum Dihubungi',//未催收
        'Tidak Dapat Dihubungi',//失联
        'Pemalsuan',//欺诈
        'Tidak ada niat untuk membayar',//无还款意愿
        'Berjanji untuk membayar',//承诺还款
        'Debt Coolector',//上门催收
        'Hubungi pelapor',//联系人转告
    ],

    //订单列表-列表中的订单状态(VCC申请)
    orderStatusVCC: {
        1: "Aplikasi berhasil", //待放款
        2: "Peminjaman gagal", //放款失败
        3: "Sudah dipinjamkan", //待还款
        4: "Sudah dilunasi", //订单结清
        6: 'Penarikan menolak',//提现拒绝
    },

    //订单列表-列表中的订单状态(员工贷)
    orderStatusYGD: {
        0: "Pesanan yang belum diajukan", //未申请订单
        1: "Aplikasi berhasil", //申请成功
        2: "Sedang diperiksa", //审核中
        3: "Sitolak pemeriksaan", //审核拒绝
        4: "Lulus pemeriksaan", //审核通过
        5: "Peminjaman gagal", //放款失败
        6: "Sudah dipinjamkan", //放款成功
        7: "Sudah dilunasi" //贷款结清
    },
    //业务类型
    businessType: [
        {
            key: "VCC", //VCC
            value: "1"
        },
        {
            key: "Pinjaman karyawan", //员工贷
            value: "2"
        },
        {
            key: "Produk pinjaman tunai", //现金贷产品
            value: "3"
        }
    ],
    //性别
    genderText: {
        0: "wanita", //女
        1: "laki-laki" //男
    },
    //还款状态
    repayStatus: {
        0: "Menunggu pembayaran", //待还款
        1: "Terlambat", //已逾期
        2: "Sudah dilunasi" //已结清
    },
    //是否减免还款
    isCutText: {
        "0": "Tidak",//否
        "1": "Ya"//是
    },


    commonData: {
        watch: 'Lihat',
        nodata: 'Tidak ada data',//没有数据
        canBeNull: 'Jenis layanan dan id bisnis tidak boleh kosong！',//业务类型和业务id不能为空
    },
}

export default msCs
