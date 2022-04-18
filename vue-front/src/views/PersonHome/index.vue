<template>
  <div>
    <!-- 第一个card，图片+导航 -->
    <el-card>
      <!--    图片 padding上左下右-->
      <div class="block">
        <el-image :src="pageData.src" style="height: 200px; width: 100%">
        </el-image>
      </div>
      <!-- 导航 -->
      <div>
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#FFFFFF"
          text-color="#303133"
          active-text-color="#ffd04b"
        >
          <!--头像-->
          <el-menu-item>
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
          </el-menu-item>
          <el-menu-item index="1" @click="changeType('myUpload')">
            <i class="el-icon-upload"></i
            ><span class="titlestyle">我的投稿</span>
          </el-menu-item>
          <el-menu-item index="2" @click="changeType('collect')">
            <i class="el-icon-star-on"></i
            ><span class="titlestyle">我的收藏</span></el-menu-item
          >
          <el-menu-item index="3" @click="changeType('note')">
            <i class="el-icon-s-order"></i
            ><span class="titlestyle">我的笔记</span>
          </el-menu-item>
          <!-- 留白 -->
          <el-menu-item index="4"></el-menu-item>
          <el-menu-item index="4"></el-menu-item>
          <el-menu-item index="4"></el-menu-item>
          <el-menu-item index="4"></el-menu-item>
          <el-menu-item index="4"></el-menu-item>
          <el-menu-item index="4"></el-menu-item>
          <el-menu-item index="4"></el-menu-item>
          <el-menu-item index="4"></el-menu-item>
          <el-menu-item index="4"></el-menu-item>
          <el-menu-item index="4"></el-menu-item>
          <el-menu-item index="5"
            ><span class="titlestyle">关注数 39</span></el-menu-item
          >
          <el-menu-item index="6"
            ><span class="titlestyle">粉丝数 3</span></el-menu-item
          >
          <el-menu-item index="7"
            ><span class="titlestyle">获赞数 4</span></el-menu-item
          >
          <!-- <el-menu-item index="8"
            ><span class="titlestyle">播放数 10</span></el-menu-item
          >
          <el-menu-item index="9"
            ><span class="titlestyle">阅读数 0</span></el-menu-item
          > -->
        </el-menu>
      </div>
    </el-card>
    <!-- 第二个card，收藏+投稿+笔记 -->
    <person-content ref="personContent" :type="type"></person-content>
  </div>
</template>

<script>
import headerComponent from "../../components/headerComponent";
import personContent from "./personContent";
export default {
  name: "PersonHome",
  components: { headerComponent, personContent },
  data() {
    return {
      type: "myUpload",
      // 背景图
      pageData: {
        src: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      },
      cardData: [
        {
          url: "video1.png",
          title: "吉尼斯世界纪录最甜的物质是？",
          name: "小魏科普",
          time: "3-2",
        },
        {
          url: "video2.png",
          title: "再有人欠你钱不还，一招拘留他！\n",
          name: "张鹏宇律师",
          time: "2-22",
        },
        {
          url: "video3.png",
          title: "叶利钦の小曲《爱国歌》",
          // 俄罗斯联邦1991—2000国歌《爱国歌》
          name: "快乐茄子人",
          time: "2021-8-28",
        },
        {
          url: "video4.png",
          title: "20年后，中国什么最值钱？\n",
          name: "财富研究院",
          time: "3-4",
        },
        {
          url: "video5.png",
          title: "你听说过英语的限定词吗？",
          name: "英语兔",
          time: "3-5",
        },
        {
          url: "video6.png",
          title: "工作中总要麻烦其他领导怎么办？",
          name: "体制内老秘书",
          time: "3-4",
        },
        {
          url: "video7.png",
          title: "七种未定式的计算—1的∞次幂型",
          name: "张宇考研数学",
          time: "3-20",
        },
        {
          url: "video8.png",
          title: "说说这8种产品经理",
          name: "产品经理王学姐",
          time: "3-9",
        },
      ],
    };
  },
  mounted() {
    // 此方法已经换成监听方法
    // this.$refs['personContent'].getListByType()
  },
  methods: {
    toMessagePage() {
      this.$router.push("/messagePage");
    },
    changeType(type) {
      this.type = type;
      // 此方法已经换成监听方法
      // this.$refs['personContent'].getListByType()
    },
  },
};
</script>

<style scoped>
/* 图片下的导航 */
.titlestyle {
  font-weight: bold;
  font-size: 15px;
  font-family: "Times New Roman", Times, serif;
}
/* 视频标题 */
.videotitle {
  font-weight: bold;
  /* font-size: 13px; */
  /* font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; */
}
/* 左侧导航 */
.navstyle {
  font-weight: bold;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  /* font-size: 15px; */
  /* font-family:'Times New Roman', Times, serif; */
}
</style>
