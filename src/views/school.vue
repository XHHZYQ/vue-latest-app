<template>
  <div class="container-box">
    <!-- <div v-for="item in list">{{ item.value }}</div>
    <el-button @click="changeList">修改 list</el-button> -->

    <el-form ref="form" :model="formModel" :rules="formRules" inline label-width="60px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formModel.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="省市区" prop="areas">
        <el-cascader v-model="formModel.areas" :options="areaOptions" :props="cascaderProps" placeholder="请选择省市区" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

    <section style="margin-bottom: 20px;">
      <el-button type="success" @click="onAdd">添加</el-button>
    </section>

    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="学校名称" min-width="120" />
      <el-table-column prop="logo" label="学校标志" width="120">
        <template #default="{ row }">
          <div style="text-align: center">
            <el-image
              v-if="row.logo"
              style="width: 60px"
              :src="row.logo"
              :preview-src-list="[row.logo]"
              preview-teleported
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="省市区" min-width="120">
        <template #default="{ row }">
          {{ `${row.provinceName}/${row.cityName}/${row.districtName}` }}
        </template>
      </el-table-column>
      <el-table-column prop="schoolLevel" label="学段" min-width="120" />
      <el-table-column prop="createdTimeText" label="添加时间" width="170" />
      <el-table-column prop="statusText" label="状态" width="80px" />
      <el-table-column label="操作" width="130px" fixed="right">
        <template #default="{ row }">
          <el-link style="margin-right: 6px" type="primary">编辑</el-link>
          <el-link style="margin-right: 6px" type="primary">{{
            row.status === 1 ? '停用' : '启用'
          }}</el-link>
          <el-link type="primary">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { schoolList, apiAreaOptions } from '../api/organization.js';

const cascaderProps = {
  expandTrigger: 'hover',
  multiple: false, // 支持多选
  checkStrictly: false, // 支持选择到任意层级
  value: 'key',
  label: 'value',
  children: 'children'
};

const router = useRouter();
const form = ref(null);
const formModel = reactive({ name: undefined, areas: undefined });
const formRules = reactive({});
const tableData = ref([]);
const areaOptions = ref([]);
const list = reactive([
  { key: '1', value: '北京' },
  { key: '2', value: '上海' },
  { key: '3', value: '深圳' }
]);

const changeList = () => {
  // list.forEach((item, index) => index === 1 && (item.value = '厦门'));
  // list.splice(0, 1, { key: '1', value: '厦门' });
  list.push({ key: '4', value: '厦门' });
};

const onSubmit = () => {
  form.value.validate((valid) => {
    getTableList();
  });
};

const getTableList = () => {
  schoolList({ ...formModel, page: 1, limit: 10 }).then(({ content }) => {
    console.log('getTableList。。', content);
    tableData.value = content.list;
  });
};

const getOptions = () => {
  apiAreaOptions().then(({ content }) => {
    areaOptions.value = content.areas;
  });
};

const onAdd = () => router.push({ name: 'schoolCreate' });

onMounted(() => {
  getTableList();
  getOptions();
});
</script>

<style lang="less" scoped>
</style>
