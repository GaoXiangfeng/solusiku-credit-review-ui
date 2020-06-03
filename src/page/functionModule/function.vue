<template>
    <div class="function">
        <!--1.隐藏用户信息-->
        <h3>1、{{uiDisplaySource.dataText.label1}}</h3>
        <Row class="row-padd">
                <Col span="5"><Input v-model="orderId1" placeholder="orderId"></Input></Col>
                <Col span="2"  offset="1"><Button type="primary" @click="handleHiddenUserInfo">{{uiDisplaySource.dataText.hidden}}</Button></Col>
        </Row>

        <!--2.结清订单-->
        <h3>2、{{uiDisplaySource.dataText.label2}}</h3>
        <Row class="row-padd">
                <Col span="5"><Input v-model="orderId2" placeholder="orderId"></Input></Col>
                <Col span="5" offset="1">
                <Button type="primary" @click="handleFinishOrder">{{uiDisplaySource.dataText.finish}}</Button>
                <Button type="primary" @click="handleCancelOrder">{{uiDisplaySource.dataText.cancelOrder}}</Button>
                </Col>
                <Col span="2"  ></Col>
        </Row>

        <!--3.发布公告-->
        <h3>3、{{uiDisplaySource.dataText.label3}}</h3>
        <Row class="row-padd">
                <Col span="5"><Input v-model="broadCastContent" type="textarea" :rows="6" :placeholder="uiDisplaySource.dataText.content"></Input></Col>
                <Col span="2"  offset="1"><Button type="primary" @click="handleBroadCast">{{uiDisplaySource.dataText.broadcast}}</Button></Col>
        </Row>
        <Row class="row-padd">
            <Col span="5"><DatePicker v-model="timeBroadCastTime" type="datetimerange" style="width: 290px"
                         @on-change="timeClear"></DatePicker></Col>
        </Row>

        <!--4.tkb修改-->
        <h3>4、{{uiDisplaySource.dataText.label4}}</h3>
        <Row class="row-padd">
                <Col span="4"><Input v-model="curValue" :placeholder="uiDisplaySource.dataText.curValue"></Input></Col>
                <Col span="1">&nbsp;</Col>
                <!-- <Col span="4"><Input v-model="newValue" :placeholder="uiDisplaySource.dataText.newValue"></Input></Col>
                <Col span="2"  offset="1"><Button type="primary" @click="handleUpdateTKB">{{uiDisplaySource.dataText.update}}</Button></Col> -->
        </Row>

        <!--结清订单对话框-->
        <Modal v-model="finishOrderModal" width="400" :closable="false" :mask-closable="false">
            <p slot="header" style="text-align:center;font-size:15px;font-weight:600;">
            <span >{{uiDisplaySource.dataText.finishTitle}}</span>
            </p>
            <div style="height: 150px;text-align:left;">
               <Input v-model="finishRemark" type="textarea" :rows="6" :placeholder="uiDisplaySource.dataText.remark"></Input>
            </div>
            <div slot="footer" style="text-align:center">
                <Button type="primary" @click="handleFinishModalCommit">{{uiDisplaySource.dataText.submit}}</Button>
                <Button type="primary" @click="finishOrderModal = false">{{uiDisplaySource.dataText.cancel}}</Button>
            </div>
        </Modal>

        <!--取消订单对话框-->
        <Modal v-model="cancelOrderModal" width="400" :closable="false" :mask-closable="false">
            <p slot="header" style="text-align:center;font-size:15px;font-weight:600;">
            <span >{{uiDisplaySource.dataText.cancelTitle}}</span>
            </p>
            <div style="height: 150px;text-align:left;">
               <Input v-model="cancelOrderRemark" type="textarea" :rows="6" :placeholder="uiDisplaySource.dataText.remark"></Input>
            </div>
            <div slot="footer" style="text-align:center">
                <Button type="primary" @click="handleCancelModalCommit">{{uiDisplaySource.dataText.submit}}</Button>
                <Button type="primary" @click="cancelOrderModal = false">{{uiDisplaySource.dataText.cancel}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import store from '../../store/index'
    import {mapState} from 'vuex';
    import moment from 'moment'
    import localStorage from  '../../services/localStorage.service'
    import functionsServiceApi from '../../services/api/functions.service'
import functionsService from '../../services/api/functions.service';
    export default {
        data () {
            return {
                orderId1: '',
                orderId2: '',
                finishOrderModal: false,
                finishRemark: '',
                cancelOrderModal: false,
                cancelOrderRemark: '',
                broadCastContent: '',
                timeBroadCastTime:[],
                curValue: '',
                newValue: '',
                uiDisplaySource: {
                    dataText: {}
                }
            }
        },
        methods: {
            //隐藏用户信息
            handleHiddenUserInfo(){
                functionsServiceApi.hiddenUserInfo({orderId: this.orderId1}).then(res => {
                    this.$Notice.success({ title: 'Successed!' });
                    this.orderId1 = ''
                })
            },
            //结清订单
            handleFinishOrder(){
                this.finishOrderModal = true
            },
            handleFinishModalCommit(){
                functionsServiceApi.finishOrder({orderId: this.orderId2,remark: this.finishRemark.toString()}).then(res => {
                    this.$Notice.success({ title: 'Successed!' });
                    this.finishRemark = ''
                    this.orderId2 = ''
                    this.finishOrderModal = false
                })
            },
            //取消订单
            handleCancelOrder(){
                this.cancelOrderModal = true
            },
            //取消订单--modal确认
            handleCancelModalCommit(){
                functionsServiceApi.cancelOrder({orderId: this.orderId2,remark: this.cancelOrderRemark}).then(res => {
                    this.$Notice.success({ title: 'Successed!' });
                    this.orderId2 = ''
                    this.cancelOrderRemark = ''
                    this.cancelOrderModal = false
                })
            },
            
            getBroadCast(){
                functionsServiceApi.getBroadCast().then(res => {
                    this.broadCastContent = res.announcement
                    let arr = []
                    arr[0] = new Date(res.startTime)
                    arr[1] = new Date(res.endTime)
                    this.timeBroadCastTime = arr
                    
                })
            },
            //公告发布
            handleBroadCast(){
                functionsServiceApi.broadCast({
                    announcement: this.broadCastContent,
                    startTime: this.timeFormat(this.timeBroadCastTime[0]),
                    endTime: this.timeFormat(this.timeBroadCastTime[1]),
                }).then(res => {
                    this.$Notice.success({ title: 'Successed!' });
                })
            },
            //清除时间
            timeClear(time){
                this.timeBroadCastTime = time
                if (this.timeBroadCastTime[0] === '') {
                    this.timeBroadCastTime = []
                } else {
                    this.timeBroadCastTime[1] = this.timeBroadCastTime[1].replace('00:00:00','23:59:59')
                }
            },
            getTKB(){
                functionsServiceApi.getTKB().then( res => {
                    this.curValue = res
                })
            },
            //更新TKB
            handleUpdateTKB(){
                // functionsServiceApi.updateTKB().then(res => {
                //     this.$Notice.success({ title: 'Successed!' });
                // })
            },
            changeLanguage(){
                this.$i18n.locale = this.language
                this.uiDisplaySource = this.$i18n.messages[this.$i18n.locale].message.functions
                setTimeout(() => {
                    this.columns.forEach((item, j) => {
                        item.title = this.uiDisplaySource.columnsTitle[j] //表头翻译
                    })
                }, 100)
            },
            //时间格式化
            timeFormat(time){
                return moment(time).format('YYYY-MM-DD HH:mm:ss')
            },
            //table隔行换色
            rowClassName (row, index) {
                if (index%2 == 1) {
                    return 'demo-table-info-row';
                } 
                return '';
            },
        },
        computed: {
            ...mapState({
                language: state => state.module.language
            }),
        },
        watch: {
            language() {
                this.changeLanguage()
            },
        },
        mounted(){
            this.getBroadCast()
            this.getTKB()
        },
        created() {
            this.changeLanguage()
        },

    }
</script>
<style lang="less" scoped>
    .function {
        padding: 20px;
         h3{
            margin-top: 20px;
        }
        .row-padd{
            padding: 10px;
            .repaycodelist{
                margin-bottom: 10px!important;
            }
        }
        .input-w{
            width: 200px;
            display: inline-block;
        }
        .result-area{
            width: 240px;
            height: 30px;
            line-height: 30px;
            display: inline-block;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding-left: 10px;
            margin-left: 15px;
        }
    }

</style>
<style lang='less'>
    .function{
    
    }
</style>