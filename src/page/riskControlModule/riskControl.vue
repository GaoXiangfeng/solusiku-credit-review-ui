<template>
  <div class="riskControl">
    <span class='ruleName'>规则组名：</span>
    <Select v-model="seledRiskGroupId" style="width:280px" @on-change="searchDataList()" placeholder='请选择'>
      <Option v-for="item in ruleGroupNameData" :key="item.key" :value="item.key">{{ item.value }}</Option>
    </Select>

    <div class="machineAuditRules">
      <div class="title">
        <h3>机审规则</h3>
        <Button type="primary" @click="addMachineRule">添加</Button>
      </div>
      <el-table :data="riskRuleByRiskGroupData" border max-height="300px">
        <!-- <el-table-column prop="seqNo" label="序号" width="100px"></el-table-column> -->
        <el-table-column prop="ruleService" label="规则名称" width="300px"></el-table-column>
        <el-table-column prop="group" label="规则组名" width="250px">
          <template slot-scope="scope">
            <div v-html="transGroupName(scope.row)"></div>
          </template>
        </el-table-column>
        <el-table-column prop="minValue" label="最小值" align='center'></el-table-column>
        <el-table-column prop="maxValue" label="最小值" align='center'></el-table-column>
        <el-table-column prop="threshold" label="阈值" align='center'></el-table-column>
        <el-table-column prop="seqNo" label="执行序号" align='center'></el-table-column>
        <el-table-column prop="status" label="启用状态" :formatter="status" align='center'></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editMachineRule(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="processDisplay">
      <div class="title">
        <h3>三方规则</h3>
        <Button type="primary" @click="addTripartiteRule">添加</Button>
      </div>
      <el-table :data="thirdPartyRuleByRiskGroupData" border max-height="300px">
        <!-- <el-table-column prop="seqNo" label="序号" width="100px"></el-table-column> -->
        <el-table-column prop="ruleName" label="规则名称" width="300px"></el-table-column>
        <el-table-column prop="riskGroup" label="规则组名" width="300px">
          <template slot-scope="scope">
            <div v-html="transRiskGroupName(scope.row)"></div>
          </template>
        </el-table-column>
        <el-table-column prop="minValue" label="最小值" align='center'></el-table-column>
        <el-table-column prop="maxValue" label="最小值" align='center'></el-table-column>
        <el-table-column prop="threshold1" label="阈值" align='center'></el-table-column>
        <el-table-column prop="threshold2" label="阈值" align='center'></el-table-column>
        <el-table-column prop="seqNo" label="执行序号" align='center'></el-table-column>
        <el-table-column prop="status" label="启用状态" :formatter="status" align='center'></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editTripartiteRule(scope.row)">编辑</el-button>
            <el-button v-if="scope.row.isCombinationRule==1" @click="showThirdPartyCombinationRuleModal(scope.row)" type="text" size="small" >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 点击机审规则 添加、编辑按钮出现的弹框 -->
    <Modal
      v-model="isShowMachineAddModal"
      class="MachineAddModal"
      width="400px"
      footer="display:none"
    >
      <div style="text-align:center">
          <p style='height:20px;' ref=''>{{message}}</p>
            <div>
                <span>规则名称：</span>
                <Input :disabled="isEditMechineRule"  v-model="fromAddMechRule.ruleService"  style="width:150px"/>
            </div>
            <div>
              <span>规则组：</span>
              <Select :disabled="isEditMechineRule" v-model="fromAddMechRule.group" style="width:150px"  placeholder='请选择'>
                <Option
                  v-for="item in ruleGroupNameData"
                  :key="item.key"
                  :value="item.key"
                >{{ item.value }}</Option>
              </Select>
            </div>
            <div>
              <span>最小值：</span>
              <Input v-model="fromAddMechRule.minValue" style="width:150px"/>
            </div>
            <div>
              <span>最大值：</span>
              <Input v-model="fromAddMechRule.maxValue" style="width:150px"/>
            </div>
            <div>
              <span>阈值：</span>
              <Input v-model="fromAddMechRule.threshold" style="width:150px"/>
            </div>
            <div>
              <span>执行序号：</span>
              <Input v-model="fromAddMechRule.seqNo" style="width:150px" />
            </div>
            <div>
              <span>启用状态：</span>
              <Select v-model="fromAddMechRule.status" style="width:150px">
                <Option  v-for="item in checkoutStatus"  :key="item.key"  :value="item.key" >{{ item.value }}</Option>
              </Select>
            </div>
            <div>
              <Button type="primary" @click="commitMachineRule">提交</Button>
            </div>
        <!-- </Form> -->
      </div>
      <div slot="footer" style="display:none">
        <Button type="error" size="large" long>Delete</Button>
      </div>
    </Modal>

    <!-- 点击三方规则 添加 编辑出现弹框 -->
    <Modal v-model="isProcessDisplayAddModal"  class="MachineAddModal"  width="400px"  footer="display:none" >
      <div style="text-align:center">
        <div>
          <span>规则名称：</span>
          <Input :disabled="isEditMechineRule" v-model="fromTripartRule.ruleName" style="width:150px" />
        </div>
        <div>
          <span>规则组：</span>
          <Select :disabled="isEditMechineRule" v-model="fromTripartRule.riskGroup" style="width:150px" placeholder='请选择'>
            <Option v-for="item in ruleGroupNameData" :key="item.key"  :value="item.key">{{ item.value }}</Option>
          </Select>
        </div>
        <div>
          <span>最小值：</span>
          <Input v-model="fromTripartRule.minValue" style="width:150px"/>
        </div>
        <div>
          <span>最大值：</span>
          <Input v-model="fromTripartRule.maxValue" style="width:150px"/>
        </div>
        <div>
          <span>阈值：</span>
          <Input v-model="fromTripartRule.threshold1" style="width:150px"/>
        </div>
        <div>
          <span>阈值：</span>
          <Input v-model="fromTripartRule.threshold2" style="width:150px"/>
        </div>
        <div>
          <span>执行序号：</span>
          <Input v-model="fromTripartRule.seqNo" style="width:150px" />
        </div>
        <div>
          <span>组合规则状态：</span>
          <Select v-model="fromTripartRule.isCombinationRule" style="width:150px">
            <Option  v-for="item in isCombinationRuleStatus"  :key="item.key"  :value="item.key">{{ item.value }}</Option>
          </Select>
        </div>
        <div>
          <span>启用状态：</span>
          <Select v-model="fromTripartRule.status" style="width:150px">
            <Option
              v-for="item in checkoutStatus"
              :key="item.key"
              :value="item.key"
            >{{ item.value }}</Option>
          </Select>
        </div>
        <div>
          <Button type="primary" @click="commitTripartiteRule">提交</Button>
        </div>
      </div>
      <div slot="footer" style="display:none">
        <Button type="error" size="large" long>Delete</Button>
      </div>
    </Modal>

    <!-- 流程展示点击查看出现模态框 -->

    <Modal v-model="combinationRuleModal1" class="modalRuleGroupName"  width="80%" footer="display:none">
      <div class='title'>
        <h3>组合规则</h3>
        <Button type="primary" @click="AddComBinationRule">添加</Button>
      </div>
      <div style="text-align:center;height:500px" >
        <el-table :data="thirdPartyCombinationRuleByThirdPartyIdData" border>
          <!-- <el-table-column prop="seqNo" label="序号"></el-table-column> -->
          <el-table-column prop="ruleName" label="规则名称"></el-table-column>
          <el-table-column prop="thirdPartyId" label="三方规则ID" align='center'></el-table-column>
          <el-table-column prop="threshold1" label="阈值" align='center'></el-table-column>
          <el-table-column prop="threshold2" label="阈值" align='center'></el-table-column>
          <el-table-column prop="threshold3" label="阈值" align='center'></el-table-column>
          <el-table-column prop="threshold4" label="阈值" align='center'></el-table-column>
          <el-table-column prop="seqNo" label="执行序号" align='center'></el-table-column>
          <el-table-column prop="status" label="启用状态" :formatter="status" align='center'></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editTripartiteCombinaRule(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" style="display:none">
        <Button type="error" size="large" long>Delete</Button>
      </div>
    </Modal>

    <!-- 流程展示 查看按钮 模态框里面的添加 编辑模态框 -->
    <Modal v-model="isCombinationRuleAddModal"  class="TripartiteCombinaRule"  width="400px"  footer="display:none" >
      <div style="text-align:center">
        <div>
          <span>规则名称：</span>
          <Input :disabled="isEditMechineRule" v-model="fromTripartBinationRule.ruleName" style="width:150px" />
        </div>
        <!-- <div>
          <span>规则组：</span>
          <Input :disabled="isEditMechineRule" v-model="fromTripartBinationRule.group" style="width:150px" />
        </div> -->
        <!-- <div>
          <span>三方规则ID:</span>
          <Input :disabled="isEditMechineRule" v-model="fromTripartBinationRule.thirdPartyId" style="width:150px" />
        </div> -->
        <div>
          <span>阈值：</span>
          <Input v-model="fromTripartBinationRule.threshold1" style="width:150px" number/>
        </div>
        <div>
          <span>阈值：</span>
          <Input v-model="fromTripartBinationRule.threshold2" style="width:150px"/>
        </div>
        <div>
          <span>阈值：</span>
          <Input v-model="fromTripartBinationRule.threshold3" style="width:150px"/>
        </div>
        <div>
          <span>阈值：</span>
          <Input v-model="fromTripartBinationRule.threshold4" style="width:150px"/>
        </div>
        <div>
          <span>执行序号：</span>
          <Input v-model="fromTripartBinationRule.seqNo" style="width:150px" />
        </div>
        <div>
          <span>启用状态：</span>
          <Select v-model="fromTripartBinationRule.status" style="width:150px">
            <Option v-for="item in checkoutStatus" :key="item.key"  :value="item.key">{{ item.value }}</Option>
          </Select>
        </div>
        <div>
          <Button type="primary" @click="commitTripartiteCombinaRule">提交</Button>
        </div>
      </div>
      <div slot="footer" style="display:none">
        <Button type="error" size="large" long>Delete</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import store from "../../store/index";
import { mapState } from "vuex";
import userManageApi from "../../services/api/userManage.service";
import moment from "moment";
import localStorage from "../../services/localStorage.service";
import riskControlApi from "../../services/api/riskControl.service";
export default {
  data() {
    return {
      // 获取规则组名数据
      ruleGroupNameData: [],
      seledRiskGroupId: "",
      riskRuleByRiskGroupData: [],
      thirdPartyRuleByRiskGroupData: [],
      thirdPartyCombinationRuleByThirdPartyIdData: [],
      combinationRuleModal1: false, //点击流程展示 查看按钮出现的弹框
      isShowMachineAddModal: false, //点击机审规则 添加、编辑按钮出现的弹框,
      isProcessDisplayAddModal: false, //点击三方规则 添加、编辑按钮出现的弹框
      isCombinationRuleAddModal:false, //流程展示 查看 模块框里面点击添加按钮出现第二层模态框
      // 点击机审规则添加的参数
      isEditMechineRule: false, //是否为禁用
      fromAddMechRule: {
        id: "",
        ruleService: "",
        status: "0",
        group: "",
        minValue: "",
        maxValue: "",
        threshold: "",
        seqNo: ""
      },
      fromAddMechRuleInit: {
        id: "",
        ruleService: "",
        status: "0",
        group: "",
        minValue: "",
        maxValue: "",
        threshold: "",
        seqNo: ""
      },
      checkoutStatus: [
        {
          key: "0",
          value: "禁用"
        },
        {
          key: "1",
          value: "启用"
        }
      ],
      fromTripartRule: {
        id: "",
        ruleName: "",
        status: "0",
        riskGroup: "",
        minValue: "",
        maxValue: "",
        threshold1: "",
        threshold2: "",
        seqNo: "",
        isCombinationRule: '0'
      },
      fromTripartRuleInit: {
        id: "",
        ruleName: "",
        status: "0",
        riskGroup: "",
        minValue: "",
        maxValue: "",
        threshold1: "",
        threshold2: "",
        seqNo: "",
        isCombinationRule: '0'
      },
       isCombinationRuleStatus: [
        {
          key: "0",
          value: "否"
        },
        {
          key: "1",
          value: "是"
        }
      ],
      // 点击组合规则添加的参数
      fromTripartBinationRule:{
        id:'',
        ruleName:'',
        status:'0',
        // group:'',
        threshold1:'',
        threshold2:'',
        threshold3:'',
        threshold4:'',
        seqNo:'',
        thirdPartyId:''
      },
       fromTripartBinationRuleInit:{
        id:'',
        ruleName:'',
        status:'0',
        // group:'',
        threshold1:'',
        threshold2:'',
        threshold3:'',
        threshold4:'',
        seqNo:'',
        thirdPartyId:''
      },
      curOperThirdRule: {},
      message:''
    };
  },
  methods: {
    changeLanguage() {
      this.$i18n.locale = this.language;
      this.uiDisplaySource = this.$i18n.messages[
        this.$i18n.locale
      ].message.userManage;
      // setTimeout(() => {
      //     this.columns.forEach((item, j) => {
      //         item.title = this.uiDisplaySource.columnsTitle[j] //表头翻译
      //     })
      // }, 100)
    },
    // 初始获取规则组名数据
    getRuleGroupName() {
      riskControlApi.getRiskGroupList().then(res => {
        this.ruleGroupNameData = res;
        //  console.log( this.ruleGroupNameData)
      });
    },
    // 根据规则组获取机审规则 根据规则组获取三方规则
    searchDataList() {
      // alert(this.seledRiskGroupId)
      riskControlApi
        .getRiskRuleByRiskGroup({ riskGroup: this.seledRiskGroupId })
        .then(res => {
          //  console.log(this.riskRuleByRiskGroupData)
          this.riskRuleByRiskGroupData = res;
        }),
        riskControlApi
          .getThirdPartyRuleByRiskGroup({ riskGroup: this.seledRiskGroupId })
          .then(res => {
            this.thirdPartyRuleByRiskGroupData = res;
          });
    },
    // 点击查看按钮获取组合规则
    showThirdPartyCombinationRuleModal(row) {
      this.curOperThirdRule=row
      this.combinationRuleModal1 = true;
      riskControlApi
        .getThirdPartyCombinationRuleByThirdPartyId({ thirdPartyId: row.id })
        .then(res => {
          this.thirdPartyCombinationRuleByThirdPartyIdData = res;
          //  console.log(this.thirdPartyCombinationRuleByThirdPartyIdData)
        });
    },
    // 判断status的状态
    status(row, column) {
      if (row.status == 1) {
        return "启用";
      } else {
        return "禁用";
      }
    },
    // 转换规则组名
    transGroupName(row, column) {
      let _index = this.ruleGroupNameData.findIndex(m => {
        return m.key == row.group;
      });
      return this.ruleGroupNameData[_index].value;
    },
    transRiskGroupName(row, column) {
      let _index = this.ruleGroupNameData.findIndex(m => {
        return m.key == row.riskGroup;
      });
      return this.ruleGroupNameData[_index].value;
    },
    //***********机审规则********* */
    // 添加
    addMachineRule() {
      this.clearFromAddMechRule();
      this.isEditMechineRule = false;
      this.isShowMachineAddModal = true;
    },
    // 编辑
    editMachineRule(row) {
      this.isEditMechineRule = true;
      this.isShowMachineAddModal = true;
      row.status = row.status.toString();
      this.fromAddMechRule = JSON.parse(JSON.stringify(row));//进行拷贝

    },
    //提交机审规则
    commitMachineRule() {
      let ruleService = /^[0-9a-zA-Z]*$/g;
      let seqNo = /^[0-9]+$/ 
      let minValue=/^[0-9]+\.?[0-9]*$/
      let maxValue=/^[0-9]+\.?[0-9]*$/
      let threshold=/^[0-9]+\.?[0-9]*$/
      if(this.fromAddMechRule.ruleService==''){
         this.$Notice.warning({
            desc: '规则名称不能为空'
        })
         return
      }else if(!ruleService.test(this.fromAddMechRule.ruleService)){
        this.$Notice.warning({
            desc: '规则名称输入数字或字母'
        })
         return
      }
      if(this.fromAddMechRule.group==''){
         this.$Notice.warning({
            desc: '规则组不能为空'
        })
         return
      }

      if(this.fromAddMechRule.minValue!='' && this.fromAddMechRule.minValue !=null){
         if(!minValue.test(this.fromAddMechRule.minValue)){
            this.$Notice.warning({
                desc: '最小值只能是整数和小数'
            });
            return
          }
      }
      
      if(this.fromAddMechRule.maxValue!='' && this.fromAddMechRule.maxValue !=null){
        if(!maxValue.test(this.fromAddMechRule.maxValue)){
          this.$Notice.warning({
              desc: '最大值只能是整数和小数'
          });
          return
        }
      }
      if(this.fromAddMechRule.threshold!='' && this.fromAddMechRule.threshold!=null){
        if(!threshold.test(this.fromAddMechRule.threshold)){
          this.$Notice.warning({
              desc: '阈值只能是整数和小数'
          });
          return
        }
      }
      
      if(this.fromAddMechRule.seqNo==''){
         this.$Notice.warning({
            desc: '执行序号不能为空'
         });
          return
      }else if(!seqNo.test(this.fromAddMechRule.seqNo)){
           this.$Notice.warning({
            desc: '执行序号只能是整数'
        });
        return
      }
       let params =JSON.parse(JSON.stringify(this.fromAddMechRule))
        // params.id=Number(params.id)
        params.status=Number(params.status)
        params.group=Number(params.group)
        // params.minValue=Number(params.minValue)
        // params.maxValue=Number(params.maxValue)
        // params.threshold=Number(params.threshold)
      riskControlApi.getsaveOrUpdateRiskRule(params).then(res => { //穿参数
        this.isShowMachineAddModal = false; //模态框消失
        this.clearFromAddMechRule(); //表格清空
        this.searchDataList(); //刷新列表

      });
    },
    // 清空
    clearFromAddMechRule() {
      this.fromAddMechRule = this.fromAddMechRuleInit;
    },
    /*********三方规则********/
    addTripartiteRule() {
      this.isProcessDisplayAddModal = true;
      this.clearTripartiteRule();
      this.isEditMechineRule = false;
    },
    // 提交
    commitTripartiteRule() {
      let ruleName = /^[0-9a-zA-Z]*$/g;
      let seqNo = /^[0-9]+$/
      let minValue=/^[0-9]+\.?[0-9]*$/
      let maxValue=/^[0-9]+\.?[0-9]*$/
      let threshold1=/^[0-9]+\.?[0-9]*$/
      let threshold2=/^[0-9]+\.?[0-9]*$/
      if(this.fromTripartRule.ruleName==''){
         this.$Notice.warning({
            desc: '规则名称不能为空'
         })
         return
      }else if(!ruleName.test(this.fromTripartRule.ruleName)){
         this.$Notice.warning({
            desc: '规则名称输入数字或字母'
         })
         return
      }
      if(this.fromTripartRule.riskGroup==''){
         this.$Notice.warning({
            desc: '规则组不能为空'
         });
         return
      }
      if(this.fromTripartRule.minValue!='' && this.fromTripartRule.minValue!=null){
         if(!minValue.test(this.fromTripartRule.minValue)){
          this.$Notice.warning({
              desc: '最小值只能是整数和小数'
          });
          return
        }
      }
     if(this.fromTripartRule.maxValue!='' && this.fromTripartRule.maxValue!=null){
        if(!maxValue.test(this.fromTripartRule.maxValue)){
         this.$Notice.warning({
            desc: '最大值只能是整数和小数'
         });
         return
      }
     }
     if(this.fromTripartRule.threshold1!='' && this.fromTripartRule.threshold1!=null){
        if(!threshold1.test(this.fromTripartRule.threshold1)){
         this.$Notice.warning({
            desc: '阈值只能是整数和小数'
         });
         return
      }
     }
     if(this.fromTripartRule.threshold2!='' && this.fromTripartRule.threshold2!=null){
        if(!threshold2.test(this.fromTripartRule.threshold2)){
         this.$Notice.warning({
            desc: '阈值只能是整数和小数'
         });
         return
      }
     }
     if(this.fromTripartRule.seqNo==''){
         this.$Notice.warning({
              desc: '执行序号不能为空'
           });
         return
     }else if(!seqNo.test(this.fromTripartRule.seqNo)){
           this.$Notice.warning({
              desc: '执行序号只能是整数'
           });
         return
      }
      let params =JSON.parse(JSON.stringify(this.fromTripartRule))
      // params.id=Number(params.id)
      params.status=Number(params.status)
      params.riskGroup=Number(params.riskGroup)
      // params.minValue=Number(params.minValue)
      // params.maxValue=Number(params.maxValue)
      // params.threshold1=Number(params.threshold1)
      // params.threshold2=Number(params.threshold2)
      riskControlApi.getsaveOrUpdateThirdPartyRule(params).then(res => {
          this.isProcessDisplayAddModal = false;
          this.clearTripartiteRule();
          this.searchDataList();
        });
    },
    // 编辑
    editTripartiteRule(row) {
      let param = JSON.parse(JSON.stringify(row))
      param.status = param.status.toString()
      
      if(param.isCombinationRule==null){
        param.isCombinationRule='0'
      }else{
        param.isCombinationRule =param.isCombinationRule.toString()
      }
      this.isProcessDisplayAddModal = true;
      this.fromTripartRule = param

      this.isEditMechineRule = true;
    },
    // 清空
    clearTripartiteRule() {
      this.fromTripartRule = this.fromTripartRuleInit;
    },

    /***********组合规则****************/
    AddComBinationRule(){
      this.isCombinationRuleAddModal = true
      this. clearTripartiteCombinaRule()
      this.isEditMechineRule = false;
    },
    // 提交
    commitTripartiteCombinaRule(){
      let ruleName = /^[0-9a-zA-Z]*$/g;
      let seqNo = /^[0-9]+$/
      let threshold1=/^[0-9]+\.?[0-9]*$/
      let threshold2=/^[0-9]+\.?[0-9]*$/
      let threshold3=/^[0-9]+\.?[0-9]*$/
      let threshold4=/^[0-9]+\.?[0-9]*$/
      if(this.fromTripartBinationRule.ruleName==''){
         this.$Notice.warning({
            desc: '规则名称不能为空'
         })
         return
      }else  if(!ruleName.test(this.fromTripartBinationRule.ruleName)){
         this.$Notice.warning({
            desc: '规则名称输入数字或字母'
         })
         return
      }
      if(this.fromTripartBinationRule.group==''){
         this.$Notice.warning({
            desc: '规则组不能为空'
        });
         return
      }
      if(this.fromTripartBinationRule.threshold1!='' && this.fromTripartBinationRule.threshold1!=null){
        if(!threshold1.test(this.fromTripartBinationRule.threshold1)){
           this.$Notice.warning({
              desc: '阈值只能是整数和小数'
          });
          return
        }
      }
     if(this.fromTripartBinationRule.threshold2!=''&& this.fromTripartBinationRule.threshold2!=null){
       if(!threshold2.test(this.fromTripartBinationRule.threshold2)){
           this.$Notice.warning({
            desc: '阈值只能是整数和小数'
        });
         return
      }
     }
      if(this.fromTripartBinationRule.threshold3!='' && this.fromTripartBinationRule.threshold3!=null){
          if(!threshold3.test(this.fromTripartBinationRule.threshold3)){
            this.$Notice.warning({
              desc: '阈值只能是整数和小数'
          });
          return
        }
      }
      if(this.fromTripartBinationRule.threshold4!='' && this.fromTripartBinationRule.threshold4!=null){
          if(!threshold4.test(this.fromTripartBinationRule.threshold4)){
           this.$Notice.warning({
                desc: '阈值只能是整数和小数'
            });
            return
          }
      }
      if(this.fromTripartBinationRule.seqNo!='' && this.fromTripartBinationRule.seqNo!=null){
        if(!seqNo.test(this.fromTripartBinationRule.seqNo)){
           this.$Notice.warning({
              desc: '执行序号只能是整数'
          });
          return
        }
      }
      
    
      let param = JSON.parse(JSON.stringify(this.fromTripartBinationRule))

      param.thirdPartyId = Number(this.curOperThirdRule.id)
      // param.threshold1 = Number(param.threshold1)
      // param.threshold2 = Number(param.threshold2)
      // param.threshold3 = Number(param.threshold3)
      // param.threshold4 = Number(param.threshold4)
      riskControlApi.getsaveOrUpdateThirdPartyCombinationRule(param).then(res=>{
          this.isCombinationRuleAddModal = false
          this.showThirdPartyCombinationRuleModal(this.curOperThirdRule)
          this. clearTripartiteCombinaRule();
      })
    },
    editTripartiteCombinaRule(row){
      let param = JSON.parse(JSON.stringify(row))
      param.status = param.status.toString();

      this.isCombinationRuleAddModal = true
      this.fromTripartBinationRule = param
      
      this.isEditMechineRule = true
    },
     clearTripartiteCombinaRule() {
        this.fromTripartBinationRule = this.fromTripartBinationRuleInit;
    },
  
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
    this.getRuleGroupName();
  },
  created() {
    this.changeLanguage();
  }
}
</script>
<style lang="less" scoped>
.riskControl {
  width: 95%;
  margin: 15px auto;
  .ruleName{
    font-size:17px;
    font-weight: bold;
  }
  .machineAuditRules {
    width: 100%;
    margin: 20px 0 20px 10px;
    .title {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }
    .el-table {
      position: static;
    }
    .el-table .cell {
      line-height: 0;
    }
  }
  .processDisplay {
    width: 100%;
    margin: 20px 0 20px 10px;
    .title {
      display: flex;
      justify-content: space-between;
      margin-top: 50px;
    }
  }
}
.riskControl /deep/ h3{
  font-size:20px;
}
.riskControl /deep/ Button{
  margin-bottom:10px;
}
</style>
<style lang='less'>
.riskControl {
  //隔行换色
  .ivu-table .demo-table-info-row td {
    background-color: rgb(226, 239, 250);
  }
}
.modalRuleGroupName .ivu-modal-content .ivu-modal-footer {
  padding: 0 !important;
}
.modalRuleGroupName .ivu-modal-body .title{
  display: flex;
  justify-content: space-between;
  h3{
    font-size:20px;
  }
}
.modalRuleGroupName .ivu-modal-body Button{
  margin-right:30px;
}
.MachineAddModal .ivu-modal-content .ivu-modal-footer {
  padding: 0 !important;
}
.MachineAddModal .ivu-modal-content div {
  margin: 3px 0;
}
.MachineAddModal span {
  display: inline-block;
  width: 100px;
}
.TripartiteCombinaRule .ivu-modal-content .ivu-modal-footer{
   padding: 0 !important;
}
.TripartiteCombinaRule .ivu-modal-content div{
   margin: 3px 0;
}
.TripartiteCombinaRule span{
  display: inline-block;
  width: 100px;
}

</style>