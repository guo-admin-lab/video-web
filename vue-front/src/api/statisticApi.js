import axios from './axios'

const statisticApi = {
    insertLike (videoId) {
        return axios.get('/statistic/insertLike?videoId=' + (videoId || 0))
    },

    deleteLike (videoId) {
        return axios.get('/statistic/deleteLike?videoId=' + (videoId || 0))
    }

}

export default statisticApi
