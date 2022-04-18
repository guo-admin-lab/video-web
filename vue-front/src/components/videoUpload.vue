<template>
  <div>
    <el-form
      ref="form"
      v-show="isOpenVideoForm"
      :model="submitVideoData"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="submitVideoData.title"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="desc">
        <el-input type="textarea" v-model="submitVideoData.desc"></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="label">
        <el-select v-model="submitVideoData.label" placeholder="请选择视频标签">
          <el-option label="科学科普" value="label1"></el-option>
          <el-option label="社科·法律·心理" value="label2"></el-option>
          <el-option label="人文历史" value="label3"></el-option>
          <el-option label="财经商业" value="label4"></el-option>
          <el-option label="校园学习" value="label5"></el-option>
          <el-option label="职业职场" value="label6"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户ID" prop="userId">
        <el-input v-model="submitVideoData.userId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <!-- :data="{ SavePath: this.Path.url }" -->
    <el-upload
      :drag="Plus"
      action="http://172.22.173.94:8081/video/upload"
      multiple
      show-file-list
      :data="submitVideoData"
      :on-success="handleVideoSuccess"
      :before-upload="beforeUploadVideo"
      :on-progress="uploadVideoProcess"
    >
      <i v-if="Plus" class="el-icon-upload"></i>
      <div v-if="Plus" class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <el-progress
        v-if="videoFlag"
        type="circle"
        :percentage="videoUploadPercent"
        style="margin-top: 30px"
      ></el-progress>
      <div v-if="Plus" class="el-upload__tip" slot="tip">
        只能上传mp4/flv/avi文件, 且不超过300M
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "videoUpload",
  data() {
    return {
      Plus: false,
      isOpenVideoForm: true,
      videoFlag: false,
      submitVideoData: {
        title: "test1Video",
        desc: "test1Videodesc",
        label: "label1",
        userId: "1",
      },
      rules: {
        title: [
          { required: true, message: "请输入视频名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        desc: [
          { required: true, message: "请输入视频简介", trigger: "blur" },
          {
            min: 3,
            max: 30,
            message: "长度在 3 到 30 个字符",
            trigger: "blur",
          },
        ],
        label: [
          { required: true, message: "请选择视频标签", trigger: "change" },
        ],
        userId: [{ required: true, message: "请输入用户ID", trigger: "blur" }],
      },
      videoForm: {
        videoId: "",
        videoUrl: "",
      },
      Path: {
        url: "D:/Video",
      },
      videoUploadPercent: 0,
    };
  },
  methods: {
    // 视频上传前执行
    beforeUploadVideo(file) {
      const isLt300M = file.size / 1024 / 1024 < 300;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
        ].indexOf(file.type) === -1
      ) {
        this.$message.error("请上传正确的视频格式");
        return false;
      }
      if (!isLt300M) {
        this.$message.error("上传视频大小不能超过300MB哦!");
        return false;
      }
    },
    // 视频上传过程中执行
    uploadVideoProcess(event, file, fileList) {
      this.Plus = false;
      this.videoFlag = true;
      this.videoUploadPercent = parseInt(file.percentage.toFixed(0));
    },
    // 视频上传成功时执行
    handleVideoSuccess(res, file) {
      this.Plus = false;
      this.videoUploadPercent = 100;
      console.log(res);
      // 如果为200代表视频保存成功
      if (res.resCode === "200") {
        // 接收视频传回来的名称和保存地址
        // 至于怎么使用看你啦~
        this.videoForm.videoId = res.newVidoeName;
        this.videoForm.videoUrl = res.VideoUrl;
        this.$message.success("视频上传成功！");
      } else {
        this.$message.error("视频上传失败，请重新上传！");
      }
    },
    onSubmit() {
      this.$refs["form"].validate((value) => {
        if (value) {
          this.isOpenVideoForm = false;
          this.Plus = true;
        } else {
          this.$message.error("请完善视频信息！");
        }
      });
    },
  },
};
</script>