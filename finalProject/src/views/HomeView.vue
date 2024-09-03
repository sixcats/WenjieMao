<script setup>
import { reactive, ref } from 'vue'
import CustomHeader from "@/components/CustomHeader.vue";
import WelcomeCard from "@/components/WelcomeCard.vue";
import { ElMessage } from 'element-plus'
import { useRouter } from "vue-router"
// control the form show/hide status
const showForm = ref(false)
const router = useRouter()
// Reference to the form element for validation
const ruleFormRef = ref()
const ruleForm = reactive({
  name: '',
  email: '',
  type: '',
  pass: '',
  checkPass: '',
})
// Validate the password input
const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the password'));
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField('checkPass');
    }
    callback();
  }
};
// Validate the confirmation password input
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the password again'));
  } else if (value !== ruleForm.pass) {
    callback(new Error("Two inputs don't match!"));
  } else {
    callback();
  }
};
// Validation rules for the form fields
const rules = reactive({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  type: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
  email: [
    { required: true, message: 'Please input email', trigger: 'blur' },
  ],
})
// Submit form function with validation
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // Show success message if form is valid
      ElMessage({
        message: 'Registration successful!',
        type: 'success',
      })
      // Store user information in local storage
      localStorage.setItem('userInfo',JSON.stringify(ruleForm))

      router.push('/layout')
    }
  })
}


</script>

<template>
<div class="homeContainer">
  <CustomHeader @showForm="showForm = true"></CustomHeader>
  <WelcomeCard style="margin-top: 20px"></WelcomeCard>
  <div v-if="showForm" class="formContainer">

      <h2 class="form-tit">Sign up </h2>
    <el-form
        ref="ruleFormRef"
        style="width:600px"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        status-icon
    >
      <el-form-item label="username" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="Email address" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="User Type" prop="type">
        <el-select v-model="ruleForm.type" placeholder="User Type">
          <el-option label="volunteer" value="volunteer" />
          <el-option label="user" value="user" />
        </el-select>
      </el-form-item>
      <el-form-item label="Password" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Confirm" prop="checkPass">
        <el-input
            v-model="ruleForm.checkPass"
            type="password"
            autocomplete="off"
        />
      </el-form-item>

      <el-form-item>
        <div class="btnContainer">
          <el-button type="primary" @click="submitForm(ruleFormRef)" style="width: 100%">
            sign up
          </el-button>
        </div>


      </el-form-item>
    </el-form>
  </div>

</div>

</template>
<style scoped>
.homeContainer{
  max-width: 800px;
  margin: 0 auto;
}
.formContainer{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
 .form-tit{
   text-align: center;
   margin: 20px;
 }
 .btnContainer{
   width: 100%;
   display: flex;
   justify-content: center;
 }
</style>
