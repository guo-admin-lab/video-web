import axios from './axios'

const videoApi = {

    checkVideoName(fileName) {
        return axios.get('/video/upload/nameCheck?fileName=' + (fileName || ''))
    },

    mergeVideo(fileInfo, videoInfo) {
        return axios.post('/video/upload/mergeVideo', { fileInfo: fileInfo, videoInfo: videoInfo })
    },

    getVideoListByLabel(label) {
        return axios.post('/video/getVideoListByLabel', { label: label })
    }

}

export default videoApi