<template>
  <div class="cs_page">
    <Form :label-width="130" slot="title">
      <!--订单号-->
      <FormItem :label="uiDisplay.searchCondition.orderId" class="order-form-item">
        <Input v-model="searchForm.orderId"></Input>
      </FormItem>
      <!--手机号-->
      <FormItem :label="uiDisplay.searchCondition.phonNo" class="order-form-item">
        <Input v-model="searchForm.phonNo"></Input>
      </FormItem>
      <!--身份证号-->
      <FormItem :label="uiDisplay.searchCondition.idCard" class="order-form-item">
        <Input v-model="searchForm.idCard"></Input>
      </FormItem>
      <!--VA号码-->
      <FormItem :label="uiDisplay.searchCondition.vaNum" class="order-form-item">
        <Input v-model="searchForm.vaNum"></Input>
      </FormItem>
      <!--业务类型-->
      <FormItem :label="uiDisplay.searchCondition.type" class="order-form-item">
        <Select v-model="searchForm.type" >
          <Option v-for="item in uiDisplay.businessType" :key="item.value" :value="item.value">{{item.key}}</Option>
        </Select>
      </FormItem>
      <FormItem class="order-form-item order-button">
        <Button
          type="primary"
          icon="ios-search"
          @click="searchData(1)"
        >{{uiDisplay.searchCondition.search}}</Button>
      </FormItem>
    </Form>
    <div class="result">
      <Card>
        <p slot="title">{{uiDisplay.tabLoanRecord.title}}</p>
        <Table
          @on-sort-change="sortChangeLoanRecord"
          :row-class-name="rowClassName"
          :columns="columnsLoanRecord"
          :data="dataLoanRecord"
          :no-data-text="uiDisplay.commonData.nodata"
        ></Table>
        <div style="text-align:right;margin:20px 0 40px 40px;">
          <Page
            :total="totalItemsLoanRecord"
            :current="searchForm.pageNum"
            :page-size="searchForm.pageSize"
            @on-page-size-change="changeSizeLoanRecord"
            @on-change="changePageLoanRecord"
            size="small"
            show-total
            show-elevator
            show-sizer
          ></Page>
        </div>
      </Card>
    </div>
    <a ref="target" href target="_blank"></a>
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
        businessType: [],

        colLoanRecord: [],
        colRepayPlan: [],
        colRepayRecord: [],
        orderInfoList: [],
        userInfoList: [],
        commonData: {},
        orderStatusVCC: {},
        orderStatusYGD: {},
        businessType: {},
        genderText: {},
        repayStatus: {},
        isCutText: {}
      },
      activeIndex: "1",
      sourceId: "",
      sourceType: "",
      searchForm: {
        orderId: "",
        phonNo: "",
        vaNum: "",
        type: '3',
        idCard: "",
        sort: "DESC",
        sortBy: "ctime",
        pageNum: 1,
        pageSize: 20
      },

      //****************贷款记录************************/
      totalItemsLoanRecord: 0,
      columnsLoanRecord: [
        {
          title: "操作",
          key: "action",
          width: 60,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    size: "small",
                    type: "primary"
                  },
                  on: {
                    click: () => {
                      let _id =
                        params.row.sourceType == 1
                          ? params.row.vccOrderId
                          : params.row.sourceId;
                      let target = this.$refs.target;
                      target.setAttribute(
                        "href",
                        window.location.origin +
                          `/home/cs/csdetail?sourceType=${params.row.sourceType}&&sourceId=${params.row.sourceId}`
                      );
                      target.click();
                    }
                  }
                },
                this.uiDisplay.commonData.watch
              )
            ]);
          }
        },
        {
          title: "业务类型",
          key: "sourceType",
           width: 180,
          render: (h, params) => {
            let index = this.uiDisplay.businessType.findIndex(function(
              value,
              index,
              arr
            ) {
              return value.value == params.row.sourceType;
            });

            return h("div", this.uiDisplay.businessType[index].key);
          }
        },
        {
          title: "手机号",
          key: "phoneNo",
          width: 180,
        },
        {
          title: "订单号",
          key: "sourceId",
          width:180,
        },
        {
          title: "申请时间",
          key: "createTime",
          width:180,
          render: (h, params) => {
            return h(
              "div",
              moment(params.row.createTime).format("YYYY-MM-DD HH:mm:ss")
            );
          }
        },
        {
          title: "借款金额",
          key: "principal",
          width: 180,
          render: (h, params) => {
            return h("div", Number(params.row.principal).toFixed(0));
          }
        },
        {
          title: "借款期限",
          key: "days",
          width: 180,
        },
        {
          title: "利率",
          key: "rate",
          width: 180,
          render: (h, params) => {
            return h("div", (parseFloat(params.row.rate) * 100).toFixed(2));
          }
        },
        {
          title: "订单状态",
          key: "status",
          width: 180,
          render: (h, params) => {
            if (params.row.sourceType == 1) {
              //vcc
              //vcc申请
              return h(
                "div",
                this.uiDisplay.orderStatusVCC[Number(params.row.status)]
              ); //订单状态
            } else if (
              params.row.sourceType == 2 ||
              params.row.sourceType == 3
            ) {
              //员工贷和现金贷
              return h(
                "div",
                this.uiDisplay.orderStatusYGD[Number(params.row.status)]
              ); //订单状态
            }
          }
        }
      ],
      dataLoanRecord: []
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

    searchData(pageNo) {
      if (
        this.searchForm.orderId == "" &&
        this.searchForm.phonNo == "" &&
        this.searchForm.vaNum == "" &&
        this.searchForm.idCard == ""
      ) {
        this.$Notice.warning({
          title: "Parameter tidak boleh semuanya kosong!"
        });
        return;
      }
      switch (this.activeIndex.toString()) {
        case "1":
          {
            csServiceApi
              .getLoanRecordList({ content: JSON.stringify(this.searchForm) })
              .then(res => {
                //console.log(res);
                console.log(res);

                this.dataLoanRecord = res.data.orderList;
                this.totalItemsLoanRecord = Number(res.data.pageDTO.totalNum);
              });
          }
          break;
        default:
          break;
      }
    },

    //切换语言
    changeLanguage() {
      this.$i18n.locale = this.language;
      this.uiDisplay = this.$i18n.messages[this.$i18n.locale].message.cs;

      this.$nextTick(() => {
        //table
        this.columnsLoanRecord.forEach((item, j) => {
          item.title = this.uiDisplay.colLoanRecord[j]; //表头翻译
        });
      });

      //将语言类型 存入store
      this.$store.commit("CHANGE_LANGUAGE", this.language);
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
    this.changeLanguage();
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
  .result {
    margin-top: 20px;
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
