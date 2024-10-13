<template>
  <el-row :gutter="20">
    <el-col :span="15">
      Donation Amount:
      <el-input style="width: 150px;" v-model="queryForm.amount" placeholder="Enter amount"></el-input>
      <el-button type="primary" @click="search">Search</el-button>
    </el-col>
    <el-col :span="5">
      <el-button type="danger" @click="saveDialogVisible = true">Donate Now</el-button>
    </el-col>
  </el-row>
  <el-divider />
  <el-table :data="tableData" style="width: 100%" :default-sort="{ prop: 'amount', order: 'descending' }">
    <el-table-column fixed type="index" width="50" />
    <el-table-column prop="amount" label="Amount" width="110" sortable />
    <el-table-column prop="project" label="project" width="120">
      <template #default="{ row }">
        <span>{{ projectText(row.project) }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="contact" label="contact" width="200" />
    <el-table-column prop="anonymous" label="anonymous" width="110" />
    <el-table-column fixed="right" label="Operations" min-width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">
          Remove
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 50]"
    :size="10" :disabled="false" layout="total, sizes, prev, pager, next, jumper" :total="allData.length"
    @size-change="handleSizeChange" @current-change="handleCurrentChange" style="padding-top:1%;padding-bottom:5%" />

  <el-dialog v-model="saveDialogVisible" title="Donation Now" style="height: 600px;">
    <el-form :model="donationForm" ref="donationFormRef" status-icon>
      <el-alert type="info" show-icon :closable="false">
        <p>
          "Donation Amount" based on your financial strength, offer a helping heart.<br />
        </p>
      </el-alert>
      <el-form-item label="Donation Amount" prop="amount" width="120"
        :rules="[{ required: true, message: 'Please enter donation amount', trigger: 'blur' }]">
        <el-input v-model="donationForm.amount" placeholder="Enter amount"></el-input>
      </el-form-item>
      <el-alert type="info" show-icon :closable="false">
        <p>
          "Donation Project" choose the donation project that interests you. <br />
        </p>
      </el-alert>
      <el-form-item label="Donation Project" prop="project"
        :rules="[{ required: true, message: 'Please select a project', trigger: 'change' }]">
        <el-select v-model="donationForm.project" placeholder="Select a project">
          <el-option v-for="item in projectOptions" :key="item.value" :label="item.label"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-alert type="info" show-icon :closable="false">
        <p>
          "Contact Information" leave your contact information and let more people know about your achievements in the
          future. <br />
        </p>
      </el-alert>
      <el-form-item label="Contact Information">
        <el-input v-model="donationForm.contact" placeholder="Enter your contact info (optional)"></el-input>
      </el-form-item>
      <el-alert type="info" show-icon :closable="false">
        <p>
          "Anonymous Donation" anonymous donations will not retain any of your information. <br />
        </p>
      </el-alert>
      <el-form-item label="Anonymous Donation">
        <el-radio-group v-model="donationForm.anonymous">
          <el-radio label="Yes">Yes</el-radio>
          <el-radio label="No">No</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="saveDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitForm(donationFormRef)" @keyup.enter="submitForm(donationFormRef)">
          Donate Now
        </el-button>
      </div>
    </template>

  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, defineComponent } from 'vue'
import { ElNotification } from 'element-plus'
import { Value } from 'sass';

const currentPage = ref(1)
const pageSize = ref(10)

const projectOptions = [
  { value: 'project1', label: 'Project 1' },
  { value: 'project2', label: 'Project 2' },
  { value: 'project3', label: 'Project 3' }
]
const allData = ref([
  {
    amount: '100',
    project: 'project1',
    contact: 'example@example.com',
    anonymous: 'No'
  },
  {
    amount: '200',
    project: 'project2',
    contact: 'example@example.com',
    anonymous: 'No'
  }
])
const tableData = ref(allData.value.slice(0, pageSize.value))
const saveDialogVisible = ref(false)
const donationFormRef = ref()
const queryForm = ref({
  amount: ''
})
const donationForm = ref({
  amount: '',
  project: '',
  contact: '',
  anonymous: 'No' // Default selection
})
const search = () => {
  if (!queryForm.value.amount) {
    tableData.value = allData.value
    return
  }
  tableData.value = allData.value.filter((item) => item.amount === queryForm.value.amount)
}
const submitForm = async (formEl) => {
  const isValid = await formEl.validate()
  if (isValid) {
    tableData.value.push(donationForm.value)
    saveDialogVisible.value = false
    ElNotification({
      title: 'Success',
      message: 'Thank you for your donation!',
      type: 'success'
    })
  }
}
const deleteRow = (index: number) => {
  allData.value.splice(index, 1)
  tableData.value = allData.value.slice(0, pageSize.value)
}
const projectText = (project: string) => {
  const option = projectOptions.find((item) => item.value === project);
  return option ? option.label : 'Unknown';
}

const handleSizeChange = (val) => {
  tableData.value = allData.value.slice(0, val)
}
const handleCurrentChange = (val) => {
  tableData.value = allData.value.slice((val - 1) * pageSize.value, val * pageSize.value)
}

</script>

<style>
.el-form {
  max-width: 400px;
  margin: 20px auto;
}

.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
