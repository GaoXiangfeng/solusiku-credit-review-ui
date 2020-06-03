<template>
  <div class="taskPanel">
    <Tabs type="card" closable @on-tab-remove="handleTabRemove">
      <TabPane :label="taskCardData[0].label" v-if="taskCardData[0].tab">
        <ul class="task-ui">
          <li
            :class="{disabled: role == 5 || role==7 || role==11 || role==14 ||taskList[0].acount == '0',color0 :true}"
            @click="goToAudit(0)"
          >
            <a>
              <span class="text">{{taskList[0].name}}</span>
              <br />
              <span>
                <strong class="num">{{taskList[0].acount}}</strong>
              </span>
            </a>
          </li>
          <!-- <li class="hide task1" v-if="role==5 || role==7|| role==11 || taskList[0].acount == '0'" @click="isAuth(0)"></li> -->
          <li
            :class="{disabled: role == 4 || role==6 ||role==10 ||role==13 || taskList[1].acount == '0',color1 :true}"
            @click="goToAudit(1)"
          >
            <a>
              <span class="text">{{taskList[1].name}}</span>
              <br />
              <span>
                <strong class="num">{{taskList[1].acount}}</strong>
              </span>
            </a>
          </li>
          <!-- <li class="hide task2" v-if="role==4 || role==6 ||role==10 || taskList[1].acount == '0'" @click="isAuth(1)" ></li> -->
          <!--我的案件-->
          <li :class="{disabled: hangTicketList.length == 0 ,color3 :true}" @click="goToHangList()">
            <a>
              <span class="text">Pesanan saya</span>
              <br />
              <span>
                <strong class="num">{{hangTicketList.length}}</strong>
              </span>
            </a>
          </li>
        </ul>
      </TabPane>
      <TabPane :label="taskCardData[1].label" v-if="taskCardData[1]&&taskCardData[1].tab"></TabPane>
    </Tabs>
    <!-- 我的订单列表对话框-->
    <Modal v-model="modalMyTicketList" width="900">
      <p slot="header" style="text-align:center">
        <span>Pesanan saya</span>
      </p>
      <div style="height:600px;text-align:center;overflow: auto;">
        <Table
          :columns="columnsTicketList"
          :data="hangTicketList"
          no-data-text="Tidak ada data"
        ></Table>
      </div>
      <div slot="footer" style="display:flex;justify-content: center;aline-item:center;"></div>
    </Modal>
    <a ref="target" href="" target="_blank"></a>
  </div>
