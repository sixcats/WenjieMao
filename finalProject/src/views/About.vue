<script setup>
import {reactive, ref} from 'vue'
import { ElMessage } from 'element-plus'



const submitForm = () => {
  ElMessage.success('Submitted successfully!');
}
const ruleForm = reactive({

  suggestion: '',
  rate: '',
})

</script>

<template>
<div>
  <h1>About Us</h1>
  <div>This project aims to develop a modern web application for a well-known health
    charity dedicated to improving the well-being of older people.</div>
   <div> The web application
aims to leverage advanced technology, expand the charity's reach, enhance access to
resources, and ultimately improve the quality of life for seniors.</div>
   <div>Guided by the
charity's mission, the program aims to provide critical health information, support
services, educational content, and a streamlined donation process, presented in a userfriendly and easily accessible manner.</div>
  <el-divider></el-divider>
  <template v-if="false">
    <h1>Our Vision</h1>
    <div>The main goals of the web application are to provide comprehensive and easily
      accessible information on health services, provide self-assessment and health
      monitoring tools, create a community space where older users can connect with others
      who have had similar experiences, and provide a seamless donation experience.</div>
    <div> By
      addressing the specific needs of older age groups and incorporating user-friendly
      donation capabilities, the web application will play a key role in advancing the
      charity's mission to improve the health and well-being of vulnerable populations</div>


    <div>Together, we can make a difference and build a brighter future for all.</div>
  </template>


  <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      status-icon
      label-width="auto"
  >

    <el-form-item label="Website Rating">
      <el-rate v-model.number="ruleForm.rate" />
    </el-form-item>
    <el-form-item label="Your Suggestion">
      <el-input type="textarea" v-model="ruleForm.suggestion" placeholder="Please enter your suggestion here..."></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm()">
        Submit
      </el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<style scoped>
div {
  padding: 10px;
}
</style>
