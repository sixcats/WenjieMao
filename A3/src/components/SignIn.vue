<script setup>
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../auth/firebase';
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from "vue-router"
const router = useRouter()
// Reference to the form element for validation
const ruleFormRef = ref()
const ruleForm = reactive({
    email: '',
    pass: ''
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
// Validation rules for the form fields
const rules = reactive({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    email: [
        { required: true, message: 'Please input email', trigger: 'blur' },
    ],
})
// Submit form function with validation
const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            try {
                signInWithEmailAndPassword(auth, ruleForm.email, ruleForm.pass)
                    .then(() => {
                        // Show success message if form is valid
                        ElMessage({
                            message: 'Login successful!',
                            type: 'success',
                        })
                        // Store user information in local storage
                        localStorage.setItem('userInfo', JSON.stringify(ruleForm))
                        router.push('/layout')
                    });
            } catch (error) {
                console.log("Login failed:", error)
                ElMessage({
                    message: 'Login failed!',
                    type: 'warning',
                })
            }

        }
    })
}

</script>

<template>
    <div class="formContainer">
        <h2 class="form-tit">Sign in </h2>
        <el-form ref="ruleFormRef" style="width:600px" :model="ruleForm" :rules="rules" label-width="auto"
            class="demo-ruleForm" status-icon>
            <el-form-item label="Email address" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="pass">
                <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <div class="btnContainer">
                    <el-button type="primary" @click="submitForm(ruleFormRef)" style="width: 100%">
                        sign in
                    </el-button>
                </div>
            </el-form-item>
        </el-form>
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