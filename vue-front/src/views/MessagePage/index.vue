<template>
  <div>
    <!--导航-->
    <!-- <header-component></header-component> -->

    <el-row class="tac">
      <!-- 左侧导航栏 -->      
      <el-col :span="5">
        <el-menu
          :default-openeds="['1']"
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="Transparent"
          text-color="#303133"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <span class="navstyle"><i class="el-icon-s-promotion"></i>消息中心</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="changeType('reply')"><span class="navstyle">● 回复我的</span></el-menu-item>
              <el-menu-item index="1-2" @click="changeType('who')"><span class="navstyle">● 收到的赞</span></el-menu-item>
              <el-menu-item index="1-2" @click="changeType('system')"><span class="navstyle">● 系统通知</span></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
      <!-- main界面 -->
      <el-col :span="19">
        <message-content :type="type"></message-content>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import headerComponent from "../../components/headerComponent";
import messageContent from "./messageContent"
export default {
  name: "MessagePage",
  components: { headerComponent,messageContent},
  data() {
    return {
      type: 'reply',
      pageData: {
        src: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      }
    }
  },
  methods:{
    changeType (type) {
      this.type = type
      // console.log('父 - type: ', type)
      // console.log('父 - this.type: ', this.type)
    }
  }
};
</script>

<style scoped>
.namestyle {
  font-weight: bold;
  font-size: 17px;
}
.navstyle {
  font-weight: bold;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  /* font-size: 15px; */
  /* font-family:'Times New Roman', Times, serif; */
}
</style>