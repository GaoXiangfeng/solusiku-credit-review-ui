<template>
  <div id="target">
    <div class="detailVal">
      <!-- 贷款次数、逾期天数、是否放款失败 、渠道-->
      <div class="loan-time">
        <span class="repeatOrder">
          {{repeatOrderInfo.repeatOrder}}
          <p>{{data.promptText.text1}}</p>
        </span>
        <span class="day">
          {{repeatOrderInfo.overdueDays}}
          <p>{{data.promptText.text2}}</p>
        </span>
        <span class="loan">
          {{repeatOrderInfo.payFailOrder==1?'YES':'NO'}}
          <p>{{data.promptText.text3}}</p>
        </span>
        <span class="total">
          {{repeatOrderInfo.channel}}
          <p>{{data.promptText.text4}}</p>
        </span>
        <span v-if="user.role == 1 || user.role == 11" class="balance">Balance : {{balance}}</span>
      </div>
      <!-- 终审人员在审核的时候展示 -->
      <!-- <div v-if="type==2 && !isCheck" class="moneyData">{{moneyData}}</div> -->
      <!-- 只有审核的时候展示 -->
      <div class="ticket-warning" v-if="!isCheck">
        <p>
          <span>
            current auditor:
            <strong class="green-color">{{currentAuditor}}</strong>
          </span>
          <span>
            total tickets:
            <strong
              :class="{'red-color': totalCount>10,'green-color':totalCount<=10}"
            >{{totalCount}}</strong>
          </span>
        </p>
      </div>
      <!-- <div size="small" class="back-top-bt" type="primary" @click="goTop">{{data.userTitle.goTop}}</div> -->
      <div size="small" class="back-top-bt" type="primary" @click="goTop">
        <Icon type="arrow-up-a" size="18"></Icon>
      </div>
      <Tabs type="card" @on-click="clickTab" :value="tabSelectedName">
        <!--贷款信息-->
        <TabPane
          class="tabpane"
          :label="data.tabCS.loanInfo"
          name="name1"
          :disabled="isTabOneDisabled"
        >
          <!--历史借贷-->
          <div class="historyLoan">
            <Card class="detail-card">
              <p
                slot="title"
                class="title-label"
                style="font-size:14px"
              >{{data.userTitle.historyLoan}}</p>
              <div>
                <Table
                  @on-sort-change="handleHistoryLoanSortChange"
                  :row-class-name="rowClassName"
                  :columns="columnsHistoryLoan"
                  :data="historyLoanDataSource"
                  :no-data-text="data.tableNoText"
                ></Table>
                <div style="text-align:right;margin:20px 0 40px 40px;">
                  <Page
                    :total="totalItemsHistoryLoan"
                    :current="formHistoryLoan.pageNum"
                    :page-size="formHistoryLoan.pageSize"
                    @on-page-size-change="changeSizeHistoryLoan"
                    @on-change="changePageHistoryLoan"
                    :page-size-opts="pageSizeOptsHistoryLoan"
                    size="small"
                    show-total
                    show-elevator
                    show-sizer
                  ></Page>
                </div>
              </div>
            </Card>
          </div>
          <!--贷款信息-->
          <div class="loanInfo">
            <div class="loanInfoLeft">
              <!--订单信息-->
              <tableForSingleCol
                v-if="sourceType != '1'"
                :title="data.orderTitle.orderInfo"
                :tableInfor="data.userOrderInfo"
              ></tableForSingleCol>
              <!--订单信息-->
              <tableForSingleCol
                v-if="sourceType == '1'"
                :title="data.orderTitle.orderInfo"
                :tableInfor="data.userOrderInfoVCC"
              ></tableForSingleCol>

              <!--用户--基本信息-->
              <tableForSingleCol
                :title="data.orderTitle.baseInfo"
                :tableInfor="data.userBaseInfo"
                :isSuccess="isSuccess"
                @handleEdit="handleEdit"
              >
                <div slot="otherInfo">
                  <table class="tableForBaseInfo" border="1">
                    <thead>
                      <tr>
                        <th>Variabel</th>
                        <th>Interval Binning</th>
                      </tr>
                    </thead>
                    <tbody>
                      <!--性别-->
                      <tr>
                        <td rowspan="2">{{data.tabCS.gender}}</td>
                        <td class="inpRadio">
                          <input
                            @click="handleChangeScoreInfoBtn"
                            type="radio"
                            id="19"
                            v-model="formScore.item6"
                            name="item6"
                            value="66"
                          />
                          <!--男-->
                          <label for="19" style="display: inline-block;width:80%">Laki-Laki</label>
                        </td>
                      </tr>
                      <tr>
                        <td class="inpRadio">
                          <input
                            @click="handleChangeScoreInfoBtn"
                            type="radio"
                            id="20"
                            v-model="formScore.item6"
                            name="item6"
                            value="33"
                          />
                          <label for="20" style="display: inline-block;width:80%">Perempuan</label>
                        </td>
                      </tr>
                      <!--年龄-->
                      <tr>
                        <td rowspan="4">{{data.tabCS.age}}</td>
                        <td class="inpRadio">
                          <input
                            id="1"
                            @click="handleChangeScoreInfoBtn"
                            type="radio"
                            v-model="formScore.age"
                            name="age"
                            value="44"
                          />
                          <label for="1" style="display: inline-block;width:80%">(41-55)</label>
                        </td>
                      </tr>
                      <tr>
                        <td class="inpRadio">
                          <input
                            id="2"
                            @click="handleChangeScoreInfoBtn"
                            type="radio"
                            v-model="formScore.age"
                            name="age"
                            value="59"
                          />
                          <label for="2" style="display: inline-block;width:80%">(36-40)</label>
                        </td>
                      </tr>
                      <tr>
                        <td class="inpRadio">
                          <input
                            id="3"
                            @click="handleChangeScoreInfoBtn"
                            type="radio"
                            v-model="formScore.age"
                            name="age"
                            value="95"
                          />
                          <label for="3" style="display: inline-block;width:80%">(26-35)</label>
                        </td>
                      </tr>
                      <tr>
                        <td class="inpRadio">
                          <input
                            id="4"
                            @click="handleChangeScoreInfoBtn"
                            type="radio"
                            v-model="formScore.age"
                            name="age"
                            value="77"
                          />
                          <label for="4" style="display: inline-block;width:80%">(18-25)</label>
                        </td>
                      </tr>
                      <!--是Jabodetabek居民？-->
                      <tr>
                        <td rowspan="2">{{data.tabCS.isJabLiver}}</td>
                        <td class="inpRadio">
                          <input
                            id="5"
                            @click="handleChangeScoreInfoBtn"
                            type="radio"
                            v-model="formScore.isJab"
                            name="isJab"
                            value="95"
                          />
                          <label for="5" style="display: inline-block;width:80%">ya</label>
                        </td>
                      </tr>
                      <tr>
                        <td class="inpRadio">
                          <input
                            id="6"
                            @click="handleChangeScoreInfoBtn"
                            type="radio"
                            v-model="formScore.isJab"
                            name="isJab"
                            value="63"
                          />
                          <label for="6" style="display: inline-block;width:80%">tidak</label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </tableForSingleCol>
              <!--用户--工作信息-->
              <tableForSingleCol
                :title="data.orderTitle.workInfo"
                :tableInfor="data.userWorkInfo"
                :isSuccess="isSuccess"
              >
                <div slot="otherInfo">
                  <table class="tableForBaseInfo" border="1">
                    <thead>
                      <tr>
                        <th>Variabel</th>
                        <th>Interval Binning</th>
                      </tr>
                    </thead>
                    <tbody>
                      <!--借款人职业是否合适？-->
                      <tr>
                        <td rowspan="2">{{data.tabCS.isJobSuitable}}</td>
                        <td class="inpRadio">
                          <input
                            @click="handleChangeScoreInfoBtn"
                            type="radio"
                            id="11"
                            v-model="formScore.item2"
                            name="item2"
                            value="68"
                          />
                          <label for="11" style="display: inline-block;width:80%">ya</label>
                        </td>
                      </tr>
                      <tr>
                        <td class="inpRadio">
                          <input
                            @click="handleChangeScoreInfoBtn"
                            type="radio"
                            id="12"
                            v-model="formScore.item2"
                            name="item2"
                            value="-800"
                          />
                          <label for="12" style="display: inline-block;width:80%">tidak</label>
                        </td>
                      </tr>
                      <!--工作多久了-->
                      <tr>
                        <td rowspan="5">{{data.tabCS.workAge}}</td>
                        <td class="inpRadio">
                          <input
                            @click="handleChangeScoreInfoBtn"
                            type="radio"
                            id="50"
                            v-model="formScore.lengthOfService"
                            name="lengthOfService"
                            value="23"
                          />
                          <label for="50" style="display: inline-block;width:80%">(0-3) Bulan</label>
                        </td>
                      </tr>
                      <tr>
                        <td class="inpRadio">
                          <input
                            @click="handleChangeScoreInfoBtn"
                            type="radio"
                            id="51"
                            v-model="formScore.lengthOfService"
                            name="lengthOfService"
                            value="55"
                          />
                          <label for="51" style="display: inline-block;width:80%">(3-6) Bulan</label>
                        </td>
                      </tr>
                      <tr>
                        <td class="inpRadio">
                          <input
                            @click="handleChangeScoreInfoBtn"
                            type="radio"
                            id="52"
                            v-model="formScore.lengthOfService"
                            name="lengthOfService"
                            value="74"
                          />
                          <label for="52" style="display: inline-block;width:80%">(6-12) Bulan</label>
                        </td>
                      </tr>
                      <tr>
                        <td class="inpRadio">
                          <input
                            @click="handleChangeScoreInfoBtn"
                            type="radio"
                            id="53"
                            v-model="formScore.lengthOfService"
                            name="lengthOfService"
                            value="89"
                          />
                          <label for="53" style="display: inline-block;width:80%">(12-24) Bulan</label>
                        </td>
                      </tr>
                      <tr>
                        <td class="inpRadio">
                          <input
                            @click="handleChangeScoreInfoBtn"
                            type="radio"
                            id="54"
                            v-model="formScore.lengthOfService"
                            name="lengthOfService"
                            value="98"
                          />
                          <label
                            for="54"
                            style="display: inline-block;width:80%"
                          >(lebih dari 24 ) Bulan</label>
                        </td>
                      </tr>
                      <!--借款人的工资合适吗-->
                      <tr>
                        <td rowspan="2">{{data.tabCS.isSalarySuitable}}</td>
                        <td class="inpRadio">
                          <input
                            @click="handleChangeScoreInfoBtn"
                            type="radio"
                            id="75"
                            v-model="formScore.item14"
                            name="item14"
                            value="58"
                          />
                          <label for="75" style="display: inline-block;width:80%">ya</label>
                        </td>
                      </tr>
                      <tr>
                        <td class="inpRadio">
                          <input
                            @click="handleChangeScoreInfoBtn"
                            type="radio"
                            id="76"
                            v-model="formScore.item14"
                            name="item14"
                            value="13"
                          />
                          <label for="76" style="display: inline-block;width:80%">tidak</label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </tableForSingleCol>
              <!--放款银行信息-->
              <tableForSingleCol
                :title="data.orderTitle.bankInfo"
                :tableInfor="data.userBankInfo"
                :isSuccess="isSuccess"
              ></tableForSingleCol>
              <!--认证照片-->
              <Card class="detail-card">
                <p slot="title" class="title-label">{{data.userTitle.photo}}</p>
                <div class="photoContent">
                  <div class="photoLeft">
                    <h4 class="phone-audit">{{data.userTitle.lastPhoto}}</h4>
                    <Table
                      style="overflow-y:scroll"
                      :columns="userPhotoColumns1"
                      :data="userPhotoData1"
                      :no-data-text="data.tableNoText"
                    ></Table>
                    <h4 class="phone-audit">{{data.userTitle.recentPhoto}}</h4>
                    <Table
                      :columns="userPhotoColumns2"
                      :data="userPhotoData2"
                      :no-data-text="data.tableNoText"
                    ></Table>
                  </div>
                  <div class="photoRight">
                    <table class="tableForBaseInfo" border="1">
                      <thead>
                        <tr>
                          <th>Variabel</th>
                          <th>Interval Binning</th>
                        </tr>
                      </thead>
                      <tbody>
                        <!--名字是否与身份证符合-->
                        <tr>
                          <td rowspan="2">{{data.tabCS.nameIDSame}}</td>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="23"
                              v-model="formScore.item8"
                              name="item8"
                              value="-1"
                            />
                            <label for="23" style="display: inline-block;width:80%">ya</label>
                          </td>
                        </tr>
                        <tr>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="24"
                              v-model="formScore.item8"
                              name="item8"
                              value="-800"
                            />
                            <label for="24" style="display: inline-block;width:80%">tidak</label>
                          </td>
                        </tr>
                        <!--借款人的住所是否与身份证相同-->
                        <tr>
                          <td rowspan="2">{{data.tabCS.addressIDSame}}</td>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="73"
                              v-model="formScore.item13"
                              name="item13"
                              value="56"
                            />
                            <label for="73" style="display: inline-block;width:80%">ya</label>
                          </td>
                        </tr>
                        <tr>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="74"
                              v-model="formScore.item13"
                              name="item13"
                              value="12"
                            />
                            <label for="74" style="display: inline-block;width:80%">tidak</label>
                          </td>
                        </tr>
                        <!--借款人是否附加NPWP（税卡）-->
                        <tr>
                          <td rowspan="2">{{data.tabCS.hasTaxCard}}</td>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="7"
                              v-model="formScore.item9"
                              name="item9"
                              value="-1"
                            />
                            <label for="7" style="display: inline-block;width:80%">ya</label>
                          </td>
                        </tr>
                        <tr>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="8"
                              v-model="formScore.item9"
                              name="item9"
                              value="-800"
                            />
                            <label for="8" style="display: inline-block;width:80%">tidak</label>
                          </td>
                        </tr>
                        <!--NPWP是否属于借款人-->
                        <tr>
                          <td rowspan="2">{{data.tabCS.taxCardBelongBorrower}}</td>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="9"
                              v-model="formScore.item10"
                              name="item10"
                              value="-1"
                            />
                            <label for="9" style="display: inline-block;width:80%">ya</label>
                          </td>
                        </tr>
                        <tr>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="10"
                              v-model="formScore.item10"
                              name="item10"
                              value="-800"
                            />
                            <label for="10" style="display: inline-block;width:80%">tidak</label>
                          </td>
                        </tr>
                        <!--借款人是否附上工作证明？-->
                        <tr>
                          <td rowspan="2">{{data.tabCS.hasWorkProve}}</td>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="13"
                              v-model="formScore.item3"
                              name="item3"
                              value="68"
                            />
                            <label for="13" style="display: inline-block;width:80%">ya</label>
                          </td>
                        </tr>
                        <tr>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="14"
                              v-model="formScore.item3"
                              name="item3"
                              value="25"
                            />
                            <label for="14" style="display: inline-block;width:80%">tidak</label>
                          </td>
                        </tr>
                        <!--工作证明是否是借款人的证明-->
                        <tr>
                          <td rowspan="2">{{data.tabCS.workProveBelongBorrower}}</td>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="15"
                              v-model="formScore.item4"
                              name="item4"
                              value="68"
                            />
                            <label for="15" style="display: inline-block;width:80%">ya</label>
                          </td>
                        </tr>
                        <tr>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="16"
                              v-model="formScore.item4"
                              name="item4"
                              value="24"
                            />
                            <label for="16" style="display: inline-block;width:80%">tidak</label>
                          </td>
                        </tr>
                        <!--借款人是否附上其他证明文件？-->
                        <tr>
                          <td rowspan="2">{{data.tabCS.hasOtherProve}}</td>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="21"
                              v-model="formScore.item7"
                              name="item7"
                              value="64"
                            />
                            <label for="21" style="display: inline-block;width:80%">ya</label>
                          </td>
                        </tr>
                        <tr>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="22"
                              v-model="formScore.item7"
                              name="item7"
                              value="28"
                            />
                            <label for="22" style="display: inline-block;width:80%">tidak</label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card>
              <!--紧急联系人-->
              <Card class="detail-card">
                <p slot="title" class="title-label">{{data.userTitle.emergencyPerson}}</p>
                <div class="emergencyPersonContent">
                  <div class="emergencyPersonLeft">
                    <Table
                      style="margin-top:3px"
                      :columns="EmergencyContactsColumns"
                      :data="EmergencyContactsInfo"
                      :no-data-text="data.tableNoText"
                    ></Table>
                  </div>
                  <div class="emergencyPersonRight">
                    <table class="tableForBaseInfo" border="1">
                      <thead>
                        <tr>
                          <th>Variabel</th>
                          <th>Interval Binning</th>
                        </tr>
                      </thead>
                      <tbody>
                        <!--手机号码是否正确-->
                        <tr>
                          <td rowspan="2">{{data.tabCS.phoneRight}}</td>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="69"
                              v-model="formScore.item11"
                              name="item11"
                              value="38"
                            />
                            <label for="69" style="display: inline-block;width:80%">ya</label>
                          </td>
                        </tr>
                        <tr>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="70"
                              v-model="formScore.item11"
                              name="item11"
                              value="-800"
                            />
                            <label for="70" style="display: inline-block;width:80%">tidak</label>
                          </td>
                        </tr>
                        <!--是否可以联系借款人的手机号码？-->
                        <tr>
                          <td rowspan="2">{{data.tabCS.phoneCanBeCall}}</td>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="71"
                              v-model="formScore.item12"
                              name="item12"
                              value="58"
                            />
                            <label for="71" style="display: inline-block;width:80%">ya</label>
                          </td>
                        </tr>
                        <tr>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="72"
                              v-model="formScore.item12"
                              name="item12"
                              value="-800"
                            />
                            <label for="72" style="display: inline-block;width:80%">tidak</label>
                          </td>
                        </tr>
                        <!--借款人是否有信用卡？-->
                        <tr>
                          <td rowspan="2">{{data.tabCS.hasCreditCard}}</td>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="77"
                              v-model="formScore.item15"
                              name="item15"
                              value="17"
                            />
                            <label for="77" style="display: inline-block;width:80%">ya</label>
                          </td>
                        </tr>
                        <tr>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="78"
                              v-model="formScore.item15"
                              name="item15"
                              value="55"
                            />
                            <label for="78" style="display: inline-block;width:80%">tidak</label>
                          </td>
                        </tr>
                        <!--3个月内贷款软件数量-->
                        <tr>
                          <td rowspan="4">{{data.tabCS.loanCount}}</td>
                          <td class="inpRadio">
                            <input
                              id="55"
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              v-model="formScore.appCount"
                              name="appCount"
                              value="48"
                            />
                            <label for="55" style="display: inline-block;width:80%">(1-2)</label>
                          </td>
                        </tr>
                        <tr>
                          <td class="inpRadio">
                            <input
                              id="56"
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              v-model="formScore.appCount"
                              name="appCount"
                              value="32"
                            />
                            <label for="56" style="display: inline-block;width:80%">(3-4)</label>
                          </td>
                        </tr>
                        <tr>
                          <td class="inpRadio">
                            <input
                              id="57"
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              v-model="formScore.appCount"
                              name="appCount"
                              value="29"
                            />
                            <label for="57" style="display: inline-block;width:80%">(5-6)</label>
                          </td>
                        </tr>
                        <tr>
                          <td class="inpRadio">
                            <input
                              id="58"
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              v-model="formScore.appCount"
                              name="appCount"
                              value="11"
                            />
                            <label for="58" style="display: inline-block;width:80%">(>6)</label>
                          </td>
                        </tr>
                        <!--三个月其他内贷款软件金额-->
                        <tr>
                          <td rowspan="5">{{data.tabCS.loanAmountOtherApp}}</td>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="59"
                              v-model="formScore.moneyAcount"
                              name="moneyAcount"
                              value="14"
                            />
                            <label for="59" style="display: inline-block;width:80%">(0-1.000.000)</label>
                          </td>
                        </tr>
                        <tr>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="60"
                              v-model="formScore.moneyAcount"
                              name="moneyAcount"
                              value="22"
                            />
                            <label
                              for="60"
                              style="display: inline-block;width:80%"
                            >(1.000.000-2.000.000)</label>
                          </td>
                        </tr>
                        <tr>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="61"
                              v-model="formScore.moneyAcount"
                              name="moneyAcount"
                              value="38"
                            />
                            <label
                              for="61"
                              style="display: inline-block;width:80%"
                            >(2.000.000-3.000.000)</label>
                          </td>
                        </tr>
                        <tr>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="62"
                              v-model="formScore.moneyAcount"
                              name="moneyAcount"
                              value="46"
                            />
                            <label
                              for="62"
                              style="display: inline-block;width:80%"
                            >(3.000.000-4.000.000)</label>
                          </td>
                        </tr>
                        <tr>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="63"
                              v-model="formScore.moneyAcount"
                              name="moneyAcount"
                              value="59"
                            />
                            <label for="63" style="display: inline-block;width:80%">(4.000.000-~)</label>
                          </td>
                        </tr>
                        <!--12个月内逾期天数-->
                        <tr>
                          <td rowspan="5">{{data.tabCS.overDueDay}}</td>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="64"
                              v-model="formScore.overDueDays"
                              name="overDueDays"
                              value="63"
                            />
                            <label for="64" style="display: inline-block;width:80%">0</label>
                          </td>
                        </tr>
                        <tr>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="65"
                              v-model="formScore.overDueDays"
                              name="overDueDays"
                              value="54"
                            />
                            <label for="65" style="display: inline-block;width:80%">(1-30) Hari</label>
                          </td>
                        </tr>
                        <tr>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="66"
                              v-model="formScore.overDueDays"
                              name="overDueDays"
                              value="48"
                            />
                            <label for="66" style="display: inline-block;width:80%">(31-60) Hari</label>
                          </td>
                        </tr>
                        <tr>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="67"
                              v-model="formScore.overDueDays"
                              name="overDueDays"
                              value="32"
                            />
                            <label for="67" style="display: inline-block;width:80%">(61-90) Hari</label>
                          </td>
                        </tr>
                        <tr>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="68"
                              v-model="formScore.overDueDays"
                              name="overDueDays"
                              value="-800"
                            />
                            <label for="68" style="display: inline-block;width:80%">(91-180) Hari</label>
                          </td>
                        </tr>
                        <!--是否可以联系紧急联系人?-->
                        <tr>
                          <td rowspan="2">{{data.tabCS.canContactEm}}</td>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="79"
                              v-model="formScore.item16"
                              name="item16"
                              value="50"
                            />
                            <label for="79" style="display: inline-block;width:80%">Ya</label>
                          </td>
                        </tr>
                        <tr>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="80"
                              v-model="formScore.item16"
                              name="item16"
                              value="-500"
                            />
                            <label for="80" style="display: inline-block;width:80%">Tidak</label>
                          </td>
                        </tr>
                        <!--哪些紧急联系人愿意成为借款人的见证人？ -->
                        <tr>
                          <td rowspan="3">{{data.tabCS.whichEmCanbeProve}}</td>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="81"
                              v-model="formScore.item17"
                              name="item17"
                              value="-700"
                            />
                            <label for="81" style="display: inline-block;width:80%">1-2</label>
                          </td>
                        </tr>
                        <tr>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="82"
                              v-model="formScore.item17"
                              name="item17"
                              value="-500"
                            />
                            <label for="82" style="display: inline-block;width:80%">3-4</label>
                          </td>
                        </tr>
                        <tr>
                          <td class="inpRadio">
                            <input
                              @click="handleChangeScoreInfoBtn"
                              type="radio"
                              id="83"
                              v-model="formScore.item17"
                              name="item17"
                              value="90"
                            />
                            <label for="83" style="display: inline-block;width:80%">>=5</label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!--下一步按钮-->
                    <div
                      style="margin-top:20px;text-align:center"
                      v-if="(user.role == 4 || user.role == 6 || user.role == 10 || user.role == 13) && scoreData.score == 0 && isCheck"
                    >
                      <!--拒绝-->
                      <Button
                        v-show="!(isCliScoreBtn && isCliAllECBtn)"
                        type="primary"
                        @click="handleRejectApply"
                      >Tolak</Button>
                      <!--下一步-->
                      <Button
                        v-show="(isCliScoreBtn && isCliAllECBtn)"
                        type="primary"
                        @click="handleCommitScore"
                      >Kirim</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabPane>
        <!--信用报告-->
        <TabPane
          class="tabpane"
          :label="data.tabCS.creditReport"
          name="name2"
          :disabled="isTabTwoDisabled"
        >
          <!--同盾数据报告-->
          <div>
            <Card class="detail-card">
              <p slot="title" class="title-label">{{data.tabResult.scoreTitle}}</p>
              <div style="font-size:25px;">
                <span>{{data.tabResult.score}}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>{{dataReportTD.final_score}}</span>
              </div>
              <div style="margin-top:20px;font-size:25px;">
                <span>{{data.tabResult.suggest}}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>{{dataReportTD.final_decision}}</span>
              </div>
            </Card>

            <Card class="detail-card">
              <p slot="title" class="title-label">{{data.tabResult.detailReport}}</p>
              <Table
                :columns="detailReportColumns"
                :data="detailListReportTD"
                no-data-text="Tidak ada data"
              ></Table>
            </Card>

            <!--得分-->
            <Card class="detail-card">
              <p slot="title" class="title-label">{{data.tabResult.finalResult}}</p>
              <div style="margin-top:20px;font-size:25px;">
                <span>{{data.tabResult.finalReview}}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>{{scoreData.score}}</span>
                <span>&nbsp;&nbsp;&nbsp;{{Number(scoreData.decisionResult) == 1 ? this.data.tabResult.pass : this.data.tabResult.reject}}</span>
                <!--审核信息历史记录-->
                <div style="margin-top:30px">
                  <Table
                    :row-class-name="rowClassName"
                    :columns="auditColumns"
                    :data="auditInformation"
                    :no-data-text="data.tableNoText"
                  ></Table>
                </div>
              </div>
              <!--得分操作-->
              <div
                style="margin-top:30px"
                v-if="isCheck && (user.role == 4 || user.role == 5 || user.role == 6 || user.role == 7 || user.role == 10 || user.role == 11 || user.role == 13|| user.role == 14)"
              >
                <label style="font-size: 15px;color:black">{{data.rejectModal.rejectTypeForTabTwo}}</label>
                <br />
                <Select
                  style="width:300px;margin-bottom:10px;"
                  v-model="formModalReject.rejectType"
                  @on-change="changeRejectType"
                >
                  <Option
                    v-for="item in rejectTypeList"
                    :key="item.refuseTypeCode"
                    :value="item.refuseTypeCode"
                  >{{item.displayUI}}</Option>
                </Select>
                <br />
                <label
                  style="font-size: 15px;color:black"
                >{{data.rejectModal.rejectReasonForTabTwo}}</label>
                <br />
                <Select
                  style="width:300px;margin-bottom:10px;"
                  v-model="formModalReject.rejectReasonDetail"
                >
                  <Option
                    v-for="item in rejectReasonDetailList"
                    :key="item.id"
                    :value="item.id"
                  >{{item.displayUI}}</Option>
                </Select>
                <br />
                <label style="font-size: 15px;color:black">{{data.tabResult.remark}}</label>
                <br />
                <!-- <div style="font-size:20px;font-weight:500;color:black">{{data.tabResult.remark}}:</div> -->
                <Input
                  class="mark"
                  style="width:500px;margin-top:5px;"
                  type="textarea"
                  v-model="auditTicketRemark"
                  :autosize="{minRows: 3,maxRows: 5}"
                ></Input>
                <br />
                <br />
                <label style="font-size: 15px;color:red">{{data.rejectModal.operationTip}}</label>
                <div style="margin-top:10px">
                  <!--通过-->
                  <Button
                    style="margin-right:15px"
                    type="primary"
                    @click="handleAuditTicket(1)"
                  >{{data.tabResult.pass}}</Button>
                  <!--拒绝-->
                  <Button type="primary" @click="handleAuditTicket(2)">{{data.tabResult.reject}}</Button>
                </div>
              </div>
            </Card>
            <!--人脸识别-->
            <Card class="detail-card">
              <p slot="title" class="title-label">{{data.faceIdentification.title}}</p>
              <div style="margin-top:20px;">
                <div>
                  <span>{{data.faceIdentification.similarity}}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span>{{faceIdentificationData.similarity}}</span>
                </div>
                <div style="margin-top:20px;">
                  <!-- <span>{{data.faceIdentification.compareCount}}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span>{{faceIdentificationData.comparisonCount}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>-->
                  <span
                    v-if="faceIdentificationData.comparisonCount >= 10"
                    style="color:red"
                  >{{data.faceIdentification.countTip}}</span>
                </div>
                <div style="margin-top:20px;">
                  <span>{{data.faceIdentification.reviewSuggestion}}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span v-if="faceIdentificationData.advise == 0">{{ data.tabResult.pass }}</span>
                  <span v-if="faceIdentificationData.advise == 1">{{ data.tabResult.reject }}</span>
                  <span
                    v-if="faceIdentificationData.advise == 2"
                  >{{data.tabResult.waitPersonReview }}</span>
                </div>
              </div>
            </Card>
          </div>
        </TabPane>
      </Tabs>
    </div>

    <!-- 用户相片认证弹窗-->
    <Modal v-model="modal1" width="1000">
      <p slot="header" style="text-align:center">
        <Icon type="information-circled"></Icon>
        <span>{{data.userPhotoTitle[showIndex]}}</span>
      </p>
      <div style="text-align:center;" v-if="last">
        <div v-if="showIndex == 0" style="font-size:14px;margin-bottom:10px;">
          <span>Nama Asli :</span>
          <span>{{userName}}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>Nomor Identitas :</span>
          <span>{{idCardNo}}</span>
        </div>
        <div style="width:900px;height:900px;overflow: auto;">
          <img
            ref="bigimg"
            v-if="showIndex == 0"
            :src="userPhotoData1[0] && userPhotoData1[0].idCardFront"
            class="modal-photo"
          />
          <img
            ref="bigimg"
            v-if="showIndex == 1"
            :src="userPhotoData1[0].handIdCard"
            class="modal-photo"
          />
          <img
            ref="bigimg"
            v-if="showIndex == 2"
            :src="userPhotoData1[0].liveness"
            class="modal-photo"
          />
          <img
            ref="bigimg"
            v-if="showIndex == 3"
            :src="userPhotoData1[0].taxCard"
            class="modal-photo"
          />
          <img
            ref="bigimg"
            v-if="showIndex == 4"
            :src="userPhotoData1[0].other"
            class="modal-photo"
          />

          <img
            ref="bigimg"
            v-if="showIndex == 5"
            :src="userPhotoData1[0].idCardNegative"
            class="modal-photo"
          />
          <img
            ref="bigimg"
            v-if="showIndex == 6"
            :src="userPhotoData1[0].accountBook"
            class="modal-photo"
          />
          <img
            ref="bigimg"
            v-if="showIndex == 7"
            :src="userPhotoData1[0].socialSecurityCard"
            class="modal-photo"
          />
          <img
            ref="bigimg"
            v-if="showIndex == 8"
            :src="userPhotoData1[0].workPic"
            class="modal-photo"
          />
          <img
            ref="bigimg"
            v-if="showIndex == 9"
            :src="userPhotoData1[0].payroll"
            class="modal-photo"
          />
        </div>
      </div>
      <div style="text-align:center;" v-else>
        <div v-if="showIndex == 0" style="font-size:14px;margin-bottom:10px;">
          <span>Nama Asli :</span>
          <span>{{userName}}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>Nomor Identitas :</span>
          <span>{{idCardNo}}</span>
        </div>
        <div style="width:900px;height:900px;overflow: auto;">
          <img
            ref="bigimg"
            v-if="showIndex == 0"
            :src="userPhotoData2[0].idCardFront"
            class="modal-photo"
          />
          <img
            ref="bigimg"
            v-if="showIndex == 1"
            :src="userPhotoData2[0].handIdCard"
            class="modal-photo"
          />
          <img
            ref="bigimg"
            v-if="showIndex == 2"
            :src="userPhotoData2[0].liveness"
            class="modal-photo"
          />
          <img
            ref="bigimg"
            v-if="showIndex == 3"
            :src="userPhotoData2[0].taxCard"
            class="modal-photo"
          />
          <img
            ref="bigimg"
            v-if="showIndex == 4"
            :src="userPhotoData2[0].other"
            class="modal-photo"
          />

          <img
            ref="bigimg"
            v-if="showIndex == 5"
            :src="userPhotoData2[0].idCardNegative"
            class="modal-photo"
          />
          <img
            ref="bigimg"
            v-if="showIndex == 6"
            :src="userPhotoData2[0].accountBook"
            class="modal-photo"
          />
          <img
            ref="bigimg"
            v-if="showIndex == 7"
            :src="userPhotoData2[0].socialSecurityCard"
            class="modal-photo"
          />
          <img
            ref="bigimg"
            v-if="showIndex == 8"
            :src="userPhotoData2[0].workPic"
            class="modal-photo"
          />
          <img
            ref="bigimg"
            v-if="showIndex == 9"
            :src="userPhotoData2[0].payroll"
            class="modal-photo"
          />
        </div>
      </div>
      <div slot="footer" style="display:flex;justify-content: center;aline-item:center;">
        <button
          style="border:0;outline:0;margin-right:10px;background-color:rgba(0,0,0,0)"
          type="text"
          shape="circle"
          @click="handleFangDa"
        >
          <Icon size="26" type="ios-plus-outline"></Icon>
        </button>
        <button
          style="border:0;outline:0;margin-right:10px;background-color:rgba(0,0,0,0)"
          type="text"
          shape="circle"
          @click="handleSuoXiao"
        >
          <Icon size="26" type="ios-minus-outline"></Icon>
        </button>
        <button
          style="border:0;outline:0;margin-right:10px;background-color:rgba(0,0,0,0)"
          type="text"
          shape="circle"
          @click="handleXuanzhuan"
        >
          <Icon size="30" type="ios-refresh-empty"></Icon>
        </button>
        <Button type="primary" @click="confirm1">{{data.userTitle.confirm}}</Button>
      </div>
    </Modal>
    <!--tab1页 拒绝对话框-->
    <Modal v-model="showModalReject" :title="data.rejectModal.title">
      <div style="height:280px">
        <label style="font-size: 15px;"><span style="font-size: 15px;color:red">* </span>{{data.rejectModal.rejectType}}</label>
        <Select style="margin-bottom:10px" v-model="formModalReject.rejectType" @on-change="changeRejectType">
          <Option
            v-for="item in rejectTypeList"
            :key="item.refuseTypeCode"
            :value="item.refuseTypeCode"
          >{{item.displayUI}}</Option>
        </Select>
        <br />
        <label style="font-size: 15px;"><span style="font-size: 15px;color:red">* </span>{{data.rejectModal.rejectReason}}</label>
        <Select style="margin-bottom:10px" v-model="formModalReject.rejectReasonDetail">
          <Option
            v-for="item in rejectReasonDetailList"
            :key="item.id"
            :value="item.id"
          >{{item.displayUI}}</Option>
        </Select>
        <br />
        <label style="font-size: 15px;"><span style="font-size: 15px;color:red">* </span>{{data.rejectModal.label}}</label>
        <Input
          style="margin-top:5px"
          v-model="formModalReject.rejectReasonRemark"
          type="textarea"
          :autosize="{minRows: 5,maxRows: 5}"
          placeholder="Enter something..."
        ></Input>
      </div>
      <div slot="footer" style="text-align:center">
        <Button type="primary" @click="handleModalReject">{{data.rejectModal.commit}}</Button>
      </div>
    </Modal>

    <!--用户信息编辑对话框(名字)-->
    <Modal v-model="showModalEditUserInfo" :title="data.userInfoEditModal.title" width="400">
      <div style="height:150px">
        <div style="display:flex;align-items:center">
          <label
            v-show="editUserInfoValue.key == 'name'"
            style="width:115px;font-size: 15px;text-align:right"
          >{{data.userInfoEditModal.firstName}}:</label>
          <Input
            v-show="editUserInfoValue.key == 'name'"
            style="width:200px;margin-left:10px;"
            v-model="editUserInfoData.firstName"
          ></Input>
          <br />
          <br />
        </div>
        <div style="display:flex;align-items:center">
          <label
            v-show="editUserInfoValue.key == 'name'"
            style="width:115px;font-size: 15px;text-align:right"
          >{{data.userInfoEditModal.lastName}}:</label>
          <Input
            v-show="editUserInfoValue.key == 'name'"
            style="width:200px;margin-left:10px;"
            v-model="editUserInfoData.lastName"
          ></Input>
        </div>

        <div style="display:flex;align-items:center">
          <label
            v-show="editUserInfoValue.key != 'name'"
            style="width:115px;font-size: 15px;text-align:right"
          >{{data.userInfoEditModal.value}}:</label>
          <Input
            v-show="editUserInfoValue.key != 'name'"
            style="width:200px;margin-left:10px;"
            v-model="editUserInfoData.value"
          ></Input>
        </div>
      </div>
      <div slot="footer" style="text-align:center">
        <Button type="primary" @click="handleModalEditUserInfo">{{data.userInfoEditModal.commit}}</Button>
      </div>
    </Modal>
    <a ref="targetlink" href target="_blank"></a>
  </div>
</template>
<script>
import store from "../../store/index";
import { mapState } from "vuex";
import orderDetailApi from "../../services/api/orderDetail.service";
import taskPanelApi from "../../services/api/taskPanel.service";
import localStorage from "../../services/localStorage.service";
import moment from "moment";
import noImgSrc from "../../assets/default.png";
import pinjaTable from "../../components/pinja-table.vue";
import expandRow from "../../components/table-expand.vue";
import pinjaTwoTable from "../../components/pinja-two-table.vue";
import tableForSingleCol from "../../components/tableForSingleCol.vue";

export default {
  data() {
    return {
      //编辑用户信息对话框
      showModalEditUserInfo: false,
      editUserInfoValue: {
        key: ""
      },
      editUserInfoData: {
        firstName: "",
        lastName: "",
        value: ""
      },
      //历史借贷
      columnsHistoryLoan: [
        {
          title: "业务类型",
          key: "productType",
          width: 180,

          render: (h, params) => {
            if (params.row.productType) {
              return h("div", this.data.businessType[params.row.productType]);
            } else {
              return h("div", "");
            }
          }
        },
        {
          title: "订单号",
          key: "orderId",
          width: 180
        },
        {
          title: "创建时间",
          key: "ctime",
          sortable: "custom",
          minWidth: 180,
          render: (h, params) => {
            if (params.row.ctime) {
              return h(
                "div",
                moment(params.row.ctime).format("YYYY-MM-DD HH:mm:ss")
              );
            } else {
              return h("div", "");
            }
          }
        },
        {
          title: "订单状态",
          key: "orderStatus",
          minWidth: 180
        },
        {
          title: "结清时间",
          key: "settlementTime",
          minWidth: 180,
          render: (h, params) => {
            if (params.row.settlementTime) {
              return h(
                "div",
                moment(params.row.settlementTime).format("YYYY-MM-DD HH:mm:ss")
              );
            } else {
              return h("div", "");
            }
          }
        },
        {
          title: "逾期天数",
          key: "maxOverdueDay",
          width: 180
        },
        {
          title: "拒绝原因",
          key: "refuseReason",
          width: 180
        }
      ],
      historyLoanDataSource: [],
      totalItemsHistoryLoan: 0,
      pageSizeOptsHistoryLoan: [5, 10],
      formHistoryLoan: {
        ticketId: "",
        sourceType: "",
        sourceId: "",
        sort: "DESC",
        sortBy: "ctime",
        pageNum: 1,
        pageSize: 5
      },

      //***********************拒绝类型 拒绝原因,数据源*******************************/
      //拒绝原因对话框
      showModalReject: false,

      rejectTypeList: [],
      rejectReasonDetailList: [], //拒绝原因详细

      //拒绝对话框数据
      formModalReject: {
        rejectType: "", //拒绝类型
        rejectReasonDetail: "", //拒绝原因
        rejectReasonRemark: "" //拒绝备注
      },
      rejectReasonModal: "", //原来拒绝对话框 拒绝原因
      balance: "",
      tabSelectedName: "name1",
      isTabOneDisabled: false, //tab页一是否不可用
      isTabTwoDisabled: false, //tab页二是否不可用
      isCliAllECBtn: true, //是否全部拨打了紧急联系，全部拨打后为true
      isCliScoreBtn: false, //是否点击了得分，有点击按钮后为true
      formScore: {
        //基础信息得分
        age: "0",
        isJab: "0",

        item2: "0",
        item3: "0",
        item4: "0",
        //item5: '0',
        item6: "0",
        item7: "0",
        item8: "0",
        item9: "0",
        item10: "0",

        //电核得分
        lengthOfService: "0", //工龄
        appCount: "48", //下载的app数量
        moneyAcount: "14", //其他app的贷款总金额
        overDueDays: "32", //12个月内逾期天数
        item11: "38",
        item12: "-800",
        item13: "0",
        item14: "58",
        item15: "55",
        item16: "0",
        item17: "0"
      },
      //同盾--数据报告
      dataReportTD: {
        final_score: "",
        final_decision: ""
      },
      //同盾--详细报告
      detailListReportTD: [],
      detailReportColumns: [
        {
          title: "Nama risiko",
          key: "risk_name",
          width: 140
        },
        {
          title: "Skor",
          key: "score",
          width: 140
        },
        {
          title: "Saran",
          key: "decision",
          minWidth: 140
        }
      ],
      //得分报告
      scoreData: {
        isShow: 1, //1:展示待勾选分数列表；0:不展示
        score: "0",
        decisionResult: "1"
      }, //评估得分
      isCallRecordVisi: true, //用于判断按钮是否可点状态
      bankCheckDataSource: {
        userName: "",
        bankHolderName: "",
        macthScore: ""
      },
      //审核信息
      auditColumns: [
        {
          title: "审核时间",
          key: "auditTime",
          width: 180,
          render: (h, params) => {
            return h(
              "div",
              moment(params.row.auditTime).format("YYYY-MM-DD HH:mm:ss")
            );
          }
        },
        {
          title: "阶段",
          key: "level",
          render: (h, params) => {
            return h("span", this.data.auditLevelText[params.row.level]);
          }
        },
        {
          title: "审核结果",
          key: "action",
          render: (h, params) => {
            return h("span", this.data.auditActionText[params.row.action]);
          }
        },
        {
          title: "审核人员姓名",
          key: "auditor"
        },
        {
          title: "审核意见",
          key: "remark",
          render: (h, params) => {
            if (params.row.level == "2" || params.row.level == "3") {
              return h(
                "Button",
                {
                  props: {
                    size: "small",
                    type: "primary"
                  },
                  on: {
                    click: () => {
                      this.openElInfo(params.row.content);
                      this.modal6Param = JSON.parse(params.row.content);
                    }
                  }
                },
                this.data.userTitle.watch
              );
            } else {
              return h("span", params.row.remark);
            }
          }
        }
      ],
      auditInformation: [],
      auditTicketRemark: "", //信审备注
      channelId: 0, //渠道号
      baseChannelShow: true, //根据渠道号是否显示短信列表等
      isShow: false,
      value1: [1],
      value2: [],
      value3: [],
      collapseValue1: "1",
      secondValue: "second2",
      thirdValue: "third1",
      singleArr: [0, 7, 12, 13, 14],
      LaDeliverySingle: [2, 3],
      LaBillsSingle: [2, 3],
      LaOtherSingle: [2, 3],
      loading: false,
      value: "0",
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      modal5: false,
      auditRows: [],
      showIndex: 0,
      last: true,
      data: {
        userInfoEditModal: {},
        hitRiskText: {},
        detailCardData: [],
        orderTitle: {},
        bankInfoMatch: {},
        promptText: {},
        userOrderInfo: [],
        userOrderInfoVCC: [],
        userBankInfo: [],
        userPayInfo: [],
        loanTypeText: {},
        loanDay: "",
        rate: "",
        rateTypeText: {},
        nameValid: {},
        nonePay: "",
        userTitle: {},
        maritalStatus: {},
        incomeList: {},
        userBaseInfo: [],
        userWorkInfo: [],
        contactText: [],
        contactTime: {},
        tableNoText: "无数据",
        userPhotoTitle: {},
        userCallBookTitle: {},
        userMessageTitle: {},
        userCallRecordTitle: {},
        occupationText: {},
        educationText: {},
        relationText: {},
        genderText: {},
        purposeText: {},
        //审核信息
        auditInfoTitle: {},
        auditLevelText: {}, //阶段
        auditActionText: {}, //审核结果
        //数据抓取
        crawlingBaseDataLa: [], //基本信息
        crawlingAddrDeliveryDataLa: [], //配送信息
        crawlingAddrBillsDataLa: [], //账单地址
        crawlingAddrOtherDataLa: [], //其他地址
        //审核 拒绝原因和提交表单
        actionText: [],
        rejectReason: [],
        auditForm: {},

        //历史借贷
        historyLoanTitle: {},
        tabCS: {},
        tabResult: {},
        faceIdentification: {},
        //弹框拒绝
        rejectModal: {},
        //历史借贷
        historyLoanColumnTitle: [],
        businessType: {}
      },
      isHaveHighRisk: false,
      isHaveLowRisk: false,
      isHaveThirdRisk: false,

      advanceUser: [
        {
          key: "name",
          value: "" //
        },
        {
          key: "province",
          value: "" //
        },
        {
          key: "city",
          value: "" //
        },
        {
          key: "district",
          value: "" //
        },
        {
          key: "village",
          value: "" //
        }
      ],

      advanceCompanys: [],
      repayAccountInfo: [],
      repeatOrderInfo: {
        overdueDays: 0,
        payFailOrder: 0,
        repeatOrder: 0,
        channel: ""
      }, //用户标签
      isSuccess: 0, //是否绑卡成功 0 未校验  1 校验中 2 校验通过 3 校验不通过
      isHavePayHistory: false, //是否有还款账号
      searchType: [],
      userPhotoColumns1: [
        {
          title: "正面照片",
          key: "idCardFront",
          width: 200,
          className: "demo-table-hover-column",
          render: (h, params) => {
            return h("Img", {
              attrs: {
                src: (params.row && params.row.idCardFront) || noImgSrc
              },
              on: {
                click: () => {
                  this.modal1 = true;
                  this.showIndex = 0;
                  this.last = true;
                  this.initPic();
                }
              }
            });
          }
        },
        {
          title: "手持照片",
          key: "handIdCard",
          width: 200,
          className: "demo-table-hover-column",
          render: (h, params) => {
            return h("Img", {
              attrs: {
                src: (params.row && params.row.handIdCard) || noImgSrc
              },
              on: {
                click: () => {
                  this.modal1 = true;
                  this.showIndex = 1;
                  this.last = true;
                  this.initPic();
                }
              }
            });
          }
        },
        {
          title: "人脸识别照片",
          key: "liveness",
          width: 200,
          className: "demo-table-hover-column",
          render: (h, params) => {
            return h("Img", {
              attrs: {
                src: (params.row && params.row.liveness) || noImgSrc
              },
              on: {
                click: () => {
                  this.modal1 = true;
                  this.showIndex = 2;
                  this.last = true;
                  this.initPic();
                }
              }
            });
          }
        },
        {
          title: "税卡照片",
          key: "taxCard",
          width: 200,
          className: "demo-table-hover-column",
          render: (h, params) => {
            // 分三种情况
            //1、有工资字段，包括图片或者pdf两种情况
            //2、没有工资字段  显示默认图片
            var src = "";
            var isPdf = false;
            if (params.row.taxCard != undefined) {
              if (params.row.taxCard.includes("pdf")) {
                src = pdfSrc;
                isPdf = true;
              } else {
                src = params.row.taxCard;
              }
            } else {
              src = noImgSrc;
            }
            return h("Img", {
              attrs: {
                src: src
              },
              on: {
                click: () => {
                  if (!isPdf) {
                    if (!params.row.taxCard) return;
                    this.modal1 = true;
                    this.showIndex = 3;
                    this.last = true;
                    this.initPic();
                  } else {
                    this.$showPDF(params.row.taxCard);
                  }
                }
              }
            });
          }
        },
        {
          title: "其他照片",
          key: "other",
          width: 200,
          className: "demo-table-hover-column",
          render: (h, params) => {
            // 分三种情况
            //1、有工资字段，包括图片或者pdf两种情况
            //2、没有工资字段  显示默认图片
            var src = "";
            var isPdf = false;
            if (params.row.other != undefined) {
              if (params.row.other.includes("pdf")) {
                src = pdfSrc;
                isPdf = true;
              } else {
                src = params.row.other;
              }
            } else {
              src = noImgSrc;
            }
            return h("Img", {
              attrs: {
                src: src
              },
              on: {
                click: () => {
                  if (!isPdf) {
                    if (!params.row.other) return;
                    this.modal1 = true;
                    this.showIndex = 4;
                    this.last = true;
                    this.initPic();
                  } else {
                    this.$showPDF(params.row.other);
                  }
                }
              }
            });
          }
        },
        {
          title: "身份证反面",
          key: "idCardNegative",
          width: 200,
          className: "demo-table-hover-column",
          render: (h, params) => {
            var src = "";
            var isPdf = false;
            if (params.row.idCardNegative != undefined) {
              if (params.row.idCardNegative.includes("pdf")) {
                src = pdfSrc;
                isPdf = true;
              } else {
                src = params.row.idCardNegative;
              }
            } else {
              src = noImgSrc;
            }
            return h("Img", {
              attrs: {
                src: src
              },
              on: {
                click: () => {
                  if (!isPdf) {
                    if (!params.row.idCardNegative) return;
                    this.modal1 = true;
                    this.showIndex = 5;
                    this.last = true;
                    this.initPic();
                  } else {
                    this.$showPDF(params.row.idCardNegative);
                  }
                }
              }
            });
          }
        },
        {
          title: "户口本",
          key: "accountBook",
          width: 200,
          className: "demo-table-hover-column",
          render: (h, params) => {
            var src = "";
            var isPdf = false;
            if (params.row.accountBook != undefined) {
              if (params.row.accountBook.includes("pdf")) {
                src = pdfSrc;
                isPdf = true;
              } else {
                src = params.row.accountBook;
              }
            } else {
              src = noImgSrc;
            }
            return h("Img", {
              attrs: {
                src: src
              },
              on: {
                click: () => {
                  if (!isPdf) {
                    if (!params.row.accountBook) return;
                    this.modal1 = true;
                    this.showIndex = 6;
                    this.last = true;
                    this.initPic();
                  } else {
                    this.$showPDF(params.row.accountBook);
                  }
                }
              }
            });
          }
        },
        {
          title: "社保卡",
          key: "socialSecurityCard",
          width: 200,
          className: "demo-table-hover-column",
          render: (h, params) => {
            var src = "";
            var isPdf = false;
            if (params.row.socialSecurityCard != undefined) {
              if (params.row.socialSecurityCard.includes("pdf")) {
                src = pdfSrc;
                isPdf = true;
              } else {
                src = params.row.socialSecurityCard;
              }
            } else {
              src = noImgSrc;
            }
            return h("Img", {
              attrs: {
                src: src
              },
              on: {
                click: () => {
                  if (!isPdf) {
                    if (!params.row.socialSecurityCard) return;
                    this.modal1 = true;
                    this.showIndex = 7;
                    this.last = true;
                    this.initPic();
                  } else {
                    this.$showPDF(params.row.socialSecurityCard);
                  }
                }
              }
            });
          }
        },
        {
          title: "工作照",
          key: "workPic",
          width: 200,
          className: "demo-table-hover-column",
          render: (h, params) => {
            var src = "";
            var isPdf = false;
            if (params.row.workPic != undefined) {
              if (params.row.workPic.includes("pdf")) {
                src = pdfSrc;
                isPdf = true;
              } else {
                src = params.row.workPic;
              }
            } else {
              src = noImgSrc;
            }
            return h("Img", {
              attrs: {
                src: src
              },
              on: {
                click: () => {
                  if (!isPdf) {
                    if (!params.row.workPic) return;
                    this.modal1 = true;
                    this.showIndex = 8;
                    this.last = true;
                    this.initPic();
                  } else {
                    this.$showPDF(params.row.workPic);
                  }
                }
              }
            });
          }
        },
        {
          title: "工资单",
          key: "payroll",
          width: 200,
          className: "demo-table-hover-column",
          render: (h, params) => {
            var src = "";
            var isPdf = false;
            if (params.row.payroll != undefined) {
              if (params.row.payroll.includes("pdf")) {
                src = pdfSrc;
                isPdf = true;
              } else {
                src = params.row.payroll;
              }
            } else {
              src = noImgSrc;
            }
            return h("Img", {
              attrs: {
                src: src
              },
              on: {
                click: () => {
                  if (!isPdf) {
                    if (!params.row.payroll) return;
                    this.modal1 = true;
                    this.showIndex = 9;
                    this.last = true;
                    this.initPic();
                  } else {
                    this.$showPDF(params.row.payroll);
                  }
                }
              }
            });
          }
        }
      ],
      userPhotoColumns2: [
        {
          title: "正面照片",
          key: "idCardFront",
          width: 200,
          className: "demo-table-hover-column",
          render: (h, params) => {
            return h("Img", {
              attrs: {
                src: (params.row && params.row.idCardFront) || noImgSrc
              },
              on: {
                click: () => {
                  this.modal1 = true;
                  this.showIndex = 0;
                  this.last = false;
                  this.initPic();
                }
              }
            });
          }
        },
        {
          title: "手持照片",
          key: "handIdCard",
          width: 200,
          className: "demo-table-hover-column",
          render: (h, params) => {
            return h("Img", {
              attrs: {
                src: (params.row && params.row.handIdCard) || noImgSrc
              },
              on: {
                click: () => {
                  this.modal1 = true;
                  this.showIndex = 1;
                  this.last = false;
                  this.initPic();
                }
              }
            });
          }
        },
        {
          title: "人脸识别照片",
          key: "liveness",
          width: 200,
          className: "demo-table-hover-column",
          render: (h, params) => {
            return h("Img", {
              attrs: {
                src: (params.row && params.row.liveness) || noImgSrc
              },
              on: {
                click: () => {
                  this.modal1 = true;
                  this.showIndex = 2;
                  this.last = false;
                  this.initPic();
                }
              }
            });
          }
        },
        {
          title: "税卡照片",
          key: "taxCard",
          width: 200,
          className: "demo-table-hover-column",
          render: (h, params) => {
            // 分三种情况
            //1、有工资字段，包括图片或者pdf两种情况
            //2、没有工资字段  显示默认图片
            var src = "";
            var isPdf = false;
            if (params.row.taxCard != undefined) {
              if (params.row.taxCard.includes("pdf")) {
                src = pdfSrc;
                isPdf = true;
              } else {
                src = params.row.taxCard;
              }
            } else {
              src = noImgSrc;
            }
            return h("Img", {
              attrs: {
                src: src
              },
              on: {
                click: () => {
                  //测试使用（勿删）
                  //this.$showPDF('http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf')
                  if (!isPdf) {
                    if (!params.row.taxCard) return;
                    this.modal1 = true;
                    this.showIndex = 3;
                    this.last = false;
                    this.initPic();
                  } else {
                    this.$showPDF(params.row.taxCard);
                  }
                }
              }
            });
          }
        },
        {
          title: "其他照片",
          key: "other",
          width: 200,
          className: "demo-table-hover-column",
          render: (h, params) => {
            var src = "";
            var isPdf = false;
            if (params.row.other != undefined) {
              if (params.row.other.includes("pdf")) {
                src = pdfSrc;
                isPdf = true;
                this.initPic();
              } else {
                src = params.row.other;
              }
            } else {
              src = noImgSrc;
            }
            return h("Img", {
              attrs: {
                src: src
              },
              on: {
                click: () => {
                  if (!isPdf) {
                    if (!params.row.other) return;
                    this.modal1 = true;
                    this.showIndex = 4;
                    this.last = false;
                    this.initPic();
                  } else {
                    this.$showPDF(params.row.other);
                  }
                }
              }
            });
          }
        },
        {
          title: "身份证反面",
          key: "idCardNegative",
          width: 200,
          className: "demo-table-hover-column",
          render: (h, params) => {
            var src = "";
            var isPdf = false;
            if (params.row.idCardNegative != undefined) {
              if (params.row.idCardNegative.includes("pdf")) {
                src = pdfSrc;
                isPdf = true;
              } else {
                src = params.row.idCardNegative;
              }
            } else {
              src = noImgSrc;
            }
            return h("Img", {
              attrs: {
                src: src
              },
              on: {
                click: () => {
                  if (!isPdf) {
                    if (!params.row.idCardNegative) return;
                    this.modal1 = true;
                    this.showIndex = 5;
                    this.last = false;
                    this.initPic();
                  } else {
                    this.$showPDF(params.row.idCardNegative);
                  }
                }
              }
            });
          }
        },
        {
          title: "户口本",
          key: "accountBook",
          width: 200,
          className: "demo-table-hover-column",
          render: (h, params) => {
            var src = "";
            var isPdf = false;
            if (params.row.accountBook != undefined) {
              if (params.row.accountBook.includes("pdf")) {
                src = pdfSrc;
                isPdf = true;
              } else {
                src = params.row.accountBook;
              }
            } else {
              src = noImgSrc;
            }
            return h("Img", {
              attrs: {
                src: src
              },
              on: {
                click: () => {
                  if (!isPdf) {
                    if (!params.row.accountBook) return;
                    this.modal1 = true;
                    this.showIndex = 6;
                    this.last = false;
                    this.initPic();
                  } else {
                    this.$showPDF(params.row.accountBook);
                  }
                }
              }
            });
          }
        },
        {
          title: "社保卡",
          key: "socialSecurityCard",
          width: 200,
          className: "demo-table-hover-column",
          render: (h, params) => {
            var src = "";
            var isPdf = false;
            if (params.row.socialSecurityCard != undefined) {
              if (params.row.socialSecurityCard.includes("pdf")) {
                src = pdfSrc;
                isPdf = true;
              } else {
                src = params.row.socialSecurityCard;
              }
            } else {
              src = noImgSrc;
            }
            return h("Img", {
              attrs: {
                src: src
              },
              on: {
                click: () => {
                  if (!isPdf) {
                    if (!params.row.socialSecurityCard) return;
                    this.modal1 = true;
                    this.showIndex = 7;
                    this.last = false;
                    this.initPic();
                  } else {
                    this.$showPDF(params.row.socialSecurityCard);
                  }
                }
              }
            });
          }
        },
        {
          title: "工作照",
          key: "workPic",
          width: 200,
          className: "demo-table-hover-column",
          render: (h, params) => {
            var src = "";
            var isPdf = false;
            if (params.row.workPic != undefined) {
              if (params.row.workPic.includes("pdf")) {
                src = pdfSrc;
                isPdf = true;
              } else {
                src = params.row.workPic;
              }
            } else {
              src = noImgSrc;
            }
            return h("Img", {
              attrs: {
                src: src
              },
              on: {
                click: () => {
                  if (!isPdf) {
                    if (!params.row.workPic) return;
                    this.modal1 = true;
                    this.showIndex = 8;
                    this.last = false;
                    this.initPic();
                  } else {
                    this.$showPDF(params.row.workPic);
                  }
                }
              }
            });
          }
        },
        {
          title: "工资单",
          key: "payroll",
          width: 200,
          className: "demo-table-hover-column",
          render: (h, params) => {
            var src = "";
            var isPdf = false;
            if (params.row.payroll != undefined) {
              if (params.row.payroll.includes("pdf")) {
                src = pdfSrc;
                isPdf = true;
              } else {
                src = params.row.payroll;
              }
            } else {
              src = noImgSrc;
            }
            return h("Img", {
              attrs: {
                src: src
              },
              on: {
                click: () => {
                  if (!isPdf) {
                    if (!params.row.payroll) return;
                    this.modal1 = true;
                    this.showIndex = 9;
                    this.last = false;
                    this.initPic();
                  } else {
                    this.$showPDF(params.row.payroll);
                  }
                }
              }
            });
          }
        }
      ],
      userPhotoData1: [],
      userPhotoData2: [],
      //紧急联系人
      EmergencyContactsInfo: [],
      EmergencyContactsColumns: [
        {
          title: "姓名",
          key: "name",
          width: 100,
          render: (h, params) => {
            let _disabled;
            if (this.isCallRecordVisi) {
              _disabled = params.row.ecStatus == 0 ? false : true;
            } else {
              _disabled = true;
            }
            let _styleForBtn1, _styleForBtn2, _styleForBtn3, _styleForBtn4;

            if (params.row.ecStatus == 1) {
              _styleForBtn1 = {
                marginRight: "5px",
                border: "3px solid #d242f6"
              };
              _styleForBtn2 = _styleForBtn3 = {
                marginRight: "5px"
              };
            } else if (params.row.ecStatus == 2) {
              _styleForBtn1 = _styleForBtn2 = _styleForBtn3 = {
                marginRight: "5px"
              };
              _styleForBtn2 = {
                border: "3px solid #d242f6"
              };
            } else if (params.row.ecStatus == 3) {
              _styleForBtn1 = _styleForBtn2 = _styleForBtn3 = {
                marginRight: "5px"
              };
              _styleForBtn3 = {
                border: "3px solid #d242f6"
              };
            } else if (params.row.ecStatus == 4) {
              _styleForBtn1 = _styleForBtn2 = _styleForBtn3 = {
                marginRight: "5px"
              };
              _styleForBtn4 = {
                border: "3px solid #d242f6"
              };
            } else {
              _styleForBtn1 = _styleForBtn2 = _styleForBtn3 = {
                marginRight: "5px"
              };
            }
            return h("div", [
              h("div", params.row.name),
              h(
                "Button",
                {
                  props: {
                    display: "none",
                    type: "primary",
                    size: "large",
                    disabled: _disabled
                  },
                  style: _styleForBtn1,
                  on: {
                    click: () => {
                      //接通
                      this.handleCallRecordForEmerList(params.row.phoneNo, 1);
                    }
                  }
                },
                this.data.userTitle.yes
              )
            ]);
          }
        },
        {
          title: "关系",
          key: "relation",
          width: 140,
          // render: (h, params) => {
          //   return h("div", this.data.relationText[params.row.relation]);
          // }
          render: (h, params) => {
            let _disabled;
            if (this.isCallRecordVisi) {
              _disabled = params.row.ecStatus == 0 ? false : true;
            } else {
              _disabled = true;
            }
            let _styleForBtn1, _styleForBtn2, _styleForBtn3, _styleForBtn4;

            if (params.row.ecStatus == 1) {
              _styleForBtn1 = {
                marginRight: "5px",
                border: "3px solid #d242f6"
              };
              _styleForBtn2 = _styleForBtn3 = {
                marginRight: "5px"
              };
            } else if (params.row.ecStatus == 2) {
              _styleForBtn1 = _styleForBtn2 = _styleForBtn3 = {
                marginRight: "5px"
              };
              _styleForBtn2 = {
                border: "3px solid #d242f6"
              };
            } else if (params.row.ecStatus == 3) {
              _styleForBtn1 = _styleForBtn2 = _styleForBtn3 = {
                marginRight: "5px"
              };
              _styleForBtn3 = {
                border: "3px solid #d242f6"
              };
            } else if (params.row.ecStatus == 4) {
              _styleForBtn1 = _styleForBtn2 = _styleForBtn3 = {
                marginRight: "5px"
              };
              _styleForBtn4 = {
                border: "3px solid #d242f6"
              };
            } else {
              _styleForBtn1 = _styleForBtn2 = _styleForBtn3 = {
                marginRight: "5px"
              };
            }
            return h("div", [
              h("div", this.data.relationText[params.row.relation]),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "large",
                    disabled: _disabled
                  },
                  style: _styleForBtn2,
                  on: {
                    click: () => {
                      //未接通
                      this.handleCallRecordForEmerList(params.row.phoneNo, 2);
                    }
                  }
                },
                this.data.userTitle.no
              )
            ]);
          }
        },
        {
          title: "手机号",
          key: "phoneNo",
          width: 140,
          render: (h, params) => {
            let _disabled;
            if (this.isCallRecordVisi) {
              _disabled = params.row.ecStatus == 0 ? false : true;
            } else {
              _disabled = true;
            }
            let _styleForBtn1, _styleForBtn2, _styleForBtn3, _styleForBtn4;

            if (params.row.ecStatus == 1) {
              _styleForBtn1 = {
                marginRight: "5px",
                border: "3px solid #d242f6"
              };
              _styleForBtn2 = _styleForBtn3 = {
                marginRight: "5px"
              };
            } else if (params.row.ecStatus == 2) {
              _styleForBtn1 = _styleForBtn2 = _styleForBtn3 = {
                marginRight: "5px"
              };
              _styleForBtn2 = {
                border: "3px solid #d242f6"
              };
            } else if (params.row.ecStatus == 3) {
              _styleForBtn1 = _styleForBtn2 = _styleForBtn3 = {
                marginRight: "5px"
              };
              _styleForBtn3 = {
                border: "3px solid #d242f6"
              };
            } else if (params.row.ecStatus == 4) {
              _styleForBtn1 = _styleForBtn2 = _styleForBtn3 = {
                marginRight: "5px"
              };
              _styleForBtn4 = {
                border: "3px solid #d242f6"
              };
            } else {
              _styleForBtn1 = _styleForBtn2 = _styleForBtn3 = {
                marginRight: "5px"
              };
            }
            return h("div", [
              h("div", params.row.phoneNo),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "large",
                    disabled: _disabled
                  },
                  style: _styleForBtn3,
                  on: {
                    click: () => {
                      //空号
                      this.handleCallRecordForEmerList(params.row.phoneNo, 3);
                    }
                  }
                },
                this.data.userTitle.noNumber
              )
            ]);
          }
        },
        {
          title: "是否平台用户",
          key: "platFormUserFlag",
          width: 120,
          render: (h, params) => {
            //0 不是 1 是
            let display = params.row.platFormUserFlag == 0 ? "Tidak" : "Ya";
            let _disabled;
            if (this.isCallRecordVisi) {
              _disabled = params.row.ecStatus == 0 ? false : true;
            } else {
              _disabled = true;
            }
            let _styleForBtn1, _styleForBtn2, _styleForBtn3, _styleForBtn4;

            if (params.row.ecStatus == 1) {
              _styleForBtn1 = {
                marginRight: "5px",
                border: "3px solid #d242f6"
              };
              _styleForBtn2 = _styleForBtn3 = {
                marginRight: "5px"
              };
            } else if (params.row.ecStatus == 2) {
              _styleForBtn1 = _styleForBtn2 = _styleForBtn3 = {
                marginRight: "5px"
              };
              _styleForBtn2 = {
                border: "3px solid #d242f6"
              };
            } else if (params.row.ecStatus == 3) {
              _styleForBtn1 = _styleForBtn2 = _styleForBtn3 = {
                marginRight: "5px"
              };
              _styleForBtn3 = {
                border: "3px solid #d242f6"
              };
            } else if (params.row.ecStatus == 4) {
              _styleForBtn1 = _styleForBtn2 = _styleForBtn3 = {
                marginRight: "5px"
              };
              _styleForBtn4 = {
                border: "3px solid #d242f6"
              };
            } else {
              _styleForBtn1 = _styleForBtn2 = _styleForBtn3 = {
                marginRight: "5px"
              };
            }
            return h("div", [
              h("div", display),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "large",
                    disabled: _disabled
                  },
                  style: _styleForBtn4,
                  on: {
                    click: () => {
                      //本人接听
                      this.handleCallRecordForEmerList(params.row.phoneNo, 4);
                    }
                  }
                },
                this.data.userTitle.selfAnswer
              )
            ]);
          }
        },
        // {
        //   title: "",
        //   key: "",
        //   width: 50,
        //   render: (h, params) => {
        //     let _disabled;
        //     if (this.isCallRecordVisi) {
        //       _disabled = params.row.ecStatus == 0 ? false : true;
        //     } else {
        //       _disabled = true;
        //     }
        //     let _styleForBtn1, _styleForBtn2, _styleForBtn3, _styleForBtn4;
        //     if (params.row.ecStatus == 1) {
        //       _styleForBtn1 = {
        //         marginRight: "5px",
        //         border: "3px solid #d242f6"
        //       };
        //       _styleForBtn2 = _styleForBtn3 = {
        //         marginRight: "5px"
        //       };
        //     } else if (params.row.ecStatus == 2) {
        //       _styleForBtn1 = _styleForBtn2 = _styleForBtn3 = {
        //         marginRight: "5px"
        //       };
        //       _styleForBtn2 = {
        //         border: "3px solid #d242f6"
        //       };
        //     } else if (params.row.ecStatus == 3) {
        //       _styleForBtn1 = _styleForBtn2 = _styleForBtn3 = {
        //         marginRight: "5px"
        //       };
        //       _styleForBtn3 = {
        //         border: "3px solid #d242f6"
        //       };
        //     } else if (params.row.ecStatus == 4) {
        //       _styleForBtn1 = _styleForBtn2 = _styleForBtn3 = {
        //         marginRight: "5px"
        //       };
        //       _styleForBtn4 = {
        //         border: "3px solid #d242f6"
        //       };
        //     } else {
        //       _styleForBtn1 = _styleForBtn2 = _styleForBtn3 = {
        //         marginRight: "5px"
        //       };
        //     }
        //     return h("div", [
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             display: "none",
        //             type: "primary",
        //             size: "large",
        //             disabled: _disabled
        //           },
        //           style: _styleForBtn1,
        //           on: {
        //             click: () => {
        //               //接通
        //               this.handleCallRecordForEmerList(params.row.phoneNo, 1);
        //             }
        //           }
        //         },
        //         this.data.userTitle.yes
        //       ),
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "error",
        //             size: "large",
        //             disabled: _disabled
        //           },
        //           style: _styleForBtn2,
        //           on: {
        //             click: () => {
        //               //未接通
        //               this.handleCallRecordForEmerList(params.row.phoneNo, 2);
        //             }
        //           }
        //         },
        //         this.data.userTitle.no
        //       ),
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "error",
        //             size: "large",
        //             disabled: _disabled
        //           },
        //           style: _styleForBtn3,
        //           on: {
        //             click: () => {
        //               //空号
        //               this.handleCallRecordForEmerList(params.row.phoneNo, 3);
        //             }
        //           }
        //         },
        //         this.data.userTitle.noNumber
        //       ),
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "error",
        //             size: "large",
        //             disabled: _disabled
        //           },
        //           style: _styleForBtn4,
        //           on: {
        //             click: () => {
        //               //本人接听
        //               this.handleCallRecordForEmerList(params.row.phoneNo, 4);
        //             }
        //           }
        //         },
        //         this.data.userTitle.selfAnswer
        //       )
        //     ]);
        //   }
        // },
        {
          title: "平台用户",
          width: 100,
          key: "action",
          render: (h, params) => {
            let showStyle =
              params.row.platFormUserFlag == 1 &&
              params.row.hasOwnProperty("lastOrderInfo")
                ? "block"
                : "none";
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    size: "small",
                    type: "primary"
                  },
                  style: {
                    display: showStyle
                  },
                  on: {
                    click: () => {
                      if (
                        !params.row.lastOrderInfo.hasOwnProperty("lastSourceId")
                      ) {
                        this.$Notice.warning({
                          title: this.data.userTitle.noCaseTip
                        });
                        return;
                      }
                      localStorage.set("currentOrderInfo", null);
                      localStorage.set("currentPath", "orderDetail");

                      let param = {
                        productType: "",
                        sourceType: params.row.lastOrderInfo.lastSourceType,
                        sourceId: params.row.lastOrderInfo.lastSourceId,
                        ticketId: 0,
                        type: 0,
                        count: 0,
                        auditorName: 0,
                        isCheck: false
                      };
                      param = window.btoa(
                        window.encodeURIComponent(JSON.stringify(param))
                      ); //加密

                      let sourceId = window.btoa(
                        window.encodeURIComponent(
                          params.row.lastOrderInfo.lastSourceId
                        )
                      ); //加密
                      let target = this.$refs.targetlink;
                      target.setAttribute(
                        "href",
                        window.location.origin +
                          `/home/taskPanel/orderDetail/${sourceId}?param=${param}`
                      );
                      target.click();
                    }
                  }
                },
                this.data.userTitle.opera
              )
            ]);
          }
        }
      ],
      //审核信息
      auditColumns: [
        {
          title: "审核时间",
          key: "auditTime",
          width: 180,
          render: (h, params) => {
            return h(
              "div",
              moment(params.row.auditTime).format("YYYY-MM-DD HH:mm:ss")
            );
          }
        },
        {
          title: "阶段",
          key: "level",
          render: (h, params) => {
            return h("span", this.data.auditLevelText[params.row.level]);
          }
        },
        {
          title: "审核结果",
          key: "action",
          render: (h, params) => {
            return h("span", this.data.auditActionText[params.row.action]);
          }
        },
        {
          title: "审核人员姓名",
          key: "auditor"
        },
        {
          title: "审核意见",
          key: "remark"
        }
      ],
      auditInformation: [],

      //颜色、样式
      redStyle: {
        //红色
        color: "#ff4b58",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#ff4b58",
        padding: "1px"
      },
      greenStyle: {
        //绿色
        color: "#2ed272",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#2ed272",
        padding: "1px"
      },
      warningStyle: {
        //黄色
        color: "#ecc23d",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#ecc23d",
        padding: "1px",
        borderRadius: "5px"
      },
      infoStyle: {
        //蓝色
        color: "#2d8cf0",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#2d8cf0",
        padding: "1px"
      },
      colorText: {
        0: "info",
        1: "warning",
        2: "success",
        3: "error"
      },
      //订单列表中传递过来的选中的业务类型
      productType: "",
      //工单单id
      ticketId: "", //用于提交试用
      //订单id
      sourceType: "", //1:vcc 2:员工贷
      sourceId: "", //根据source_type定义类型;若1，则为vcc_id;若2，则为order_id
      //当前订单所属用户
      currentAuditor: "",
      //当前用户领取的工单总数
      totalCount: 1,
      userId: "",
      //薪水对应的文案
      salaryText: {
        0: "0-2Juta", //0-2Juta
        1: "2-4 Juta", //2-4 Juta
        2: "4-6 Juta", //4-6 Juta
        3: "6-8 Juta", //6-8 Juta
        4: "8-10 Juta", //8-10 Juta
        5: ">10 Juta" //>10 Juta
      },
      user: {}, //角色初审
      type: 1, //默认是初审工单
      isCheck: false, //true代表从任务面板进来的，false代表从列表中进来
      moneyData: "",
      isUsed: false, //身份证默认都是没有被使用过的
      otherAddressArr: [], //Lazada其他地址信息数组
      packageListArr: [
        {
          packages: [
            {
              key: "key1",
              title: "包裹状态"
            },
            {
              key: "key2",
              title: "配送状态"
            },
            {
              key: "key3",
              title: "卖家"
            }
          ],
          packageData: [],
          goods: [
            {
              key: "key1",
              title: "商品数量"
            },
            {
              key: "key2",
              title: "价格"
            },
            {
              key: "key3",
              title: "数量"
            }
          ],
          goodsData: []
        }
      ], //Lazada其他包裹信息数组
      orders: [], //所以订单
      wishLists: [], //所以收藏
      wishListArr: [
        {
          wish: [
            {
              key: "name",
              title: "心愿单名称"
            },
            {
              key: "total_item",
              title: "数量"
            }
          ],
          wishData: [
            {
              name: "key1",
              total_item: "key2"
            }
          ],
          goods: [
            {
              key: "name",
              title: "商品数量"
            },
            {
              key: "availability",
              title: "库存"
            },
            {
              key: "price",
              title: "价格"
            }
          ],
          goodsData: [
            {
              name: "key1",
              availability: "key2",
              price: "key3"
            },
            {
              name: "key1",
              availability: "key2",
              price: "key3"
            },
            {
              name: "key1",
              availability: "key2",
              price: "key3"
            }
          ]
        }
      ], //Lazad收藏信息数组
      //授权项的数目
      label1: h => {
        return h("div", [
          h("span", "Bank"),
          h("Badge", {
            props: {
              count: this.bankInfo.count || 0
            }
          })
        ]);
      },
      label2: h => {
        return h("div", [
          h("span", "E-commerce"),
          h("Badge", {
            props: {
              count: this.eCommerceInfo.count || 0
            }
          })
        ]);
      },
      label3: h => {
        return h("div", [
          h("span", "Rides"),
          h("Badge", {
            props: {
              count: this.ridesInfo.count || 0
            }
          })
        ]);
      },
      label4: h => {
        return h("div", [
          h("span", "SNS"),
          h("Badge", {
            props: {
              count: this.snsInfo.count || 0
            }
          })
        ]);
      },
      label5: h => {
        return h("div", [
          h("span", this.data.detailCardData[4].label),
          h("Badge", {
            props: {
              count: this.authorizedCount || 0
            }
          })
        ]);
      },
      bankInfo: {},
      eCommerceInfo: {},
      ridesInfo: {},
      snsInfo: {},
      authorizedCount: 0,
      //聚信利 Lazada
      lazada: {},
      lazadaOutInfo: [],
      lazadaCardObjArr: [],
      lazadaCardArr: [],
      //toko
      tokoOutInfo: [],
      tokoCardObjArr: [],
      tokoCardArr: [],
      //gojek
      gojekOutInfo: [],
      gojekCardObjArr: [],
      gojekCardArr: [],
      //姓名和身份证
      userName: "",
      idCardNo: "",
      roateDeg: 0,
      faceIdentificationData: {
        similarity: 0,
        comparisonCount: 0,
        advise: 1
      }
    };
  },
  components: {
    pinjaTable,
    pinjaTwoTable,
    expandRow,
    tableForSingleCol
  },
  methods: {
    //编辑用户信息
    handleEdit(param) {
      this.editUserInfoValue = param;
      this.showModalEditUserInfo = true;
    },
    handleModalEditUserInfo() {
      switch (this.editUserInfoValue.key) {
        case "name": {
          orderDetailApi
            .updateUserInfo({
              sourceId: this.sourceId,
              sourceType: this.sourceType,
              key: "name",
              value1: this.editUserInfoData.firstName,
              value2: this.editUserInfoData.lastName
            })
            .then(res => {
              this.showModalEditUserInfo = false;
              this.editUserInfoData.firstName = "";
              this.editUserInfoData.lastName = "";
              this.editUserInfoData.value = "";
              this.$Notice.success({ title: "Successed!" });
              this.getDetailInfo();
            });
          break;
        }
        case "idCardNo": {
          orderDetailApi
            .updateUserInfo({
              sourceId: this.sourceId,
              sourceType: this.sourceType,
              key: "idNo",
              value1: this.editUserInfoData.value,
              value2: ""
            })
            .then(res => {
              this.showModalEditUserInfo = false;
              this.editUserInfoData.firstName = "";
              this.editUserInfoData.lastName = "";
              this.editUserInfoData.value = "";
              this.$Notice.success({ title: "Successed!" });
              this.getDetailInfo();
            });
          break;
        }
        case "email": {
          orderDetailApi
            .updateUserInfo({
              sourceId: this.sourceId,
              sourceType: this.sourceType,
              key: "email",
              value1: this.editUserInfoData.value,
              value2: ""
            })
            .then(res => {
              this.showModalEditUserInfo = false;
              this.editUserInfoData.firstName = "";
              this.editUserInfoData.lastName = "";
              this.editUserInfoData.value = "";
              this.$Notice.success({ title: "Successed!" });
              this.getDetailInfo();
            });
          break;
        }
      }
    },
    //历史借款信息
    handleHistoryLoanSortChange(column) {
      this.formHistoryLoan.sortBy = column.key || "ctime";
      if (column.order === "normal") column.order = "DESC";
      this.formHistoryLoan.sort =
        (column.order && column.order.toUpperCase()) || "DESC";

      this.searchHistoryLoan(1);
    },
    searchHistoryLoan(pageNo) {
      this.formHistoryLoan.pageNum = pageNo;

      let param = JSON.parse(JSON.stringify(this.formHistoryLoan));
      if (this.isCheck) {
        //任务面板来的
        param.sourceType = "";
        param.sourceId = "";
        param.ticketId = this.ticketId;
      } else {
        param.sourceType = this.productType;
        param.sourceId = this.sourceId;
        param.ticketId = "";
      }

      orderDetailApi.getHistoryLoanList(param).then(res => {
        this.historyLoanDataSource = res.historyOrderListDataResponse;
        this.totalItemsHistoryLoan = Number(res.pageDTO.totalNum);
      });
    },
    changeSizeHistoryLoan(size) {
      this.formHistoryLoan.pageSize = size;
      this.searchHistoryLoan(1);
    },
    changePageHistoryLoan(pageNo) {
      this.formHistoryLoan.pageNum = pageNo;
      this.searchHistoryLoan(pageNo);
    },
    handleChangeScoreInfoBtn() {
      //每一项都有选择才可以下一步
      let _allSelected = true;
      setTimeout(() => {
        for (let element in this.formScore) {
          if (this.formScore[element] == 0) {
            _allSelected = false;
          }
        }
        if (_allSelected) {
          this.isCliScoreBtn = true;
        }
      }, 100);
    },

    // 精度矫正
    multiply(arg1, arg2) {
      var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
      try {
        m += s1.split(".")[1].length;
      } catch (e) {}
      try {
        m += s2.split(".")[1].length;
      } catch (e) {}
      return (
        (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
        Math.pow(10, m)
      );
    },
    goTop() {
      //回到顶部
      target.scrollIntoView();
    },
    //返回订单列表
    goBack() {
      localStorage.set("currentPath", "orderList");
      this.$router.push({ path: "/home/orderList", query: { isSearch: true } });
      this.$store.commit("CHANGE_FORTH_BREAD", "");
    },
    //切换一级tab
    clickTab(name) {
      this.value = name;
      //第一次切换调接口，再次切换不调接口
      switch (name) {
        case "name1": //订单信息
          {
            this.getScoreData(); //获得评分得分得分数据
            this.getDetailInfo(); //获取详细信息
            this.getTDData();
            this.findAuditTicketRecords();
            this.getFaceIdentification();
            this.searchHistoryLoan(1);
          }
          break;
        case "name2": //同盾信息
          {
            //this.getScoreData()//获得评分得分得分数据
            //this.getTDData()
            //this.findAuditTicketRecords()
          }
          break;
      }
      //回到顶部
      target.scrollIntoView();
    },
    //获取信审记录
    findAuditTicketRecords() {
      orderDetailApi
        .findAuditTicketRecords({
          sourceId: this.sourceId,
          sourceType: this.sourceType
        })
        .then(res => {
          this.auditInformation = res;
        });
    },
    //tab页1中的拒绝事件
    handleRejectApply() {
      this.showModalReject = true;
    },
    //更改拒绝状态
    changeRejectType() {
      if (
        this.formModalReject.rejectType &&
        this.formModalReject.rejectType != ""
      ) {
        this.formModalReject.rejectReasonDetail = "";
        this.getRejectReasonListByType();
      }
    },
    handleModalReject() {
      if (this.formModalReject.rejectReasonRemark.trim() == "") {
        this.$Notice.error({
          desc: this.data.rejectModal.errorTip
        });
        return;
      }
      this.auditTicketRemark = this.formModalReject.rejectReasonRemark;
      this.handleAuditTicket(2);
    },
    //基本信息得分提交
    handleCommitScore() {
      let result =
        Number(this.formScore.age) +
        Number(this.formScore.isJab) +
        Number(this.formScore.item2) +
        Number(this.formScore.item3) +
        Number(this.formScore.item4) +
        //Number(this.formScore.item5) +
        Number(this.formScore.item6) +
        Number(this.formScore.item7) +
        Number(this.formScore.item8) +
        Number(this.formScore.item9) +
        Number(this.formScore.item10) +
        Number(this.formScore.lengthOfService) +
        Number(this.formScore.appCount) +
        Number(this.formScore.moneyAcount) +
        Number(this.formScore.overDueDays) +
        Number(this.formScore.item11) +
        Number(this.formScore.item12) +
        Number(this.formScore.item13) +
        Number(this.formScore.item14) +
        Number(this.formScore.item15) +
        Number(this.formScore.item16) +
        Number(this.formScore.item17);

      let param = {};
      param.sourceType = this.sourceType;
      param.sourceId = this.sourceId;
      param.score = result;
      param.jsonData = JSON.stringify(this.formScore);

      orderDetailApi
        .addAuditScore({ content: JSON.stringify(param) })
        .then(res => {
          //this.$Notice.success({ title: "Successed!" });

          //如果是初审，需要控制步骤
          if (
            (this.user.role == 4 ||
              this.user.role == 6 ||
              this.user.role == 10 ||
              this.user.role == 13) &&
            this.isCheck
          ) {
            this.isTabOneDisabled = true;
            this.isTabTwoDisabled = false;
            setTimeout(() => {
              this.auditTicketRemark = "";
              this.formModalReject.rejectType = "";
              this.formModalReject.rejectReasonDetail = "";

              this.tabSelectedName = "name2";
              this.getScoreData();
              target.scrollIntoView();
            }, 300);
          }
        });
    },
    //获取得分数据
    getScoreData() {
      orderDetailApi
        .getAuditScoreBySourceTypeAndSourceId({
          sourceType: this.sourceType,
          sourceId: this.sourceId
        })
        .then(res => {
          if (res.hasOwnProperty("jsonData")) {
            this.formScore = JSON.parse(res.jsonData);
            this.scoreData.score = res.score;
            this.scoreData.decisionResult = res.decisionResult;

            if (
              (this.user.role == 4 ||
                this.user.role == 6 ||
                this.user.role == 10 ||
                this.user.role == 13) &&
              this.isCheck
            ) {
              //当角色为初审时候，第一页不可用，只有第二页可用
              if (this.scoreData.score != 0) {
                //如果是初审，需要控制步骤
                this.isTabOneDisabled = true;
                this.isTabTwoDisabled = false;
                setTimeout(() => {
                  this.tabSelectedName = "name2";
                }, 300);
              }
            }
          }
        });
    },
    //获取同盾数据
    getTDData() {
      orderDetailApi
        .getTDData({ sourceType: this.sourceType, sourceId: this.sourceId })
        .then(res => {
          this.dataReportTD.final_score = res.final_score;
          this.dataReportTD.final_decision = res.final_decision;
          this.detailListReportTD = res.risk_items;
        });
    },
    //提交审核
    handleAuditTicket(status) {
      let param = {};
      param.status = status;
      param.auditTicketId = this.ticketId;
      param.remark = this.auditTicketRemark;
      param.refuseReasonId = this.formModalReject.rejectReasonDetail;

      if (status == 2 && (param.remark == "" || param.refuseReasonId == "")) {
        //如果为拒绝状态，拒绝类型、拒绝原因、备注必填
        this.$Notice.warning({
          desc:
            "Jika ditolak,jenis penolakan,alasan penolakan,dan komentar diperlukan"
        });
        return;
      }

      if (
        this.user.role == 4 ||
        this.user.role == 6 ||
        this.user.role == 10 ||
        this.user.role == 13
      ) {
        //初审
        orderDetailApi
          .auditPreOrders({ content: JSON.stringify(param) })
          .then(res => {
            this.$Notice.success({ title: "Successed!" });
            setTimeout(() => {
              this.$router.push("/home/taskPanel");
              //location.reload()
            }, 500);
          });
      } else if (
        this.user.role == 5 ||
        this.user.role == 7 ||
        this.user.role == 11 ||
        this.user.role == 14
      ) {
        //终审
        orderDetailApi
          .auditFinalOrders({ content: JSON.stringify(param) })
          .then(res => {
            this.$Notice.success({ title: "Successed!" });
            setTimeout(() => {
              this.$router.push("/home/taskPanel");
              //location.reload()
            }, 500);
          });
      }
    },
    //翻译商品列
    translateProduct(parentIndex, childIndex) {
      let tableData = this.eCommerceInfo.data[parentIndex].cardArr[childIndex];
      if (tableData.coloumn[tableData.coloumn.length - 1].key !== "contentCh") {
        tableData.coloumn.push({
          key: "contentCh",
          title: "translate content",
          width: 190
        });
        let transformData = "";
        let transformArr = [];
        if (!tableData.data) {
          return;
        }
        tableData.data.forEach((item, i) => {
          item.contentCh = "";
          let product =
            item[tableData.coloumn[tableData.coloumn.length - 2].title];
          if (typeof product !== "String") product = JSON.stringify(product);
          if (i !== tableData.data.length - 1)
            transformData += `${product}[^^]`;
          else transformData += product;
        });
        let param = {
          text: transformData,
          from: "in",
          to: "cn"
        };
        orderDetailApi.transition(param).then(res => {
          let result = "";
          if (res && res.data.length > 0) {
            for (let key of res.data) {
              result += key;
            }
          }
          transformArr = result.split("[^^]");
          tableData.data.forEach((item, i) => {
            item.contentCh = transformArr[i];
          });
          this.eCommerceInfo.data[parentIndex].cardArr[
            childIndex
          ].data = tableData.data.slice(0);
        });
      } else {
        this.eCommerceInfo.data[parentIndex].cardArr[childIndex].coloumn.pop();
      }
    },
    //table隔行换色
    rowClassName(row, index) {
      if (index % 2 == 1) {
        return "demo-table-info-row";
      }
      return "";
    },
    //切换语言
    changeLanguage() {
      this.$i18n.locale = this.language;
      let tabsArr = this.$i18n.messages[this.$i18n.locale].message.orderDetail;
      //tabs
      this.$nextTick(() => {
        this.data = tabsArr;
        //user_info\banckend
        this.userPhotoColumns1.forEach((item, index) => {
          item.title = this.data.userPhotoTitle[index];
        });
        this.userPhotoColumns2.forEach((item, index) => {
          item.title = this.data.userPhotoTitle[index];
        });

        //紧急联系人列表表头
        this.EmergencyContactsColumns.forEach((item, index) => {
          item.title = this.data.userEmergencyContactsTitle[index];
        });

        //审核信息
        this.auditColumns.forEach((item, index) => {
          item.title = this.data.auditInfoTitle[index];
        });

        //历史借贷
        this.columnsHistoryLoan.forEach((item, index) => {
          item.title = this.data.historyLoanColumnTitle[index];
        });
        this.auditTicketRemark = "";
        this.formModalReject.rejectType = "";
        this.formModalReject.rejectReasonDetail = "";

        this.tabSelectedName = "name1";
        this.clickTab(this.tabSelectedName);
      });

      this.getRejectType();

      //rejectReason
      this.data.rejectReason = []; //拒绝原因列表
      this.data.actionText = []; //操作列表
      this.data.auditForm = {}; //操作提交表单
      setTimeout(() => {
        this.data.rejectReason = tabsArr.rejectReason;
        this.data.auditForm = tabsArr.auditForm;
        this.data.actionText = tabsArr.actionText;
      }, 100);
    },
    //copyFn
    copyFn(param) {
      return JSON.parse(JSON.stringify(param));
    },

    //秒转化成 时分秒
    secondToDate(time) {
      let h, m, s, result;
      h = Math.floor(time / 3600);
      m = Math.floor((time / 60) % 60);
      s = Math.floor(time % 60);
      if (time < 60) {
        result = `${s} ${this.data.userTitle.s}`;
      } else if (time >= 60 && time < 3600) {
        result = `${m + this.data.userTitle.m} ${s} ${this.data.userTitle.s}`;
      } else {
        result = `${h} ${this.data.userTitle.h} ${m +
          this.data.userTitle.m} ${s} ${this.data.userTitle.s}`;
      }
      return result;
    },

    //记录通话是否打通(紧急联系人)
    handleCallRecordForEmer(contentNum, callStatus) {
      let param = {};
      param.sourceId = this.sourceId;
      param.phoneType = 1;
      if (contentNum == 1) {
        //联系人1
        param.phoneNo = this.data.contactText[4].value;
      } else {
        //联系人2
        param.phoneNo = this.data.contactText[5].value;
      }
      param.ecStatus = callStatus;

      orderDetailApi
        .addCallRecord({ content: JSON.stringify(param) })
        .then(res => {
          this.$Notice.success({ title: "Successed!" });
          this.userDetailFn();
        });
    },
    handleCallRecordForEmerList(phoneNo, callStatus) {
      let param = {};
      param.sourceType = this.sourceType;
      param.sourceId = this.sourceId;
      param.phoneNo = phoneNo;
      param.ecStatus = callStatus;

      orderDetailApi
        .addCallRecord({ content: JSON.stringify(param) })
        .then(res => {
          this.getDetailInfo();
          this.$Notice.success({ title: "Successed!" });
        });
    },

    //翻译短信服务
    translateFn(UserNativeMessageInfo) {
      if (
        this.UserMessageColumns[this.UserMessageColumns.length - 1].key !==
        "contentCh"
      ) {
        this.UserNativeMessageInfo = [];
        this.UserMessageColumns.push({
          title: "短信翻译",
          key: "contentCh",
          width: 200
        });
        if (UserNativeMessageInfo.length > 0) {
          this.UserMessageColumns.forEach((item, i) => {
            item.title = this.data.userMessageTitle[i];
          });
          let transformData = "";
          let transformArr = [];
          UserNativeMessageInfo.forEach((item, i) => {
            item.contentCh = "";
            if (i !== UserNativeMessageInfo.length - 1)
              transformData += `${item.content}[^]`;
            else transformData += item.content;
          });
          let param = {
            text: transformData,
            from: "in",
            to: "cn"
          };
          orderDetailApi.transition(param).then(res => {
            let result = "";
            if (res && res.data.length > 0) {
              for (let key of res.data) {
                result += key;
              }
            }
            transformArr = result.split("[^]");
            UserNativeMessageInfo.forEach((item, i) => {
              item.contentCh = transformArr[i];
            });
            this.UserNativeMessageInfo = UserNativeMessageInfo;
          });
        }
      } else {
        return;
      }
    },

    //获取详细信息
    getDetailInfo() {
      orderDetailApi
        .getDetailInfo({
          sourceType: this.sourceType,
          sourceId: this.sourceId,
          userId: this.userId
        })
        .then(res => {
          //订单信息
          this.data.userOrderInfo.forEach(item => {
            //借款状态国际化
            if (item.key == "orderStatus") {
              //贷款状态
              item.value = this.data.loanTypeText[res[item.key]];
            } else if (item.key == "item") {
              //借款天数
              //item.value = `${res[item.key]}${this.data.loanDay}`;
              item.value = res[item.key];
            } else if (item.key == "rate") {
              //利率
              if (res.hasOwnProperty("rate")) {
                item.value = `${this.data.rate} ${this.multiply(
                  res[item.key],
                  100
                )}%`;
              }
            } else if (item.key == "calculatingInterestMethod") {
              //计息方式
              //item.value = this.data.rateTypeText[res[item.key]]
              item.value = "";
            } else if (item.key == "applyTime") {
              //申请时间
              item.value = moment(res[item.key]).format("YYYY-MM-DD HH:mm:ss");
            } else {
              item.value = res[item.key];
            }
          });

          //订单信息
          this.data.userOrderInfoVCC.forEach(item => {
            //借款状态国际化
            if (item.key == "orderStatus") {
              //贷款状态
              item.value = this.data.loanTypeText[res[item.key]];
            } else if (item.key == "applyTime") {
              //申请时间
              item.value = moment(res[item.key]).format("YYYY-MM-DD HH:mm:ss");
            } else {
              item.value = res[item.key];
            }
          });

          //银行信息
          this.data.userBankInfo.forEach(item => {
            item.value = res[item.key];
          });

          //用户基本信息
          this.data.userBaseInfo.forEach(item => {
            if (item.key == "gender") {
              //性别
              item.value = this.data.genderText[res[item.key]];

              if (res[item.key] == 1) {
                //男
                this.formScore.item6 = "66";
              } else if (res[item.key] == 0) {
                this.formScore.item6 = "33";
              }
            } else if (item.key == "occupation") {
              //职业
              item.value = this.data.occupationText[res[item.key]];
            } else if (item.key == "income") {
              //薪水
              item.value = this.salaryText[res[item.key]];
            } else if (item.key == "education") {
              //学历
              item.value = this.data.educationText[res[item.key]];
            } else if (item.key == "purpose") {
              //借款目的
              item.value = this.data.purposeText[res[item.key]];
            } else if (item.key == "birthday") {
              //出生日期
              item.value = moment(res[item.key]).format("YYYY-MM-DD HH:mm:ss");
            } else if (item.key == "maritalStatus") {
              //婚姻状况
              item.value = this.data.maritalStatus[res[item.key]];
            } else if (item.key == "income") {
              //月薪
              item.value = this.data.incomeList[res[item.key]];
            } else if (item.key == "age") {
              //年龄
              item.value = res[item.key] || "";
              let _age = Number(res[item.key]);
              if (_age >= 41 && _age <= 55) {
                this.formScore.age = "44";
              } else if (_age >= 36 && _age <= 40) {
                this.formScore.age = "59";
              } else if (_age >= 26 && _age <= 35) {
                this.formScore.age = "95";
              } else if (_age >= 18 && _age <= 25) {
                this.formScore.age = "77";
              }
            } else {
              item.value = res[item.key] || "";
            }
          });

          this.userName = res.name;
          this.idCardNo = res.idCardNo;

          //用户工作信息
          this.data.userWorkInfo.forEach(item => {
            if (item.key == "gender") {
              //性别
              item.value = this.data.genderText[res[item.key]];
            } else if (item.key == "occupation") {
              //职业
              item.value = this.data.occupationText[res[item.key]];
            } else if (item.key == "salary") {
              //薪水
              item.value = this.salaryText[res[item.key]];
            } else if (item.key == "education") {
              //学历
              item.value = this.data.educationText[res[item.key]];
            } else if (item.key == "purpose") {
              //借款目的
              item.value = this.data.purposeText[res[item.key]];
            } else if (item.key == "birthday") {
              //出生日期
              item.value = moment(res[item.key]).format("YYYY-MM-DD HH:mm:ss");
            } else if (item.key == "maritalStatus") {
              //婚姻状况
              item.value = this.data.maritalStatus[res[item.key]];
            } else if (item.key == "income") {
              //月薪
              item.value = this.data.incomeList[res[item.key]];
            } else if (item.key == "workTime") {
              //工作年限
              item.value = res[item.key] || "";
              if (res[item.key] >= 0 && res[item.key] < 3) {
                this.formScore.lengthOfService = "23";
              } else if (res[item.key] >= 3 && res[item.key] < 6) {
                this.formScore.lengthOfService = "55";
              } else if (res[item.key] >= 6 && res[item.key] < 12) {
                this.formScore.lengthOfService = "74";
              } else if (res[item.key] >= 12 && res[item.key] < 24) {
                this.formScore.lengthOfService = "89";
              } else if (res[item.key] >= 24) {
                this.formScore.lengthOfService = "98";
              }
            } else {
              item.value = res[item.key] || "";
            }
          });

          //联系人信息
          this.EmergencyContactsInfo = res.contacts;
          //判断是否所有紧急联系人都已经拨打
          if (
            this.EmergencyContactsInfo.length > 0 &&
            this.EmergencyContactsInfo.findIndex(item => {
              return item.ecStatus == 0;
            }) < 0
          ) {
            //是否全部拨打了紧急联系，全部拨打后为true
            this.isCliAllECBtn = true;
          } else {
            this.isCliAllECBtn = false;
          }

          //用户标签
          this.repeatOrderInfo = res.userTag;

          //照片信息
          this.userPhotoData1 =
            JSON.stringify(res.oldImages) === "{}" ? [] : [res.oldImages];
          this.userPhotoData2 =
            JSON.stringify(res.newImages) === "{}" ? [] : [res.newImages];
          if (res.newImages.hasOwnProperty("workPic")) {
            this.formScore.item3 = "68";
          } else {
            this.formScore.item3 = "25";
          }
        });
    },
    //控制图片放大
    handleFangDa() {
      let _width = this.$refs["bigimg"].offsetWidth;
      let _height = this.$refs["bigimg"].offsetHeight;
      let _changedWidth = _width + 100 + "px";
      let _changedHeight = _height + 100 + "px";
      this.$refs["bigimg"].style.width = _changedWidth;
      this.$refs["bigimg"].style.height = _changedHeight;
    },
    //控制图片缩小
    handleSuoXiao() {
      let _width = this.$refs["bigimg"].offsetWidth;
      let _height = this.$refs["bigimg"].offsetHeight;
      if (_width > 900) {
        let _changedWidth = _width - 100 + "px";
        let _changedHeight = _height - 100 + "px";
        this.$refs["bigimg"].style.width = _changedWidth;
        this.$refs["bigimg"].style.height = _changedHeight;
      }
    },
    //控制图片旋转
    handleXuanzhuan() {
      this.roateDeg += 90;
      this.$refs["bigimg"].style.transform = "rotate(" + this.roateDeg + "deg)";
    },
    initPic() {
      this.$refs["bigimg"].style.width = "900px";
      this.$refs["bigimg"].style.height = "900px";

      if (this.roateDeg != 0) {
        this.$refs["bigimg"].style.transform = "rotate(" + 0 + "deg)";
      }
      this.roateDeg = 0;
    },
    //提交审核
    submit() {
      this.modal2 = true;
    },
    confirm1() {
      this.modal1 = false;
    },
    cancel() {
      this.modal2 = false;
      this.loading = false;
    },
    getBalance() {
      orderDetailApi.getBalance({ account_type: "CASH" }).then(res => {
        // console.log(res);
        this.balance = res.balance;
      });
    },
    //获取人脸对比信息
    getFaceIdentification() {
      orderDetailApi
        .faceMatching({ sourceType: this.sourceType, sourceId: this.sourceId })
        .then(res => {
          this.faceIdentificationData = res;
          if (parseFloat(this.faceIdentificationData.similarity) >= 55) {
            this.formScore.item8 = "-1";
          } else {
            this.formScore.item8 = "-800";
          }
        });
    },
    //***********************获取拒绝类型***************************/
    getRejectType() {
      orderDetailApi.getRejectType().then(res => {
        this.rejectTypeList = res;
        switch (this.language) {
          case "cn": {
            this.rejectTypeList.forEach(item => {
              item.displayUI = item.refuseTypeCn;
            });
            break;
          }
          case "vi": {
            this.rejectTypeList.forEach(item => {
              item.displayUI = item.refuseTypeIn;
            });
            break;
          }
        }
      });
    },
    getRejectReasonListByType() {
      orderDetailApi
        .getRejectReasonDetail({
          refuseTypeCode: this.formModalReject.rejectType
        })
        .then(res => {
          this.rejectReasonDetailList = res;
          switch (this.language) {
            case "cn": {
              this.rejectReasonDetailList.forEach(item => {
                item.displayUI = item.refuseReasonCn;
              });
              break;
            }
            case "vi": {
              this.rejectReasonDetailList.forEach(item => {
                item.displayUI = item.refuseReasonIn;
              });
              break;
            }
          }
        });
    }
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
    this.user = localStorage.get("user");

    //订单号解密
    this.sourceId =
      window.decodeURIComponent(window.atob(this.$route.params.orderNo)) || "";

    this.$store.commit("CHANGE_FORTH_BREAD", this.sourceId);

    let query = this.$route.query;

    if (query.param) {
      let param = JSON.parse(
        window.decodeURIComponent(window.atob(query.param))
      );
      //查询参数解密
      this.isCheck = param.isCheck || false;
      this.ticketId = param.ticketId || 0;
      this.sourceType = param.sourceType || "";
      this.sourceId = param.sourceId || "";
      this.productType = param.productType || "";
      this.type = Number(param.type) || 1;
      this.userId = param.userId;
      if (!this.isCheck) {
        this.totalCount = param.count;
        this.currentAuditor = param.auditorName;
        this.modal4 = this.totalCount > 10;
        if (this.type === 2) {
          this.getMoney();
        }
      }
    }
    this.changeLanguage();
    //命中规则
    //this.hitRiskFn()
    //数据爬取授权项
    //this.searchSpinder()

    this.isCallRecordVisi = localStorage.get("currentOrderInfo") != null;
    //如果是初审，需要控制步骤
    if (
      (this.user.role == 4 ||
        this.user.role == 6 ||
        this.user.role == 10 ||
        this.user.role == 13) &&
      this.isCheck
    ) {
      this.isTabOneDisabled = false;
      this.isTabTwoDisabled = true;
    }
    this.getBalance();
  },
  destroyed() {
    this.$store.commit("CHANGE_FORTH_BREAD", "");
  }
};
</script>
<style lang="less">
.detailVal {
  margin-right: 10px;
  position: relative;
  height: auto;
  width: 100%;
  .moneyData {
    position: fixed;
    top: 10px;
    left: 530px;
    font-weight: bold;
    color: #fa2500;
    font-size: 16px;
  }
  .ticket-warning {
    position: fixed;
    top: 54px;
    right: 0;
    p {
      vertical-align: middle;
      font-size: 16px;
      span {
        margin-right: 15px;
      }
    }
  }
  .tabpane {
    margin-top: 55px;
    padding: 10px;
    .tableForBaseInfo {
      border-collapse: collapse;
      border: none;
      thead tr th {
        height: 35px;
        background-color: #b2b2b4;
        border: solid #e9eaec 1px;
        padding: 5px 20px;
        text-align: center;
      }
      tbody tr td {
        height: 30px;
        border: solid #e9eaec 1px;
        padding: 0 10px;
        text-align: left;
        input {
          z-index: 99;
        }
        label {
          z-index: 99;
        }
      }
      .inpRadio {
        text-align: left;
        width: 260px;
        input {
          margin-left: 10px;
        }
      }
    }
    .loanInfo {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;

      .loanInfoLeft {
        width: 100%;
        // width: 50%;
        // margin-right: 15px;
      }
    }
  }
  .tabpanechild {
    margin-top: 5px;
  }
  .loan-time {
    position: fixed;
    top: 52px;
    left: 48%;
    display: flex;
    flex-direction: row;
    align-items: center;
    span {
      display: inline-block;
      min-width: 40px;
      height: 30px;
      line-height: 30px;
      padding: 0 5px;
      border: 1px solid #ddd;
      margin-right: 10px;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 800;
      text-align: center;
      color: #fff;
      position: relative;
      cursor: pointer;
      p {
        display: none;
        position: absolute;
        top: -50px;
        left: 2px;
        z-index: 99;
        border: 1px solid #ddd;
        background: #3890ee;
        padding: 4px;
        border-radius: 5px;
      }
      &:hover p {
        display: block;
        white-space: nowrap;
        padding: 5px 10px;
      }
    }
    .repeatOrder {
      background: #56c3e4;
    }

    .day {
      background: #fa2500;
    }
    .loan {
      background: #346f9b;
    }
    .total {
      background: #31cc00;
      margin-right: 20px;
    }
    .balance {
      border: 0px solid black;
      color: red;
    }
  }
  .risk-position {
    position: fixed;
    top: 90px;
    z-index: 100;
    width: 100%;
  }
  .hit-rules {
    .none {
      border: 1px solid #ddd;
      color: #ddd;
      padding: 5px;
      border-radius: 5px;
      margin: 0 10px;
    }
    .disk {
      border: 1px solid #fa2500;
      color: #ff2500;
      background: #f5f7f9;
      padding: 5px;
      border-radius: 5px;
      margin: 0 10px;
    }
    .danger {
      border: 1px solid #fff23d;
      color: #fff23d;
      padding: 5px;
      border-radius: 5px;
    }
    .rules-content {
      z-index: 1000;
      p {
        line-height: 30px;
        margin-left: 20px;
        font-size: 14px;
      }
    }
  }
  .back-top-bt {
    width: 27px;
    height: 27px;
    padding: 2px;
    background: #346f9b;
    color: #fff;
    text-align: center;
    border-radius: 50%;
    position: fixed;
    right: 18px;
    bottom: 60px;
    z-index: 100;
  }
  .back-bt {
    position: fixed;
    right: 18px;
    top: 55px;
  }
  .detail-card {
    margin-bottom: 10px;
    .title-label {
      font-size: 16px;
      padding-left: 15px;
      height: 35px;
      line-height: 35px;
    }
    .user-info {
      padding-left: 15px;
      .user-col {
        margin-bottom: 20px;
        height: 15px;
        .info-label {
          text-align: right;
          width: 36%;
          display: inline-block;
          // word-wrap: break-word;
          // word-break: normal;
          white-space: nowrap;
        }
        .address {
          width: 18%;
        }
        .info-value {
          margin-left: 20px;
          word-wrap: break-word;
          word-break: break-all;
          .isOk {
            border: 1px solid #2ed272;
            border-radius: 5px;
            color: #2ed272;
            padding: 5px;
          }
          .isError {
            border: 1px solid #ff4b58;
            border-radius: 5px;
            color: #ff4b58;
            padding: 5px;
          }
          .isInfor {
            border: 1px solid #2d8cf0;
            border-radius: 5px;
            color: #2d8cf0;
            padding: 5px;
          }
          .isWarning {
            border: 1px solid #ecc23d;
            border-radius: 5px;
            color: #ecc23d;
            padding: 5px;
          }
        }
      }
    }
    .sort {
      margin-bottom: 10px;
      position: relative;
      .translate {
        position: absolute;
        right: 60px;
      }
    }
    .phone-audit {
      margin: 20px 0;
      font-weight: bold;
    }
    .photoContent {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      .photoLeft {
        width: 46%;
        margin-right: 30px;
      }
      .photoRight {
        width: 46%;
      }
    }
    .emergencyPersonContent {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      .emergencyPersonLeft {
        width: 46%;
        margin-right: 30px;
      }
      .emergencyPersonRight {
        width: 46%;
      }
    }
  }
  .ivu-tabs-nav-container {
    //position: fixed;
    top: 60px;
    z-index: 80;
    width: 90%;
    background: #fffffe;
  }

  .data-crawl .ivu-tabs-nav-container {
    position: fixed;
    top: 50px;
    z-index: 2000;
  }
  .crawl-commerce .limit-height {
    max-height: 200px;
    overflow: scroll;
  }
  .crawl-commerce .ivu-tabs-nav-container {
    position: fixed;
    top: 70px;
    z-index: 3000;
  }
  .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
    margin-right: 0;
  }
}

