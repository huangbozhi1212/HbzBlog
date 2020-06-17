<template>
    <div class="home">
        <banner isHome="true"></banner>
        <div class="site-content animate">
            <!--通知栏-->
            <div class="notify">
                <div class="search-result" v-if="hideSlogan">
                    <span v-if="searchWords">搜索结果："{{searchWords}}" 相关文章</span>
                    <div v-else-if="tag">
                        <div class="tag-box" >
                            <el-tag type="info" v-for="item in tagList" :key="item.id">
                                <span style="cursor:pointer;" @click="goToTag(item.id)">{{item.name}}</span>&nbsp; &nbsp; &nbsp;
                            </el-tag>

                        </div>
                        <span>标签&nbsp;<el-tag>{{tag}}</el-tag> &nbsp;相关文章</span>
                    </div>
                    <span v-else-if="category">分类 "{{category}}" 相关文章</span>
                </div>
                <quote v-else>{{notice}}</quote>
            </div>

            <!--焦点图-->
            <div class="top-feature" v-if="!hideSlogan">
                <section-title>
                    <div style="display: flex;align-items: flex-end;">聚焦
                        <small-ico></small-ico>
                    </div>
                </section-title>
                <div class="feature-content">
                    <div class="feature-item" v-for="item in features" :key="item.title">
                        <Feature :data="item" ></Feature>
                    </div>
                </div>
            </div>
            <!--文章列表-->
            <main class="site-main" :class="{'search':hideSlogan}">
                <section-title v-if="!hideSlogan">推荐</section-title>
                <template v-for="item in postList">
                    <post :post="item" :key="item.id"></post>
                </template>
            </main>

<!--            &lt;!&ndash;加载更多&ndash;&gt;-->
<!--            <div class="more" v-show="hasNextPage">-->
<!--                <div class="more-btn" @click="loadMore">More</div>-->
<!--            </div>-->
            <!-- 分页 -->
            <el-pagination
                    :current-page="page"
                    :page-size="limit"
                    :total="total"
                    style="padding: 30px 0; text-align: center;"
                    layout="total, prev, pager, next, jumper"
                    @current-change="fetchFocus"
            />
        </div>
    </div>
</template>

