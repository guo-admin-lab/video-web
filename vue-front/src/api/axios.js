import axios from 'axios'
import Element from 'element-ui'
import store from '../store'
import router from '../router'

axios.defaults.baseURL = "http://172.22.173.94:8081"

// 前置拦截
axios.interceptors.request.use(config => {
    if (!['/login/login', '/login/register'].includes(config.url)) {
        config.headers.token = localStorage.getItem('token')
    }
    // console.log('config  : ', config)
    return config
})

// 后置拦截
axios.interceptors.response.use(response => {
    let res = response.data

    if (res.code === 200) {
        return response
    } else {
        Element.Message.error(response.data.msg, { duration: 1 * 1000 })
        return Promise.reject(response.data.msg)
    }

}, error => {
    console.log(error)
    if (error.response.data) {
        error.message = error.response.data.msg
    }

    if (error.response === 401) {
        store.commit("REMOVE_INFO")
        router.push("/login")
    }

    Element.Message.error(error.message, { duration: 1 * 1000 })
    return Promise.reject(error.message)

})

export default axios
