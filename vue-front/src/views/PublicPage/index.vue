<template>
    <div>
        <!--      导航-->
        <!-- <header-component></header-component> -->

        <div style="margin-top: 15px; padding: 0px 0px 0px 0px">
            <!--      走马灯-->
            <div>
                <el-row>
                    <el-col :span="24">
                        <div>
                            <el-carousel :interval="10000" height="400px" type="card">
                                <el-carousel-item style="background-color: #FFFFFF" v-for="(url, index) in carouselData.url" :key="index">
                                    <el-image :src="require('../../assets/images/' + url)" style="width: 100%; height: 100%; border-radius: 30px;"></el-image>
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <!--        标签         -->
<!--            <el-row :gutter="5">-->
<!--                &lt;!&ndash; <el-col v-for="(item,index) in labelData" :key="index" :span="4">-->
<!--                    <el-button style="margin: 0 auto" round @click="toLabelPage">{{ item.name }}</el-button>-->
<!--                  </el-col> &ndash;&gt;-->
<!--                <el-col :span="3">-->
<!--                    <el-button @click="toLabelPage2" round style="margin: 0 auto"-->
<!--                    >科学科普-->
<!--                    </el-button-->
<!--                    >-->
<!--                </el-col>-->
<!--                <el-col :span="3">-->
<!--                    <el-button @click="toVideoClassify" round style="margin: 0 auto"-->
<!--                    >动作分类-->
<!--                    </el-button-->
<!--                    >-->
<!--                </el-col>-->
<!--                <el-col :span="3">-->
<!--                    <el-button @click="toLabelPage3" round style="margin: 0 auto"-->
<!--                    >社科·法律·心理-->
<!--                    </el-button-->
<!--                    >-->
<!--                </el-col>-->
<!--                <el-col :span="3">-->
<!--                    <el-button @click="toLabelPage4" round style="margin: 0 auto"-->
<!--                    >人文历史-->
<!--                    </el-button-->
<!--                    >-->
<!--                </el-col>-->
<!--                <el-col :span="3">-->
<!--                    <el-button @click="toLabelPage5" round style="margin: 0 auto"-->
<!--                    >财经商业-->
<!--                    </el-button-->
<!--                    >-->
<!--                </el-col>-->
<!--                <el-col :span="3">-->
<!--                    <el-button @click="toLabelPage" round style="margin: 0 auto"-->
<!--                    >校园学习-->
<!--                    </el-button-->
<!--                    >-->
<!--                </el-col>-->
<!--                <el-col :span="3">-->
<!--                    <el-button @click="toLabelPage6" round style="margin: 0 auto"-->
<!--                    >职业职场-->
<!--                    </el-button-->
<!--                    >-->
<!--                </el-col>-->
<!--            </el-row>-->
            <div style="display: flex; justify-content: space-between">
                <el-button v-for="(item, index) in labelData" :key="index" @click="toLabelPage3" round style="margin: 0 auto">
                    {{ item }}
                </el-button>
            </div>

            <el-divider></el-divider>

            <!--        首页8个视频-->
            <div>
                <el-row :gutter="20" v-loading="loading">
                    <el-col :key="index" :span="6" v-for="(item, index) in cardData">
                        <div class="grid-content bg-purple">
                            <el-card>
                                <el-image
                                        :src="item.imageAddr"
                                        @click="toVideoPage(index)"
                                        style="width: 100%; height: 220px; border-radius: 10px"
                                ></el-image>
                                <div style="height: 20%; width: 100%">
                                    <p class="titlestyle">{{ item.title }}</p>
                                    <p style="color: #606266">
                                        {{ item.username }} {{ item.updateTime }}
                                    </p>
                                </div>
                            </el-card>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import headerComponent from "../../components/headerComponent";

    export default {
        name: "PublicPage",
        components: {headerComponent},
        data() {
            return {
                loading: true,
                carouselData: {
                    url: ["img1.png", "img2.png", "img3.png", "img4.png"],
                },
                labelData: [
                    {
                        name: "科学科普",
                    },
                    {
                        name: "社科·法律·心理",
                    },
                    {
                        name: "人文历史",
                    },
                    {
                        name: "财经商业",
                    },
                    {
                        name: "校园学习",
                    },
                    {
                        name: "职业职场",
                    },
                ],
                cardData: [],
            };
        },
        mounted() {
            // console.log('头像', this.$route.params.avatarAddr)
            this.init();
        },
        methods: {
            init() {
                this.$axios.post("/video/getVideoList").then((response) => {
                        console.log("response", response.data);
                        if (response.data.code === 200) {
                            this.cardData = response.data.data;
                            let videoLabelSet = new Set()
                            for (let i = 0, len = this.cardData.length; i < len; i++) {
                                let imageAddr = this.cardData[i]["videoAddr"].substr(0, this.cardData[i]["videoAddr"].indexOf(".")) + ".jpg";
                                this.cardData[i]["imageAddr"] = "http://172.22.173.94:8081/" + imageAddr;
                                videoLabelSet.add(this.cardData[i].label)
                            }
                            this.labelData = videoLabelSet
                            console.log("视频标签：", this.labelData)
                            console.log("获取视频列表成功");
                            this.$message.success("获取视频列表成功~")
                        } else {
                            console.log("获取视频列表失败 response不为200");
                            this.$message.error("获取视频列表失败 response不为200")
                        }
                    }).catch((error) => {
                        console.log("获取视频列表失败原因：", error);
                        this.$message.error("获取视频列表失败")
                    }).finally(() => {
                        this.loading = false
                })
            },
            toVideoPage(index) {
                let videoData = this.cardData[index];
                console.log("公共页-视频页-传递数据-视频ID：", videoData.id);
                this.$router.push({
                    path: "/videoPage",
                    query: {
                        videoDataId: videoData.id,
                        videoDataAddr: videoData.videoAddr,
                    },
                });
            },
            toVideoClassify() {
                this.$router.push("/videoClassify");
            },
            toLabelPage2() {
                this.$router.push("/labelPage2");
            },
            toLabelPage3() {
                this.$router.push("/labelPage3");
            },
            toLabelPage4() {
                this.$router.push("/labelPage4");
            },
            toLabelPage5() {
                this.$router.push("/labelPage5");
            },
            toLabelPage6() {
                this.$router.push("/labelPage6");
            },
            toLabelPage() {
                this.$router.push("/labelPage");
            },
        },
    };
</script>

<style scoped>
    /* 视频标题 */
    .titlestyle {
        font-weight: bold;
        /* font-size: 13px; */
        /* font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; */
    }

    .el-row {
        margin-bottom: 20px;
        /* &:last-child {
              margin-bottom: 0;
          } */
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
    }
</style>
