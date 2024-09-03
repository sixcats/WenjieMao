<script setup>
import {useRouter} from "vue-router";

const router = useRouter()
const jumpToProjects = () => {
  router.push('/layout')
}

</script>

<template>
  <div class="welcome-card">
    <div class="huge">Welcome to Senior Charity Foundation</div>
    
    <div class="middle">We are glad to have you here!</div>
    <div class="myLink" @click="jumpToProjects()">view our latest projects</div>
  </div>
</template>

<style scoped>
.welcome-card{
  background: #e7ebec;
  border-radius: 10px;
  padding: 40px 20px;
}
.huge{
  font-size: 30px;
  font-weight: bold;
  font-style: italic;
}
.middle{
  padding: 20px 20px 20px 0;
}

.myLink{
  text-decoration: underline;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}
</style>
