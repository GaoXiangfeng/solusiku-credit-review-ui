<template>
    <div class="orderPanel">
        <Form :label-width="130" slot="title">
            <!--业务类型-->
            <FormItem :label="orderSearchItem[6]" class="order-form-item">
                <Select v-model="form.productType" @on-change="changeBusinessType">
                    <Option v-for="item in businessType" :key="item.value" :value="item.value">{{item.key}}
                    </Option>
                </Select>
            </FormItem>
            <!--订单状态-->
            <FormItem :label="orderSearchItem[0]" class="order-form-item">
                <Select v-if="form.productType == 1" v-model="form.status" @on-change="changeStatus">
                    <Option v-for="item in searchTypeApply" :key="item.value" :value="item.value">{{item.key}}
                    </Option>
                </Select>
                <Select v-if="form.productType == 2 " v-model="form.status" @on-change="changeStatus">
                    <Option v-for="item in searchTypeTX" :key="item.value" :value="item.value">{{item.key}}
                    </Option>
                </Select>
                <Select v-if="form.productType == 3 || form.productType == 4" v-model="form.status" @on-change="changeStatus">
                    <Option v-for="item in searchTypeAll" :key="item.value" :value="item.value">{{item.key}}
                    </Option>
                </Select>
            </FormItem>
            <!--查询字段-->
            <FormItem :label="orderSearchItem[1]" class="order-form-item">
                <Select v-model="form.field" @on-change="changeField">
                    <Option key="-1" value="-1">Kosong
                    </Option>
                    <Option  v-for="item in searchField.auditField"
                            :key="item.value" :value="item.value">{{item.key}}
                    </Option>
                    <!-- <Option v-if="Number(form.status) > 6" v-for="item in searchField.orderField"
                            :key="item.value" :value="item.value">{{item.key}}
                    </Option> -->
                </Select>
            </FormItem>
            <!--查询内容-->
            <FormItem :label="orderSearchItem[2]" class="order-form-item">
                <Input v-model="form.content"
                       :placeholder="orderSearchItem[2]"></Input>
            </FormItem>
            <br>
            <!----创建时间-->
            <div class="order-form-item ivu-form-item create-time">
                <label class="ivu-form-item-label create-label">{{orderSearchItem[3]}}</label>
                <DatePicker v-model="form.time" type="datetimerange" style="width: 280px"
                            :options="timeLimit" @on-change="timeClear"></DatePicker>
            </div>
            <FormItem class="order-form-item order-button">
                <Button type="primary" icon="ios-search" @click="searchData(1)">{{orderSearchItem[4]}}</Button>
            </FormItem>
        </Form>
        <div>
            <div class="export" style="text-align:right;margin-bottom: 5px;">
                <Select style="width:120px;margin:0 10px 0px 0" v-model="selectExportTime" >
                    <Option key="1" value="1">Data hari ini</Option>
                    <Option key="2" value="2">Data bulan ini</Option>
                </Select>
                <Button type="primary" @click="handleExport">Ekspor</Button>
            </div>
            <Table @on-sort-change="handleSortChange" :row-class-name="rowClassName" :columns="columns1" :data="data1" :no-data-text="orderTableData[2]"></Table>
            <div style="text-align:right;margin:20px 0 40px 40px;">
                <Page :total="totalItems" :current="form.pageNum"
                      :page-size="form.pageSize" @on-page-size-change="changeSize"
                      @on-change="changePage" size="small" show-total show-elevator show-sizer></Page>
            </div>
        </div>
        <a ref="target" href="" target="_blank"></a>
    </div>