<script>
    import Banner from '@/components/banner'
    import Feature from '@/components/feature'
    import sectionTitle from '@/components/section-title'
    import Post from '@/components/post'
    import SmallIco from '@/components/small-ico'
    import Quote from '@/components/quote'
    import {fetchFocus, category, search,getBlogById,countTagBlog} from '../api'

    export default {
        name: 'Home',
        props: ['cate', 'words'],
        data() {
            return {
                isFirst:true,
                words2:"",
                typeId:"",
                tagId:"",
                tagName:"",
                tagList: [],
                type: "",
                notice2: "",
                features: [],
                postList: [],
                page: 1, // 当前页
                limit: 8, // 每页记录数
                total:0,
                hasNextPage: false
            }
        },
        components: {
            Banner,
            Feature,
            sectionTitle,
            Post,
            SmallIco,
            Quote
        },
        created() {
            if (this.$route.path==="/"){
                this.getList()
            }
        },
        watch:{
            $route(to,from){
                this.page =1
                if (this.$route.path==="/"){
                   this.getList()
                    console.log("getList")
                }
                // console.log(to.path);
                // console.log(to)
                if (to.params.cate!=null){
                    category(to.params.cate, this.page, this.limit).then(res => {
                        // console.log(res)
                        // console.log("category")
                        this.type = res.data.type.name
                        this.postList = res.data.records || []
                        // console.log(this.postList)
                        this.total =res.data.total
                    })
                }
                if (to.params.id!=null){
                    countTagBlog().then(res => {
                        this.tagList = res.data.countList
                        // console.log("countTagBlog")
                    })
                    getBlogById(to.params.id,this.page,this.limit).then(res => {
                        this.postList = res.data.blogAndTag.list || []
                        this.tagName = res.data.blogAndTag.list[0].tname
                        this.total =  res.data.blogAndTag.total
                    })
                }
                if (to.params.words!=null){
                    // console.log("words")
                    search(to.params.words, this.page, this.limit).then(res => {
                        this.postList = res.data.blog.records || []
                        this.total = res.data.blog.total
                    })
                }
            }
        },
        computed: {
            searchWords() {
                this.words2 = this.$route.params.words
                if (this.words2 === undefined) {
                    return null
                }
                setTimeout(()=> {
                    // console.log("search2")
                    search(this.words2, this.page, this.limit).then(res => {
                        this.postList = res.data.blog.records || []
                        this.total = res.data.blog.total
                    })
                },500)
                return this.words2
            },
            category() {
                this.typeId = this.$route.params.cate
                if (this.typeId === undefined) {
                    return null
                }
                setTimeout(()=> {
                category(this.typeId, this.page, this.limit).then(res => {
                    // console.log("category2")
                    // console.log(res)
                    this.type = res.data.type.name
                    this.postList = res.data.records || []
                    // console.log(this.postList)
                    this.total =res.data.total
                })
            },500)
                return this.type
            },
            tag() {
                this.tagId=  this.$route.params.id
                if (this.tagId === undefined) {
                    return null
                }
                console.log("2222222222")
                setTimeout(()=> {
                    // console.log("countTagBlog")
                countTagBlog().then(res => {
                    this.tagList = res.data.countList

                })
                getBlogById(this.tagId,this.page,this.limit).then(res => {
                    this.postList = res.data.blogAndTag.list || []
                    this.tagName = res.data.blogAndTag.list[0].tname
                    this.total =  res.data.blogAndTag.total
                })
                },500)
                return this.tagName
            },
            hideSlogan() {
                return this.category || this.tag || this.searchWords
            },
            notice() {
                this.$store.dispatch('getSiteInfo').then(data => {
                    this.notice2 = data.data[0].notice
                })
                return this.notice2
            }
        },
        methods: {
            goToTag(id){
                this.$router.push({path: '/tag/'+id});
            },
            fetchFocus(page = 1) {
                this.page = page
                // console.log("typeId:"+this.typeId)
                // console.log("words2:"+this.words2)
                // console.log("tagId:"+this.tagId)
                if (this.words2 !==undefined) {
                    // console.log("搜索分页:"+this.page)
                    search(this.words2, this.page, this.limit).then(res => {
                        this.postList = res.data.blog.records || []
                        this.total = res.data.blog.total
                    })
                }
                if (this.tagId !== undefined) {
                    // console.log("标签分页:"+this.page)
                    getBlogById(this.tagId,this.page,this.limit).then(res => {
                        this.postList = res.data.blogAndTag.list || []
                        this.tagName = res.data.blogAndTag.list[0].tname
                        this.total =  res.data.blogAndTag.total
                    })
                }
                if ( this.typeId !== undefined) {
                    // console.log("类型分页:"+this.page)
                    category(this.typeId, this.page, this.limit).then(res => {
                        // console.log(res)
                        this.type = res.data.type.name
                        this.postList = res.data.records || []
                        // console.log(this.postList)
                        this.total =res.data.total
                    })
                }
                if (this.$route.path==="/"){
                    fetchFocus(this.page, this.limit).then(res => {
                        // console.log(res)
                        // console.log("首页分页:"+this.page)
                        this.features = res.data.recommendList || []
                        this.postList = res.data.records || []
                        // this.hasNextPage = res.data.hasNext
                        this.total =res.data.total
                    }).catch(err => {
                        console.log(err)
                    })
                }
            },
            getList(){
                // console.log("执行了gelList!")
                fetchFocus(this.page, this.limit).then(res => {
                    // console.log(res)
                    // console.log(res)
                    // console.log("page:"+this.page+",limit:"+this.limit)
                    this.features = res.data.recommendList || []
                    this.postList = res.data.records || []
                    // this.hasNextPage = res.data.hasNext
                    this.total =res.data.total
                }).catch(err => {
                    console.log(err)
                })
            },
            // fetchList() {
            //     fetchList().then(res => {
            //         this.postList = res.data.items || []
            //         this.currPage = res.data.page
            //         this.hasNextPage = res.data.hasNext
            //     }).catch(err => {
            //         console.log(err)
            //     })
            // },
            // loadMore() {
            //     if (this.$route.params.words !=null){
            //         // console.log("search---------")
            //         search(this.words2  , 1, this.limit+=3).then(res => {
            //             this.postList = res.data.blog.records || []
            //             this.hasNextPage = res.data.blog.hasNext
            //         })
            //     }
            //     if (this.$route.params.cate !=null){
            //         // console.log("category---------")
            //         setTimeout(()=> {
            //         category(this.typeId, 1, this.limit+=3).then(res => {
            //             this.type = ""
            //             this.postList = ""
            //             this.hasNextPage = ""
            //             this.type = res.data.type.name
            //             this.postList = res.data.records || []
            //             // this.hasNextPage = res.data.hasNext
            //             this.total =this.postList.length
            //         })
            //         },500)
            //     }
            //     if (this.$route.path==="/"){
            //         setTimeout(()=> {
            //         fetchFocus(1, this.limit += 3).then(res => {
            //             this.features = ""
            //             this.postList =""
            //             this.hasNextPage = ""
            //             this.features = res.data.recommendList || []
            //             this.postList = res.data.records || []
            //             this.hasNextPage = res.data.hasNext
            //         })
            //         },500)
            //     }
            //     if (this.$route.params.id !=null){
            //         // console.log("blogAndTag---------")
            //         setTimeout(()=> {
            //         getBlogById(this.tagId,1,this.limit+=3).then(res => {
            //             this.postList = ""
            //             this.hasNextPage = ""
            //             this.tagName = ""
            //             const flag = (res.data.blogAndTag.total !== res.data.blogAndTag.list.length)
            //             this.postList = res.data.blogAndTag.list || []
            //             this.hasNextPage =flag
            //             this.tagName = res.data.blogAndTag.list[0].tname
            //         })
            //         },500)
            //     }
            // }
        }
    }
