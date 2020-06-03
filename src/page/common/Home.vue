<template>
  <div class="layout" :class="{'layout-hide-text': spanLeft < 4}">
    <Row type="flex" class="layout-container">
      <i-col :span="spanLeft" class="layout-menu-left ivu-col-span-4">
        <div class="layout-logo-left">
          <h3 class="platfromName">{{homePage.manageSystem}}</h3>
        </div>
        <Menu
          :active-name="activeName"
          theme="dark"
          width="auto"
          :open-names="openNames"
          accordion
          class="ivu-menu-dark"
          @on-select="select"
          ref="side_menu"
        >
          <Menu-item  v-if="!menu.children" v-for="(menu, index) in page"  v-bind:name="index+ '-' +0"  :key="menu.name"  >
            <template>
              <Icon v-if="page[index].path=='dashboard'" type="home" :size="iconSize"></Icon>
              <Icon v-if="page[index].path=='taskPanel'" type="ios-keypad" :size="iconSize"></Icon>
              <Icon v-if="page[index].path=='orderList'" type="android-settings" :size="iconSize"></Icon>
              <Icon v-if="page[index].path=='cs'" type="ios-paw" :size="iconSize"></Icon>
              <Icon v-if="page[index].path=='userManage'" type="person" :size="iconSize"></Icon>
              <Icon v-if="page[index].path=='riskControl'" type="cube" :size="iconSize"></Icon>
              <Icon v-if="page[index].path=='functions'" type="ios-cog" :size="iconSize"></Icon>
              <Icon v-if="page[index].path=='fdcFunction'" type="steam" :size="iconSize"></Icon>
              <span class="layout-text">{{menu.name}}</span>
            </template>
          </Menu-item>
          <Submenu  v-if="menu.children" v-for="(menu, index) in page" v-bind:name="index" :key="menu.name">
            <template slot="title">
              <Icon v-if="page[index].path=='recModule'" type="calculator" :size="iconSize"></Icon>
              <Icon v-if="page[index].path=='customerService'" type="android-happy" :size="iconSize"></Icon>
              <Icon v-if="page[index].path=='statisModule'"  type="arrow-graph-up-right" :size="iconSize"></Icon>
              <Icon v-if="page[index].path=='loanSupermarketModule'" type="cash" :size="iconSize"></Icon>
              <span class="layout-text">{{menu.name}}</span>
            </template>
            <Menu-item
              v-bind:name="index+'-'+index2"
              v-for="(child, index2) in menu.children"
              :key="child.name"
            >{{child.name}}</Menu-item>
          </Submenu>
        </Menu>
      </i-col>
      <i-col :span="spanRight" class="layout-menu-right">
        <div class="layout-header">
          <i-button type="text" @click="toggleClick">
            <Icon type="navicon" size="32"></Icon>
          </i-button>
          <Select v-model="language" size="small" @on-change="changeLanguage" class="language">
            <!-- <Option value="en">English</Option>  -->
            <Option value="vi">Bahasa Indonesia</Option>
            <Option v-show="isShowCn" value="cn">中文</Option>
          </Select>
          <div class="layout-ceiling-main">
            <span>{{userName}}</span>
            <Button
              v-if="user.role != 12"
              @click="showConfirmDia"
              size="small"
              type="primary"
            >{{homePage.hang}}</Button>
            <Button
              v-if="user.role != 12"
              @click="freed"
              size="small"
              type="primary"
            >{{homePage.freed}}</Button>
            <Button
              v-if="user.role != 12"
              @click="resetPassWord"
              size="small"
              type="primary"
            >{{homePage.resetpassword}}</Button>
            <Button @click="logout" size="small" type="primary">{{homePage.signOut}}</Button>
          </div>
        </div>
        <div class="layout-breadcrumb">
          <Breadcrumb>
            <Breadcrumb-item>{{homePage.firstBread}}</Breadcrumb-item>
            <!--二级面包屑-->
            <Breadcrumb-item>{{secBread}}</Breadcrumb-item>
            <!--三级面包屑-->
            <Breadcrumb-item v-if="thirdBread">{{thirdBread}}</Breadcrumb-item>
            <!--四级面包屑-->
            <Breadcrumb-item v-if="forthBread">{{forthBread}}</Breadcrumb-item>
          </Breadcrumb>
        </div>
        <div class="layout-content">
          <transition name="router-fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
        <div class="layout-copy">&copy {{display}}</div>
      </i-col>
    </Row>
    <!-- 用户领取工单数超过10的提醒弹窗 -->
    <Modal v-model="modalhangup" width="450">
      <p slot="header" style="text-align:center">
        <span>{{homePage.hangupModalTitle}}</span>
      </p>
      <h3 style="text-align:center">{{homePage.hangupModalMessage}}</h3>
      <div slot="footer" style="text-align:center">
        <Button type="primary" @click="hang">{{homePage.hangupModalBtn}}</Button>
      </div>
    </Modal>

    <!-- 重置密码弹窗 -->
    <Modal v-model="showResetModal" width="400" :title="homePage.resetPass">
      <Form :label-width="100">
        <Form-item :label="homePage.oldPassWord">
          <Input type="password" v-model="oldPassword"></Input>
        </Form-item>
        <Form-item :label="homePage.newPassWord">
          <Input type="password" v-model="newPassword"></Input>
        </Form-item>
        <Form-item :label="homePage.confirmPassWord">
          <Input type="password" v-model="confirmPassword"></Input>
        </Form-item>
        <Form-item>
          <span>{{homePage.passPattern}}</span>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="resetPassWordFn">{{homePage.confirm}}</Button>
        <Button type="primary" @click="cancel">{{homePage.cancel}}</Button>
      </div>
    </Modal>
     <!-- 释放前30分钟弹窗提醒 -->
      <Modal :value="isMoreMinutes" width="400" :closable="true" :mask-closable="false"> 
          <p style="min-height:30px;">{{homePage.tips}}</p>
          <p>{{tipData}}</p>
          <div slot="footer" style="text-align:center">
              <Button style="height:50px;" type="primary" @click="handleCloseMoreMinutes">{{homePage.moreThanBtn}}</Button>
          </div>
      </Modal>
  </div>
