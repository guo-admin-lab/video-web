<template>
  <div>
    <!-- 我的投稿 -->
    <div v-if="type === 'myUpload'">
      <el-card style="height: 100%">
        <el-row :gutter="40" class="tac">
          <!-- 左侧导航栏 -->
          <el-col :span="5">
            <el-menu
              :default-openeds="['1']"
              active-text-color="#ffd04b"
              background-color="#FFFFFF"
              class="el-menu-vertical-demo"
              default-active="2"
              text-color="#303133"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span @click="getUploadList()" class="uploadnavstyle"
                    >我的视频</span
                  >
                </template>
              </el-submenu>
            </el-menu>
          </el-col>
          <!-- 投稿界面 -->
          <el-col :span="18">
            <el-row>
              <el-row :gutter="10">
                <el-col
                  :key="index"
                  :span="6"
                  v-for="(item, index) in submitUploadData"
                >
                  <div class="grid-content bg-purple">
                    <el-card>
                      <el-image
                        :src="item.url"
                        style="width: 100%; height: 200px; border-radius: 10px"
                      ></el-image>
                      <div style="height: 20%; width: 100%">
                        <p
                          class="titlestyle"
                          style="display: flex; justify-content: space-between"
                        >
                          {{ item.title }}
                          <el-button @click="openVideo(item.id)" type="text"
                            >删除该投稿
                          </el-button>
                        </p>
                        <!-- size="mini" -->
                      </div>
                    </el-card>
                  </div>
                </el-col>
              </el-row>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <!-- 我的收藏 -->
    <div v-else-if="type === 'collect'">
      <el-card style="height: 100%">
        <el-row :gutter="40" class="tac">
          <!-- 左侧导航栏 -->
          <el-col :span="5">
            <el-menu
              :default-openeds="['1']"
              active-text-color="#ffd04b"
              background-color="#FFFFFF"
              class="el-menu-vertical-demo"
              default-active="2"
              text-color="#303133"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span @click="collectList" class="uploadnavstyle"
                    >我的收藏</span
                  >
                </template>
                <el-menu-item-group
                  :key="index"
                  v-for="(item, index) in collectLabel"
                >
                  <el-menu-item @click="getCollectList(item)"
                    >{{ item }}
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
          <!-- 收藏界面：视频 -->
          <el-col :span="18">
            <el-row>
              <el-row :gutter="10">
                <el-col
                  :key="index"
                  :span="6"
                  v-for="(item, index) in submitCollectData"
                >
                  <div class="grid-content bg-purple">
                    <el-card>
                      <el-image
                        :src="item.url"
                        style="width: 100%; height: 200px; border-radius: 10px"
                      ></el-image>
                      <div style="height: 20%; width: 100%">
                        <p
                          class="titlestyle"
                          style="display: flex; justify-content: space-between"
                        >
                          {{ item.title }}
                          <el-button
                            @click="openCollect(item.collectId, item.label)"
                            type="text"
                            >删除该收藏
                          </el-button>
                        </p>
                      </div>
                    </el-card>
                  </div>
                </el-col>
              </el-row>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <!-- 我的笔记 -->
    <div v-else-if="type === 'note'">
      <el-card style="height: 100%">
        <el-row :gutter="40" class="tac">
          <!-- 左侧导航栏 -->
          <el-col :span="5">
            <el-menu
              :default-openeds="['1']"
              active-text-color="#ffd04b"
              background-color="#FFFFFF"
              class="el-menu-vertical-demo"
              default-active="2"
              text-color="#303133"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span @click="labelList" class="uploadnavstyle"
                    >我的笔记</span
                  >
                </template>
                <el-menu-item-group
                  :key="index"
                  v-for="(item, index) in noteLabel"
                >
                  <el-menu-item @click="getNoteList(item)"
                    >{{ item }}
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
          <!-- 笔记界面：笔记列表/笔记内容 -->
          <div v-if="type1 === 'list'">
            <el-col :span="19">
              <el-row>
                <el-row :gutter="10">
                  <el-col
                    :key="index"
                    :span="6"
                    v-for="(item, index) in submitNoteData"
                  >
                    <div class="grid-content bg-purple">
                      <el-card>
                        <el-image
                          :src="item.url"
                          @click="getNoteContent(item.label, item.noteId)"
                          style="
                            width: 100%;
                            height: 200px;
                            border-radius: 10px;
                          "
                        ></el-image>
                        <div style="height: 20%; width: 100%">
                          <p
                            class="titlestyle"
                            style="
                              display: flex;
                              justify-content: space-between;
                            "
                          >
                            {{ item.title }}
                            <el-button
                              @click="openNote(item.noteId, item.label)"
                              type="text"
                              >删除该笔记
                            </el-button>
                          </p>
                        </div>
                      </el-card>
                    </div>
                  </el-col>
                </el-row>
              </el-row>
            </el-col>
          </div>
          <div v-else-if="type1 === 'content'">
            <el-col
              :key="index"
              :span="19"
              v-for="(item, index) in noteContent"
            >
              <el-link type="primary"
                ><h1>{{ item.title }}</h1></el-link
              >
              <p>{{ item.content }}</p>
            </el-col>
          </div>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonContent",
  // props里不能进行赋值
  props: {
    type: "",
  },
  data() {
    return {
      type1: "list",
      //getNoteList方法里用
      submitNoteData: [],
      // "我的收藏"里用的
      cardData: [
        {
          url: "video1.png",
          title: "吉尼斯世界纪录最甜的物质是？",
          name: "小魏科普",
          time: "3-2",
        },
        {
          url: "video2.png",
          title: "再有人欠你钱不还，一招拘留他！\n",
          name: "张鹏宇律师",
          time: "2-22",
        },
        {
          url: "video3.png",
          title: "叶利钦の小曲《爱国歌》",
          // 俄罗斯联邦1991—2000国歌《爱国歌》
          name: "快乐茄子人",
          time: "2021-8-28",
        },
        {
          url: "video4.png",
          title: "20年后，中国什么最值钱？\n",
          name: "财富研究院",
          time: "3-4",
        },
        {
          url: "video5.png",
          title: "你听说过英语的限定词吗？",
          name: "英语兔",
          time: "3-5",
        },
        {
          url: "video6.png",
          title: "工作中总要麻烦其他领导怎么办？",
          name: "体制内老秘书",
          time: "3-4",
        },
        {
          url: "video7.png",
          title: "七种未定式的计算—1的∞次幂型",
          name: "张宇考研数学",
          time: "3-20",
        },
        {
          url: "video8.png",
          title: "说说这8种产品经理",
          name: "产品经理王学姐",
          time: "3-9",
        },
      ],
      //labelList方法里面用
      noteLabel: [],
      //getNoteContent用
      noteContent: [],
      submitCollectData: [],
      collectLabel: [],
      submitUploadData: [],
    };
  },
  watch: {
    type: {
      handler(newName, oldName) {
        this.getListByType();
      },
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    getListByType() {
      if (this.type === "myUpload") {
        console.log("--------------- ", this.type);
        this.getUploadList();
      } else if (this.type === "collect") {
        console.log("--------------- ", this.type);
        this.collectList();
        if (this.collectLabel.length > 0) {
          let tempLabel = this.collectLabel[0];
          this.getCollectList(tempLabel);
        } else {
          // this.$message.warning("您还没有收藏过视频哦！")
        }
      } else if (this.type === "note") {
        console.log("--------------- ", this.type, this.noteLabel.length);
        this.labelList();
        if (this.noteLabel.length > 0) {
          console.log("--------------- 里面", this.type);
          let tempLabel = this.noteLabel[0];
          this.getNoteList(tempLabel);
        } else {
          // this.$message.warning("您还没有写过笔记哦！")
        }
      }
    },
    //删除笔记
    openNote(noteId, label) {
      this.$confirm("此操作将永久删除该笔记, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .delete("/note/deleteNoteById", {
              data: {
                noteId: noteId,
              },
            })
            .then((response) => {
              this.$message.success("删除笔记成功！");
              this.getNoteList(label);
            })
            .catch((error) => {
              this.$message.error("删除笔记失败！");
              console.log("error", error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //删除收藏
    openCollect(collectId, label) {
      this.$confirm("此操作将删除该收藏视频, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log("删除收藏：", collectId);
          this.$axios
            .delete("/collect/deleteCollectById", {
              data: {
                collectId: collectId,
              },
            })
            .then((response) => {
              this.$message.success("删除收藏视频成功！");
              this.getCollectList(label);
            })
            .catch((error) => {
              this.$message.error("删除收藏视频失败！");
              console.log("error", error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //删除视频
    openVideo(videoId) {
      this.$confirm("此操作将删除该投稿视频, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .delete("/video/deleteVideoById", {
              data: {
                videoId: videoId,
              },
            })
            .then((response) => {
              this.$message.success("删除视频成功！");
              this.getUploadList();
            })
            .catch((error) => {
              this.$message.error("删除视频失败！");
              // console.log("投稿-删除-id", this.submitUploadData.id);
              console.log("error", error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //点击左侧“TA的视频”时触发
    getUploadList() {
      this.submitUploadData = [];
      let videoImageUrl = "";
      let userId = parseInt(localStorage.userId);
      this.$axios
        .get("/video/getVideoListByUserId?userId=" + userId)
        .then((response) => {
          console.log(response.data);
          if (response.data.code === 200) {
            if (response.data.data !== null) {
              for (let i = 0; i < response.data.data.length; i++) {
                let pointPos = response.data.data[i].videoAddr.indexOf(".");
                videoImageUrl =
                  "http://172.22.173.94:8081/" +
                  response.data.data[i].videoAddr.substr(0, pointPos) +
                  ".jpg";
                this.submitUploadData.push({
                  url: videoImageUrl,
                  title: response.data.data[i].title,
                  id: response.data.data[i].id,
                });
              }
            } else {
              this.$message.warning("您还没有投稿过视频哦！");
            }
          }
        })
        .catch((error) => {
          this.$message.error("获取投稿视频列表失败！");
          console.log("error", error);
        });
    },
    //点击左侧“我的收藏”时触发
    collectList() {
      let userId = parseInt(localStorage.userId);
      this.$axios
        .get("/collect/getLabelList?userId=" + userId)
        .then((response) => {
          console.log("点我的收藏时触发:", response.data);
          if (response.data.code === 200) {
            console.log("response.data.data:", response.data.data);
            if (response.data.data !== null) {
              //在循环之前先给noteLabel清空一下
              this.collectLabel = [];
              for (let i = 0; i < response.data.data.length; i++) {
                this.collectLabel.push(response.data.data[i]);
              }
            } else {
              this.$message.warning("您还没有收藏过视频哦！");
            }
          }
        })
        .catch((error) => {
          this.$message.error("获取收藏视频列表失败！");
          console.log("error", error);
        });
    },
    //点击左侧“收藏标签”时触发
    getCollectList(label) {
      console.log("传的label大学无讹：", label);
      this.submitCollectData = [];
      let userId = parseInt(localStorage.userId);
      this.$axios
        .get("/collect/getCollectList?userId=" + userId)
        .then((response) => {
          console.log(response.data);
          if (response.data.code === 200) {
            let labelList = Object.keys(response.data.data);
            for (let i = 0; i < labelList.length; i++) {
              if (label === labelList[i]) {
                for (let j = 0; j < response.data.data[label].length; j++) {
                  let pointPos =
                    response.data.data[label][j].video.videoAddr.indexOf(".");
                  let videoImageUrl =
                    "http://172.22.173.94:8081/" +
                    response.data.data[label][j].video.videoAddr.substr(
                      0,
                      pointPos
                    ) +
                    ".jpg";
                  //往里面push了一个对象{}，里面是键值对
                  this.submitCollectData.push({
                    url: videoImageUrl,
                    label: label,
                    title: response.data.data[label][j].video.title,
                    collectId: response.data.data[label][j].collect.id,
                  });
                }
              }
            }
          }
        })
        .catch((error) => {
          this.$message.error("获取收藏列表失败！");
          console.log("error", error);
        });
    },
    //点击左侧"笔记标签"时触发，通过userId发送请求获取
    getNoteList(label) {
      this.type1 = "list";
      this.submitNoteData = [];
      let userId = parseInt(localStorage.userId);
      this.$axios
        .get("/note/getNoteList?userId=" + userId)
        .then((response) => {
          console.log(response.data);
          if (response.data.code === 200) {
            //通过http://172.22.173.94:8081/note/getNoteList?userId=2看response.data.data里面的是什么，以及是对象还是数组
            //Object.keys是获取response.data.data（是一个对象）里面的关键字，data{ss[],大学体育[],法律[]}
            let labelList = Object.keys(response.data.data);
            //labelList:["ss","大学体育","法律"]
            for (let i = 0; i < labelList.length; i++) {
              //label是该方法的形参，"ss"或者"大学体育"或者...
              if (label === labelList[i]) {
                for (let j = 0; j < response.data.data[label].length; j++) {
                  //要获取的是视频封面，但回复里面的是以mp4结尾的，要把这个videoAddr改成jpg结尾的
                  //这里获取.的位置，进行截取
                  let pointPos =
                    response.data.data[label][j].video.videoAddr.indexOf(".");
                  let videoImageUrl =
                    "http://172.22.173.94:8081/" +
                    response.data.data[label][j].video.videoAddr.substr(
                      0,
                      pointPos
                    ) +
                    ".jpg";
                  //往里面push了一个对象{}，里面是键值对
                  this.submitNoteData.push({
                    url: videoImageUrl,
                    label: label,
                    title: response.data.data[label][j].video.title,
                    noteId: response.data.data[label][j].note.id,
                  });
                }
              }
            }
          }
        })
        .catch((error) => {
          this.$message.error("获取笔记列表失败！");
          console.log("error", error);
        });
    },
    //点左侧”我的笔记“时触发，以userId获取labelList
    labelList() {
      let userId = parseInt(localStorage.userId);
      this.$axios
        .get("/note/getLabelList?userId=" + userId)
        .then((response) => {
          console.log("点我的笔记时触发:", response.data);
          if (response.data.code === 200) {
            console.log("response.data.data:", response.data.data);
            if (response.data.data !== null) {
              //在循环之前先给noteLabel清空一下
              this.noteLabel = [];
              for (let i = 0; i < response.data.data.length; i++) {
                this.noteLabel.push(response.data.data[i]);
              }
            } else {
              this.$message.warning("您还没有写过笔记哦！");
            }
          } else {
            this.$message.error("response不为200！");
          }
        })
        .catch((error) => {
          this.$message.error("获取标签列表失败！");
          console.log("error", error);
        });
    },
    //点击"笔记列表"时触发
    getNoteContent(label, noteId) {
      this.type1 = "content";
      this.noteContent = [];
      let userId = parseInt(localStorage.userId);
      this.$axios
        .get("/note/getNoteList?userId=" + userId)
        .then((response) => {
          console.log(response.data);
          if (response.data.code === 200) {
            let labelList = Object.keys(response.data.data);
            for (let i = 0; i < labelList.length; i++) {
              //label形参
              if (label === labelList[i]) {
                for (
                  let j = 0;
                  j < response.data.data[labelList[i]].length;
                  j++
                ) {
                  if (noteId === response.data.data[labelList[i]][j].note.id) {
                    this.noteContent.push({
                      title: response.data.data[labelList[i]][j].video.title,
                      content: response.data.data[labelList[i]][j].note.content,
                    });
                  }
                }
              }
            }
          }
        })
        .catch((error) => {
          this.$message.error("获取笔记内容失败！");
          console.log("error", error);
        });
    },
  },
};
</script>
<style lang="less" scoped>
.uploadnavstyle {
  font-weight: bold;
  font-size: 20px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  /* font-size: 15px; */
  /* font-family:'Times New Roman', Times, serif; */
}
</style>

