<template>
  <div>
    <!-- <header-component></header-component> -->
    <el-row>
      <!-- 名片card -->
      <el-col span="5">
        <el-card style="height: 160px">
          <el-row>
            <el-col :span="10">
              <el-avatar
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                style="width: 80px; height: 80px"
              ></el-avatar>
            </el-col>
            <el-col :span="10">
              <p class="namestyle">一只绵羊__</p>
            </el-col>
          </el-row>
          <!-- <el-row>
                    <p class=followstyle>
                        <i class="el-icon-user-solid"></i>39关注
                        <i class="el-icon-s-custom"></i>3粉丝
                        <i class="el-icon-s-help"></i>5动态 </p>
                </el-row>            -->
        </el-card>
      </el-col>
      <!-- 动态 -->
      <el-col span="19">
        <!-- 自己发动态 -->
        <el-row>
          <el-card>
            <el-row :gutter="20">
              <el-col span="21">
                <el-input
                  type="textarea"
                  :rows="1"
                  placeholder="请输入搜索内容"
                  v-model="textarea"
                >
                </el-input>
              </el-col>
              <el-col span="3">
                <el-button type="warning" plain round>搜索</el-button>
              </el-col>
            </el-row>
          </el-card>
        </el-row>
        <!-- 他人动态 -->
        <el-row>
          <el-card>
            <el-row v-for="(item, index) in spaceData.otherUser" :key="index">
              <!-- 头像 -->
              <el-col :span="2">
                <el-avatar :size="50" :src="item.avatar"></el-avatar>
              </el-col>
              <!-- 三行：名字+视频+时间 -->
              <el-col :span="18">
                <!-- 名字 -->
                <el-row>
                  <p class="namestyle">{{ item.name }}</p>
                </el-row>
                <!-- 视频：左图片，右标题+描述 -->
                <el-row :gutter="30">
                  <el-col :span="6">
                    <el-image
                      @click="toVideoPage"
                      style="width: 100%; height: 100%; border-radius: 10px"
                      :src="require('../../assets/images/' + item.url)"
                    ></el-image>
                  </el-col>
                  <el-col :span="18">
                    <p class="titlestyle">{{ item.title }}</p>
                    <p style="color: #606266; font-size: 15px">
                      {{ item.des }}
                    </p>
                  </el-col>
                </el-row>
                <!-- 发布时间 -->
                <el-row>
                  <p style="color: #909399">{{ item.createTime }}</p>
                </el-row>
                <el-divider></el-divider>
              </el-col>
            </el-row>
          </el-card>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import headerComponent from "../../components/headerComponent";
export default {
  name: "SpacePage",
  components: { headerComponent },
  data() {
    return {
      pageData: {
        src: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      },
      spaceData: {
        userAvatar: "assets/images/userAvatar.png",
        textarea: "",
        otherUser: [
          {
            avatar: "assets/images/userAvatar.png",
            name: "小魏科普",
            title: "吉尼斯世界纪录最甜的物质是？",
            des: "快来看看世界上最甜的东西是什么吧！",
            url: "video1.png",
            createTime: "2019-04-03 11:31:45",
          },
          {
            avatar: "assets/images/userAvatar.png",
            name: "张鹏宇律师",
            title: "再有人欠你钱不还，一招拘留他！",
            des: "一招教你如何面对他人欠钱不还！",
            url: "video2.png",
            createTime: "2019-04-03 11:31:45",
          },
          {
            avatar: "assets/images/userAvatar.png",
            name: "快乐茄子人",
            title: "叶利钦の小曲《爱国歌》",
            des: "爱国歌 俄罗斯联邦1991—2000叶利钦时期所使用的国歌 希望你们能喜欢",
            url: "video3.png",
            createTime: "2019-04-03 11:31:45",
          },
          {
            avatar: "assets/images/userAvatar.png",
            name: "财富研究院",
            title: "20年后，中国什么最值钱？",
            des: "参照日本的老龄化，就很清楚的知道年轻人根本不会有钱甚至更加没钱了",
            url: "video4.png",
            createTime: "2019-04-03 11:31:45",
          },
          {
            avatar: "assets/images/userAvatar.png",
            name: "英语兔",
            title: "你听说过英语的限定词吗？",
            des: '这次咱们说说英语里的所谓"限定词".',
            url: "video5.png",
            createTime: "2019-04-03 11:31:45",
          },
          {
            avatar: "assets/images/userAvatar.png",
            name: "体制内老秘书",
            title: "工作中总要麻烦其他领导怎么办？",
            des: "经典解说又回来了！",
            url: "video6.png",
            createTime: "2019-04-03 11:31:45",
          },
        ],
      },
    };
  },
};
</script>
<style lang="less" scoped>
.titlestyle {
  // font-weight:bold;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  /* font-size: 13px; */
  /* font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; */
}
.namestyle {
  font-weight: bold;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  /* font-size: 15px; */
  /* font-family:'Times New Roman', Times, serif; */
}
.followstyle {
  // font-weight: bold;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
</style>