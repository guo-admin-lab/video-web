<template>
    <div>
        <Header></Header>
        <div class="mblog">
            <div class="mtitle">
                <h2>{{ blog.title }}</h2>
                <router-link :to="{ name: 'BlogEdit', params: { blogId: blog.id } }">
                    <el-button plain v-show="ownBlog">编辑</el-button>
                </router-link>
            </div>
            <el-divider></el-divider>
            <div class="markdown-body" v-html="blog.content"></div>
        </div>
    </div>
</template>

<script>
import Header from "../../components/Header.vue"
import "github-markdown-css/github-markdown.css"
export default {
    name: "BlogDetail",
    components: { Header },
    data() {
        return {
            blog: {
                id: "",
                title: "",
                content: ""
            },
            ownBlog: false

        }
    },
    created() {
        const blogId = this.$route.params.blogId
        // console.log(blogId)
        const _this = this
        this.$axios.get('/blogs/' + blogId).then(res => {
            console.log("< ----------------- : ", blogId, res)
            const blog = res.data.data
            _this.blog.id = blog.id
            _this.blog.title = blog.title
            // _this.ruleForm.description = blog.description
            // 对 content 进行渲染
            var MardownIt = require("markdown-it")
            var md = new MardownIt()
            var result = md.render(blog.content)
            _this.blog.content = result
            _this.ownBlog = (blog.userId === _this.$store.getters.getUser.id)
        })
    }
}
</script>

<style lang="less" scoped>
.mblog {
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width: 100%;
    min-height: 600px;
    padding: 20px 15px;
    justify-content: flex-start;

    .mtitle {
        // background: red;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>