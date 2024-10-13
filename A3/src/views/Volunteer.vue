<script lang="ts" setup>
import {
  Iphone,
  Location,
  OfficeBuilding,
  User,
} from '@element-plus/icons-vue'
import type { ComponentSize } from 'element-plus'
import { computed, ref } from "vue";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// Define the current page
const currentPage = ref(1)
// Define the number of items per page
const pageSize = ref(10)
// Define the query form with a username field
const queryForm = ref({
  username: ''
})
// Define the list of volunteers with their names, images, phone numbers, locations, and addresses
const volunteers = ref([
  {
    name: 'volunteer 1', img: '/pictures/volunteer/img.png',
    telephone: "0421234567",
    place: "Melbourne",
    address: "Melbourne central"
  },
  {
    name: 'volunteer 2', img: '/pictures/volunteer/img.png',
    telephone: "0421234567",
    place: "Melbourne",
    address: "Melbourne central"
  },
  {
    name: 'volunteer 3', img: '/pictures/volunteer/img.png',
    telephone: "0421234567",
    place: "Melbourne",
    address: "Melbourne central"
  },
  {
    name: 'volunteer 4', img: '/pictures/volunteer/img.png',
    telephone: "0421234567",
    place: "Melbourne",
    address: "Melbourne central"
  },
  {
    name: 'volunteer 5', img: '/pictures/volunteer/img.png',
    telephone: "0421234567",
    place: "Melbourne",
    address: "Melbourne central"
  },
  {
    name: 'volunteer 6', img: '/pictures/volunteer/img.png',
    telephone: "0421234567",
    place: "Melbourne",
    address: "Melbourne central"
  },
  {
    name: 'volunteer 7', img: '/pictures/volunteer/img.png',
    telephone: "0421234567",
    place: "Melbourne",
    address: "Melbourne central"
  },
  {
    name: 'volunteer 8', img: '/pictures/volunteer/img.png',
    telephone: "0421234567",
    place: "Melbourne",
    address: "Melbourne central"
  },
  {
    name: 'volunteer 9', img: '/pictures/volunteer/img.png',
    telephone: "0421234567",
    place: "Melbourne",
    address: "Melbourne central"
  },
  {
    name: 'volunteer 10', img: '/pictures/volunteer/img.png',
    telephone: "0421234567",
    place: "Melbourne",
    address: "Melbourne central"
  },
  {
    name: 'volunteer 11', img: '/pictures/volunteer/img.png',
    telephone: "0421234567",
    place: "Melbourne",
    address: "Melbourne central"
  },
  {
    name: 'volunteer 4', img: '/pictures/volunteer/img.png',
    telephone: "0421234567",
    place: "Melbourne",
    address: "Melbourne central"
  },
  // Example volunteer data...
])
// Filter the displayed volunteers based on the current page and page size
const tableData = ref(volunteers.value.slice(0, pageSize.value))
// Define an object to store individual volunteer information
const userInfo = ref({})
// Define the component size
const size = ref<ComponentSize>('default')
// Compute the icon style based on the component size
const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px',
  }
  return {
    marginRight: marginMap[size.value] || marginMap.default,
  }
})
// Control the visibility of the dialog
const dialogVisible = ref(false)
// Method to close the dialog
const handleClose = () => {
  dialogVisible.value = false
}

// Method to search for volunteers
const search = () => {
  if (!queryForm.value.username) {
    tableData.value = volunteers.value
    return
  }
  tableData.value = volunteers.value.filter((item) => item.name === queryForm.value.username)
}

// Method to delete a volunteer
const deleteRow = (index: number) => {
  volunteers.value.splice(index, 1)
  tableData.value = volunteers.value.slice(0, pageSize.value)
}
// Method to view detailed information of a volunteer
const viewRow = (scope) => {
  userInfo.value = scope.row
  dialogVisible.value = true
}
// Method to change the number of items per page
const handleSizeChange = (val) => {
  tableData.value = volunteers.value.slice(0, val)
}
// Method to change the current page
const handleCurrentChange = (val) => {
  tableData.value = volunteers.value.slice((val - 1) * pageSize.value, val * pageSize.value)
}

// Method to export volunteer information as a PDF
const exportPDF = async () => {
  const id = document.getElementById('userInfoDescription')
  const canvas = await html2canvas(id, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: 'a4',
  });
  const imgProps = doc.getImageProperties(imgData);
  const pdfWidth = doc.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  let heightLeft = pdfHeight;
  const pageHeight = pdfHeight;
  let position = 0;
  doc.addImage(imgData, 'PNG', 0, position, pdfWidth, pageHeight);
  // Paginate
  heightLeft -= pageHeight;
  while (heightLeft >= 0) {
    position = heightLeft - pageHeight;
    doc.addPage();
    doc.addImage(imgData, 'PNG', 0, position, pdfWidth, pageHeight);
    heightLeft -= pageHeight;
  }
  doc.save('download.pdf');
}

</script>

<template>
  <div class="container">
    <el-row :gutter="24">
      <el-col :span="24">
        Username:
        <el-input style="width: 150px;" v-model="queryForm.username" placeholder="Enter username"></el-input>
        <el-button type="primary" @click="search">Search</el-button>
      </el-col>
    </el-row>
    <el-divider />
    <el-table :data="tableData" style="width: 100%" :default-sort="{ prop: 'name', order: 'descending' }">
      <el-table-column fixed type="index" width="50" />
      <el-table-column prop="name" label="name" width="110" sortable />
      <el-table-column prop="telephone" label="telephone" width="120" />
      <el-table-column prop="place" label="place" width="200" />
      <el-table-column prop="address" label="address" width="110" />
      <el-table-column fixed="right" label="Operations" min-width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">
            Remove
          </el-button>
          <el-button link type="primary" size="small" @click.prevent="viewRow(scope)">
            View
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 50]"
      :size="10" :disabled="false" layout="total, sizes, prev, pager, next, jumper" :total="volunteers.length"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" style="padding-top:1%;padding-bottom:5%" />
    <!-- show detail-->
    <el-dialog v-model="dialogVisible" title="" width="700" :before-close="handleClose">
      <el-descriptions id="userInfoDescription" title="User Info" direction="vertical" border style="margin-top: 20px">
        <el-descriptions-item :rowspan="2" :width="140" label="Photo" align="center">
          <el-image style="width: 100px; height: 100px" :src="userInfo.img" />
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <user />
              </el-icon>
              Username
            </div>
          </template>
          {{ userInfo.name }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <iphone />
              </el-icon>
              Telephone
            </div>
          </template>
          {{ userInfo.telephone }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <office-building />
              </el-icon>
              Place
            </div>
          </template>
          {{ userInfo.place }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <location />
              </el-icon>
              Address
            </div>
          </template>
          {{ userInfo.address }}
        </el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Close</el-button>
          <el-button type="primary" @click="exportPDF()">
            Export
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>

</template>

<style scoped lang="scss">
.container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;

  .info {
    width: 30%;
    border: 1px solid #d5d9d4;
    border-radius: 10px;
    padding-bottom: 10px;
  }
}

.btnC {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
