<template>
  <div>
    <!-- 标签的header -->
    <el-card>
      <el-row>
        <!-- <el-col span="3" offset="3">
          <el-avatar
            shape="square"
            :size="100"
            :fit="contain"
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fseopic.699pic.com%2Fphoto%2F50101%2F8651.jpg_wh1200.jpg&refer=http%3A%2F%2Fseopic.699pic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651155409&t=da7ec899488411d05890128aa5cf9d44"
          ></el-avatar>
        </el-col> -->
        <el-col :span="10" :offset="1">
          <p
            style="
              font-size: 20px;
              font-weight: bold;
              font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial,
                sans-serif;
            "
          >
            {{ this.label }}
          </p>
        </el-col>
      </el-row>
    </el-card>
    <!-- 标签内的视频 -->
    <el-card>
      <el-row class="tac" :gutter="40">
        <el-col>
          <div>
            <el-row :gutter="20">
              <el-col v-for="(item, index) in cardData" :key="index" :span="6">
                <div class="grid-content bg-purple">
                  <el-card>
                    <el-image
                      style="width: 100%; height: 200px"
                      :src="item.url"
                    ></el-image>
                    <div style="height: 20%; width: 100%">
                      <p class="videotitle">{{ item.title }}</p>
                      <p style="color: #606266">
                        {{ item.name }} {{ item.time }}
                      </p>
                    </div>
                  </el-card>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import headerComponent from "../../components/headerComponent";
import videoApi from "../../api/videoApi";

export default {
  name: "labelPage",
  components: { headerComponent },
  data() {
    return {
      label: "",
      cardData: [
        {
          url: "video3.png",
          title: "叶利钦の小曲《爱国歌》",
          // 俄罗斯联邦1991—2000国歌《爱国歌》
          name: "快乐茄子人",
          time: "2021-8-28",
        },
      ],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.label = this.$route.query.label;
      console.log("公共-标签", this.label);
      videoApi
        .getVideoListByLabel(this.label)
        .then((response) => {
          console.log(response.data.data);
          this.cardData = [];
          for (let i = 0; i < response.data.data.length; i++) {
            let pointPos = response.data.data[i].videoAddr.indexOf(".");
            let videoImageUrl =
              "http://172.22.173.94:8081/" +
              response.data.data[i].videoAddr.substr(0, pointPos) +
              ".jpg";
            console.log("图像", videoImageUrl);
            this.cardData.push({
              url: videoImageUrl,
              title: response.data.data[i].title,
              name: response.data.data[i].username,
              time: response.data.data[i].createTime,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

