<script setup>
import { reactive, ref } from 'vue'
import CustomHeader from "@/components/CustomHeader.vue";
import WelcomeCard from "@/components/WelcomeCard.vue";
import { ElMessage } from 'element-plus'
import { useRouter } from "vue-router"
import SignUp from '@/components/SignUp.vue';
import SignIn from '@/components/SignIn.vue';

// control the form show/hide status
const showSignUp = ref(false)
const showSignIn = ref(false)
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
      localStorage.setItem('userInfo', JSON.stringify(ruleForm))

      router.push('/layout')
    }
  })
}
</script>

<template>
  <div class="homeContainer">
    <CustomHeader @showSignUp="showSignUp = true;showSignIn = false" @showSignIn="showSignIn = true ;showSignUp = false"></CustomHeader>
    <WelcomeCard style="margin-top: 20px"></WelcomeCard>
    <SignUp v-if="showSignUp"></SignUp>
    <SignIn v-if="showSignIn"></SignIn>
  </div>

</template>
<style scoped>
.homeContainer {
  max-width: 800px;
  margin: 0 auto;
}

.formContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form-tit {
  text-align: center;
  margin: 20px;
}

.btnContainer {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
