const msOrderListIndo = {

    //订单列表页-表格-表头
    orderListTitle: [
        'Operasi',//操作
        'Nomor Telepon', //电话号码
        'Nomor Pesanan',//订单号
        'Waktu Pendirian',//创建时间
        'Nama Pinjaman',//借款金额
        'Hari pinjaman',//借款天数
        'Jumlah Tahap Angsuran',//利率
        'Suku Bunga',//计息方式
        'Status Pesanan',//订单状态 
    ],

    //表格数据
    orderTableData: {
        0: 'Lihat', //查看
        1: 'Bunga dulu kapital kemudian',//先息后本
        2: 'Tidak ada data',//'暂无数据'
        3: 'Tidak ada data screening',//'暂无筛选数据'
    },

    //订单列表页  --搜索条件
    orderSearchItem: {
        0: 'Keadaan Pesanan', //订单状态
        1: 'Syarat Untuk Memilih',//查询字段
        2: 'Yang Dipilih', //查询内容
        3: 'Waktu Mengajukan Pesanan', //创建时间
        4: 'Berlaku', //查询
        5: 'Kosong', //空
        6: 'Jenis Usaha',//业务类型
    },

    //查询条件不足的提示信息
    searchPromptInfo:{
        searchError: 'Keadaan pesanan dan bidang kueri tidak boleh serentak menjadi kosong！',//订单状态和查询字段不能同事为空
        contentError: 'Isi kueri tidak boleh menjadi kosong！',//查询内容不能为空
        fieldError: 'Silakan pilih bidang kueri！',//请选择查询字段
    },
    //业务类型
    businessType:[
        {
            key: 'Pengajuan VCC', //VCC-申请
            value: '1'
        }, {
            key: 'Penarikan Tunai VCC', //VCC-提现
            value: '2'
        }, {
            key: 'Pinjaman karyawan', //员工贷s
            value: '3'
        },{
            key: 'Produk pinjaman tunai', //现金贷产品
            value: '4'
        },
    ],

    //订单列表页-订单状态全部
    searchTypeAll: [
        {
            key: 'Kosong',
            value: '-1'
        }, {
            key: 'Lembar kerja belum diperiksaa', //初始
            value: '0'
        }, {
            key: 'Diluluskan sistem',//系统通过
            value: '1'
        }, {
            key: 'Ditolak sistem',//系统拒绝
            value: '2'
        }, 
        {
            key: 'Lulus pemeriksaan awal',//初审通过
            value: '3'
        }, {
            key: 'Ditolak dalam pemeriksaa',//初审拒绝
            value: '4'
        }, {
            key: 'Lulus pemeriksaan akhir',//终审通过
            value: '5'
        }, {
            key: 'Ditolak dalam pemeriksaan akhir',//终审拒绝
            value: '6'
        }, {
            key: 'Peminjaman gagal',//放款失败
            value: '7'
        }, {
            key: 'Sudah dipinjamkan',//放款成功
            value: '8'
        }
    ],
    //订单列表页-订单状态VCC体现
    searchTypeTX: [
        {
            key: 'Peminjaman gagal',//放款失败
            value: '7'
        }, {
            key: 'Sudah dipinjamkan',//放款成功
            value: '8'
        }, 
        {
            key: 'Penarikan menolak',//提现拒绝
            value: '9'
        }
    ],
    //订单列表页-订单状态vcc申请
    searchTypeApply: [
        {
            key: 'Kosong',
            value: '-1'
        }, {
            key: 'Lembar kerja belum diperiksaa', //初始
            value: '0'
        }, {
            key: 'Diluluskan sistem',//系统通过
            value: '1'
        }, {
            key: 'Ditolak sistem',//系统拒绝
            value: '2'
        }, 
        {
            key: 'Lulus pemeriksaan awal',//初审通过
            value: '3'
        }, {
            key: 'Ditolak dalam pemeriksaa',//初审拒绝
            value: '4'
        }, {
            key: 'Lulus pemeriksaan akhir',//终审通过
            value: '5'
        }, {
            key: 'Ditolak dalam pemeriksaan akhir',//终审拒绝
            value: '6'
        }
    ],
    //业务类型
    businessType:[
        {
            key: 'Pengajuan VCC', //VCC-申请
            value: '1'
        }, {
            key: 'Penarikan Tunai VCC', //VCC-提现
            value: '2'
        }, {
            key: 'Pinjaman karyawan', //员工贷s
            value: '3'
        },{
            key: 'Produk pinjaman tunai', //现金贷产品
            value: '4'
        },
    ],
    //查询字段内容
    searchField: {
        kong:{
            key: 'Kosong',
            value: '-1'
        },
        auditField: [
            {
                key: 'Pemeriksa',//审核人员
                value: 'auditorName'
            },
            {
                key: 'Nomor Telepon',//电话号码
                value: 'phoneNo'
            }, {
                key: 'Nomor Pesanan',//订单号
                value: 'sourceId'
            }
        ],
        orderField: [
            {
                key: 'Nomor Telepon',//电话号码
                value: 'phoneNo'
            }, {
                key: 'Nomor Pesanan',//订单号
                value: 'sourceId'
            }
        ]
    },

    //订单列表-列表中的订单状态(VCC申请)
    orderStatusVCCAPPLY: {
        0: 'Pesanan yang belum diajukan',//未申请订单
        1: 'Aplikasi berhasil',//申请成功
        2: 'Sedang diperiksa',//审核中
        3: 'Sitolak pemeriksaan',//审核拒绝
        4: 'Lulus pemeriksaan',//审核通过
        6: 'Penarikan menolak',//提现拒绝
    },

    //订单列表-列表中的订单状态(VCC提现)
    orderStatusVCCTX: {
        0: 'Pesanan yang belum diajukan',//未申请订单
        1: 'Aplikasi berhasil',//申请成功
        2: 'Peminjaman gagal',//放款失败
        3: 'Sudah dipinjamkan',//放款成功
        4: 'Sudah dilunasi',//订单结清
        6: 'Penarikan menolak',//提现拒绝
    },

    //订单列表-列表中的订单状态(员工贷)
    orderStatusYGD: {
        0: 'Pesanan yang belum diajukan',//未申请订单
        1: 'Aplikasi berhasil',//申请成功
        2: 'Sedang diperiksa',//审核中
        3: 'Sitolak pemeriksaan',//审核拒绝
        4: 'Lulus pemeriksaan',//审核通过
        5: 'Peminjaman gagal',//放款失败
        6: 'Sudah dipinjamkan',//放款成功
        7: 'Sudah dilunasi',//贷款结清
    }
}

export default msOrderListIndo
