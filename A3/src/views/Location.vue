<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import Map from '@/components/Map.vue';

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
    <Map></Map>
  </div>
</template>

<style scoped>
div {
  padding: 10px;
}
</style>
