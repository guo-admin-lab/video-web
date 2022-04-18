import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import BlogDetail from '../views/BlogDetail'
import BlogEdit from '../views/BlogEdit'
import PublicPage from '../views/PublicPage'
import VideoPage from '../views/VideoPage'
import PersonHome from "../views/PersonHome"
import MessagePage from "../views/MessagePage"
import SpacePage from "../views/SpacePage"
import LabelPage2 from "../views/LabelPage2"
import LabelPage3 from "../views/LabelPage3"
import LabelPage4 from "../views/LabelPage4"
import LabelPage5 from "../views/LabelPage5"
import LabelPage6 from "../views/LabelPage6"
import LabelPage from "../views/LabelPage"
import RegisterPage from "../views/RegisterPage"
import VideoClassify from "../views/VideoClassify"
import SearchPage from "../views/SearchPage"
import Layout from "../views/Layout"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        redirect: { name: 'Login' }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/registerPage',
        name: 'RegisterPage',
        component: RegisterPage
    },
    {
        path: '/searchPage',
        name: 'SearchPage',
        component: SearchPage
    },
    {
        path: '/layout',
        name: 'Layout',
        component: Layout,
        redirect: '/publicPage',
        children: [
            {
                path: '/publicPage',
                name: 'PublicPage',
                component: PublicPage
            },
            {
                path: '/labelPage',
                name: 'LabelPage',
                component: LabelPage
            },
            {
                path: '/labelPage2',
                name: 'LabelPage2',
                component: LabelPage2
            },
            {
                path: '/videoClassify',
                name: 'VideoClassify',
                component: VideoClassify
            },
            {
                path: '/labelPage3',
                name: 'LabelPage3',
                component: LabelPage3
            },
            {
                path: '/labelPage4',
                name: 'LabelPage4',
                component: LabelPage4
            },
            {
                path: '/labelPage5',
                name: 'LabelPage5',
                component: LabelPage5
            },
            {
                path: '/labelPage6',
                name: 'LabelPage6',
                component: LabelPage6
            },
            {
                path: '/videoPage',
                name: 'VideoPage',
                component: VideoPage
            },
            {
                path: '/personHome', // 待会要跳转的路径，随便取
                name: 'PersonHome', // 加一个名称，有时候可以根据这个跳转，随便取
                component: PersonHome // 路由跳转对应的组件，在import导入
            },
            {
                path: '/messagePage',
                name: 'MessagePage',
                component: MessagePage
            },
            {
                path: '/spacePage',
                name: 'SpacePage',
                component: SpacePage
            },
        ]
    },
    {
        path: '/blogs',
        name: 'Blogs',
        // 懒加载
        component: () => import('../views/Blogs')
    },
    {
        path: '/blog/add', // 注意放在 path: '/blog/:blogId'之前
        name: 'BlogAdd',
        meta: {
            requireAuth: true
        },
        component: BlogEdit
    },
    {
        path: '/blog/:blogId',
        name: 'BlogDetail',
        component: BlogDetail
    },
    {
        path: '/blog/:blogId/edit',
        name: 'BlogEdit',
        meta: {
            requireAuth: true
        },
        component: BlogEdit
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
