<template>
  <div class="cs_page">
    <div class="result">
      <Tabs :value="activeIndex" @on-click="clickTab">
        <TabPane :label="uiDisplay.orderInfo.title" name="1">
          <pinjaTable :title="uiDisplay.orderInfo.title" :tableInfor="orderInfo"></pinjaTable>
          <pinjaTable :title="uiDisplay.userInfo.title" :tableInfor="userInfo"></pinjaTable>
        </TabPane>
        <TabPane :label="uiDisplay.repayRecord.title" name="2">
          <Card>
            <p slot="title">{{uiDisplay.repayPlan.title}}</p>
            <Table
              :row-class-name="rowClassName"
              :columns="columnsRepayPlan"
              :data="dataRepayPlan"
              :no-data-text="uiDisplay.commonData.nodata"
            ></Table>
          </Card>
          <Card style="margin-top:20px">
            <p slot="title">{{uiDisplay.repayRecord.title}}</p>
            <Table
              :row-class-name="rowClassName"
              :columns="columnsRepayRecord"
              :data="dataRepayRecord"
              :no-data-text="uiDisplay.commonData.nodata"
            ></Table>
          </Card>
        </TabPane>
        <TabPane :label="uiDisplay.collRecord.title" name="3">
          <Table
            :row-class-name="rowClassName"
            :columns="columnsCollRecord"
            :data="dataCollRecord"
            :no-data-text="uiDisplay.commonData.nodata"
          ></Table>
          <div style="text-align:right;margin:20px 0 40px 40px;">
            <Page
              :total="totalColRecordItems"
              :current="formColRecord.pageNum"
              :page-size="formColRecord.pageSize"
              @on-page-size-change="changeColRecordSize"
              @on-change="changeColRecordPage"
              size="small"
              show-total
              show-elevator
              show-sizer
            ></Page>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import csServiceApi from "../../services/api/cs.service";
import pinjaTable from "../../components/pinja-table.vue";
import moment from "moment";