</template>
<script>
import router from "../../router/index";
import { mapState } from "vuex";
import config from "../../config";
import localStorage from "../../services/localStorage.service";
import userApi from "../../services/api/user.service";
import taskPanelApi from "../../services/api/taskPanel.service";
import Bus from "../../services/bus.service";
import page from "../../config/nav.config";
const pageCn = page.menuCn;
const pageEn = page.menuEn;
const pageVi = page.menuVi;
const LoginUrl = `${config.LoginUrl}`;
const getAndSet = function(name) {
  return {
    // getter
    get: function() {
      return this.$store.state.module[name];
    },
    // setter
    set: function(newValue) {
      this.$store.state.module[name] = newValue;
    }
  };
};
export default {
  data() {
    return {
      user: {},
      isShowCn: false, //是否显示中文
      user: {},
      display: "",
      spanLeft: 4,
      spanRight: 20,
      activeName: "0-0",
      openNames: ["0"],
      page: pageCn,
      homePage: {},
      userName: "",

      //面包屑相关
      currentSelect: "",
      currentName: "", //当前选中项的名字
      currentParentName: "", //当前选中项父项的名字
      modalhangup: false,

      //重置密码
      showResetModal: false,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",

      tipData:'',

    };
  },
  computed: {
    iconSize() {
      return this.spanLeft === 4 ? 14 : 24;
    },
    language: getAndSet("language"),
    currentPath: getAndSet("currentPath"),
    ...mapState({
      router: state => state.module.router,
      secBread: state => state.module.secBread,
      thirdBread: state => state.module.thirdBread,
      forthBread: state => state.module.forthBread,
      isMoreMinutes: state => state.module.isMoreMinutes,
    })
  },
  methods: {
    breadFn(name) {
      name += "";
      this.currentSelect = this.page[name.split("-")[0]];
      this.currentPath =
        (this.currentSelect.children &&
          this.currentSelect.children[name.split("-")[1]].path) ||
        this.currentSelect.path;
      this.currentName =
        (this.currentSelect.children &&
          this.currentSelect.children[name.split("-")[1]].name) ||
        this.currentSelect.name;
      this.currentParentName =
        (this.currentSelect.children && this.currentSelect.name) ||
        this.homePage.home;
      this.$set(this, "currentName", this.currentName);
      localStorage.set("currentName", this.currentName);
      localStorage.set("currentPath", this.currentPath);
      this.$store.commit("CHANGE_CURRENT_PATH", this.currentPath);

      //变更面包屑
      if (this.currentSelect.children) {
        this.$store.commit("CHANGE_SEC_BREAD", this.currentParentName);
        this.$store.commit("CHANGE_THIRD_BREAD", this.currentName);
      } else {
        this.$store.commit("CHANGE_SEC_BREAD", this.currentName);
        this.$store.commit("CHANGE_THIRD_BREAD", null);
      }
      // if(this.activeName == '7-0' || this.activeName == '7-1'){

      // }
    },
    showConfirmDia() {
      let currentOrderInfo = localStorage.get("currentOrderInfo");
      if (
        currentOrderInfo == null ||
        !this.$route.path.includes("/home/taskPanel/orderDetail")
      )
        return;
      this.modalhangup = true;
    },
    //挂起
    hang() {
      //获取当前挂起订单的信息
      let currentOrderInfo = localStorage.get("currentOrderInfo");
      if (currentOrderInfo == null) return;
      let param = window.decodeURIComponent(
        window.atob(localStorage.get("currentOrderInfo"))
      );
      // console.log(param)
      let params = JSON.parse(param)
      // console.log(params.ticketId)

      // let tempArr = param.split("&");
      // tempArr.forEach((item, i) => {
      //   tempArr[i] = item.split("=");
      // });
     
      // let _auditTicketId = Number(tempArr[0][1]) || 0;
      // console.log(4,Number(tempArr[0][1]))
      // let _ticketType = Number(tempArr[3][1]) || 1;

      let _auditTicketId = params.ticketId;

      // console.log(_auditTicketId)
      let _ticketType = params.type

      this.modalhangup = false;

      taskPanelApi
        .hang({ auditTicketId: _auditTicketId, ticketType: _ticketType })
        .then(res => {
          // console.log(res)
          
          localStorage.set("currentPath", "taskPanel");
          this.$Notice.success({ title: this.homePage.hangSuccess });
          setTimeout(() => {
            this.$router.push("/home/taskPanel");
          }, 500);
        });
    },
    //释放订单
    freed() {
      taskPanelApi.releaseOrders().then(res => {
        this.$Notice.success({ title: this.homePage.releaseSuccess });
        setTimeout(() => {
          this.$router.push("/home/taskPanel");
          // alert(this.currentPath)
          // if(this.currentPath == 'taskPanel'){//如果当前路径为taskpanel
          //     location.reload()
          // }
        }, 500);
      });
    },
    //重置密码
    resetPassWord() {
      this.showResetModal = !this.showResetModal;
      this.oldPassword = "";
      this.newPassword = "";
      this.confirmPassword = "";
    },
    //重置密码
    resetPassWordFn() {
      //由数字和字母组成，并且要同时含有数字和字母，且长度要在8位以上。
      var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/;
      if (!reg.test(this.newPassword) || !reg.test(this.confirmPassword)) {
        this.$Notice.error({ title: this.homePage.passError });
        return;
      }
      //校验两次密码是否一致
      if (this.newPassword !== this.confirmPassword) {
        this.$Notice.error({ title: this.homePage.isSame });
        return;
      }
      userApi
        .resetPassWord({
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        })
        .then(res => {
          this.$Notice.success({ title: this.homePage.resetSuccess });
          this.oldPassword = "";
          this.newPassword = "";
          this.confirmPassword = "";
          //跳转到登录页
          window.location.href = LoginUrl;
        });
    },
    cancel() {
      this.resetPassWord();
    },
    select(name) {
      this.activeName = name;
      localStorage.set("activeName", this.activeName);
      this.breadFn(name);
      this.$router.push({
        path: `/home/${this.currentPath}`
      });
    },
    toggleClick() {
      if (this.spanLeft === 4) {
        this.spanLeft = 2;
        this.spanRight = 22;
      } else {
        this.spanLeft = 4;
        this.spanRight = 20;
      }
    },
    //退出登录
    logout() {
      userApi.logout().then(res => {
        localStorage.set("user", "");
        localStorage.set("token", "");
        window.location.href = LoginUrl;
      });
    },
    //切换语言
    changeLanguage() {
      this.$i18n.locale = this.language;
      //为了在登录页面刷新页面的时候也能读到 退出登录前的语言
      localStorage.set("language", this.language);
      let message = this.$i18n.messages[this.$i18n.locale].message;
      this.homePage = message.home.homePage;
      let messagePage = message.nav.nav;
      switch (this.$i18n.locale) {
        case "cn":
          this.page = pageCn;
          break;
        case "en":
          this.page = pageEn;
          break;
        case "vi":
          this.page = pageVi;
          break;
      }
      //经过权限限制的nav
      let nav = [];
      for (let i in messagePage) {
        for (let k in this.page) {
          if (messagePage[i].name === this.page[k].name) {
            nav.push(this.page[k]);
          }
        }
      }

      this.page = nav;
      //this.breadFn(this.activeName)
      //切换语言时 刷新  保持激活项和展开想不变
      this.$nextTick(() => {
        this.$refs.side_menu.updateOpened();
        this.$refs.side_menu.updateActiveName();
      });
      //将语言类型 存入store
      this.$store.commit("CHANGE_LANGUAGE", this.language);
      localStorage.set("language", this.language);

      this.breadFn(localStorage.get("activeName"));
    },
    changePlatformName() {
      this.user = localStorage.get("user");
      let _role = Number(this.user.role);
      switch (_role) {
        case 10: {
          this.homePage.manageSystem = this.homePage.manageSystemCS;
          this.homePage.firstBread = this.homePage.manageSystemCS;
          break;
        }
        case 11: {
          this.homePage.manageSystem = this.homePage.manageSystemAU;
          this.homePage.firstBread = this.homePage.manageSystemAU;
          break;
        }
        case 12: {
          this.homePage.manageSystem = this.homePage.manageSystemCO;
          this.homePage.firstBread = this.homePage.manageSystemCO;
          break;
        }
        case 13: {
          this.homePage.manageSystem = this.homePage.manageSystemADMIN;
          this.homePage.firstBread = this.homePage.manageSystemADMIN;
          break;
        }
        case 14: {
          this.homePage.manageSystem = this.homePage.manageSystemINVEST;
          this.homePage.firstBread = this.homePage.manageSystemINVEST;
          break;
        }
      }
    },
     //释放前30分钟弹窗提醒
      thanMinutes(){
          taskPanelApi.greaterThanMinutes().then(res => {
              console.log(res)
              if(res.data != '' && res.data != null){ //data不为空 提醒
                  this.tipData = res
                  this.$store.commit('MORE_THAN_THREEDAYS', true)
              }else{
                  this.$store.commit('MORE_THAN_THREEDAYS', false)

              }
          })
      },
       //定时任务
        timeTask(){
            this.thanMinutes()
            setInterval(()=>{
                this.thanMinutes()
            },300000);
        },
      handleCloseMoreMinutes(){
          this.$store.commit('MORE_THAN_THREEDAYS', false)
      }
  },
  watch: {
    thirdBread: function() {
      return this.$store.state.thirdBread;
    }
    // isShowCn: function(newVal) {
    //   if (!isShowCn) {
    //     this.language = "vi";
    //     this.changeLanguage();
    //   }
    // }
  },
  created() {
    this.user = localStorage.get("user") || {};
    //测试环境或者本地则可以做国际化
    if (
      window.location.href.includes("localhost") ||
      window.location.href.includes("test") ||
      this.user.role == 1
    ) {
      this.isShowCn = true;
    } else {
      this.isShowCn = false;
    }

    if (!this.isShowCn) {
      this.language = "vi";
      this.changeLanguage();
    } else {
      this.language = localStorage.get("language");
      this.changeLanguage();
    }
  },
  mounted() {
   
     if(this.user.role == 4 || this.user.role == 5 || this.user.role == 6 || this.user.role == 7 || this.user.role == 9 || this.user.role == 10 || this.user.role == 11 || this.user.role == 13 || this.user.role == 14 ){
          this.timeTask()   
     }    
    Bus.$on("commonShowLoading", () => (this.showLoading = true));
    Bus.$on("commonHideLoading", () => (this.showLoading = false));
    this.userName =
      (localStorage.get("user") && localStorage.get("user").userName) || "";
    

    this.activeName = localStorage.get("activeName") || "0-0";
    this.breadFn(this.activeName);

    let myDate = new Date();
    let year = myDate.getFullYear();
    this.display = `${year}. All Rights Reserved.`;
  }
};
</script>
<style scoped lang="less">
.layout {
  background: #f5f7f9;
  position: relative;
  border-radius: 0px;
  overflow: hidden;
  height: 100%;
  .layout-container {
    height: 100%;
    .layout-menu-left {
      position: relative;
      background: #1c2438;
      overflow: scroll;
      height: auto;
      .layout-logo-left {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 200;
        height: 50px;
        background: #5b6270;
        border-radius: 0px;
        font-size: 16px;
        line-height: 50px;
        color: white;
        text-align: center;
        vertical-align: middle;
        overflow: hidden;
      }
    }
    .layout-menu-right {
      //position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: auto;
      .layout-header {
        height: 45px;
        line-height: 45px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        .layout-ceiling-main {
          float: right;
          margin-right: 15px;
          .reset {
            cursor: pointer;
            color: #2d8cf0;
            margin-right: 5px;
          }
        }
        .layout-ceiling-main a {
          color: #9ba7b5;
        }
        .language {
          width: 150px;
          display: inline-block;
          margin-right: 10px;
        }
      }
      .layout-breadcrumb {
        height: 30px;
        padding: 10px 15px 0;
      }
      .layout-content {
        flex: 1;
        height: 500px;
        margin: 15px;
        overflow: auto;
        background: #fff;
        border-radius: 4px;
      }
      .layout-copy {
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
      }
    }
  }
}

.layout-content-main {
  padding: 10px;
}

.ivu-spin-fix {
  opacity: 0.8;
}

.ivu-menu-dark {
  background: #1c2438;
  margin-top: 50px;
}

.layout-hide-text .layout-text {
  display: none;
}

.ivu-col {
  transition: width 0.2s ease-in-out;
}

.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity 0.3s;
}

.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}

.welcome-style {
  display: inline-block;
  width: 60%;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
}
</style>
