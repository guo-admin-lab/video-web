<style lang="less" scoped>
    .el-row {
        margin-bottom: 20px;
        /* &:last-child {
              margin-bottom: 0;
          } */
    }

    .videotitle {
        font-weight: bold;
        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
        /* font-size: 15px; */
        /* font-family:'Times New Roman', Times, serif; */
    }

    .namestyle {
        font-weight: bold;
        font-size: 17px;
    }

    .el-col {
        border-radius: 4px;
    }

    .filmVideo {
        margin: 0 auto;
    }

    .videoPageMainContent {
    }

    .video_text {
        width: 70%;
        margin: 0 auto;
    }

    video:focus {
        outline: 0; //去掉选中蓝框
    }

    .video-js .vjs-big-play-button {
        /*对播放按钮的样式进行设置*/
        //width: 200px;
        //height: 300px;
        //position: absolute;
        //top: 5px;
        //left: 5px;
        //transform: translate3d(-50%,-50%,0);
        //disabled: true
    }
</style>

<template>
    <div class="videoPageMainContent">
        <div class="videoContent">
            <!--          标题-->
            <div>
                <h2 class="videotitle" style="color: #303133">{{ videoData.title }}</h2>
                <p style="color: #909399">
                    {{ videoData.playAmount }}播放 {{ videoData.createTime }}
                </p>
            </div>
            <!--          视频-->
            <div v-if="isShowVideo">
                <video class="video-js filmVideo" id="myVideo">
                    <source :src="videoData.url" controls="controls" type="video/mp4"/>
                </video>
            </div>
            <!--          [点赞，收藏，转发]，笔记，收藏，简介，标签-->
            <div>
                <p style="color: #606266">
                    <svg class="icon" aria-hidden="true" @click="likeAction">
                        <use v-if="videoData.isLikeClick" xlink:href="#icon-dianzan1"></use>
                        <use v-else xlink:href="#icon-dianzan"></use>
                    </svg> {{ videoData.likeNum }}
                    <svg class="icon" aria-hidden="true" @click="collectInit">
                        <use v-if="videoData.isCollectClick" xlink:href="#icon-shoucang1"></use>
                        <use v-else xlink:href="#icon-shoucang"></use>
                    </svg> {{ videoData.collectNum }}
                </p>
                <!-- 笔记 -->
                <div>
                    <!-- 记笔记按钮 -->
                    <el-button @click="noteInit" round type="primary">记笔记</el-button>
                    <div v-if="outerVisible">
                        <el-dialog :visible.sync="outerVisible" title="开始记录你的笔记吧~">
                            <el-dialog
                                    :visible.sync="innerVisible"
                                    append-to-body
                                    title="新建标签"
                                    width="30%">
                                <el-input placeholder="请输入标签名称" v-model="input"></el-input>
                                <span class="dialog-footer" slot="footer">
                                    <el-button @click="innerVisible = false">取 消</el-button>
                                    <el-button @click="setNewNoteLabel" type="primary">确 定</el-button>
                                </span>
                            </el-dialog>
                            <div>
                                <el-radio-group v-model="hadLabel">
                                    <el-radio-button :key="index" :label="item"
                                                     v-for="(item, index) in labelData"></el-radio-button>
                                </el-radio-group>
                                <el-button @click="innerVisible = true" type="primary">新建标签</el-button>
                                <el-input
                                        :rows="10"
                                        placeholder="请输入笔记内容"
                                        type="textarea"
                                        v-model="textarea"
                                >
                                </el-input>
                            </div>
                            <div class="dialog-footer" slot="footer">
                                <el-button @click="outerVisible = false">取 消</el-button>
                                <el-button @click="note" type="success">保存</el-button>
                            </div>
                        </el-dialog>
                    </div>
                </div>

                <!-- 收藏面板 -->
                <div>
                    <!-- 收藏视频按钮 -->