</script>
<style scoped lang="less">

    .site-content {
        .notify {
            margin: 60px 0;
            border-radius: 3px;

            & > div {
                padding: 20px;
            }
        }


        .search-result {
            padding: 15px 20px;
            text-align: center;
            font-size: 20px;
            font-weight: 400;
            border: 1px dashed #ddd;
            color: #828282;
        }
    }

    .tag-box {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
    }

    .tag {
        border: 1px dashed #ddd;
        color: #828282;
        height: 25px;
        text-align: center;
        margin-left: 10px;
    }

    .top-feature {
        width: 100%;
        height: auto;
        margin-top: 30px;

        .feature-content {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            position: relative;

            .feature-item {
                width: 32.9%;
            }
        }
    }

    .site-main {
        padding-top: 80px;

        &.search {
            padding-top: 0;
        }
    }

    .more {
        margin: 50px 0;

        .more-btn {
            width: 100px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: #ADADAD;
            border: 1px solid #ADADAD;
            border-radius: 20px;
            margin: 0 auto;
            cursor: pointer;

            &:hover {
                color: #8fd0cc;
                border: 1px dashed #8fd0cc;
            }
        }
    }

    /******/
    @media (max-width: 800px) {
        .top-feature {
            display: none;
        }

        .site-main {
            padding-top: 40px;
        }

        .site-content {
            .notify {
                margin: 30px 0 0 0;
            }

            .search-result {
                margin-bottom: 20px;
                font-size: 16px;
            }
        }
    }

    /******/
</style>
