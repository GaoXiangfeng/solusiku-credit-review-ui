import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import config from '../config'
import localStorage from '../services/localStorage.service'

Vue.use(VueRouter)

// 公用组件
const login = r => require.ensure([], () => r(require('../page/common/Login.vue')), 'login')
const home = r => require.ensure([], () => r(require('../page/common/Home.vue')), 'home')
const dashboard = r => require.ensure([], () => r(require('../page/common/Dashboard.vue')), 'dashboard')

const taskPanel = r => require.ensure([], () => r(require('../page/creditReview/taskPanel')), 'taskPanel')
const orderList = r => require.ensure([], () => r(require('../page/creditReview/orderList')), 'orderList')
const orderDetail = r => require.ensure([], () => r(require('../page/creditReview/orderDetail')), 'orderDetail')
const cs = r => require.ensure([], () => r(require('../page/creditReview/cs')), 'cs')
const csDetail = r => require.ensure([], () => r(require('../page/creditReview/csDetail')), 'csDetail')
const riskControl = r => require.ensure([], () => r(require('../page/riskControlModule/riskControl')), 'riskControl')
const userManage = r => require.ensure([], () => r(require('../page/userModal/userManage.vue')), 'userManage')
const functions = r => require.ensure([], () => r(require('../page/functionModule/function.vue')), 'function')

const fdcFunction = r => require.ensure([], () => r(require('../page/fdcFunction/fdcFunction.vue')), 'funcfdcFunctiontion')

//test

const routes = [
    {
        path: '/',
        redirect: '/home/dashboard',
        meta: {
            option: {
                thirdBread: ''
            },
            role: '1,2,3,4,5,6,7,9,10,11,12,13,14,15,17'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: login,
        option: {
            thirdBread: ''
        },
        meta: {
            role: '1,2,3,4,5,6,7,9,10,11,12,13,14,15,17'
        }
    },
    {
        path: '/home',
        name: 'home',
        component: home,
        meta: {
            option: {
                thirdBread: ''
            },
            requireAuth: true,
            role: '1,2,3,4,5,6,7,9,10,11,12,13,14,15,17'
        },
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: dashboard,
                meta: {
                    option: {
                        thirdBread: ''
                    },
                    role: '1,2,3,4,5,6,7,9,10,11,12,13,14,15,17'
                }
            },
            {
                path: 'taskPanel',
                name: 'taskPanel',
                component: taskPanel,
                meta:{
                    role: '1,2,3,4,5,6,7,9,10,11,13,14',
                    option: {
                        currentPath: 'taskPanel',
                        thirdBread: ''
                    }
                }
            },{
                path: 'taskPanel/orderDetail/:orderNo',
                name: 'orderDetail',
                component: orderDetail,
                meta:{
                    role: '1,2,3,4,5,6,7,9,10,11,13,14,17',
                    option: {
                        currentPath: 'orderDetail',
                        thirdBread: ''
                    }
                }
            },{
                path: 'orderList',
                name: 'orderList',
                component: orderList,
                meta:{
                    role: '1,2,3,4,5,6,7,9,10,11,13,14,17',
                    option: {
                        currentPath: 'orderList',
                        thirdBread: ''
                    }
                } //管理员GLY
            },{
                path: 'cs',
                name: 'cs',
                component: cs,
                meta:{
                    role: '1,2,3,4,5,6,7,9,10,11,12,13,14,15,17',
                    option: {
                        currentPath: 'cs',
                        thirdBread: ''
                    }
                } 
            },
            {
                path: 'cs/csdetail',
                name: 'csdetail',
                component: csDetail,
                meta:{
                    role: '1,2,3,4,5,6,7,9,10,11,12,13,14,15,17',
                    option: {
                        currentPath: 'cs/csdetail',
                        thirdBread: ''
                    }
                } 
            },
            {
                path: 'riskControl',
                name: 'riskControl',
                component: riskControl,
                meta:{
                    role: '1,15',
                    option: {
                        currentPath: 'riskControl',
                        thirdBread: ''
                    }
                } 
            },{
                path: 'userManage',
                name: 'userManage',
                component: userManage,
                meta:{
                    role: '1',
                    option: {
                        currentPath: 'userManage',
                        thirdBread: ''
                    }
                } //管理员GLY functions
            },{
                path: 'functions',
                name: 'functions',
                component: functions,
                meta:{
                    role: '1',
                    option: {
                        currentPath: 'functions',
                        thirdBread: ''
                    }
                } //管理员GLY 
            },{
                path: 'fdcFunction',
                name: 'fdcFunction',
                component: fdcFunction,
                meta:{
                    role: '1',
                    option: {
                        currentPath: 'fdcFunction',
                        thirdBread: ''
                    }
                } //管理员GLY 
            }
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

const opRedirectUrl = config.LoginUrl

router.beforeEach(async (to, from, next) => {
    let requireAuth = to.matched.some(route => route.meta.requireAuth)
    if (!requireAuth) {
        return next()
    }
    //判断是否登录
    let user = localStorage.get('user')
    if (!localStorage.get('token') || !user) {
        window.location.href = opRedirectUrl
        return
    }
    //如果登录，判断是否有当前路由的权限
    let role = user.role || ''
    to.matched.some(route => {
        if (!route.meta.role.includes(role)) {
            window.location.href = opRedirectUrl
        }
    })

    //第一次运行程序 设置菜单选中项
    if (to.path == '/home/dashboard') {
        localStorage.set('activeName', '0-0')
    }
    next()
})
export default router
