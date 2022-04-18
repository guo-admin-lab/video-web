<template>
<!-- 科学科普 -->
    <div>
        <!-- <header-component></header-component> -->
        <!-- 标签的header -->
        <el-card>
            <el-row>
                <el-col span="3" offset="3">
                    <el-avatar shape="square" :size="100" :fit="contain" src='https://img2.baidu.com/it/u=287485602,537568457&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=480'></el-avatar>
                </el-col>
                <el-col span="10" offset="1">
                    <p style="font-size:20px;font-weight:bold;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif">科学科普</p>
                </el-col>
            </el-row>           
        </el-card>
        <!-- 标签内的视频 --> 
        <el-card>
        <el-row class="tac" :gutter="40">       
            <el-col>
            <div>
                <el-row :gutter="20">
                <el-col v-for="(item, index) in cardData" :key="index" :span="6">
                    <div class="grid-content bg-purple">
                    <el-card>
                        <el-image
                        @click="toVideoPage"
                        style="width: 100%; height: 100%"
                        :src="require('../../assets/images/' + item.url)"
                        ></el-image>
                        <div style="height: 20%; width: 100%">
                        <p class="videotitle">{{ item.title }}</p>
                        <p style="color: #606266">
                            {{ item.name }} {{ item.time }}
                        </p>
                        </div>
                    </el-card>
                    </div>
                </el-col>
                </el-row>
            </div>
            </el-col>
        </el-row>
        </el-card>        
    </div>
    
</template>

<script>
import headerComponent from '../../components/headerComponent'

export default({
    name: "labelPage2",
    components: {headerComponent},
    data(){
        return{
            cardData: [
                {
                url: "video1.png",
                title: "吉尼斯世界纪录最甜的物质是？",
                name: "小魏科普",
                time: "3-2",
                },
                // {
                // url: "video2.png",
                // title: "再有人欠你钱不还，一招拘留他！\n",
                // name: "张鹏宇律师",
                // time: "2-22",
                // },
                // {
                // url: "video3.png",
                // title: "叶利钦の小曲《爱国歌》",
                // // 俄罗斯联邦1991—2000国歌《爱国歌》
                // name: "快乐茄子人",
                // time: "2021-8-28",
                // },
                // {
                // url: "video4.png",
                // title: "20年后，中国什么最值钱？\n",
                // name: "财富研究院",
                // time: "3-4",
                // },
                // {
                // url: "video5.png",
                // title: "你听说过英语的限定词吗？",
                // name: "英语兔",
                // time: "3-5",
                // },
                // {
                // url: "video6.png",
                // title: "工作中总要麻烦其他领导怎么办？",
                // name: "体制内老秘书",
                // time: "3-4",
                // },
                // {
                // url: "video7.png",
                // title: "七种未定式的计算—1的∞次幂型",
                // name: "张宇考研数学",
                // time: "3-20",
                // },
                // {
                // url: "video8.png",
                // title: "说说这8种产品经理",
                // name: "产品经理王学姐",
                // time: "3-9",
                // },
            ]
        }
    }
})
</script>

