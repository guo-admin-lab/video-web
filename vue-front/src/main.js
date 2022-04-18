import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import "./api/axios"
import "./api/permission"
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import uploader from 'vue-simple-uploader'
import "./assets/icon/iconfont.css"
import "./assets/icon/iconfont.js"

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$video = Video

Vue.use(ElementUI);
Vue.use(mavonEditor);
Vue.use(uploader);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
