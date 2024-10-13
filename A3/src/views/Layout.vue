<script setup>

import CustomHeader from "@/components/CustomHeader.vue";
import { Food, House, User, Warning, Location } from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";
import WelcomeCard from "@/components/WelcomeCard.vue";
import { ref, watch } from "vue";
const router = useRouter();
const route = useRoute()
const jump = (path) => {
  showOwnView.value = false
  router.push(path)
}
const showOwnView = ref(true)

// Function to determine whether to show projects or router view
const changeView = () => {
  const length = route.matched.length
  showOwnView.value = length === 1
}

// Watcher to reactively update the view when the route changes
watch(
  route,
  () => {
    changeView()
  },
  {
    deep: true
  }
)

const projectList = [
  { name: 'project', img: '/pictures/project/img.png' },
  { name: 'project', img: '/pictures/project/img.png' },
  { name: 'project', img: '/pictures/project/img.png' },
  { name: 'project', img: '/pictures/project/img.png' },
  { name: 'project', img: '/pictures/project/img.png' },
  { name: 'project', img: '/pictures/project/img.png' },
]

const charityNews = [
  { title: "Australia's Charities Join Forces to Combat Homelessness" },
  { title: "New Legislation Aims to Boost Donations to Australian Charities" },
  { title: "Australian Charity Raises Over $1 Million for Disaster Relief" },
  { title: "Volunteers Step Up: Community Response to Drought in Australia" },
  { title: "Local Charity Launches Campaign to Support Mental Health Awareness" },
  { title: "Australia’s Biggest Charity Event: Fun Run Raises Funds for Cancer Research" },
  { title: "Innovative Fundraising: How Australian Charities are Embracing Technology" },
  { title: "Charity Organizations Call for Greater Support for Indigenous Communities" },
  { title: "Record-Breaking Donations Flood into Australian Wildlife Rescue Groups" },
  { title: "How Australian Charities are Responding to the COVID-19 Crisis" }
];

</script>

<template>

  <div class="layout">
    <custom-header></custom-header>
    <div class="custom-nav">
      <div class="nav-item" @click="jump('/')">
        <el-icon>
          <House />
        </el-icon>
        <div class="nav-item-text">Home</div>
      </div>
      <div class="nav-item" @click="jump('/layout/volunteer')">
        <el-icon>
          <User />
        </el-icon>
        <div class="nav-item-text">Volunteers</div>
      </div>
      <div class="nav-item" @click="jump('/layout/donate')">
        <el-icon>
          <Food />
        </el-icon>
        <div class="nav-item-text">Donate</div>
      </div>
      <div class="nav-item" @click="jump('/layout/location')">
        <el-icon>
          <Location />
        </el-icon>
        <div class="nav-item-text">Location</div>
      </div>
      <div class="nav-item" @click="jump('/layout/about')">
        <el-icon>
          <Warning />
        </el-icon>
        <div class="nav-item-text">About Us</div>
      </div>
    </div>
    <welcome-card style="margin-bottom: 20px"></welcome-card>
    <div class="flex">
      <div class="leftContent">
        <div class="projectsContainer" v-if="showOwnView">
          <div class="projectItem" v-for="item in projectList">
            <el-card>
              <template #header>{{ item.name }}</template>
              <img :src="item.img" style="width: 100%" />
            </el-card>
          </div>
        </div>
        <router-view v-else></router-view>
      </div>


      <div class="newsContainer">
        <h1>Recent news</h1>

        <div class="newsItem" v-for="item in charityNews" :title="item.title">{{ item.title }}</div>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
.layout {
  width: 1200px;
  overflow: hidden;
  margin: 0 auto;
}

.custom-nav {
  display: flex;
  width: 100%;
  border-top: 1px solid #d5d9d4;
  border-bottom: 1px solid #d5d9d4;
  padding: 10px;
  margin: 20px;

  .nav-item {
    flex: 1;
    width: 0;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}

.leftContent {
  width: 0;
  flex: 1;

  .projectsContainer {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
  }

  .projectItem {
    width: 30%;
  }
}

.newsContainer {
  width: 500px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .newsItem {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
