<template>
    <div>
        <header-component @toSearch="toSearch"></header-component>
        <el-row v-if="isFindVideo === 2" :gutter="20">
            <el-col v-for="(item,index) in cardData" :key="index" :span="6">
            <div class="grid-content bg-purple" >
                <el-card>
                    <el-image
                        @click="toVideoPage(index)"
                        style="width: 100%; height: 200px; border-radius: 10px;"
                        :src="item.imageAddr"
                    ></el-image>
                    <div style="height:20%;width:100%">
                        <p class="titlestyle">{{item.title}}</p>
                        <p style="color:#606266">{{item.userName}} {{item.updateTime}}</p>
                    </div>
                </el-card>
            </div>
            </el-col>
        </el-row>
        <h2 v-else-if="isFindVideo === 1">未找到相关视频！</h2>
        <h2 v-else-if="isFindVideo === 0">请输入查找关键词!</h2>
        <h2 v-else>出错啦! 请看SearchPage</h2>

    </div>
</template>

<script>
import headerComponent from '../../components/headerComponent'
export default {
    name:"SearchPage",
    components: {headerComponent},
    data(){
        return{
            searchFlag: false,
            isFindVideo: 0, // 0 : 请输入关键字 1 : 未找到相关视频 2 : ok
            cardData: []
        }
    },
    mounted () {
      // console.log('头像', this.$route.params.avatarAddr)
        this.toSearch()
    },
    methods: {
        toSearch (searchContent) {
            let submitData = {}
            if (this.searchFlag === false) {
                submitData = {content: this.$route.query.searchInput}
                this.searchFlag = true
            } else {
                if (searchContent !== null) {
                    submitData = {content: searchContent}
                } else {
                    this.$message.error('搜索的内容没有传过来, 请看SearchPage-toSearch')
                }
            }
            console.log('搜索传递的信息：', submitData)
            if (submitData === null || submitData['content'] === null || submitData['content'] === '') {
                this.$message({
                    message: '请输入查找关键词',
                    type: 'warning'
                })
                this.isFindVideo = 0
            } else {
                this.$axios.post('/video/getVideoList', submitData).then(response => {
                    console.log('response-searchPage', response.data)
                    if (response.data.code === 200) {
                        this.cardData = response.data.data
                        if (this.cardData.length > 0) {
                            for (let i = 0, len = this.cardData.length; i < len; i++) {
                                let imageAddr = this.cardData[i]['videoAddr'].substr(0, this.cardData[i]['videoAddr'].indexOf('.')) + '.jpg'
                                this.cardData[i]['imageAddr'] = 'http://172.22.173.94:8081/' + imageAddr
                                // console.log(this.cardData[i]['imageAddr'])
                                this.cardData[i]['userName'] = '雄安命'
                            }
                            this.isFindVideo = 2
                        } else {
                            this.$message({
                                message: '未找到相关视频！',
                                type: 'warning'
                            })
                            this.isFindVideo = 1
                        }
                    } else {
                        console.log("初始化失败")
                    }
                }).catch(error => {
                    console.log(error)
                // catch要和get连起来，不能写在else后面
                })
            }
        },
        toVideoPage (index) {
            let videoData = this.cardData[index]
            console.log('公共页-视频页-传递数据-视频ID：', videoData.id)
            this.$router.push({
                path: '/videoPage',
                query: {
                    videoDataId: videoData.id,
                    videoDataAddr: videoData.videoAddr
                }
            })
        },

    }
}
</script>
