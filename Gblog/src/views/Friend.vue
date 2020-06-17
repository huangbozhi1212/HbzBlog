<template>
    <div class="friend">

        <div class="site-content">
            <section-title>
                <div class="friend-header">

                    <!--查询表单-->
                    <el-form :inline="true" class="demo-form-inline">

                        <el-form-item label="">
                            <el-date-picker
                                    v-model="query.begin"
                                    type="datetime"
                                    placeholder="选择开始时间"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    default-time="00:00:00"
                            />
                        </el-form-item>
                        <el-form-item>
                            <el-date-picker
                                    v-model="query.end"
                                    type="datetime"
                                    placeholder="选择截止时间"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    default-time="00:00:00"
                            />
                        </el-form-item>
                        <el-form-item>
                            <el-select v-model="query.sort" clearable placeholder="排序方式">
                                <el-option :value="1" label="升序"/>
                                <el-option :value="2" label="降序"/>
                            </el-select>
                        </el-form-item>
                        <div style="text-align: right">
                            <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
                            <el-button type="default" @click="resetData()">清空</el-button>
                        </div>
                    </el-form>
                </div>
            </section-title>
            <!---说明--->
            <br>
            <div class="archive">
                <div class="count">归档：{{count}}篇博客</div>
                <el-timeline>
                    <el-timeline-item v-for="(activity, index) in activities" :key="index" :color="activity.color" :timestamp="activity.createTime" placement="top" @mouseenter="hoverLine(activity)">
                        <div class="line-item">
                            <router-link :to="`/article/${activity.id}`" tag="span">{{activity.title}}
                                <el-tag v-if="activity.flag==='原创'">{{activity.flag}}</el-tag>
                                <el-tag type="success" v-else-if="activity.flag==='转载'">{{activity.flag}}</el-tag>
                                <el-tag type="info" v-else>{{activity.flag}}</el-tag>
                            </router-link>
                        </div>
                    </el-timeline-item>
                </el-timeline>
            </div>
            <!----->
            <hr/>
            <div class="friend-list animate">
                <div class="friend-item" v-for="item in list" :key="item.id"><a target="_blank" :href="item.path"><div class="site-name">{{item.siteName}}</div><div class="site-detail">{{item.desc}}</div></a></div>
            </div>
        </div>
    </div>
</template>

<script>
    import sectionTitle from '@/components/section-title'
    import Quote from "@/components/quote";
    import {fetchFriend,archived} from '../api'
    export default {
        name: "Friend",
        data(){
          return{
              websiteInfo: {},
              list: [],
              query: {
                  begin:"",
                  end:"",
                  sort:""
              },
              activities: [],
              count:""
          }
        },
        components:{
            Quote,
            sectionTitle
        },
        created() {
            this.getList()
        },
        methods: {
            // 博客列表
            getList() {
                archived(this.query).then(res => {
                    // console.log(res)
                    this.activities= res.data.list
                    this.count=res.data.count
                }).catch(err => {
                    console.log(err)
                })
            },
            // 清空
            resetData() {
                this.query = {
                }
                this.getList()
            },
            hoverLine(activity) {
                activity.color = "#409eff"
            },
            // fetchFriend() {
            //     fetchFriend().then(res => {
            //         this.list = res.data || []
            //     }).catch(err => {
            //         console.log(err)
            //     })
            // },
            // getWebSiteInfo(){
            //     this.$store.dispatch('getSiteInfo').then(data =>{
            //         this.websiteInfo = data
            //     })
            // }
        },

    }
</script>

<style scoped lang="less">
    .line-item {
        display: inline-block;
    }

    .line-item:hover {
        cursor: pointer;
        color: #409EFF;
    }

    .count {
        margin-bottom: 20px;
        font-size: 20px;
        color: #6f6f6f;
    }
    .friend{
        padding-top: 40px;
    }
    .friend-header{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 80px;
        font-weight: 400;
        .title{
            font-size: 20px;
        }
        .apply:hover{
            color: #ff6d6d;
        }
    }
    .statement{
        margin: 60px 0 20px 0;
        a{
            color: #ff6d6d;
        }
        p{
            line-height: 2rem;
        }
    }
    hr{
        margin: 40px 0;
        border: 0;
        height: 1px;
        background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(255, 109, 109, 0.75), rgba(0, 0, 0, 0));
    }
    .friend-list{
        width: 100%;
        .friend-item{
            display: inline-block;
            width: 30%;
            /*height: 100px;*/
            margin: 0 5% 20px 0;
            padding: 10px 30px;
            border: 1px solid #ECECEC;
            border-radius: 3px;
            &:hover{
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            }
            &:nth-of-type(3n){
                margin-right: 0;
            }
            .site-name,.site-detail{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                padding-bottom: 10px;
                line-height: 1.5rem;
            }
            .site-name{
                color: #8fd0cc;
                border-bottom: 1px dotted #ECECEC;
            }
            .site-detail{
                font-size: 13px;
                padding-top: 10px;
            }
        }
    }
    /*******/
    @media (max-width: 800px) {
        .friend-header{
            margin-top: 0;
        }
        .friend-list{
            .friend-item{
                width: 45%;
                &:nth-of-type(2n){
                    margin-right: 0;
                }
                &:nth-of-type(3n){
                    margin-right: 5%;
                }
            }
        }
    }
    @media (max-width: 600px){
        .friend-list{
            .friend-item{
                display: block;
                width: 90%;
                margin: 0 auto 20px auto;
                &:nth-of-type(2n){
                    margin-right: auto;
                }
                &:nth-of-type(3n){
                    margin-right: auto;
                }
            }
        }
    }
</style>
