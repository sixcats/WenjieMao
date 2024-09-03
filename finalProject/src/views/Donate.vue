<template>
  <el-form :model="donationForm" ref="donationFormRef" status-icon>
    <el-form-item
        label="Donation Amount"
        prop="amount"
        :rules="[{ required: true, message: 'Please enter donation amount', trigger: 'blur' }]"
    >
      <el-input v-model="donationForm.amount" placeholder="Enter amount"></el-input>
    </el-form-item>

    <el-form-item
        label="Donation Project"
        prop="project"
        :rules="[{ required: true, message: 'Please select a project', trigger: 'change' }]"
    >
      <el-select v-model="donationForm.project" placeholder="Select a project">
        <el-option label="Project 1" value="project1"></el-option>
        <el-option label="Project 2" value="project2"></el-option>
        <el-option label="Project 3" value="project3"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Contact Information">
      <el-input v-model="donationForm.contact" placeholder="Enter your contact info (optional)"></el-input>
    </el-form-item>

    <el-form-item label="Anonymous Donation">
      <el-radio-group v-model="donationForm.anonymous">
        <el-radio label="Yes">Yes</el-radio>
        <el-radio label="No">No</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(donationFormRef)" style="width: 100%">Donate Now</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, defineComponent } from 'vue'
import { ElNotification } from 'element-plus'
const donationFormRef = ref()
const donationForm = ref({
  amount: '',
  project: '',
  contact: '',
  anonymous: 'No' // Default selection
})

const submitForm = async (formEl) => {
  const isValid = await formEl.validate()
  if (isValid) {
    ElNotification({
      title: 'Success',
      message: 'Thank you for your donation!',
      type: 'success'
    })

  }
}
</script>

<style scoped>
.el-form {
  max-width: 400px;
  margin: 20px auto;
}
</style>
