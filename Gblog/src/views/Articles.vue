<template>
    <div class="articles">
        <banner></banner>
        <div class="site-content animate">
            <main class="site-main">
                <article class="hentry">
                    <!-- 文章头部 -->
                    <header class="entry-header">
                        <!-- 标题输出 -->
                        <h1 class="entry-title">`{{content.title}}`</h1>
                        <hr>
                        <div class="breadcrumbs">
                            <div id="crumbs">最后更新时间：{{content.updateTime}}</div>
                        </div>
                    </header>
                    <!-- 正文输出 -->
                    <div class="entry-content">
                        <!-- 描述：文章信息 -->
                        <div class=" timeAndView">
						<span class="article-time">


							@{{name}} &nbsp;&nbsp;&nbsp;
                            <br><br><i class="el-icon-time"></i>发表于：<span>{{content.createTime}}</span>
						</span>
                            &nbsp;|&nbsp;
                            <span class="article-views">
							<i class="el-icon-view"></i>
							阅读量：<span>{{content.views}}</span>
						</span>
                        </div>
                        <div v-html="content.content">
                        </div>
                    </div>
                    <!-- 文章底部 -->
                    <section-title>
                        <footer class="post-footer">
                            <!-- 阅读次数 -->
                            <div class="post-like">
                                <i class="iconfont iconeyes"></i>
                                <span class="count">  {{content.views}}</span>
                            </div>
                            <!-- 分享按钮 -->
                            <!--                        <div class="post-share">-->
                            <!--                            <ul class="sharehidden">-->
                            <!--                                <li><a href="http://qr.liantu.com/api.php?text=https://zhebk.cn/Web/gongan.html"-->
                            <!--                                       onclick="window.open(this.href, 'renren-share', 'width=490,height=700');return false;"-->
                            <!--                                       class="s-weixin" target="_blank" rel="nofollow noopener noreferrer"><img src="https://cdn.zhebk.cn/usr/themes/Akina/images/wechat.png"></a></li>-->
                            <!--                                <li>-->
                            <!--                                    <a href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=https://zhebk.cn/Web/gongan.html/&amp;title=公安联网备案记录"-->
                            <!--                                       onclick="window.open(this.href, 'weibo-share', 'width=730,height=500');return false;"-->
                            <!--                                       class="s-qq" target="_blank" rel="nofollow noopener noreferrer"><img src="https://cdn.zhebk.cn/usr/themes/Akina/images/qzone.png"></a></li>-->
                            <!--                                <li>-->
                            <!--                                    <a href="http://service.weibo.com/share/share.php?url=https://zhebk.cn/Web/gongan.html/&amp;title=公安联网备案记录"-->
                            <!--                                       onclick="window.open(this.href, 'weibo-share', 'width=550,height=235');return false;"-->
                            <!--                                       class="s-sina" target="_blank" rel="nofollow noopener noreferrer"><img src="https://cdn.zhebk.cn/usr/themes/Akina/images/sina.png"></a></li>-->
                            <!--                                <li>-->
                            <!--                                    <a href="http://shuo.douban.com/!service/share?https://zhebk.cn/Web/gongan.html/&amp;title=公安联网备案记录"-->
                            <!--                                       onclick="window.open(this.href, 'renren-share', 'width=490,height=600');return false;"-->
                            <!--                                       class="s-douban" target="_blank" rel="nofollow noopener noreferrer"><img src="https://cdn.zhebk.cn/usr/themes/Akina/images/douban.png"></a></li>-->
                            <!--                            </ul>-->
                            <!--                            <i class="iconfont show-share"></i>-->
                            <!--                        </div>-->
                            <!-- 赞助按钮 -->
                            <div class="donate" @click="showDonate=!showDonate">
                                <span>赏</span>
                                <ul class="donate_inner" :class="{'show':showDonate}">
                                    <li class="wedonate"><img src="https://hbz-edu-file.oss-cn-beijing.aliyuncs.com/%E5%BE%AE%E4%BF%A1.jpg"><p>微信</p></li>
                                    <li class="alidonate"><img src="https://hbz-edu-file.oss-cn-beijing.aliyuncs.com/%E6%94%AF%E4%BB%98%E5%AE%9D.jpg"><p>支付宝</p></li>
                                </ul>
                            </div>
                            <!-- 文章标签 -->
                            <div class="post-tags">
                                <i class="iconfont iconcategory"></i>
                                <router-link :to="`/category/${type.id}`">{{type.name}}</router-link>
                            </div>
                        </footer>
                    </section-title>

                    <!--声明-->
                    <div class="open-message">
                        <p>好好学习，天天向上！</p>
                        <p>转载：转载请注明原文链接 - <a href="#">{{content.title}}</a></p>
                    </div>
                    <!--评论-->
                    <el-button type="primary" @click.stop="showCommentEditor=true" style="cursor: pointer;" v-if="showCommentEditor!=true">点击评论</el-button>
                    <el-button type="info" @click.stop="showCommentEditor=false" style="cursor: pointer;" v-else>关闭评论窗口</el-button>
                    <div style="color: white">-</div>
                    <div style="text-align: right"> <i class="iconfont iconcomment"></i>{{total}}条评论</div>

                    <div v-if="showCommentEditor">
                        <el-input v-model="postComment.nickname" id="nickname" style="height: 45px !important;" placeholder="请输入名字"></el-input>
                        <el-input v-model="postComment.email" id="mail" style="height: 45px !important;" placeholder="请输入邮箱"></el-input>
                        <el-input v-model="postComment.avatar" style="height: 45px !important;" placeholder="请输入头像url"></el-input>
                        <comment-message-editor  :inline="true" buttonText="提交评论" @submit="submitReply"></comment-message-editor>
                    </div>
                    <div class="comments">
                        <comment v-for="item in comments" :key="item.id" :comment="item">
