<template>
  <!-- 博客地址 -->
  <!-- https://blog.csdn.net/outlierQiqi/article/details/106538216?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522164995174816782089346452%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=164995174816782089346452&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~baidu_landing_v2~default-1-106538216.142^v8^control,157^v4^control&utm_term=vue-simple-uploader%E7%9A%84%E5%8F%82%E6%95%B0&spm=1018.2226.3001.4187 -->
  <div>
    <!-- 上传器 -->
    <!-- 把uploader组件的autoStart设为false，即选择文件后不会自动开始上传-->
    <uploader
      ref="uploader"
      v-loading="loading"
      element-loading-text="正在合成视频文件，请稍等~"
      :options="options"
      :autoStart="false"
      :file-status-text="fileStatusText"
      @file-added="onFileAdded"
      @file-success="onFileSuccess"
      @file-progress="onFileProgress"
      @file-error="onFileError"
      @file-removed="fileRemoved"
      class="uploader-ui"
    >
      <uploader-unsupport></uploader-unsupport>
      <uploader-drop>
        <div>
          <uploader-btn
            id="global-uploader-btn"
            ref="uploadBtn"
            v-show="!fileSuccess"
          >
            选择文件
            <i class="el-icon-upload el-icon--right"></i>
          </uploader-btn>
        </div>
      </uploader-drop>
      <uploader-list></uploader-list>
    </uploader>
  </div>
</template>

