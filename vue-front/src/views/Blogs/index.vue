<template>
    <div class="m-content">
        <Header></Header>
        <div class="block">
            <el-timeline>
                <el-timeline-item
                    :timestamp="blog.created"
                    placement="top"
                    v-for="blog in blogs"
                    :key="blog.id"
                >
                    <el-card>
                        <h4>
                            <router-link :to="{name: 'BlogDetail', params: {blogId: blog.id}}">
                                {{ blog.title }}
                            </router-link>
                        </h4>
                        <p>{{ blog.description }}</p>
                    </el-card>
                </el-timeline-item>
            </el-timeline>

            <el-pagination 
                class="mpage" 
                background 
                layout="prev, pager, next" 
                :current-page="currentPage"
                :page-size="pageSize"
                :total="total"
                @current-change="page"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import Header from "../../components/Header"
export default {
    name: "Blogs",
    components: {
        Header
    },
    data() {
        return {
            blogs: {},
            currentPage: 1,
            total: 0,
            pageSize: 5
        }
    },
    created() {
        this.page(1)
    },
    methods: {
        page(currentPage) {
            const _this = this
            _this.$axios.get("/blogs?currentPage=" + currentPage).then(res => {
                console.log(res)
                _this.blogs = res.data.data.records
                _this.currentPage = res.data.data.current
                _this.total = res.data.data.total
                _this.pageSize = res.data.data.size
            })
        }
    }
}
</script>

<style lang="less" scoped>
.m-content {
    padding: 10px;
    /* text-align: center; */
    .mpage {
        text-align: center;
    }
}
</style>