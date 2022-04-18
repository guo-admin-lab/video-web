<template>
  <div>
    <!-- 回复我的 -->
    <div v-if="type === 'reply'">
      <el-card>
        <el-row v-for="(item, index) in commentData.otherUser" :key="index">
          <!-- 头像 -->
          <el-col :span="2">
            <el-avatar :size="50" :src="item.avatar"></el-avatar>
          </el-col>
          <!-- 其他信息 -->
          <el-col :span="18">
            <p class="namestyle">{{ item.name }}</p>
            <p>{{ item.content }}</p>
            <p style="color: #909399">{{ item.createTime }}</p>
            <el-divider></el-divider>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <!-- 收到的赞 -->
    <div v-else-if="type === 'who'">
      <el-card>
        <el-row v-for="(item, index) in commentData.otherUser" :key="index">
          <!-- 头像 -->
          <el-col :span="2">
            <el-avatar :size="50" :src="item.avatar"></el-avatar>
          </el-col>
          <!-- 其他信息 -->
          <el-col :span="18">
            <span class="namestyle">{{ item.name }}</span>
            <span style="color:#606266">             赞了我的评论</span>
            <p style="color: #909399">{{ item.createTime }}</p>
            <el-divider></el-divider>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <!-- 系统通知 -->
    <div v-else-if="type === 'system'">
      <el-card>
        <el-row v-for="(item, index) in systemData.otherUser" :key="index">
          <!-- 头像
          <el-col :span="2">
            <el-avatar :size="50" :src="item.avatar"></el-avatar>
          </el-col> -->
          <!-- 其他信息 -->
          <el-col :span="18">
            <span class="namestyle">{{ item.title }}</span>
            <span style="color: #909399">{{ item.createTime }}</span>
            <p style="color:#606266">{{ item.content }}</p>
            <el-divider></el-divider>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "content",
  props: {
    type: 'reply'
  },
  data() {
    return {
      commentData: {
        userAvatar: "assets/images/userAvatar.png",
        textarea: "",
        otherUser: [
          {
            avatar: "assets/images/userAvatar.png",
            name: "甜咸蛋包饭",
            content: "哇，你分享的这个观点真的很新颖！",
            createTime: "2022-03-03 11:31:45",
          },
          {
            avatar: "assets/images/userAvatar.png",
            name: "番茄沙拉",
            content: "谢谢你的关注！",
            createTime: "2022-02-19 11:31:45",
          },
          {
            avatar: "assets/images/userAvatar.png",
            name: "小狗",
            content: "好久不见",
            createTime: "2019-04-03 11:31:45",
          },
          {
            avatar: "assets/images/userAvatar.png",
            name: "小狗",
            content: "好久不见",
            createTime: "2019-04-03 11:31:45",
          },
          {
            avatar: "assets/images/userAvatar.png",
            name: "小狗",
            content: "好久不见",
            createTime: "2019-04-03 11:31:45",
          },
          {
            avatar: "assets/images/userAvatar.png",
            name: "小狗",
            content: "好久不见",
            createTime: "2019-04-03 11:31:45",
          },
        ],
      },
      systemData: {
        textarea: "",
        otherUser: [
          {
            title: "进来抽奖，即得100万现金红包瓜分资格！",
            content: "许愿重磅福利来啦！仅限【2月5日】，参与放飞许愿灯活动，完成1次抽奖，即可获得瓜分100万现金大奖资格，还有机会获得SONY PS5、iPhone13等丰厚大礼，许愿抽奖戳>>>",
            createTime: "2022年2月5日 00:00",
          },
          {
            title: "2022拜年纪开播倒计时！",
            content: "GOTUBE开张在即！已经张罗了一桌好菜恭候各位顾客！大家一起拭目以待吧！点击查看详情>>>>> ",
            createTime: "2022年1月31日 00:30",
          },
          {
            title: "2022年的愿望，都来这里实现！",
            content: "放飞许愿灯活动火热进行中，来和B站的小伙伴一起许愿吧！650万份奖品，限时10天领取，先到先得，点我马上参与>>>",
            createTime: "2022年1月30日 12:00",
          },
          {
            title: "速领！你获得了GOTUBE专享用户奖！",
            content: "感谢2021年的关注与陪伴，特为你准备闪光用户奖！2022年也要继续一起闪闪发光哦！立即领奖>>",
            createTime: "2022年1月28日 14:01",
          },
          {
            title: "拜年纪预约活动正式开启！",
            content: "拜年纪特色集卡活动正式开启！集卡换锦鲤，新年赢好礼！大家一起来新年转转运吧~",
            createTime: "2022年1月23日 00:00",
          },
          {
            title: "“2020年度动画评选”投票开始！",
            content: "东京动画奖节2020的“年度动画”评选新增“海外人气奖”，并在GOTUBE开设了投票专场；你的选择，将直接决定最终的评选结果。“BEST100”票选阶段现已开启",
            createTime: "2019年11月2日 11:00",
          },
        ],
      }
    }
  }
}
</script>

<style lang="less" scoped>
.namestyle {
  font-weight: bold;
  font-size: 17px;
}
</style>