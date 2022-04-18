<template>
    <div>
        <el-row :gutter="8">
            <el-col :span=12>
                <el-card style="height:500px">
                    <p style="text-align:center">原视频</p>
                    <el-card style="height:300px">
                        <el-button type="primary" style="margin-top:120px;margin-left:220px">上传视频</el-button>
                    </el-card>
                    <!-- <el-button type="primary" round >识别</el-button> -->
                </el-card>
            </el-col>
            <el-col :span=12>
                <el-card style="height:500px">
                    <p style="text-align:center">识别后</p>
                </el-card>
            </el-col>
        </el-row>
        <el-button type="primary" style="margin-left:600px">识别</el-button>

    </div>
</template>

<script>
export default {
    name:"VideoClassify"
}
</script>
<style lang="less" scoped>

.el-button{
    font-size:12px;
}
.el-form-item{
    text-align: center;
}


</style>