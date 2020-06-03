<template>
    <Card class="detail-card">
        <p slot="title" class="title-label">{{title}}</p>
        <div class="user-info">
            <Row v-if="isHaveData">
                <Col :span="isSingle.indexOf(index)!=-1?24:12" v-for="(item,index) in tableInfor" :key="index"
                     class="user-col">
                    <p class="info-label" :class="{'address':isSingle.indexOf(index)!=-1}">{{item.label}}:</p>
                    <p class="info-value">
                        <Strong :class="{isInfo: item.color && item.color === 'info' && isSuccess  === 0,
                            isWarning:item.color && item.color === 'warning' && isSuccess  === 1,
                            isOk:item.color && item.color === 'success' && isSuccess  === 2,
                            isError:item.color && item.color === 'error' && isSuccess  === 3
                            }">{{item.value}}</Strong>
                    </p>
                </Col>
            </Row>
            <Row v-if="!isHaveData">
                <Col class="user-col">
                {{noDataText}}</Col>
            </Row>
        </div>
        <slot name="otherInfo"></slot>
    </Card>
</template>
<script>
    export default {
        name: 'pinja-table',
        props: {
            isSingle: {//单行显示的项
                type: [String, Array],
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            tableInfor: {
                type: Array,
                default (){
                    return []
                }
            },
            isSuccess: {
                type: Number,
                default: -1
            },
            isHaveData: {
                type: Boolean,
                default: true
            },
            noDataText: {
                type: String,
                default: ''
            }
        },
        data () {
            return {}
        },
        methods: {},
    }
</script>
<style lang="less" scoped>
    .detail-card {
        /*font-size: 16px;*/
        padding: 10px;
        margin-bottom: 10px;
        .title-label {
            /*font-size: 18px;*/
        }
        .user-info {
            padding-left: 15px;
            .user-col {
                margin-bottom: 20px;
                display: inline-block;
                height: 30px;
                .info-label {
                    text-align: right;
                    width: 36%;
                    display: inline-block;
                    white-space: nowrap;
                }
                .address {
                    width: 18%;
                }

                .info-value {
                    text-align: left;
                    width: auto;
                    margin-left: 20px;
                    display: inline-block;
                    white-space: nowrap;
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

                    .isInfo {
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
    }
</style>
