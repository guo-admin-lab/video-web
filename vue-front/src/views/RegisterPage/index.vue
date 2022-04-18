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
          <el-form-item label="确认密码" prop="password1">
            <el-input type="password" v-model="ruleForm.password1"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="register">注册</el-button>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      ruleForm: {
        username: "markerhub",
        password: "111111",
        password1: "111111",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 5,
            max: 15,
            message: "长度在 5 到 15 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
        ],
        password1: [
          { required: true, message: "请输入确认密码", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    register() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          if (this.ruleForm.password === this.ruleForm.password1) {
            let submitData = {};
            submitData["username"] = this.ruleForm.username;
            submitData["password"] = this.ruleForm.password;
            this.$axios
              .post("/login/register", submitData)
              .then((response) => {
                console.log(response.data);
                if (response.data.code === 200) {
                  this.$message({
                    message: "注册成功",
                    type: "success",
                  });
                  this.$router.push("/login");
                }
              })
              .catch((error) => {
                this.$message.error("注册失败！");
                console.log("error", error);
              });
          } else {
            this.$message({
              message: "两次密码不一致！",
              type: "warning",
            });
            return false;
          }
        } else {
          this.$message({
            message: "请完善信息！",
            type: "warning",
          });
          return false;
        }
      });
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