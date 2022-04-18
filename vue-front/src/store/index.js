import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '',
        userInfo: JSON.parse(sessionStorage.getItem("userInfo"))
    },
    mutations: {
        // set
        SET_TOKEN: (state, token) => {
            state.token = token
            localStorage.setItem("token",token)
        },
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo
            sessionStorage.setItem("userInfo",JSON.stringify(userInfo))
        },
        REMOVE_INFO: (state) => {
            state.token = ''
            state.userInfo = {}
            localStorage.setItem("token",'')
            // localStorage.removeItem("token")
            sessionStorage.setItem("userInfo",JSON.stringify(''))
            // sessionStorage.removeItem("userInfo")
        }
    },
    getters: {
        // get
        getUser: state => {
            return state.userInfo
        }
    },
    actions: {
    },
    modules: {
        user
    }
})
