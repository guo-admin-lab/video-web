<template>
  <div class="main">
    <el-container>
      <el-header>
        <div class="mlogo">
          <h2><img src="../../assets/images/logo.png" alt />Ping-pong Net</h2>
        </div>
      </el-header>
      <el-main>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="login"
              v-loading.fullscreen.lock="fullscreenLoading"
              >登录</el-button
            >
            <el-button @click="register">注册</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      fullscreenLoading: false,
      ruleForm: {
        username: "test",
        password: "2123",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    login() {
      // ***********
      // this.$router.push("/layout");
      // ***********
      this.fullscreenLoading = true;
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.$axios.post("/login/login", this.ruleForm).then((response) => {
              console.log(response.data);
              if (response.data.code === 200) {
                this.$message({
                  message: "登录成功",
                  type: "success",
                });
                this.$router.push("/layout");
                localStorage.setItem("userId", response.data.data.userInfo.id);
                localStorage.setItem(
                  "avatarAddr",
                  response.data.data.userInfo.avatarAddr
                );
                localStorage.setItem("token", response.data.data.token);
                console.log(localStorage);
                // this.$store.state.userId = response.data.data.id;
                // this.$store.state.avatarAddr = response.data.data.avatarAddr;
              }
            }).catch((error) => {
              this.$message.error("登录失败！");
              console.log("error", error);
            }).finally(() => {
            this.fullscreenLoading = false;
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    register() {
      this.$router.push("/registerPage");
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  padding: 50px;
}
.el-header {
  text-align: center;

  .mlogo {
    margin-top: -10px;
    img {
      height: 20px;
      width: 20px;
      margin-right: 20px;
    }
  }
}

.el-main {
  text-align: center;

  .demo-ruleForm {
    max-width: 500px;
    margin: 0 auto;
  }
}
</style>