</template>
<script>
import colTable from "../../components/column-table.vue";
import taskPanelApi from "../../services/api/taskPanel.service";
import localStorage from "../../services/localStorage.service";
import { mapState } from "vuex";
export default {
  data() {
    return {
      tab0: true,
      tab1: true,
      tab2: true,
      taskCardData: [],
      taskList: [
        {
          name: "待初审",
          key: "pre",
          acount: 0
        },
        {
          name: "待终审",
          key: "final",
          acount: 0
        }
      ],
      noRemainingOrders: "",
      unAuth: "Tiada hak!",
      role: 1,
      hangTicketList: [],
      modalMyTicketList: false,
      columnsTicketList: [
                    {
                        title: 'Operasi',
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
                                                localStorage.set('currentPath','orderDetail')

                                                //let param = `ticketId=${params.row.ticketId}&sourceType=${params.row.productType}&sourceId=${params.row.orderId}&type=${params.row.ticketType}&count=0&auditorName=0`
                                                let param = {
                                                    productType: "",
                                                    sourceType: params.row.productType,
                                                    sourceId: params.row.orderId,
                                                    ticketId: params.row.ticketId,
                                                    type: params.row.ticketType,
                                                    count: 0,
                                                    auditorName: 0,
                                                    isCheck: true,
                                                    userId:params.row.userId
                                                }
                                                param = window.btoa(window.encodeURIComponent(JSON.stringify(param)))//加密
                                                //记录当前操作的订单信息
                                                localStorage.set('currentOrderInfo',param)
                                                
                                                let _orderId = window.btoa(window.encodeURIComponent(params.row.orderId))//加密
                                                this.modalMyTicketList = false
                                                this.$router.push({
                                                    path: `/home/taskPanel/orderDetail/${_orderId}`,
                                                    query: {param:param} //加密
                                                })
                                            }else{
                                                this.$Notice.error({title: 'sourceId  undefined!'})
                                            }
                                        }
                                    }
                                }, 'Lihat')
                            ])
                        }
                    }, {
                        title: 'Nomor Telepon',
                        key: 'phone',
                        width: 180
                    }, {
                        title: 'Nomor Pesanan',
                        key: 'orderId',
                        width: 180
                    }, {
                        title: 'Waktu Pendirian',
                        key: 'ctime',
                        width: 180
                    },  {
                        title: 'Tangguhkan waktu',
                        key: 'hangTime',
                        width: 180
                    }, 
                ],
                dataMyTicketList: [],
    };
  },
  components: {
    colTable
  },
  computed: {
    ...mapState({
      language: state => state.module.language
    })
  },
  methods: {
    //删除标签
    handleTabRemove(name) {
      this.taskCardData[name].tab = false;
    },
    //切换语言
    changeLanguage() {
      this.$i18n.locale = this.language;
      let tabsArr = this.$i18n.messages[this.$i18n.locale].message.taskPanel;
      //标签卡
      this.taskCardData = tabsArr.taskCardData;
      //待初审、待终审
      this.taskList.forEach((item, i) => {
        item.name = tabsArr.taskListName[i];
      });
      //无剩余订单提示
      this.noRemainingOrders = tabsArr.noRemainingOrders;
      //非法请求提示
      //this.unAuth = tabsArr.unAuth
    },
    //获取工单数
    getOrderCount() {
      taskPanelApi.orderCount().then(res => {
        for (let item of this.taskList) {
          item.acount = res[item.key];
        }
      });
    },
    //防止无权限的人点击
    isAuth(index) {
      //双层判断权限
      if (
        (this.role == "4" || this.role == "6" || this.role == "10" || this.role == "13") &&
        index == 1
      ) {
        //角色是初审、点击了终审工单的获取
        this.$Notice.warning({ title: this.unAuth });
      }
      if (
        (this.role == "5" || this.role == "7" || this.role == "11"|| this.role == "14") &&
        index == 0
      ) {
        this.$Notice.warning({ title: this.unAuth }); //角色是终审、点击了初审工单的获取
      }
    },
    //跳转到待初审的 列表
    goToAudit(index) {
      let ticketId = ""; //工单id
      let sourceType = ""; // 1:vcc 2:员工贷
      let sourceId = ""; //根据source_type定义类型;若1，则为vcc_id;若2，则为order_id
      let type = 0; //默认初审
      let count = 0; //当前用户所领取的工单数目
      let auditorName = ""; //用户名字
      let currentPath = "";
      let task = [];
      let userId = '';

      //双层判断权限
      if (
        (this.role == "4" || this.role == "6" || this.role == "10" || this.role == "13") &&
        index == 1
      ) {
        //角色是初审、点击了终审工单的获取
        this.$Notice.error({ title: this.unAuth });
        return;
      }
      if (
        (this.role == "5" || this.role == "7" || this.role == "11" || this.role == "14") &&
        index == 0
      ) {
        this.$Notice.error({ title: this.unAuth }); //角色是终审、点击了初审工单的获取
        return;
      }
      index === 0
        ? task.push(taskPanelApi.preAudit())
        : task.push(taskPanelApi.finalAudit());
      Promise.all(task).then(res => {
        if (JSON.stringify(res[0]) === "{}") {
          //判断空对象
          this.$Notice.warning({ title: this.noRemainingOrders });
          return;
        }
        ticketId = res[0].ticketId;
        sourceType = res[0].sourceType;
        sourceId = res[0].sourceId;
        type = res[0].type;
        count = res[0].count;
        auditorName = res[0].auditorName;
        userId = res[0].userId;
        currentPath = "orderDetail";

        //将三级面包屑存入store
        this.$store.commit("CHANGE_FORTH_BREAD", sourceId);
        //二级面包屑存入store \ localstorage
        localStorage.set("currentPath", currentPath);
        // let param = `ticketId=${ticketId}&sourceType=${sourceType}&sourceId=${sourceId}&type=${type}&count=${count}&auditorName=${auditorName}`;
        let param = {
                      productType: "",
                      sourceType: sourceType,
                      sourceId: sourceId,
                      ticketId: ticketId,
                      type: type,
                      count: count,
                      auditorName: auditorName,
                      isCheck: true,
                      userId:userId
                  }
        param = window.btoa(window.encodeURIComponent(JSON.stringify(param))); //加密
        //记录当前操作的订单信息
        localStorage.set("currentOrderInfo", param);

        sourceId = window.btoa(window.encodeURIComponent(sourceId)); //加密
        this.$router.push({
          path: `/home/taskPanel/orderDetail/${sourceId}`,
          query: { param: param} //加密
        });
      });
    },
    //跳到列表
    goToHangList() {
      this.modalMyTicketList = true;
    },
    //获取我的案件列表
    getTicketList() {
      taskPanelApi.myHangTicketList().then(res => {
        this.hangTicketList = res;
      });
    }
  },
  watch: {
    language: function() {
      this.changeLanguage();
    }
  },
  created() {
    this.changeLanguage();
  },
  mounted() {
    this.getOrderCount();

    //获取我的案件列表
    this.getTicketList();
    //获取用户权限
    let user = localStorage.get("user");
    if (user && user.role) {
      this.role = user.role;
    }
    //如果第一次登录 刷新页面  获取新的nav
    let query = this.$route.query;
    if (query && query.isFirst) {
      this.$router.replace("/home/taskPanel");
      location.reload();
    }
    localStorage.set("currentPath", "taskPanel");
  }
};
</script>
<style lang="less">
.taskPanel {
  margin: 20px;
  .task-ui {
    position: relative;
    .disabled {
      pointer-events: none;
    }
    .color0 {
      background-color: #0d92c2;
    }
    .color1 {
      background-color: #00bc4e;
    }
    .color3 {
      background-color: #d19240;
    }
    li.hide {
      background-color: #ddd;
      width: 300px;
      position: absolute;
      height: 300px;
      opacity: 0.5;
      z-index: 1;
    }
    li.task1 {
      left: 0;
    }
    li.task2 {
      left: 323px;
    }
    li {
      width: 300px;
      height: 300px;
      border-radius: 5%;
      text-align: center;
      vertical-align: middle;
      padding-top: 90px;
      display: inline-block;
      margin: 10px 20px 0 0;
      .text {
        font-size: 16px;
        color: #fff;
        font-weight: bold;
      }
      .num {
        font-size: 80px;
        color: #fff;
      }
    }
  }
  .dirFinAudit {
    margin-top: 20px;
    .title {
      margin-bottom: 10px;
    }
  }
  .ivu-table td.table-info-column {
    background-color: #fe6c0f;
    color: #fff;
  }
  .ivu-table td.table-success-column {
    background-color: green;
    color: #fff;
  }
  .ivu-table td.table-error-column {
    background-color: red;
    color: #fff;
  }
}

.ivu-table th {
  text-align: center;
  white-space: nowrap;
}

.ivu-table td {
  text-align: center;
}
.ivu-btn-primary {
  background-color: #346f9b;
  border-color: #346f9b;
}
</style>
