<template>
    <div id="layout-footer">
        <div class="footer-main">
            <div class="footer-item" v-if="socials.length">
                <div v-for="item in socials" :key="item.id"><a target="_blank" class="out-link" :href="item.href"><i class="iconfont" :class="item.icon"></i>{{item.title}}</a></div>
            </div>
            <div class="footer-item">
                <div style="font-size:17px;font-weight: bold;" >资源</div>
                <div  v-for="item in recommendList" :key="recommendList.id"><router-link :to="`/article/${item.id}`">{{item.title}}</router-link></div>
            </div>
            <div class="footer-item">
                <div>本站已苟活 {{runTimeInterval}}</div>
                <div>☞后台管理</div>
            </div>
        </div>
        <div class="copyright">Copyright © 2020 by HuangBozhi.cn . All rights reserved. | 粤ICP备1704220612号</div>
    </div>
</template>

<script>
    import sectionTitle from '@/components/section-title'
    import {fetchFocus} from "../../api";
    export default {
        name: "layout-footer",
        data(){
            return{
                socials: [],
                recommendList:[]
            }
        },
        components:{
            sectionTitle
        },
        computed:{
            runTimeInterval() {
                return this.$store.state.runTimeInterval;
            }
        },
        methods:{
            getList(){
                fetchFocus(1, 1).then(res => {
                    this.recommendList = res.data.recommendList || []
                    // console.log(this.recommendList)
                    // this.postList = res.data.records || []
                    // // this.hasNextPage = res.data.hasNext
                    // this.total =res.data.total
                }).catch(err => {
                    console.log(err)
                })
            },
            getSocial(){
                this.$store.dispatch('getSocials').then(data =>{
                    this.socials = data
                })
            },
        },
        created(){
            this.getList()
            this.getSocial();
            this.$store.dispatch('initComputeTime');
        }
    }
</script>

<style scoped lang="less">
#layout-footer{
    padding: 2%;
    border-top: 1px solid #F7F7F7;
    font-size: 13px;
    color: #9c9c9c;
    a.out-link:hover{
        color: #ff6d6d;
    }
    .footer-main{
        max-width: 800px;
        margin: 0 auto 20px auto;
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
        .footer-item{
            flex: 1;
            & > div:not(:last-child){
                margin-bottom: 10px;
            }
            i{
                margin-right: 10px;
            }
        }
    }
    .copyright{
        text-align: center;
    }
}
    /*****/
    @media (max-width: 800px){
        #layout-footer{
            .footer-main .footer-item:nth-child(3){
                flex: 2;
            }
        }
    }
    @media (max-width: 600px){
        #layout-footer{
            .footer-main {
                display: block;
                .footer-item{
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    flex-wrap: wrap;
                    & > div{
                        margin-bottom: 10px;
                    }
                }
            }
        }
    }
    /*****/
</style>
