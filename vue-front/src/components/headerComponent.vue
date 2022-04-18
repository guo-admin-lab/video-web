<template>
  <div>
    <el-dialog title="上传视频" :visible.sync="dialogTableVisible">
      <div v-if="dialogTableVisible">
        <project-file-upload ref="uploadProjectFileModal" @showButton="isOpenUploadButton = true"
                             @mergeUploadProjectSuccess="mergeUploadProjectSuccess" @removeFile="isOpenUploadButton = false">
        </project-file-upload>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button v-if="isOpenCompleteButton" @click="closeUploadModal">完成</el-button>
          <el-button type="primary" v-if="isOpenUploadButton" @click="computeMD5ProjectFile">开始上传</el-button>
      </span>
    </el-dialog>
    <el-card class="box-card" body-style="padding: 5px">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <!--logo  + menu    -->
        <div style="display: flex; justify-content: space-between; align-items: center; width: 30%; margin-left: 50px">
          <img src="../assets/images/logo1.png" alt="gotube" width="40%" height="50px"/>
          <el-menu class="el-menu-demo" mode="horizontal" background-color="#FFFFFF" text-color="#303133" active-text-color="#606266">
            <el-menu-item index="2" @click="toPublicPage"><span class="titlestyle">首页</span></el-menu-item>
            <el-menu-item index="3" @click="toMessagePage"><span class="titlestyle">消息</span></el-menu-item>
            <el-menu-item index="4" @click="toSpacePage"><span class="titlestyle">笔记广场</span></el-menu-item>
          </el-menu>
        </div>
        <!-- 搜索框 + 头像 + 上传 + 退出 -->
        <div style="display: flex; justify-content: space-between; align-items: center; width: 70%; margin-left: 100px; margin-top: 10px">
          <p style="display: flex; justify-content: space-between; align-items: center; width: 80%">
            <el-input v-model="searchInput" placeholder="请输入搜索内容" style="width: 70%"></el-input>
            <el-button type="warning" plain round @click="toSearchPage" style="margin-left: 10px">搜索</el-button>
            <el-card shadow="hover" body-style="padding: 0;" style="border-radius: 20px;">
              <el-avatar @click.native="toPersonHome" :src="avatarAddr"></el-avatar>
            </el-card>
            <el-button type="danger" round @click="dialogTableVisible = true">上传视频</el-button>
          </p>
          <el-button type="info" plain @click="toLogin" style="margin-right: 20px">退出登录</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
// import videoUpload from "./videoUpload.vue";
import projectFileUpload from "./videoUpload/projectFileUpload.vue";
export default {
  name: "headerComponent",
  components: { projectFileUpload },
  data() {
    return {
      dialogTableVisible: false,
      isOpenCompleteButton: false,
      isOpenUploadButton: false,
      searchInput: "",
      avatarAddr: "",
    };
  },
  created() {
    console.log("创建headerCompontent");
    console.log("头部信息-路由：", this.$route.name);
    // 加this是因为这个是在data里的，store里放的是全局的
    this.avatarAddr = "http://172.22.173.94:8081/" + localStorage.avatarAddr;
    // this.avatarAddr =
    //   "http://172.22.173.94:8081/" + this.$store.state.avatarAddr;
  },
  methods: {
    // 上传项目文件成功
    mergeUploadProjectSuccess() {
      this.isOpenCompleteButton = true
      this.isOpenUploadButton = false
    },
    // 对选择的文件进行切片计算
    computeMD5ProjectFile() {
      this.$refs.uploadProjectFileModal.computeMD5ProjectFile()
    },
    // 关闭上传项目文件的Modal
    closeUploadModal() {
      this.dialogTableVisible = false
      this.isOpenCompleteButton = false
      this.$router.go(0)
    },
    // ****************** 跳转界面
    toPersonHome() {
      console.log("跳转个人页");
      this.$router.push("/personHome");
    },
    toLogin() {
      localStorage.removeItem("token")
      localStorage.removeItem("avatarAddr")
      localStorage.removeItem("userId")
      this.$router.push("/login");
    },
    toMessagePage() {
      this.$router.push("/messagePage");
    },
    toSpacePage() {
      this.$router.push("/spacePage");
    },
    toPublicPage() {
      this.$router.push("/publicPage");
    },
    toSearchPage() {
      if (this.$route.name !== "SearchPage") {
        this.$router.push({
          path: "/searchPage",
          query: {
            searchInput: this.searchInput,
          },
        });
      } else {
        this.$emit("toSearch", this.searchInput);
      }
    }
  },
};
</script>

<style scoped>
.titlestyle {
  font-weight: bold;
  font-size: 15px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
</style>