<!--                            <template>-->
<!--                                <comment v-for="reply in item.reply" :key="reply.id" :comment="reply"></comment>-->
<!--                            </template>-->
                        </comment>
                    </div>
                    <!-- 分页 -->
                    <el-pagination
                            v-if="total>3"
                            :current-page="page"
                            :page-size="limit"
                            :total="total"
                            style="padding: 30px 0; text-align: center;"
                            layout="total, prev, pager, next, jumper"
                            @current-change="getComment"
                    />
                </article>
            </main>
        </div>
    </div>
</template>

<script>
    import marked from 'marked'
    import Banner from '@/components/banner'
    import sectionTitle from '@/components/section-title'
    import comment from '@/components/comment'
    import commentMessageEditor from 'comment-message-editor'
    import {aboutMe, fetchComment} from '../api'
    import {article,commentOrReply} from '../api'
    export default {
        name: 'articles',
        data(){
          return{
              content:[],
              page: 1, // 当前页
              limit: 5, // 每页记录数
              total:0,
              postComment: {
                  avatar: "",
                  content: "",
                  email: "",
                  nickname: "",
                  blogId: this.$route.params.id,
              },
              name:'',
              type:[],
              showDonate: false,
              showCommentEditor: false,
              comments: []
          }
        },
        components: {
            commentMessageEditor,
            Banner,
            sectionTitle,
            comment
        },
        watch:{
            // showCommentEditor(value) {
            //     if (value) {
            //         this.postComment=[]
            //         document.body.addEventListener('click', this.close)
            //     } else {
            //         this.postComment=[]
            //         document.body.removeEventListener('click', this.close)
            //     }
            // }
        },
        methods: {
            submitReply(v){
                this.postComment.content=v
                const reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
                const obj = document.getElementById("mail"); //要验证的对象
                const nickname = document.getElementById("nickname"); //要验证的对象
                if (nickname.value === "") { //输入不能为空
                    this.$message({
                        type: 'warning',
                        message: '名字不能为空!'
                    })
                    return false;
                }else if (obj.value === "") { //输入不能为空
                    this.$message({
                        type: 'warning',
                        message: '邮箱不能为空!'
                    })
                    return false;
                } else if (!reg.test(obj.value)) { //正则验证不通过，格式不对
                    this.$message({
                        type: 'error',
                        message: '请输入正确的邮箱格式!'
                    })
                    return false;
                } else {
                    // console.log(this.postComment)
                    commentOrReply(0,this.postComment).then(res =>{
                        this.$message({
                            type: 'success',
                            message: "评论成功！"
                        })
                        this.getComment(this.postComment.blogId,this.page,this.limit)
                        // this.postComment=[]
                        this.close()

                    }).catch(err => {
                        this.$message({
                            type: 'error',
                            message:"评论失败,请稍后再试。"
                        })
                    })
                }


                // commentOrReply(0,this.postComment).then(res =>{
                //   console.log(res)
                // }).catch(err => {
                //     console.log(err)
                // })
            },
            close(){
                this.showCommentEditor = false
            },
            article(id){
              article(id).then(res =>{
                  this.content = res.data.blog
                  this.content.content = marked( this.content.content)
                  this.name = res.data.username
                  this.type = res.data.type
              }).catch(err => {
                  console.log(err)
              })
            },
            getComment(page = 1){
                // console.log("赋值前："+this.page)
                this.page = page
                // console.log(id)
                // console.log("赋值后："+this.page)
              fetchComment(this.postComment.blogId,this.page,this.limit).then(res => {
                  console.log(res)
                  this.comments = res.data.list || []
                  this.total = res.data.total
                  // console.log(res)
              }).catch(err => {
                  console.log(err)
              })
          }
        },
        created() {
            const id = this.$route.params.id
            this.article(id)
            // this.getComment(id,this.page,this.limit)
        },
        mounted() {
            let number = parseInt(this.$route.params.id);
            fetchComment(number,this.page,this.limit).then(res => {
                // console.log(res)
                this.comments = res.data.list || []
                this.total = res.data.total
                // console.log(res)
            }).catch(err => {
                console.log(err)
            })
        }
    }