.auditAgree {
  position: fixed;
  bottom: 60px;
  width: 95%;
  height: 120px;
  vertical-align: middle;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  border-radius: 5px;
  background: #f5f7f9;
  padding: 0 50px;
  .user-input-search {
    padding-top: 2px;
    .user-input-label {
      display: inline-block;
      margin-right: 10px;
      vertical-align: middle;
    }
    .user-input {
      width: 200px;
      margin-right: 5px;
    }

    .ivu-collapse-content > .ivu-collapse-content-box {
      max-height: 500px;
      overflow: scroll;
    }

    .ivu-collapse > .ivu-collapse-item > .ivu-collapse-header {
      background-color: #346f9b;
      color: #fff;
    }

    .ivu-table td.demo-table-hover-column .ivu-table-cell img {
      width: 200px;
      height: 200px;
      text-align: center;
      padding: 5px;
    }
    .mark {
      width: 70%;
      margin-top: 5px;
    }
    .submit-bt {
      width: 100px;
      margin-left: 10px;

      .order-h {
        max-height: 500px;
        overflow: scroll;
      }
    }
  }
}
.show {
  position: fixed;
  right: 0;
  bottom: 60px;
  height: 120px;
  background-color: #346f9b;
  border: 1px solid #ddd;
  border-radius: 3px;
  width: 20px;
  margin-left: 20px;
  //   background: #2d8cf0;
  line-height: 120px;
  text-align: center;
}
.isShowColor {
  background: #fff;
  border: 0;
  z-index: -1;
}
.ivu-table td.demo-table-hover-column .ivu-table-cell img {
  width: 200px;
  height: 200px;
  text-align: center;
  padding: 5px;
}

.ivu-collapse-content > .ivu-collapse-content-box {
  max-height: 500px;
  overflow: scroll;
}

.ivu-collapse > .ivu-collapse-item > .ivu-collapse-header {
  background-color: #346f9b;
  color: #fff;
}
.ivu-btn-primary {
  background-color: #346f9b;
  border-color: #346f9b;
}

.order-h {
  max-height: 500px;
  overflow: scroll;
}

.modal-photo {
  width: 900px;
  height: 900px;
}
.m-t-90 {
  margin-top: 90px;
}
.red-color {
  color: #fa2500;
}
.green-color {
  color: #31cc00;
}
.callSelected {
  display: inline-block;
  border: 5px solid #d242f6;
}
//隔行换色
.ivu-table .demo-table-info-row td {
  background-color: rgb(226, 239, 250);
}
</style>
