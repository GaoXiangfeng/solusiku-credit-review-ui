
const msDetailListIndo = {
    //提示文案
    promptText:{
        text1: 'Jumlah total pinjaman pengguna',//用户贷款的总次数
        text2: 'Beberapa hari terakhir pinjaman terakhir',//用户上笔贷款的逾期天数
        text3: 'Apakah transfer gagal dari pinjaman terakhir',//上笔贷款是否是放款失败
        text4: 'Saluran',//上笔贷款是否是放款失败
    },
    //命中规则
    hitRiskText: {
        hitRisk: 'Peraturan hit',//命中规则
        beforeReview: 'Bacalah peringatan risiko dengan teliti!!',//审核前，请仔细阅读风险提示的内容!!
        isBind: 'KTP telah digunakan, hanya bisa memilih menolak beroperasi'//该身份证已被使用，只能选择拒绝操作！！！
    },
    //订单列表-详情页
    detailCardData: [
        {
            label: 'Informasi Pesanan', //订单信息
            tab: true
        }, {
            label: 'Informasi Pengguna', //用户信息
            tab: true
        }, 
    ],
    //历史借贷
    historyLoanTitle: {
        0: '',//查看
        1: 'Nomor pesanan',//订单号
        2: 'Waktu pembuatan',//创建时间
        3: 'Hasil Periksa',//审核结果
        4: 'Batas terakhir',//结清时间
        5: 'Yang harus dikembalikan',//还款次数
        6: 'Hari keterlambatan',//逾期天数
    },
    //借款信息-标题
    orderTitle: {
        orderInfo :'Informasi Pesanan', //订单信息
        bankInfo :'Informasi Rekening Bank Peminjam', //放款银行信息
        userInfo :'Informasi Pengguna', //用户信息
        baseInfo: 'Informasi dasar',//基本信息
        workInfo: 'Informasi pekerjaan',//工作信息
        photo: 'Sertifikasi Foto',//认证照片
        emergencyPerson: 'Kontak Darurat',//紧急联系人
    },

    //借款信息-订单信息
    userOrderInfo: [
        {
            label: 'Keadaan Pinjaman',//贷款状态
            key: 'orderStatus',
            value: '',//值
        }, {
            label: 'Jumlah Uang Pinjaman',//借款金额
            key: 'principal',
            value: '',//值
        }, {
            label: 'Jumlah Hari Pinjaman',//借款天数
            key: 'item',
            value: '',//值
        },
        {
            label: 'Ongkos Prosedur',//砍头费
            key: 'beheadAmount', //
            value: '',//值
        }, 
        {
            label: 'Waktu Mengajukan Pesanan',//申请时间
            key: 'applyTime',
            value: '',//值
         }
    ],
    //借款信息-订单信息（vcc）
    userOrderInfoVCC: [
        {
            label: 'Keadaan Pinjaman',//贷款状态
            key: 'orderStatus',
            value: '',//值
        },
        {
            label: 'Waktu Mengajukan Pesanan',//申请时间
            key: 'applyTime',
            value: '',//值
         }
    ],

    //借款信息-放款银行信息
    userBankInfo: [
        // {
        //     label: 'Nomor Identitas',//身份证号
        //     key: 'idCardNo',
        //     value: '',//值
        // }, {
        //     label: 'Advance Ai Hasil',//风控校验账户姓名
        //     key: 'verifyUserName',
        //     value: '',//值
        // }, 
        {
            label: 'Nama Bank',//银行名称
            key: 'bankName', //
            value: '',//值
        }, {
            label: 'Rekening Bank',//银行账号
            key: 'bankAccount',
            value: '',//值
        }, 
        {
            label: 'Nama Pemegang Kartu',//持卡人姓名
            key: 'holderName',
            value: '',//值
        },
        // {
        //     label: 'Pengecekan Nama',//姓名规则校验
        //     key: 'authStatus',
        //     value: '',//值
        // }, {
        //     label: 'Saluran pembayaran',//支付渠道
        //     key: 'fundingName',
        //     value: '',//值
        // }
    ],

    //银行账户姓名与申请人姓名校验 
    bankInfoMatch:{
        title: 'Nama rekening bank dan verifikasi nama pemohon',
        holderName: 'Nama rekening bank',
        applyName: 'Nama pemohon',
        matchScore: 'Skor pertandingan'
    },

    //订单信息-还款银行账号信息
    userPayInfo: [
        {
            label: 'Code Pembayaran Bank',//银行付款码
            value: ''
        }, {
            label: 'Nama Bank',//银行名称
            value: ''
        }
    ],

    //后端返回的订单详情的国际化
    //订单信息-贷款状态
    loanTypeText: {
        0: 'Pesanan yang belum diajukan',//未申请订单
        1: 'Aplikasi berhasil',//申请成功
        2: 'Sedang diperiksa',//审核中
        3: 'Sitolak pemeriksaan',//审核拒绝
        4: 'Lulus pemeriksaan',//审核通过
        5: 'Peminjaman gagal',//放款失败
        6: 'Sudah dipinjamkan',//放款成功
        7: 'Sudah dilunasi',//贷款结清
    },

    //订单详情-借款天数
    loanPeriode: 'Periode',//期
    loanDay: 'Hari',//天

    //订单详情-利率
    rate: 'Suku Bunga Harian',

    //订单详情-计息方式
    rateTypeText: {
        0: 'Bunga dulu kapital kemudian'
    },

    //放款银行账号-姓名规则校验
    nameValid: {
        0:'Tidak diverifikasi',//未校验
        1: 'Memeriksa',//校验中
        2: 'Konsisten',//一致
        3: 'Tidak konsisten'//不一致
    },

    //还款银行账号信息-为找到记录
    nonePay: 'Tidak ditemukan rekaman',

    //用户信息-四个标题-后端返回数据的文案
    userTitle: {
        //标题
        userInfo: 'Informasi Pengguna',//用户信息
        photo: 'Sertifikasi Foto',//认证照片
        callBook: 'Kontak Lokal',//本地通讯录
        emergencyPerson: 'Kontak Darurat',//紧急联系人
        message: 'SMS Lokal',//本地短信
        callRecord: 'Riwayat Panggilan',//通话记录
        historyLoan: 'Pinjaman historis',//历史借贷
        //认证照片
        lastPhoto: 'Foto Kali Terakhir',//上次图片
        recentPhoto: 'Foto Kali Ini',//本次照片
        //button
        phone: 'omor HP',//手机号
        count: 'Frekuensi Hubungan',//联系次数
        sendOrAcceptTime: 'waktu kirim',//收发时间
        riskMessage: 'Risiko SMS',//风险短信
        callTime: 'waktu panggila',//通话时间
        callDuration: 'duriasi panggilan',//通话时长
        //短信列表返回的数据的文案
        haveRead: 'sudah dibaca',//已读
        unread: 'belum dibaca',//未读
        receive: 'diterima',//接收
        send: 'kirim',//发送
        isRisk: 'Ya',//是
        noRisk: 'Tidak',//否
        //时分秒、通话类型、通话状态
        h: 'jam',//小时
        m: 'menit',//分钟
        s: 'detik',//秒
        out:'pemanggil',//呼出
        in:'penjawab',//呼入
        reject: 'ditolak',//拒接
        no: 'tdk dijawab',//未接通
        yes: 'dijawab',//接通
        noNumber: 'Tdk aktif',//空号
        selfAnswer: 'Penerima',//本人接听
        unknown: 'tidak diketahui',//未知
        powerOff: 'mati daya',//关机
        //submit
        action: 'Operasi',//操作
        rejectReason: 'Alasan Tolak',//拒绝原因
        remark: 'Kterangan',//备注
        submit: 'Aju',//提交
        //通过、拒绝操作弹框
        title:'Apakah akan menyerahkan operasi audit？',//是否提交审核操作
        auditWarning: 'Kirim persetujuan gagal, perintah kerja telah lepas!',//提交审核失败,该工单已被释放
        confirm: 'Konfirmasi',//确认
        cancel: 'Batal',//取消
        goBack: 'Kembali',//返回订单列表页
        goTop: 'Atas',//返回顶部
        loading: 'Sedang dalam peninjauan',//审核中
        //历史借贷
        createTime: 'Waktu pembuatan',//创建时间
        opera: 'Lihat',//查看
        noCaseTip: 'Pengguna terdaftar tidak masuk',//注册用户未进件
    },

    //历史借贷表头
    historyLoanColumnTitle:[
        'Jenis Bisnis',//业务类型
        'Nomor pesanan',//订单号
        'Waktu pembuatan',//创建时间
        'Status pemesanan',//订单状态
        'Batas terakhir',//结清时间
        'Hari keterlambatan',//逾期天数
        'Alasan penolakan',//拒绝原因
    ],
    businessType:{
        1: 'Pengajuan VCC', //VCC-申请
        2: 'Penarikan Tunai VCC', //VCC-提现
        3: 'Pinjaman karyawan', //员工贷s   
        4: 'Produk pinjaman tunai', //现金贷产品
    },

    //用户基本信息
    userBaseInfo: [
        {
            label: 'Nomor Telepon',//电话号码
            key: 'userPhoneNo',
            value: '',//值
        }, {
            label: 'Nama Asli',//真实姓名
            key: 'name',
            value: '',//值
            canEdit: true,
        }, {
            label: 'Nama Ibu',//母亲姓名
            key: 'motherName',
            value: '',//值
        }, {
            label: 'Nomor Identitas',//身份证号
            key: 'idCardNo',
            value: '',//值
            canEdit: true,
        },{
            label: 'Jenis Kelamin',//性别
            key: 'gender',
            value: '',//值
        }, {
            label: 'Usia',//年龄
            key: 'age',
            value: '',//值
        },  {
            label: 'Riwayat Pendidikan Resmi',//学历
            key: 'education',
            value: '',//值
        }, {
            label: 'Status pernikahan',//婚姻状况
            key: 'maritalStatus',
            value: '',//值
        },  {
            label: 'Tujuan Pinjaman',//借款目的
            key: 'purpose',
            value: '',//值
        }, {
            label: 'Kotak surat',//邮箱
            key: 'email',
            value: '',//值
            canEdit: true,
        },  {
            label: 'Alamat Terinci',//详细地址
            key: 'detailAddress',
            value: '',//值
        }, 
    ],
    //用户工作信息
    userWorkInfo: [
        {
            label: 'Profesi',//职业
            key: 'occupation',
            value: '',//值
        }, {
            label: 'Lama Bekerja',//工作年限
            key: 'workTime',
            value: '',//值
        },{
            label: 'Gaji Bulanan',//月薪
            key: 'income',
            value: '',//值
        }, {
            label: 'Hari Gajian',//发薪日
            key: 'payDay',
            value: '',//值
        }, {
            label: 'Nama Perusahaan',//公司名称
            key: 'companyName',
            value: '',//值
        }, {
            label: 'Nomor Telepon Perusahaan',//公司电话
            key: 'companyPhoneNo',
            value: '',//值
        }, {
            label: 'Alamat Perusahaan',//公司地址
            key: 'companyAddress',
            value: '',//值
        },
    ],

    //婚姻状况
    maritalStatus: {
        1: 'lajang',//单身
        2: 'menikah',//已婚
        3: 'duda',//离异
        4: 'janda',//丧偶
    },
    //月薪
    incomeList:{
        1: '0-2 Juta',
        2: '2-4 Juta',
        3: '4-6 Juta',
        4: '6-8 Juta',
        5: '8-10 Juta',
        6: 'Lebih dari 10 Juta',
    },

    //用户信息-联系人信息
    contactText: [
        {
            label: 'Nama Konta#1',//联系人姓名#1
            value: '',//值
        }, {
            label: 'Nama Konta#2',//联系人姓名#2
            value: '',//值
        }, {
            label: 'Hubungan Dengan Kontak#1',//联系人关系#1
            value: '',//值
        }, {
            label: 'Hubungan Dengan Kontak#2',//联系人关系#2
            value: '',//值
        }, {
            label: 'Nomor Telepon Kontak#1',//联系人电话#1
            value: '',//值
        }, {
            label: 'Nomor Telepon Kontak#2',//联系人电话#2
            value: '',//值
        }, {
            label: 'Jumlah Kontak#1',//联系次数#1
            value: '',//值
        }, {
            label: 'Jumlah Kontak#2',//联系次数#2
            value: '',//值
        }
    ],

    //用户信息-table无数据的展示
    tableNoText: 'Tidak ada data',

    //用户信息-认证照片
    userPhotoTitle: {
        0: 'Foto Sisi Muka',//正面照片
        1: 'Foto Anda Memegang Kartu',//手持照片
        2: 'Pengenalan wajah',//人脸识别照片
        3: 'Foto NPWP',//税卡照片
        4: 'Dokumen Pelengkap Lainnya',//其他照片

        5: 'Foto kartu ID terbalik',//身份证反面
        6: 'Buku akun',//户口本
        7: 'Kartu jaminan sosial',//社保卡
        8: 'Foto kerja',//工作照
        9: 'Daftar gaji',//工资单
    },
    //用户信息-紧急联系人-表头
    userEmergencyContactsTitle: {
        0: 'Nama lengkap',//姓名
        //1: 'Gender',//性别
        1: 'Hubungan',//关系
        2: 'Nomor HP',//手机号
        3: 'Baik pengguna platform',//是否平台用户
        //4: 'Informasi kontak',//联系情况
        4: 'Pengguna platform',//平台用户
    },
    //用户信息-本地通讯录-表头
    userCallBookTitle: {
        0: 'Nama',//姓名
        1: 'Nomor HP',//手机号
        2: 'Frekuensi Hubungan'//联系次数
    },
    //用户信息-本地短信-表头-已读-短信类型
    userMessageTitle: {
        0: 'Nama',//姓名
        1: 'Waktu Kirim',//收发时间
        2: 'Nomor HP',//手机号
        3: 'Risiko SMS',//风险短信
        4: 'Sudah Dibaca',//已读
        5: 'Jenis SMS',//短信类型
        6: 'Isi SMS',//短信内容
    },

    //用户信息-本地通话记录-表头
    userCallRecordTitle: {
        0: 'Waktu panggilan',//通话时间
        1: 'Nama',//姓名
        2: 'Nomor HP',//手机号
        3: 'Duriasi Panggilan',//通话时长
        4: 'Jenis panggilan',//通话类型
        5: 'Keadaan panggilan',//通话状态
    },

    //用户信息-后端返回数据的对应text
    /**
     * genderText: 性别 professionText: 职业 educationText:学历  relationText: 关系 purposeText: 借款目的
     */
    genderText: {
        0: 'wanita',//女
        1: 'laki-laki',//男
    },
    occupationText: {
        1: 'Karyawan Swasta',//私人雇员
        2: 'Pegawai Negeri Sipil',//公务员
        3: 'Dokter',//医生
        4: 'Wiraswasta',//承包人
        5: 'Civil',//民事
        6: 'Pelajar ',//学生
        7: 'Pengacara',//律师
        8: 'Other'//其他
    },
    educationText: {
        1: 'Sekolah Dasar',//小学
        2: 'SMP' ,//初中
        3: 'SMA' ,//高中
        4: 'Perguruan tinggi',//大专
        5: 'Universitas',//大学
        6: 'Master',//硕士
        7: 'Dr.',//博士
    },
    relationText: {
        1: 'Orang tua',//父母
        2: 'Pasangan' ,//配偶
        3: 'Anak' ,//孩子
        4: 'Kerabat tidak serumah',//亲戚
        5: 'Teman',//朋友
        6: 'Rekan kerja',//同事
        7: 'Mitra',//合作伙伴
    },
    purposeText: {
        1: 'Kesehatan dan pengobatan',//健康医疗
        2: 'Merangkap jabatan dan memulai usaha' ,//兼职创业
        3: 'Produk digital',//数码产品
        4: 'Pendidikan dan pelatihan',//教育培训
        5: 'Perjalanan dan konsumsi',//旅行消费
        6: 'Mebel/dekorasi rumah',//家居／装修
        7: 'Penyewaan rumah',//租房
    },

    //审核信息表头
    auditInfoTitle: {
        0: 'Waktu Periksa',//审核时间
        1: 'Tahap',//阶段
        2: 'Hasil Periksa',//审核结果
        3: 'Nama Pemeriksa',//审核人员姓名
        4: 'Komentar Periksa'//审核意见
    },
    //后台返回是审核信息
    auditLevelText: {
        '0': 'Belum diperiksa',//未审核
        '1': 'Diperiksa mesin',//机审
        '2': 'Pemeriksaan awal',//初审
        '3': 'Pemeriksaan akhir',//终审  
    },
    auditActionText: {
        '0': 'Inisialisasi',//初始化
        '1': 'Diluluskan sistem',//机审通过
        '2': 'Ditolak sistem',//机审拒绝
        '3': 'Lulus pemeriksaan awal',//初审通过
        '4': 'Ditolak dalam pemeriksaa',//初审拒绝
        '5': 'Lulus pemeriksaan akhir',//终审通过
        '6': 'Ditolak dalam pemeriksaan akhir'//终审拒绝
    },


    //最后的提交表单
    auditForm: {
        status: '2',
        rejectReason: 'Inconsistent national ID info',
        remark: ''
    },

    //拒绝原因
    rejectReason: {
        1: 'Data KTP tidak sesuai', //身份证信息不一致
        2: 'Data debitur tidak sesuai', //工作信息不一致
        3: 'Riwayat telepon tidak normal', //通话记录异常
        4: 'Data yg di berikan palsu', //提交虚假信息
        5: 'KTP dengan debitur sendiri tidak sama', //手持身份证与借款人不一致
        6: 'Nomor telepon tidak normal', //电话号码异常
        7: 'Data di kartu ATM tidak sama dengan debitur', //银行卡信息与本人不一致
        8: 'Pengembalian dana susah', //还款能力不足
        9: 'Riwayat terdapat keterlambatan', //历史还款逾期
        10: 'Banyak melakukan peminjaman online', //多头借贷
        11: 'Susah di hubungi', //难以联系
        12: 'Informasi yg tidak bagus', //负面信息
        13: 'Foto tidak sesuai', //照片有误
        14: 'kontak EC tidak normal', //紧急联系人异常
        15: 'Black list', //黑名单
        16: 'Dll', //其他
    },

    actionText: [
        {
            key: '1',
            value: 'Pass'
        }, {
            key: '2',
            value: 'Tolak'
        },
    ],

    tabCS: {
        loanInfo: 'Informasi pinjaman',//贷款信息
        creditReport: 'Laporan kredit',//信用报告
        gender: 'Jenis Kelamin',//性别
        age: 'Umur',//年龄
        isJabLiver: 'Apakah penduduk Jabodetabek',//是Jabodetabek居民？
        isJobSuitable: 'apakah pekerjaan Borrower sesuai',//借款人职业是否合适？
        workAge: 'Lama Kerja',//工作多久了
        isSalarySuitable: 'apakah gaji borrower sesuai',//借款人的工资合适吗
        
        nameIDSame: 'Apakah nama sesuai dengan KTP',//名字是否与身份证符合
        addressIDSame: 'apakah alamat tinggal borrower sama dengan KTP?',//借款人的住所是否与身份证相同
        hasTaxCard: 'Apakah Borrower melampirkan NPWP',//借款人是否附加NPWP（税卡）
        taxCardBelongBorrower: 'Apakah NPWP adalah milik borrower',//NPWP是否属于借款人
        hasWorkProve: 'apakah Borrower melampirkan bukti pekerjaan',//借款人是否附上工作证明？
        workProveBelongBorrower: 'apakah bukti kerja merupakan bukti borrower',//工作证明是否是借款人的证明
        hasOtherProve: 'Apakah Borrower melampirkan dokumen pendukung lain nya',//借款人是否附上其他证明文件？
        
        phoneRight: 'apakah nomor Handphone sudah sesuai',//手机号码是否正确
        phoneCanBeCall: 'apakah nomor handphone milik borrower dapat dihubungi?',//是否可以联系借款人的手机号码？
        hasCreditCard: 'Apakah borrower memiliki kartu kredit',//是否有信用卡
        loanCount: 'Jumlah aplikasi pinjaman dalam 3 bulan terakhir',//3个月内贷款软件数量
        loanAmountOtherApp: 'Dalam kurun waktu 3 bulan nominal pinjaman di aplikasi lain',//三个月其他内贷款软件金额
        overDueDay: 'Dalam kurun waktu 12 bulan, berapa hari lama tunggakan untuk membayar cicilan',//12个月内逾期天数
        canContactEm: 'Apakah kontak darurat dapat di hubungi atau tidak?',//是否可以联系紧急联系人?
        whichEmCanbeProve: 'Berapakah kontak darurat yg bersedia untuk menjadi saksi dari Borrower ? ',//哪些紧急联系人愿意成为借款人的见证人？
    },
    tabResult:{
        scoreTitle: 'Hasil akhir',//得分结果
        score: 'Skor akhir',//得分
        suggest: 'Saran terakhir',//最终建议
        finalResult: 'Hasil akhir',//最终结果
        finalReview: 'Audit Akhir',//最终审核
        remark: 'Catatan persetujuan',//审批备注
        pass: 'disetujui',//通过
        reject: 'tidak disetujui',//拒绝
        waitPersonReview: 'Bantuan pemeriksaan manual',//人工介入复查
        detailReport: 'Laporan terperinci',//详细报告
    },
    faceIdentification:{
        title: 'pencocokan wajah',//人脸匹配
        similarity: 'Kesamaan pencocokan',//相似度
        compareCount: 'Waktu perbandingan',//对比次数
        countTip: 'Pengguna telah memverifikasi lebih dari 10 kali dan disarankan untuk di tolakPengguna telah memverifikasi lebih dari 10 kali dan disarankan untuk di tolak',//该用户校验超过10次，建议拒绝
        reviewSuggestion: 'Saran pemeriksaan',//审核建议
    },
    rejectModal:{
        rejectType: 'Jenis Penolakan(wajib)',//拒绝类型
        rejectReason: 'Alasan penolakan(wajib)',//拒绝原因
        rejectTypeForTabTwo: 'Jenis Penolakan',//拒绝类型
        rejectReasonForTabTwo: 'Alasan penolakan',//拒绝原因
        title: 'persetujuan',
        label: 'Catatan persetujuan(wajib)',
        commit: 'konfirmasi',
        errorTip: 'silakan masukan alasan penolakan!',
        operationTip: '* Rejection type, rejection reason, approval note Required when the approval result is rejected'
    },

    rejectType: {//拒绝类型
        1: 'D1 Kelompok non-target',//D1非目标人群
        2: 'D2 Dokumen tidak sesuai persyaratan',//D2资料不符合要求
        3: 'D3 Penipuan',//D3欺诈
        4: 'D4 Informasi palsu',//D4信息不真实
        5: 'D5 Verifikasi abnormal',//D1非目标人群
        6: 'D6 Informasi negatif',//D1非目标人群
    },
    rejectDetailReason: {//拒绝原因详细
        1:{
            11: 'Tidak ada pendapatan atau pendapatan tidak memenuhi syarat',//无收入或收入不符合要求
            12: 'Tidak mampu membayar',//无能力偿还
            13: 'Kelompok orang terlarang',//禁入类人群
            14: 'Tujuan peminjaman tidak sesuai',//借款用途不符
            15: 'Bukan warga negara Indonesia',//非印尼当地居民
            16: 'Usia sebenarnya tidak memenuhi syarat',//实际年龄不符合要求
            17: 'Debitur merupakan karyawan kita',//借款人为我司员工
        },
        2:{
            21: 'Tidak melengkapi KTP',//未提供身份证
            22: 'Tidak melengkapi NPWP',//未提供税卡
            23: 'Tidak menampilkan foto pengenalan wajah',//未显示活体照片
            24: 'KTP tidak jelas atau sudah rusak',//身份证不清晰或已损坏
            25: 'NPWP tidak jelas atau sudah rusak',//税卡不清晰或已损坏
            26: 'Seluruh data pengajuan bukan dokumen asli',//实际年龄不符合要求
        },
        3:{
            31: 'KTP palsu',//虚假身份证
            32: 'NPWP palsu',//虚假税卡
            33: 'Bukan debitur yang mengajukan',//非本人申请
            34: 'Dokumen yang diberikan dan informasi yang diisi tidak sesuai',//提交资料与系统填写信息不一致
            35: 'Foto pengenalan wajah bukan debitur sendiri yang mengambil',//活体照片非本人拍摄
            36: 'Alasan lain',//其他原因
        },
        4:{
            41: 'Kontak darurat merupakan nomor debitur sendiri',//预留联系人为客户本人电话
            42: 'Kontak darurat tidak mengenal debitur',//预留联系人不认识客户
            43: 'Informasi pekerjaan debitur palsu',//客户单位信息不真实
            44: 'Informasi tempat tinggal palsu',//住宅信息不真实
            45: 'Informasi verifikasi tidak logis',//核实信息不符合逻辑
            46: 'Informasi kontak darurat palsu',//联系人信息不真实
            47: 'Alasan lain',//其他原因
        },
        5:{
            51: 'Debitur tidak terhubung',//无法联系到客户
            52: 'Telepon debitur mati, nomor palsu',//客户手机关机、空号
            53: 'Telepon kontak darurat mati atau tidak diangkat',//紧急联系人关机或无人接听
            54: 'Debitur ingin membatalkan pinjaman',//客户要求放弃借款
            55: 'Nomor kontak darurat palsu',//紧急联系人空号
        },
        6:{
            61: 'Melalui verifikasi mengetahui bahwa debitur punya hutang besar',//通过调查了解到客户有高负债
            62: 'Melalui verifikasi mengetahui bahwa debitur punya kebiasaan buruk',//通过调查了解到客户有不良嗜好
            63: 'Melalui verifikasi mengetahui bahwa debitur berada dalam satu bidang atau direkomendasikan oleh karyawan sebidang',//通过调查了解到客户意思同行业或同行业推荐办理
            64: 'Melalui verifikasi mengetahui bahwa debitur memiliki keterlambatan di tempat lain',//通过调查了解到客户同行有逾期
            65: 'Aplikasi atau website lain menunjukkan informasi negatif debitur',//三方应用及网站显示客户有负面信息
        },
    },
    //用户信息编辑对话框
    userInfoEditModal:{
        title: 'Edit',
        firstName: 'Nama belakang',
        lastName: 'Nama depan',
        value: 'Nilai',
        commit: 'Konfirmasi'
    }
}

export default msDetailListIndo
