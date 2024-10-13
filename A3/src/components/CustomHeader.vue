<script setup>
import { defineEmits, ref } from 'vue'

// Define emits for the component. In this case, we are emitting the 'showSignUp' event.
const emit = defineEmits(['showSign'])
// Function to emit the 'showSignUp' event when called
const sign = () => {
  emit('showSignUp')
}
const signIn = () => {
  emit('showSignIn')
}
// Reactive reference to hold user information
const userInfo = ref({})
// Function to retrieve user info from local storage
const getUserInfo = () => {
  const info = localStorage.getItem('userInfo') // Get user info from local storage
  if (info) {
    userInfo.value = JSON.parse(info) // Parse and set user info if it exists
  }else{
    userInfo.value = {} // Set user info to empty object if it doesn't exist
  }
}
getUserInfo() // Call the function to get user info on component mount

// Function to log out the user by removing their info from local storage
const logout = () => {
  localStorage.removeItem('userInfo')
  getUserInfo() // Call the function to get user info again
}

</script>

<template>
  <div class="custom-header">
    <template v-if="userInfo.email">
      <el-button type="primary" link >{{ `Welcome ${userInfo.email}`}}</el-button>
    </template>
    <el-button type="primary" link v-else>not signed in</el-button>
    <h1>Senior Charity Foundation</h1>
    <template v-if="userInfo.email">
      <el-button  @click="logout">log out</el-button>
    </template>
    <div v-else>
      <el-button type="primary" @click="signIn">sign in</el-button>
      <el-button @click="sign" v-if="!userInfo.email">sign up</el-button>
    </div>
  </div>
</template>

<style scoped>
.custom-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
