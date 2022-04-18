<template>
    <div>
        <el-form
                v-loading="loading"
                ref="form"
                v-if="isOpenVideoForm"
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
                    <el-option label="科学科普" value="科学科普"></el-option>
                    <el-option label="社科·法律·心理" value="社科·法律·心理"></el-option>
                    <el-option label="人文历史" value="人文历史"></el-option>
                    <el-option label="财经商业" value="财经商业"></el-option>
                    <el-option label="校园学习" value="校园学习"></el-option>
                    <el-option label="职业职场" value="职业职场"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
        <uploadFile ref="uploadFile" v-loading="loading" v-if="isOpenUploadModal" @checkFileSuccess="checkFileSuccess" @computeMD5FileSuccess="computeMD5FileSuccess"
            @removeFile="removeFile"></uploadFile>
    </div>
</template>

<script>
import uploadFile from "./uploadFile.vue"
import videoApi from "../../api/videoApi"
export default {
    name: 'projectFileUpload',
    components: { uploadFile },
    data() {
        return {
            loading: false,
            isOpenVideoForm: true,
            isOpenUploadModal: false,
            submitVideoData: {
                title: "test1Video",
                desc: "test1Videodesc",
                label: ""
            },
            rules: {
                title: [
                    { required: true, message: "请输入视频名称", trigger: "blur" },
                    {
                        min: 3,
                        max: 20,
                        message: "长度在 3 到 20 个字符",
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
            file: null, // 用于接收uploadFile.vue中onFileAdded方法中传来的已经验证过重名的file信息（在uploadProjectFile方法中传入用于切片上传）(原始文件)
            fileInfo: '' // 用于接收uploadFile.vue中onFileSuccess方法传来的已经切片计算过的文件信息（切片后的文件信息）
        }
    },
    methods: {
        // 表单验证部分
        onSubmit() {
            this.loading = true
            this.$refs["form"].validate((value) => {
                if (value) {
                    videoApi.checkVideoName(this.submitVideoData.title).then((response) => {
                        console.log(response.data)
                        if (response.data.code === 200) {
                            this.isOpenVideoForm = false;
                            this.isOpenUploadModal = true;
                            this.$message.success('视频名称验证成功！')
                        } else {
                            this.$message.error('projectFileUpload.vue - onSubmit - response.data.code != 200')
                        }
                    }).catch(error => {
                        console.log('projectFileUpload.vue - onSubmit - 后端抛出异常, error : ', error)
                    }).finally(() => {
                        this.loading = false
                    })
                } else {
                    this.$message.error("请完善视频信息！");
                    this.loading = false
                }
            });
        },
        // ********************* 文件上传部分
        // 当uploadFile.vue中选择了文件，并通过check接口验证了文件名后立即执行，作用：让上传Modal右下角的“开始上传”按钮显示出来
        // 文件验证成功之后，可以开始上传文件
        checkFileSuccess(file) {
            this.file = file
            // 下面传递的 file 用于voListTable.vue中
            this.$emit('showButton')
        },
        // 文件重名检查完后，开始分片计算
        computeMD5ProjectFile() {
            this.$refs.uploadFile.computeMD5(this.file)
            console.log('开始执行computeMD5方法')
        },
        // 当点击上传Modal右下角“开始上传”，并执行computeMD5（文件上传成功）之后（即执行uploadFile.vue中的onFileSuccess方法之后），开始执行
        computeMD5FileSuccess(fileInfo) {
            this.fileInfo = fileInfo
            this.mergeProjectFile()
        },
        // 对切片后的文件进行合并，并上传
        mergeProjectFile() { // 上传资源，验证信息填写是否完整
            console.log('开始合并上传')
            this.loading = true
            // this.$Spin.show()
            // console.log('fileInfo(in projectFileUpload.vue、mergeProjectFile())', this.fileInfo)
            let videoInfo = {
                title: this.submitVideoData.title,
                description: this.submitVideoData.desc,
                label: this.submitVideoData.label
            }
            // projectFileVO内包含内容包括：name, privacy, description, username, projectId
            console.log('videoInfo: ', videoInfo)
            console.log('fileInfo: ', this.fileInfo)
            videoApi.mergeVideo(this.fileInfo, videoInfo).then(response => { // 分片上传成功以后合并文件
                // this.$Spin.hide()
                console.log("合并上传后的相应：", response)
                if (response.data.code === 200) {
                    this.$message.success('项目文件上传' + response.data.msg)
                    this.$emit('mergeUploadProjectSuccess')
                } else {
                    this.$message.error('错误信息为：' + response.data.msg + ', 错误码为：' + response.data.code)
                }
            }).catch(error => {
                console.log('合并后捕获的未知异常：' + error)
                // this.$Spin.hide()
                setTimeout(() => {
                    this.$router.go(0)
                } , 3000)
                this.$message.error({ message: error.msg, duration: 7 })
            }).finally(() => {
                this.loading = false
            })
        },
        removeFile () {
            this.$emit('removeFile')
        }
    }
}
</script>