</script>
<style scoped lang="less">
    .site-content {
        .site-main {
            padding: 80px 0 0 0;
        }
    }

    article.hentry {
        .entry-header {
            .entry-title {
                font-size: 23px;
                font-weight: 600;
                color: #737373;
                margin: 0.67em 0;

                &:before {
                    content: "#";
                    margin-right: 6px;
                    color: #d82e16;
                    font-size: 20px;
                    font-weight: 600;
                }
            }

            hr {
                height: 1px;
                border: 0;
                background: #EFEFEF;
                margin: 15px 0;
            }

            .breadcrumbs {
                font-size: 14px;
                color: #D2D2D2;
                text-decoration: none;
                margin-bottom: 30px;
            }
        }

        .entry-content {}

        footer.post-footer {
            width: 100%;
            padding: 20px 10px;
            margin-top: 30px;
            height: 65px;
            position: relative;
            i{
                font-size: 18px;
                margin-right: 5px;
            }
            .post-like {
                float: right;
                margin: 7px 0 0 20px;
            }

            .post-share {
                float: right;
                list-style: none;
                margin-right: 20px;
            }

            .donate {
                float: left;
                line-height: 36px;
                border-radius: 100%;
                -webkit-border-radius: 100%;
                -moz-border-radius: 100%;
                border: 1px solid #2B2B2B;
                &:hover{
                    border: 1px solid goldenrod;
                    span{
                        color: goldenrod;
                    }
                }
                span {
                    color: #2B2B2B;
                    padding: 10px;
                    position: relative;
                    cursor: pointer;
                }

                .donate_inner {
                    display: none;
                    margin: 0;
                    list-style: none;
                    position: absolute;
                    left: 80px;
                    top: -40px;
                    background: #FFF;
                    padding: 10px;
                    border: 1px solid #ddd;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, .08);
                    border-radius: 3px;
                    &.show{
                        display: block;
                    }
                    li {
                        float: left;
                    }

                    img {
                        width: 100px;
                    }
                    p {
                        text-align: center;
                        font-size: 15px;
                        color: #D2D2D2;
                        line-height: 1rem;
                    }
                }

                .donate_inner:after, .donate_inner:before {
                    content: "";
                    position: absolute;
                    left: 0;
                    bottom: 45%;
                    margin-left: -8px;
                    border-top: 8px solid transparent;
                    border-bottom: 8px solid transparent;
                    border-right: 8px solid #fff;
                }

                .donate_inner:before {
                    left: -1px;
                    border-right: 8px solid #ddd;
                }

            }

            .post-tags {
                margin: 7px 0 0 20px;
                float: left;
                text-transform: uppercase;
                a:hover{
                    color: #ff6d6d;
                }
            }
        }
        .open-message {
            margin: 50px 0;
            position: relative;
            background: #2B2B2B;
            padding: 10px 30px;
            border-radius: 3px;
            font-size: 14px;
            color: #fff;
            &:after {
                content: "";
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-bottom: 10px solid #2B2B2B;
                position: absolute;
                top: -8px;
                left: 48%;
            }
            p {
                margin: 10px 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            a {
                color: #A0DAD0;
                padding: 0 5px;
            }
        }
    }
</style>