<!--                    <el-button @click="collectInit" round type="primary">收藏视频</el-button>-->
                    <div v-if="outerVisibleCollect">
                        <el-dialog :visible.sync="outerVisibleCollect" title="开始记录你的笔记吧~">
                            <el-dialog
                                    :visible.sync="innerVisibleCollect"
                                    append-to-body
                                    title="新建收藏标签"
                                    width="30%">
                                <el-input placeholder="请输入标签名称" v-model="input1"></el-input>
                                <span class="dialog-footer" slot="footer">
                                    <el-button @click="innerVisibleCollect = false">取 消</el-button>
                                    <el-button @click="setNewCollectLabel" type="primary">确 定</el-button>
                                </span>
                            </el-dialog>
                            <div>
                                <el-radio-group v-model="hadCollect">
                                    <el-radio-button :key="index" :label="item"
                                                     v-for="(item, index) in collectData"></el-radio-button>
                                </el-radio-group>
                                <el-button @click="innerVisibleCollect = true" type="primary">新建收藏夹</el-button>
                            </div>
                            <div class="dialog-footer" slot="footer">
                                <el-button @click="outerVisibleCollect = false">取 消</el-button>
                                <el-button @click="collect" type="success">确定</el-button>
                            </div>
                        </el-dialog>
                    </div>
                </div>

                <!-- 简介，标签 -->
                <el-divider></el-divider>
                <p style="color: #606266">{{ videoData.description }}</p>
                <el-row>
                    <el-col
                            :key="index"
                            :span="2"
                            v-for="(item, index) in videoData.label"
                    >
                        <el-button round size="mini">{{ item }}</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
        <el-divider></el-divider>
        <!--      发表评论-->
        <div class="userCommentContent">
            <el-row :gutter="20">
                <el-col :span="2">
                    <el-avatar :size="50" :src="commentData.userAvatar"></el-avatar>
                </el-col>
                <el-col :span="18">
                    <el-input
                            :rows="5"
                            placeholder="请输入内容"
                            type="textarea"
                            v-model="commentData.textarea"
                    ></el-input>
                </el-col>
                <el-col :span="4">
                    <el-button
                            @click="comment"
                            v-loading.fullscreen.lock="fullscreenLoading"
                    >发表评论
                    </el-button
                    >
                </el-col>
            </el-row>
            <el-divider></el-divider>
        </div>
        <!--      他人评论-->
        <div class="otherUserCommentContent">
            <el-row :key="index" v-for="(item, index) in commentData.otherUser">
                <el-col :span="2">
                    <el-avatar :size="50" :src="item.avatar"></el-avatar>
                </el-col>
                <el-col :span="18">
                    <p class="namestyle">{{ item.name }}</p>
                    <p>{{ item.content }}</p>
                    <p style="color: #909399">{{ item.createTime }}</p>
                    <el-divider></el-divider>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import headerComponent from "../../components/headerComponent";
    import statisticApi from "../../api/statisticApi";
    export default {
        name: "VideoPage",
        components: {headerComponent},
        data() {
            return {
                innerVisible: false,
                outerVisible: false,
                innerVisibleCollect: false,
                outerVisibleCollect: false,
                //新建笔记标签内容
                input: "",
                //新建视频收藏标签内容
                input1: "",
                fullscreenLoading: false,
                isShowVideo: true,
                videoData: {
                    id: "1",
                    title: "尚硅谷Java入门视频教程(在线答疑+Java面试真题)",
                    description: "【配套答疑】每天9-17点, 技术老师评论区答疑",
                    label: ["编程", "科技", "计算机技术"],
                    playAmount: "1258.5万",
                    createTime: "2019-04-03 11:31:45",
                    // url: 'http://172.22.173.94:8081/video/1.mp4',
                    url: "",
                    likeNum: "2.5万",
                    collectNum: "22.3万",
                    isLikeClick: false,
                    isCollectClick: false
                },
                commentData: {
                    userAvatar: "assets/images/userAvatar.png",
                    textarea: "",
                    otherUser: [],
                },
                //笔记内容
                textarea: "",
                labelData: [],
                hadLabel: "",
                //收藏
                collectData: [],
                hadCollect: "",
            };
        },
        created() {
            this.init();
        },
        mounted() {
            this.initVideo(); //初始化视频播放器
            console.log("CollectData", this.CollectData);
        },
        methods: {
            //[收藏]点击“收藏视频”时触发，初始化收藏标签
            collectInit() {
                if (this.videoData.isCollectClick === false) {
                    let userId = parseInt(localStorage.userId);
                    this.$axios.get("/collect/getLabelList?userId=" + userId).then((response) => {
                        console.log(response.data);
                        if (response.data.code === 200) {
                            if (response.data.data !== null) {
                                this.collectData = response.data.data;
                                this.hadCollect = this.collectData[0]
                                this.outerVisibleCollect = true
                            }
                        }
                    }).catch((error) => {
                        this.$message.error("视频收藏失败！");
                        console.log("error", error);
                    });
                } else {
                    this.$message.warning("您已收藏过此视频~")
                }
            },
            //[收藏]点击“确定”时触发，收藏视频
            collect() {
                let userId = parseInt(localStorage.userId);
                let CollectForm = {
                    userId: userId,
                    videoId: this.videoData.id,
                    label: this.hadCollect,
                };
                this.$axios
                    .post("/collect/publish", CollectForm)
                    .then((response) => {
                        console.log(response.data);
                        if (response.data.code === 200) {
                            this.$message({
                                message: "视频收藏成功",
                                type: "success",
                            });
                            this.input1 = ''
                            // this.$router.go(0)
                            this.init()
                        }
                    })
                    .catch((error) => {
                        this.$message.error("视频收藏失败！");
                        console.log("error", error);
                    })
                    .finally(() => {
                        this.outerVisibleCollect = false
                        this.input1 = ''
                    })
            },
            // [笔记]点击”记笔记“时触发，以用户ID获取用户笔记标签内容
            noteInit() {
                let userId = parseInt(localStorage.userId);
                this.$axios
                    .get("/note/getLabelList?userId=" + userId)
                    .then((response) => {
                        console.log(response.data);
                        if (response.data.code === 200) {
                            if (response.data.data !== null) {
                                this.labelData = response.data.data;
                                this.hadLabel = this.labelData[0]
                                this.outerVisible = true
                            }
                        }
                    })
                    .catch((error) => {
                        this.$message.error("笔记记录失败！");
                        console.log("error", error);
                    });
            },
            //[笔记]点击”保存“时触发，记笔记
            note() {
                let userId = parseInt(localStorage.userId);
                let noteForm = {
                    userId: userId,
                    content: this.textarea, //笔记内容
                    videoId: this.videoData.id,
                    label: this.hadLabel
                };
                if (this.textarea) {
                    this.$axios
                        .post("/note/publish", noteForm)
                        .then((response) => {
                            console.log(response.data);
                            if (response.data.code === 200) {
                                this.$message({
                                    message: "笔记记录成功",
                                    type: "success",
                                });
                            }
                        })
                        .catch((error) => {
                            this.$message.error("笔记记录失败！");
                            console.log("error", error);
                        })
                        .finally(() => {
                            this.outerVisible = false
                            this.input = ''
                            this.textarea = ''
                        })
                } else {
                    console.log("请输入笔记内容！");
                    this.$message.error("请输入笔记内容！");
                }
            },
            // 发布评论
            comment() {
                let userId = parseInt(localStorage.userId);
                let commentForm = {
                    userId: userId,
                    commentContent: this.commentData.textarea,
                    videoId: this.videoData.id,
                };
                console.log("发送的数据：", commentForm);
                if (this.commentData.textarea) {
                    this.fullscreenLoading = true;
                    this.$axios
                        .post("/comment/publish", commentForm)
                        .then((response) => {
                            console.log(response.data);
                            if (response.data.code === 200) {
                                this.$message({
                                    message: "发布评论成功",
                                    type: "success",
                                });
                                this.init();
                                this.fullscreenLoading = false;
                            }
                        })
                        .catch((error) => {
                            this.$message.error("发布评论失败！");
                            console.log("error", error);
                        })
                        .finally(() => {
                            this.commentData.textarea = "";
                        });
                } else {
                    console.log("请输入评论内容！");
                    this.$message.error("请输入评论内容！");
                }
            },
            // 初始化视频相关信息、评论信息
            init() {
                this.videoData.url =
                    "http://172.22.173.94:8081/" + this.$route.query.videoDataAddr;
                console.log("视频地址-VideoPage: ", this.videoData.url);
                this.fullscreenLoading = true;
                this.$axios.get("/video/getVideo?videoId=" + this.$route.query.videoDataId).then((response) => {
                        console.log("获取单个视频结果的内容-VideoPage: ", response.data);
                        let sourceData = response.data.data;
                        this.videoData.id = sourceData.id;
                        this.videoData.title = sourceData.title;
                        this.videoData.description = sourceData.description;
                        this.videoData.label = [sourceData.label];
                        this.videoData.createTime = sourceData.createTime;
                        this.videoData.likeNum = sourceData.like.number
                        this.videoData.isLikeClick = sourceData.like.click
                        this.videoData.collectNum = sourceData.collect.number
                        this.videoData.isCollectClick = sourceData.collect.click
                        // for (let i = 0; i < sourceData.commentAndUserList.length; i++) {
                        //     let element = sourceData.commentAndUserList[i]
                        // }
                        this.commentData.otherUser = [];

                        sourceData.commentAndUserList.forEach((element) => {
                            let otherUserData = {};
                            otherUserData["avatar"] =
                                "http://172.22.173.94:8081/" + element.user.avatarAddr;
                            otherUserData["name"] = element.user.username;
                            otherUserData["content"] = element.comment.content;
                            otherUserData["createTime"] = element.comment.createTime;
                            this.commentData.otherUser.push(otherUserData);
                        });
                        this.fullscreenLoading = false;
                    }).catch((error) => {
                        console.log("初始化视频失败-VideoPage: ", error);
                        this.fullscreenLoading = false;
                    });
            },
            initVideo() {
                //初始化视频方法
                let myPlayer = this.$video(myVideo, {
                    //是否显示控制栏
                    controls: true,
                    //是否自动播放,muted:静音播放
                    autoplay: false,
                    //是否静音播放
                    muted: false,
                    //是否流体自适应容器宽高
                    // fluid:true,
                    //设置视频播放器的显示宽度（以像素为单位）
                    width: "800px",
                    //设置视频播放器的显示高度（以像素为单位）
                    height: "400px",
                });
            },
            // 新建标签
            setNewNoteLabel() {
                this.labelData.push(this.input)
                this.innerVisible = false
            },
            setNewCollectLabel() {
                this.collectData.push(this.input1)
                this.innerVisibleCollect = false
            },
            // 点赞和取消点赞的操作
            likeAction () {
                if (this.videoData.isLikeClick) {
                    statisticApi.deleteLike(this.videoData.id).then(response => {
                        if (response.data.code === 200) {
                            this.$message.success("取消点赞成功~")
                            // this.$router.go(0)
                            this.init()
                        }
                    }).catch(error => {
                        this.$message.error("取消点赞失败！")
                        console.log("取消点赞失败的原因：", error)
                    })
                } else {
                    statisticApi.insertLike(this.videoData.id).then(response => {
                        if (response.data.code === 200) {
                            this.$message.success("点赞成功~")
                            // this.$router.go(0)
                            this.init()
                        }
                    }).catch(error => {
                        this.$message.error("点赞失败！")
                        console.log("点赞失败的原因：", error)
                    })
                }
            }
        },
    };
</script>