</template>
<script>
    import store from '../../store/index'
    import {mapState} from 'vuex';
    import orderListApi from '../../services/api/orderList.service'
    import moment from 'moment'
    import localStorage from  '../../services/localStorage.service'
    //import debug from 'debug';
    //const mylog = debug('app:components/PDFData')
    //import { get } from 'lodash';
    
    const getAndSet = function (name) {
        return {
            // getter
            get: function () {
                return this.$store.state.module[name];
            },
            // setter
            set: function (newValue) {
                this.$store.state.module[name] = newValue;
            }
        }
    }
    export default {
        data () {
            return {
                selectExportTime: '1',
                //订单列表查询条件
                form: {
                    productType: '1',
                    status: '-2',
                    field: '-1',
                    content: '',
                    sort: 'DESC',
                    sortBy: 'createTime',
                    pageNum: 1,
                    pageSize: 20,
                    startTime: '',
                    endTime: '',
                    time: [],
                },
                divWidth: '300px',
                labelWidth: '130px',//中英 130   印尼200
                orderCardData: [],
                value: '',
                totalItems: 0,
                timeSort: false,
                columns1: [
                    {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        size: 'small',
                                        type: 'primary'
                                    },
                                    
                                    on: {
                                        click: () => {
                                            if(params.row.sourceId !== 'undefined'){
                                                localStorage.set('currentOrderInfo',null)
                                                localStorage.set('currentPath','orderDetail')

                                                let param = {
                                                    productType: this.form.productType,
                                                    sourceType: params.row.sourceType,
                                                    sourceId: params.row.sourceId,
                                                    ticketId: 0,
                                                    type: 0,
                                                    count: 0,
                                                    auditorName: 0,
                                                    isCheck: false,
                                                    userId:params.row.userId
                                                }
                                                param = window.btoa(window.encodeURIComponent(JSON.stringify(param)))//加密


                                                let sourceId = window.btoa(window.encodeURIComponent(params.row.sourceId))//加密
                                                let target = this.$refs.target
                                                target.setAttribute('href', window.location.origin + `/home/taskPanel/orderDetail/${sourceId}?param=${param}`)
                                                target.click()
                                            }else{
                                                this.$Notice.error({title: 'sourceId  undefined!'})
                                            }
                                        }
                                    }
                                }, this.orderTableData[0])
                            ])
                        }
                    }, {
                        title: '电话号码',
                        key: 'phoneNo',
                    }, {
                        title: '订单号',
                        key: 'sourceId',
                    }, {
                        title: '创建时间',
                        key: 'createTime',
                        sortable: 'custom',
                        width: 180
                    }, {
                        title: '借款金额',
                        key: 'principal',
                        render: (h, params) => {
                            if(params.row.principal){
                                return h('div', Number(params.row.principal).toFixed(0))
                            }else{
                                return h('div', "")
                            }
                        }
                    }, {
                        title: '借款天数',
                        key: 'term',
                    }, {
                        title: '利率',
                        key: 'rate',
                        render: (h, params) => {
                            if(params.row.rate){
                                return h('div', `${this.multiply(params.row.rate , 100)}%`)
                            }else{
                                return h('div', '')
                            }
                        }
                    }, {
                        title: '计息方式',
                        key: 'interestReckon',
                        width: 150,
                        render: (h, params) => {
                            return h('div', this.orderTableData[1]) //先息后本
                        }
                    }, {
                        title: '订单状态',
                        key: 'status',
                        render: (h, params) => {
                            if(this.form.productType == 1){//vcc申请
                                return h('div', this.orderStatusVCCAPPLY[Number(params.row.status)]) //订单状态
                            }else if(this.form.productType == 2){//vcc提现
                                return h('div', this.orderStatusVCCTX[Number(params.row.status)]) //订单状态
                            }else if(this.form.productType == 3 || this.form.productType == 4){//员工贷和现金贷
                                return h('div', this.orderStatusYGD[Number(params.row.status)]) //订单状态
                            }
                        }
                    }

                ],
                orderTableData: {},
                data1: [],
                orderSearchItem: [],
                searchTypeAll: [],
                searchTypeApply: [],//申请
                searchTypeTX: [],//体现
                businessType: [],//业务类型
                orderStatusYGD: {},
                orderStatusVCCAPPLY: {},
                orderStatusVCCTX: {},
                searchField: {
                    kong: {
                        key: 'Kosong',
                        value: '-1'
                    },
                    auditField: {},
                    orderField: {},
                },
                timeLimit: {
                    disabledDate (date) {
                        return date && (date.valueOf() < Date.now() - 86400000 * 90 || date.valueOf() > Date.now());
                    }
                },
                searchPromptInfo: {},
                formCopy: {}
            }
        },
        methods: {
            //导出按钮
            handleExport(){
                let now = new Date();
                switch(this.selectExportTime){
                    case '1':{
                        let startTime = moment(new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0)).format('YYYY-MM-DD HH:mm:ss')
                        let endTime = moment(new Date(now.getFullYear(),now.getMonth(),now.getDate(),23,59,59)).format('YYYY-MM-DD HH:mm:ss')
                        orderListApi.exportExcelData({
                            startTime: startTime,
                            endTime: endTime
                        }).then(res => {
                            const url = window.URL.createObjectURL(new Blob([res]));
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', 'dayList.xlsx');
                            document.body.appendChild(link);
                            link.click();
                            
                        })
                        
                        break;
                    }
                    case '2':{
                        let startTime = moment(new Date(now.getFullYear(),now.getMonth(),1,0,0,0)).format('YYYY-MM-DD HH:mm:ss')
                        let endTime = moment(new Date(now.getFullYear(),now.getMonth() + 1,1,0,0,0) - 1).format('YYYY-MM-DD HH:mm:ss')
                        orderListApi.exportExcelData({
                            startTime: startTime,
                            endTime: endTime
                        }).then(res => {
                            const url = window.URL.createObjectURL(new Blob([res]));
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', 'monthList.xlsx');
                            document.body.appendChild(link);
                            link.click();
                        })
                        break;
                    }
                }
            },

            //利率精度矫正
            multiply(arg1, arg2) { 
                var m = 0, s1 = arg1.toString(), s2 = arg2.toString(); 
                try{
                    m +=s1.split(".")[1].length
                } catch(e){} 
                try{
                    m+=s2.split(".")[1].length
                } catch(e){}  
                return Number(s1.replace(".","")) * Number(s2.replace(".","")) / Math.pow(10,m) 
            },
            //清除时间
            timeClear(time){
                this.form.time = time
                if (this.form.time[0] === '') {
                    this.form.time = []
                } else {
                    this.form.time[1] = this.form.time[1].replace('00:00:00','23:59:59')
                }
            },

            //排序
            handleSortChange(column){
                this.form.sortBy = column.key || 'createTime'
                if(column.order === 'normal') column.order = 'asc'
                this.form.sort = column.order && column.order.toUpperCase() || 'DESC'
                this.searchData(1)
            },
            changeBusinessType(){
                this.form.status = '' //默认为空
                this.form.field = '-1' //默认为空
            },
            //订单状态决定查询字段
            changeStatus(){
                this.form.field = '-1' //默认为空
            },
            //查询字段修改后 内容默认为空
            changeField(){
                this.form.content = ''
            },
            //查询数据
            searchData(pageNo){
                this.data1 = []
                this.totalItems = 0

                this.form.pageNum = pageNo
                let task = []

                let param = JSON.parse(JSON.stringify(this.form))

                if(Number(param.field) < 0){
                    param.field = ''
                }
                if(Number(param.status) < 0){
                    param.status = ''
                }

                if (this.form.time.length > 0 && this.form.time[0]) {
                    param.startTime = moment(this.form.time[0]).format("YYYY-MM-DD HH:mm:ss")
                    param.endTime = moment(this.form.time[1]).format("YYYY-MM-DD HH:mm:ss")
                }
                delete param.time

                if(Number(param.status) < 0){ param.status = '' }
                if(param.productType == 1){//如果为业务类型为申请，则走工单维度
                    task.push(orderListApi.getTicketList({content: JSON.stringify(param)}))
                }else if(param.productType == 2){//如果为业务类型为提现，则走订单维度
                    task.push(orderListApi.getOrderList({content: JSON.stringify(param)}))
                }else if(param.productType == 3 || param.productType == 4){//如果为业务类型为员工贷，则需判断订单状态
                    //1.如果订单状态为空，则走订单状态
                    if(param.status == -1){
                        task.push(orderListApi.getOrderList({content: JSON.stringify(param)}))
                    }
                    //2.如果订单状态为开始到终身拒绝，则走工单状态
                    if(0 <= param.status &&  param.status <= 6){
                        task.push(orderListApi.getTicketList({content: JSON.stringify(param)}))
                    }
                    //3.如果订单状态为放款成功或失败，则走订单状态
                    if(6 < param.status){
                        task.push(orderListApi.getOrderList({content: JSON.stringify(param)}))
                    }
                }

                Promise.all(task).then(res => {
                    //table
                    this.columns1.forEach((item, j) => {
                        item.title = this.orderListTitle[j]
                    })
                    if (res && res[0].orderList.length === 0) {
                        this.$Notice.success({title: this.orderTableData[3]})
                        this.data1 = []
                    } else {
                        this.data1 = res && res[0].orderList
                        this.totalItems = res && res[0].pageDTO && Number(res[0].pageDTO.totalNum)
                    }

                    if (this.form.field === 'highRisk') this.form.content = ''

                })
            },

            changeLanguage(){
                this.$i18n.locale = this.language
                let tabsArr = this.$i18n.messages[this.$i18n.locale].message.orderList
                document.querySelector('.create-time').style.width = this.language === 'indo' ? '485px' : '410px'
                document.querySelector('.create-label').style.width = this.language === 'indo' ? '200px' : '130px'
                //tabs
                this.orderCardData = tabsArr.orderCardData

                //search
                this.orderSearchItem = tabsArr.orderSearchItem //搜索条件
                this.orderListTitle = tabsArr.orderListTitle //表头
                this.orderTableData = tabsArr.orderTableData  //查看、先息后本、无数据
                this.searchPromptInfo = tabsArr.searchPromptInfo //查询条件不足的提示语
                this.searchTypeAll = []
                this.searchTypeApply = []
                this.orderStatusVCCAPPLY = {}
                this.orderStatusVCCTX = {}
                this.orderStatusYGD = {}
                
                this.searchField = []
                this.businessType = []

                setTimeout(() => {
                    this.businessType = tabsArr.businessType
                    this.searchTypeAll = tabsArr.searchTypeAll
                    this.searchTypeTX = tabsArr.searchTypeTX
                    this.searchTypeApply = tabsArr.searchTypeApply
                    this.orderStatusVCCAPPLY = tabsArr.orderStatusVCCAPPLY
                    this.orderStatusVCCTX = tabsArr.orderStatusVCCTX
                    this.orderStatusYGD = tabsArr.orderStatusYGD
                    this.searchField = tabsArr.searchField
                    if(this.formCopy.status){
                        this.form = this.formCopy
                    }
                    if (this.form.status !== '-1' && this.form.field !== '-1') {
                        this.searchData(this.form.pageNum) //为了保持当前有数据的情况下切换语言  依然是当前列表
                    } else {
                        //table
                        this.columns1.forEach((item, j) => {
                            item.title = this.orderListTitle[j] //表头翻译
                        })
                    }
                    //table
                        this.columns1.forEach((item, j) => {
                            item.title = this.orderListTitle[j] //表头翻译
                        })
                }, 100)
            },
            //改变页码-
            changePage (page) {
                this.form.pageNum = page
                this.searchData(page)
            },
            //改变每页显示数量-
            changeSize (size) {
                this.form.pageSize = size
                this.searchData(1)
            },
            //table隔行换色
            rowClassName (row, index) {
                if (index%2 == 1) {
                    return 'demo-table-info-row';
                } 
                return '';
            }
        },
        computed: {
            language: getAndSet('language'),
        },
        watch: {
            language: function () {
                this.formCopy = JSON.parse(JSON.stringify(this.form))
                this.changeLanguage()
            }
        },
        mounted(){
            this.changeLanguage()
            if (this.$route.query.isSearch) {
                if (this.form.status !== -1 && this.form.field !== -1) {
                    this.searchData(this.form.pageNum)
                }
            }
            //debug.log('log');
        }

    }
</script>
<style lang="less">
    .orderPanel {
        margin: 10px;
        .order-form-item {
            width: 330px;
            display: inline-block;
            margin-bottom: 10px;
            margin-right: 15px;
        }
        .order-button {
            display: inline-block;
            width: 450px;
        }
        .ivu-table th {
            text-align: center;
            white-space: nowrap;
        }
        .ivu-table td {
            text-align: center;
        }
        .ivu-table-cell {
            padding: 5px 0;
        }

    }
    .ivu-btn-primary {
        background-color: #346f9b;
        border-color:  #346f9b;
}

</style>
<style lang='less'>
    .orderPanel{
        //隔行换色
        .ivu-table .demo-table-info-row td{
            background-color: rgb(226, 239, 250);
        }
        
    }
</style>