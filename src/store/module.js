import * as types from './type'
const state = {
    //国际化标记
    language: 'vi',
    //当前路径
    currentPath: 'collectionList',
    activeName: '0-0',//菜单激活项
    //面包屑相关
    secBread: '',//二级面包屑
    thirdBread: '',//三级面包屑
    forthBread: '',//四级面包屑

    spinShow: false,//查询列表过程中是否显示遮罩层

    //查询条件
    form: {},

    //订单列表查询条件
    collStatus: 0,
    formColl: { 
        orderId: '',
        phone: '', 
        repayTime: '',
        sortStr: 'ASC',
        sortBy: 'phone',
        page: 1,
        size: 20,
    },
    isMoreMinutes: false,//释放前30分钟弹窗提醒
}

const actions = {
    change_language ({commit}, language) {
        commit(types.CHANGE_LANGUAGE, language)
    },
    change_current_path ({commit}, currentPath) {
        commit(types.CHANGE_CURRENT_PATH, currentPath)
    },
    change_bread ({commit}, bread) {
        commit(types.CHANGE_THIRD_BREAD, bread)
    },
    change_form ({commit}, form) {
        commit(types.CHANGE_FORM, form)
    },
    change_spin_show ({commit},spinShow) {
        commit(types.CHANGE_SPIN_SHOW, spinShow)
    },
}

const mutations = {
    [types.CHANGE_LANGUAGE] (state, language) {
        state.language = language
    },
    [types.CHANGE_ACTIVENAME](state, activeName){//改变菜单激活项
        state.activeName = activeName
    },
    [types.CHANGE_CURRENT_PATH](state, currentPath){
        state.currentPath = currentPath
    },
    [types.CHANGE_SEC_BREAD](state, bread){//二级面包屑
        state.secBread = bread
    },
    [types.CHANGE_THIRD_BREAD](state, bread){//三级面包屑
        state.thirdBread = bread
    },
    [types.CHANGE_FORTH_BREAD](state, bread){//四级面包屑
        state.forthBread = bread
    },
    [types.CHANGE_FORM] (state, form) {
        state.form = form
    },
    [types.CHANGE_SPIN_SHOW](state, spinShow){
        state.spinShow = spinShow
    },

    [types.CHANGE_FORM_COLL](state, form){
        state.formColl = form
    },
    [types.CHANGE_COLL_STATUS](state, status){
        state.collStatus = status
    },
    [types.MORE_THAN_THREEDAYS](state, data){//释放30分钟前进行提醒
        state.isMoreMinutes = data
    },
}

const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}
