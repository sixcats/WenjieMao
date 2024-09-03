<script setup>
import {ref} from "vue";

const volunteers = [
  {
    name: 'volunteer 1', img: '/pictures/volunteer/img.png',
    telephone: "0421234567",
    place: "Melbourne",
    address: "Melbourne central"
  },
  {
    name: 'volunteer 2', img: '/pictures/volunteer/img.png',
    telephone: "0421234567",
    place: "Melbourne",
    address: "Melbourne central"
  },
  {
    name: 'volunteer 3', img: '/pictures/volunteer/img.png',
    telephone: "0421234567",
    place: "Melbourne",
    address: "Melbourne central"
  },
  {
    name: 'volunteer 4', img: '/pictures/volunteer/img.png',
    telephone: "0421234567",
    place: "Melbourne",
    address: "Melbourne central"
  },


]
const userInfo = ref({})
const handleClick = (info) => {
    userInfo.value = info
    dialogVisible.value = true
}
//control dialog
const dialogVisible = ref(false)
const handleClose = () => {
  dialogVisible.value = false
}
</script>

<template>
  <div class="container">
    <div class="info" v-for="item in volunteers">
      <img :src="item.img" style="width: 100%;border-radius: 10px 10px 0 0;">
      <h2 style="text-align: center">{{ item.name }}</h2>
      <div class="btnC">
        <el-button @click="handleClick(item)" type="primary">View Detail</el-button>
      </div>

    </div>
    <!-- show detail-->
    <el-dialog
        v-model="dialogVisible"
        title=""
        width="500"
        :before-close="handleClose"
    >
      <el-descriptions title="User Info">
        <el-descriptions-item label="Username">{{ userInfo.name }}</el-descriptions-item>
        <el-descriptions-item label="Telephone">{{ userInfo.telephone }}</el-descriptions-item>
        <el-descriptions-item label="Place">{{ userInfo.place }}</el-descriptions-item>
        <el-descriptions-item label="Address">{{ userInfo.address }}</el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Close</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;

  .info {
    width: 30%;
    border: 1px solid #d5d9d4;
    border-radius: 10px;
    padding-bottom: 10px;
  }
}

.btnC {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