<script>
import SparkMD5 from "spark-md5";
export default {
  name: "uploadFile",
  data() {
    return {
      loading: false,
      fileSuccess: false, // 用来控制按钮“选择文件”，如果文件上传成功，则不在显示此按钮（如果没有上传成功则显示，与正常逻辑相反）
      options: {
        // 目标上传 URL，默认POST
        // target 目标上传 URL，可以是字符串也可以是函数，如果是函数的话，则会传入 Uploader.File 实例、当前块 Uploader.Chunk 以及是否是测试模式，默认值为 '/'。
        // target: 'http://localhost:8081/video/upload/chunk',
        target: "http://172.22.173.94:8081/video/upload/chunk",
        headers: {
          token: localStorage.getItem("token"),
        },
        // 单文件上传,覆盖式
        singleFile: true,
        // 分块大小(单位：字节)
        // chunkSize 分块时按照该值来分。最后一个上传块的大小是可能是大于等于1倍的这个值但是小于两倍的这个值大小，可见这个 Issue #51，默认 1*1024*1024。
        chunkSize: "2048000",
        // 上传文件时文件内容的参数名，对应chunk里的Multipart对象名，默认对象名为file
        fileParameterName: "chunkFile",
        // 失败后最多自动重试上传次数
        // maxChunkRetries 最大自动失败重试上传次数，值可以是任意正整数，如果是 undefined 则代表无限次，默认 0
        maxChunkRetries: 3,
        // 是否开启服务器分片校验，对应GET类型同名的target URL
        // testChunks 是否测试每个块是否在服务端已经上传了，主要用来实现秒传、跨浏览器上传等，默认 true。
        testChunks: false, // 不进行校验
      },
      fileStatusText: {
        // 上传时的提示语句
        success: "上传成功",
        error: "上传失败",
        uploading: "上传中",
        paused: "暂停",
        waiting: "等待上传",
      },
    };
  },
  methods: {
    onFileAdded(file) {
      this.loading = true;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
        ].indexOf(file.fileType) === -1
      ) {
        this.$message.error("请上传正确的视频格式");
        file.ignored = true;
      } else {
        this.$message.success("视频文件格式验证成功！");
        this.$emit("checkFileSuccess", file);
      }
      this.loading = false;
      // videoApi.checkVideoName(file.name).then(response => {
      //     console.log(response)
      //     this.$message.success('文件名称验证' + response.data.msg)
      //     this.$emit('checkFileSuccess', file)
      // }).catch((error) => { // 验证不通过后台返回错误码,前端在http.js中拦截并提示msg
      //     file.cancel()
      //     console.log('error', error)
      //     this.$message.error('出现文件重名问题，请更换文件名后重试 (' + error.msg + ')')
      // })
    },
    /**
     * 计算md5，实现断点续传及秒传
     * 在验证文件重名后，首先执行
     * 目前只实现了切片上传,testChunks: false // 不进行服务器端验证
     * @param file
     */
    computeMD5(file) {
      console.log("file=", file); // 获取用户选择上传的文件
      file.pause(); // 先通过 file.pause()暂停文件，然后通过H5的FileReader接口读取文件
      // 单个文件的大小限制50G
      let fileSizeLimit = 50 * 1024 * 1024 * 1024;
      console.log("文件大小：" + file.size);
      console.log("限制大小：" + fileSizeLimit);
      if (file.size > fileSizeLimit) {
        this.$message({
          duration: 7,
          message: "文件大小不能超过50G",
          type: "warning",
        });
        file.cancel();
      }

      let fileReader = new FileReader();
      /*
       * FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用File或Blob对象指定要读取的文件或数据。
       * FileReader.onerror处理error事件。该事件在读取操作发生错误时触发。
       * FileReader.onload处理load事件。该事件在读取操作完成时触发。
       * FileReader.readAsArrayBuffer() 开始读取指定的 Blob中的内容, 一旦完成, result属性中保存的将是被读取文件的ArrayBuffer数据对象.
       * */
      let time = new Date().getTime();
      // 利用js中File对象的slice( )方法（File.prototype.slice( )）将文件分片后逐个传入spark.appendBinary( )方法来计算、最后通过spark.end( )方法输出结果
      // 很明显，这种方法对于大型文件会非常有利——不容易出错，并且能够提供计算的进度信息
      let blobSlice =
        File.prototype.slice ||
        File.prototype.mozSlice ||
        File.prototype.webkitSlice;
      console.log("blobSlice=", blobSlice);
      let currentChunk = 0; // 初始块数为0
      const chunkSize = 10 * 1024 * 1000; // 分片大小 chunkSize, 每一个分片文件的大小变量为 chunkSize
      let chunks = Math.ceil(file.size / chunkSize); // 分片数量 chunks
      console.log("chunks=", chunks);
      console.log("chunkSize=", chunkSize);
      let spark = new SparkMD5.ArrayBuffer(); // 创建SparkMD5的实例
      // 由于计算整个文件的Md5太慢，因此采用只计算第1块文件的md5的方式
      let chunkNumberMD5 = 1;

      loadNext();

      fileReader.onload = (e) => {
        spark.append(e.target.result);

        if (currentChunk < chunkNumberMD5) {
          loadNext();
        } else {
          let md5 = spark.end(); // 将异步读取文件的结果进行MD5，这里我用的加密工具是spark-md5，你可以通过npm install spark-md5 --save来安装，也可以使用其他MD5加密工具。
          file.uniqueIdentifier = md5; // file有个属性是uniqueIdentifier，代表文件唯一标示，我们把计算出来的MD5赋值给这个属性 file.uniqueIdentifier = md5，这就实现了我们最终的目的。
          file.resume(); // 通过file.resume()开始/继续文件上传
          console.log(
            `MD5计算完毕：${
              file.name
            } \nMD5：${md5} \n分片数量：${chunks} 文件大小:${
              file.size
            } 分片用时：${new Date().getTime() - time} ms`
          );
        }
      };

      fileReader.onerror = function () {
        this.$message.error(`文件${file.name}读取出错，请检查该文件`);
        file.cancel();
      };

      function loadNext() {
        // 继续进行下一块
        let start = currentChunk * chunkSize;
        let end =
          start + chunkSize >= file.size ? file.size : start + chunkSize;
        /*
         * 当 FileReader 读取文件的方式为  readAsArrayBuffer, readAsBinaryString, readAsDataURL 或者 readAsText 的时候，
         * 会触发一个 load 事件。从而可以使用  FileReader.onload 属性对该事件进行处理。
         * FileReader 接口提供的 readAsArrayBuffer() 方法用于启动读取指定的 Blob 或 File 内容。
         * 当读取操作完成时，readyState 变成 DONE（已完成），并触发 loadend 事件，同时 result 属性中将包含一个 ArrayBuffer 对象以表示所读取文件的数据。
         * */
        fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end));
        currentChunk++;
        console.log("计算第" + currentChunk + "块");
      }
    },
    /*
        上传成功后的响应
        第一个参数 rootFile 就是成功上传的文件所属的根 Uploader.File 对象，它应该包含或者等于成功上传文件；
        第二个参数 file 就是当前成功的 Uploader.File 对象本身；
        第三个参数就是 message 就是服务端响应内容，永远都是字符串；
        第四个参数 chunk 就是 Uploader.Chunk 实例，它就是该文件的最后一个块实例，如果你想得到请求响应码的话，chunk.xhr.status就是
        */
    onFileSuccess(rootFile, file, response, chunk) {
      console.log({
        "success-rootFile: ": rootFile,
        "success-file: ": file,
        "success-response: ": response,
        "success-chunk: ": chunk,
      });
      console.log("文件上传成功-success");
      // this.fileSuccess = true
      let fileInfo = {};
      fileInfo.id = file.id;
      fileInfo.fileType = file.fileType;
      fileInfo.name = file.name;
      fileInfo.size = file.size;
      fileInfo.relativePath = file.relativePath;
      fileInfo.uniqueIdentifier = file.uniqueIdentifier;
      this.$emit("computeMD5FileSuccess", fileInfo);
    },
    // 文件进度的回调
    onFileProgress(rootFile, file, chunk) {
      // console.log({'progress-rootFile: ': rootFile, 'progress-file: ': file, 'progress-response: ': response, 'progress-chunk: ': chunk})
      console.log(
        `上传中 ${file.name}，chunk：${chunk.startByte / 1024 / 1024} ~ ${
          chunk.endByte / 1024 / 1024
        }`
      );
    },
    // 上传失败后的响应
    onFileError(rootFile, file, response, chunk) {
      console.log("上传完成后异常信息：" + response);
      console.log({
        "error-rootFile: ": rootFile,
        "error-file: ": file,
        "error-response: ": response,
        "error-chunk: ": chunk,
      });
    },
    // 将所选文件删掉后
    fileRemoved() {
      this.$emit("removeFile");
    },
  },
};
</script>
