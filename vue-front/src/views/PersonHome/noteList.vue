<template>
  <div>
    <el-row>
      <!-- 笔记列表 -->
      <el-row :gutter="10">
        <el-col v-for="(item, index) in noteData" :key="index" :span="6">
          <div class="grid-content bg-purple">
            <el-card>
              <el-image
                style="width: 190px; height: 150px; border-radius: 10px"
                :src="item.url"
              ></el-image>
              <div style="height: 20%; width: 100%">
                <p class="titlestyle">{{ item.title }}</p>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "noteList",
  props: {
    noteData: [],
  },
  data() {
    return {};
  },
  created() {
    console.log("noteList.vue", this.noteData);
  },
  methods: {},
};
</script>