export default {
  data() {
    return {
      uiDisplay: {
        searchCondition: {},
        tabLoanRecord: {},
        orderInfo: {},
        userInfo: {},
        repayRecord: {},
        repayPlan: {},

        colLoanRecord: [],
        colRepayPlan: [],
        colRepayRecord: [],
        orderInfoList: [],
        userInfoList: [],
        commonData: {},
        orderStatusVCCAPPLY: {},
        orderStatusVCCTX: {},
        orderStatusVCC:{},
        orderStatusYGD: {},
        businessType: {},
        genderText: {},
        repayStatus: {},
        isCutText: {},
        repayWay: {},
        collRecord: {},
        collRecordTableTitle: {},
        collectionStatus: [],
      },
      activeIndex: "1",
      sourceId: "",
      sourceType: "",
      searchForm: {
        orderId: "",
        phonNo: "",
        vaNum: "",
        idCard: "",
        sort: "DESC",
        sortBy: "ctime",
        pageNum: 1,
        pageSize: 20
      },

      //*****************订单信息************************/
      //订单信息-订单信息
      orderInfo: [
        {
          label: "订单号", //订单号
          key: "orderId",
          value: "" //值
        },
        {
          label: "订单状态", //订单状态
          key: "status",
          value: "" //值
        },
        {
          label: "申请渠道", //申请渠道
          key: "channelId",
          value: "" //值
        },
        {
          label: "申请时间", //申请时间
          key: "ctime", //
          value: "" //值
        },
        {
          label: "借款金额", //借款金额
          key: "principal",
          value: "" //值
        },
        {
          label: "借款期限", //借款期限
          key: "days", //
          value: "" //值
        },
        {
          label: "到账金额", //到账金额
          key: "realAmount",
          value: "" //值
        },
        {
          label: "到账时间", //到账时间
          key: "orderReceivedAt",
          value: "" //值
        }
      ],
      userInfo: [
        {
          label: "姓名", //姓名
          key: "userName",
          value: "" //值
        },
        {
          label: "电话号码", //电话号码
          key: "phoneNo",
          value: "" //值
        },
        {
          label: "身份信息", //身份信息
          key: "idCard",
          value: "" //值
        },
        {
          label: "性别", //性别
          key: "gender", //
          value: "" //值
        },
        {
          label: "邮箱", //邮箱
          key: "email",
          value: "" //值
        },
        {
          label: "银行名称", //银行名称
          key: "bankName", //
          value: "" //值
        },
        {
          label: "银行账户", //银行账户
          key: "bankAccount",
          value: "" //值
        },
        {
          label: "持卡人姓名", //持卡人姓名
          key: "holderName",
          value: "" //值
        },
        {
          label: "虚拟账号", //虚拟账号
          key: "vaNum",
          value: "" //值
        }
      ],

      //*****************还款计划************************/
      columnsRepayPlan: [
        {
          title: "期数",
          key: "termNo",
          width: 60
        },
        {
          title: "还款状态",
          key: "status",
          width: 180,
          render: (h, params) => {
            return h("div", this.uiDisplay.repayStatus[params.row.status]);
          }
        },
        {
          title: "应还金额",
          key: "needRepay",
          width: 180,
          render: (h, params) => {
            return h("div", Number(params.row.needRepay).toFixed(2));
          }
        },
        {
          title: "本息服", //*******************/
          key: "fixAmount",
          width: 180,
          render: (h, params) => {
            return h("div", Number(params.row.fixAmount).toFixed(2));
          }
        },
        {
          title: "逾期费用",
          key: "orderDueFee",
          width: 180,
          render: (h, params) => {
            return h("div", Number(params.row.orderDueFee).toFixed(2));
          }
        },
        {
          title: "逾期天数",
          key: "overDueDay",
          width: 180
        },
        {
          title: "实还金额",
          key: "alreadyRepay",
          width: 180,
          render: (h, params) => {
            return h("div", Number(params.row.alreadyRepay).toFixed(2));
          }
        },
        {
          title: "剩余待还",
          key: "repayAmount",
          width: 180,
          render: (h, params) => {
            return h("div", Number(params.row.repayAmount).toFixed(2));
          }
        },
        {
          title: "还款日",
          key: "repayTime",
          width: 180,
          render: (h, params) => {
            return h(
              "div",
              params.row.repayTime != ""
                ? moment(params.row.repayTime).format("YYYY-MM-DD HH:mm:ss")
                : ""
            );
          }
        }
      ],
      dataRepayPlan: [],

      //*****************还款记录************************/
      columnsRepayRecord: [
        {
          title: "还款时间",
          key: "receivedTime",
          width: 180,
          render: (h, params) => {
            return h(
              "div",
              params.row.receivedTime
                ? moment(params.row.receivedTime).format("YYYY-MM-DD HH:mm:ss")
                : ""
            );
          }
        },
        {
          title: "还款金额",
          key: "amount",
          render: (h, params) => {
            return h("div", Number(params.row.amount).toFixed(0));
          }
        },
        {
          title: "还款方式",
          key: "type",
          width: 180,
          render: (h, params) => {
            return h("div", this.uiDisplay.repayWay[params.row.type]);
          }
        },
        {
          title: "催收减免",
          key: "deductionFlag",
          width: 180,
          render: (h, params) => {
            return h("div", this.uiDisplay.isCutText[params.row.deductionFlag]);
          }
        },
        {
          title: "还款渠道",
          key: "fundType"
        }
      ],
      dataRepayRecord: [],

      //催收记录查询条件
      formColRecord: {
        orderId: "",
        sort: "DESC",
        sortBy: "ctime",
        pageNum: 1,
        pageSize: 20
      },
      totalColRecordItems: 0,
      //催收记录
      columnsCollRecord: [
        {
          title: "催收时间",
          key: "ctime",
          width: 180,
          render: (h, params) => {
            return h(
              "div",
              params.row.ctime
                // ? moment(params.row.ctime).format("YYYY-MM-DD HH:mm:ss")
                // : ""
            );
          }
        },
        {
          title: "催收人",
          key: "auditorName"
        },
        {
          title: "催收状态",
          key: "remark",
          width: 180,
          render: (h, params) => {
            return h(
              "div",
              this.uiDisplay.collectionStatus[params.row.remark - 1]
            );
          }
        },
        {
          title: "预计还款时间",
          key: "expectRepayTime",
          width: 180,
          render: (h, params) => {
            return h(
              "div",
              params.row.expectRepayTime
                // ? moment(params.row.expectRepayTime).format("YYYY-MM-DD HH:mm:ss")
                // : ""
            );
          }
        },
        {
          title: "反馈",
          key: "msg"
        }
      ],
      dataCollRecord: []
    };
  },
  methods: {
    clickTab(value) {
      this.activeIndex = value;
      this.searchForm.pageNum = 1;
      this.searchForm.pageSize = 20;
      this.searchData(1);
    },
    //****************贷款记录************************/
    //排序
    sortChangeLoanRecord(column) {
      this.searchForm.sortBy = column.key || "ctime";
      if (column.order === "normal") column.order = "asc";
      this.searchForm.sort =
        (column.order && column.order.toUpperCase()) || "DESC";
      this.searchData(1);
    },

    //改变页码-
    changePageLoanRecord(page) {
      this.searchForm.pageNum = page;
      this.searchData(page);
    },
    //改变每页显示数量-
    changeSizeLoanRecord(size) {
      this.searchForm.pageSize = size;
      this.searchData(1);
    },

    //时间格式化
    timeFormat(time) {
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    },
    searchData(pageNo) {
      switch (this.activeIndex.toString()) {
        case "1":
          {
            // if (!this.isNull()) {
            //   return;
            // }
            csServiceApi
              .getOrderInfo({
                sourceId: this.sourceId,
                sourceType: this.sourceType
              })
              .then(res => {
                //订单信息
                this.orderInfo.forEach(item => {

                  if (item.key === "ctime") {
                    //
                    item.value = this.timeFormat(
                      parseFloat(res.orderInfoVO[item.key])
                    );
                  } else if (item.key === "status") {
                    if (this.sourceType == 1) {

                      //vcc
                      item.value = this.uiDisplay.orderStatusVCC[
                        Number(res.orderInfoVO[item.key])
                      ];
                       console.log(item.value);
                    } else {
                      item.value = this.uiDisplay.orderStatusYGD[
                        Number(res.orderInfoVO[item.key])
                      ];
                    }
                  } else if (item.key === "channelId") {
                    if (res.orderInfoVO[item.key] == "20000") {
                      item.value = "solusiku";
                    } else {
                      item.value = "Qcash";
                    }
                  }else{
                    item.value = res.orderInfoVO[item.key];
                  }

                });

                this.userInfo.forEach(item => {
                  if (item.key === "gender") {
                    res.userInfoVO[item.key] = this.uiDisplay.genderText[
                      res.userInfoVO[item.key]
                    ];
                  }
                  item.value = res.userInfoVO[item.key];
                });
              });
          }
          break;
        case "2":
          {
            // if (!this.isNull()) {
            //   return;
            // }
            csServiceApi
              .getRepayRecordList({
                sourceId: this.sourceId,
                sourceType: this.sourceType
              })
              .then(res => {
                this.dataRepayPlan = res.repaymentplanVO;
                this.dataRepayRecord = res.repaymentrecordVO;
              });
          }
          break;
        case "3":
          {
            let param = JSON.parse(JSON.stringify(this.formColRecord))
            param.orderId = this.sourceId

            csServiceApi.getCollRecordList(param).then(res => {
              this.dataCollRecord = res.collectionRecordDetails
              this.totalColRecordItems = res.basePageResponse.totalNum
            });
          }
          break;
        default:
          break;
      }
    },
    //判断业务类型和id是否为空
    isNull() {
      if (this.sourceId == "" || this.sourceType == "") {
        this.$Notice.warning({
          title: this.uiDisplay.commonData.canBeNull
        });
        return false;
      } else {
        return true;
      }
    },
    //***************催收记录*********************/
    //改变页码-
    changeColRecordPage(page) {
      this.formColRecord.pageNum = page;
      this.searchData(page);
    },
    //改变每页显示数量-
    changeColRecordSize(size) {
      this.formColRecord.pageSize = size;
      this.searchData(1);
    },
    //切换语言
    changeLanguage() {
      this.$i18n.locale = this.language;
      this.uiDisplay = this.$i18n.messages[this.$i18n.locale].message.cs;

      this.$nextTick(() => {
        this.columnsRepayPlan.forEach((item, j) => {
          item.title = this.uiDisplay.colRepayPlan[j]; //表头翻译
        });

        this.columnsRepayRecord.forEach((item, j) => {
          item.title = this.uiDisplay.colRepayRecord[j]; //表头翻译
        });

        this.orderInfo.forEach((item, j) => {
          item.label = this.uiDisplay.orderInfoList[j]; //表头翻译
        });

        this.userInfo.forEach((item, j) => {
          item.label = this.uiDisplay.userInfoList[j]; //表头翻译
        });

        this.columnsCollRecord.forEach((item, j) => {
          item.title = this.uiDisplay.collRecordTableTitle[j]; //表头翻译
        });
      });

      //将语言类型 存入store
      this.$store.commit("CHANGE_LANGUAGE", this.language);
      this.searchData(1)
    },

    //table隔行换色
    rowClassName(row, index) {
      if (index % 2 == 1) {
        return "demo-table-info-row";
      }
      return "";
    }
  },
  components: {
    pinjaTable
  },
  computed: {
    ...mapState({
      language: state => state.module.language
    })
  },
  watch: {
    language() {
      this.changeLanguage();
    }
  },
  mounted() {
  
    let query = this.$route.query;
    this.sourceId = query.sourceId;
    this.sourceType = query.sourceType;

    this.changeLanguage();

    this.$store.commit("CHANGE_FORTH_BREAD", this.sourceId);

  },
  destroyed() {
    this.$store.commit("CHANGE_FORTH_BREAD", "");
  }
};
</script>
<style scoped lang="less">
.cs_page {
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
  .ivu-btn-primary {
    background-color: #346f9b;
    border-color: #346f9b;
  }
}
</style>

<style lang='less'>
.cs_page {
  //隔行换色
  .ivu-table .demo-table-info-row td {
    background-color: rgb(226, 239, 250);
  }
}
</style>
