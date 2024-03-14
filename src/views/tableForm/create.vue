<template>
  <div class="container-box">
    <el-form ref="form" :model="formModel" :rules="formRules" label-width="80px">
      <el-form-item label="省市区" prop="areas">
        <el-cascader
          @change="areaChange"
          v-model="formModel.areas"
          :options="formOptions.area"
          :props="cascaderProps"
          placeholder="请选择省市区"
          filterable
          clearable
        />
      </el-form-item>

      <el-form-item label="学段" prop="levels">
        <el-select v-model="formModel.levels" multiple placeholder="请选择学段">
          <el-option
            v-for="(item, index) of formOptions.level"
            :key="index"
            :label="item.value"
            :value="item.key"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="学校" prop="name">
        <el-select v-model="formModel.name" @change="schoolChange" placeholder="请选择学校">
          <el-option
            v-for="(item, index) of formOptions.school"
            :key="index"
            :label="item.value"
            :value="item.key"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="学校logo" prop="name">
        <el-upload
          :file-list="fileList"
          list-type="picture"
          :limit="1"
          accept="image/*"
          name="file"
        >
          <el-button type="primary" plain> 上传</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="联系人" prop="contact">
        <el-input v-model="formModel.contact" clearable placeholder="请输入联系人" />
      </el-form-item>
      <el-form-item label="联系电话" prop="contactMobile">
        <el-input v-model="formModel.contactMobile" clearable placeholder="请输入联系电话" />
      </el-form-item>
      <el-form-item label="登录账号" prop="managerAccount">
        <el-input v-model="formModel.managerAccount" clearable placeholder="请输入登录账号" />
      </el-form-item>
      <el-form-item label="登录密码" prop="managerPsd">
        <el-input v-model="formModel.managerPsd" clearable placeholder="请输入登录密码" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  schoolEdit,
  apiDataMap,
  apiAreaOptions,
  organizeOrganizeList
} from '../../api/organization.js';

const cascaderProps = {
  expandTrigger: 'hover',
  multiple: false, // 支持多选
  checkStrictly: false, // 支持选择到任意层级
  value: 'key',
  label: 'value',
  children: 'children'
};
const fileList = [
  {
    name: 'logo.jpg',
    url: 'https://tdog.oss-cn-hangzhou.aliyuncs.com/tech_edu/testing/admin/LVB2Gj_1710313349399.jpg'
  }
];

const router = useRouter();
const form = ref(null);
const formModel = reactive({
  areas: undefined,
  levels: [],
  name: undefined,
  contact: undefined,
  contactMobile: undefined,
  managerAccount: undefined,
  managerPsd: undefined,
  logo: undefined
});
const formRules = reactive({
  areas: { required: true, message: '请选择省市区', trigger: 'change' },
  levels: { required: true, message: '请选择学段', trigger: 'change' },
  name: { required: true, message: '请输入学校名称', trigger: 'blur' },
  contact: { required: true, message: '请输入联系人', trigger: 'blur' },
  contactMobile: { required: true, message: '请输入联系电话', trigger: 'blur' },
  managerAccount: { required: true, message: '请输入登录账号', trigger: 'blur' },
  managerPsd: { required: true, message: '请输入登录密码', trigger: 'blur' },
  logo: { required: true, message: '请上传学校logo' }
});
const formOptions = reactive({
  area: [],
  level: [],
  school: []
});

onMounted(() => {
  getOptions();
});

const getOptions = () => {
  apiAreaOptions().then(({ content }) => {
    formOptions.area = content.areas;
  });

  const params = { codes: ['school.level'] };
  apiDataMap(params).then(({ content }) => {
    formOptions.level = content['school.level'];
  });
};

const areaChange = (value) => {
  if (value?.length) {
    formModel.provinceId = value[0];
    formModel.cityId = value[1];
    formModel.districtId = value[2];
  } else {
    formModel.provinceId = undefined;
    formModel.cityId = undefined;
    formModel.districtId = undefined;
  }

  formModel.name = undefined;
  getSchoolOptions();
};

const getSchoolOptions = () => {
  const { provinceId, cityId, districtId } = formModel;
  // 是否虚拟 0: 否, 1: 是
  const param = { type: 'school', limit: -1, isVirtual: 1, provinceId, cityId, districtId };
  organizeOrganizeList(param).then(({ content }) => {
    formOptions.school = content.list?.map((item) => ({
      key: item.id,
      value: item.name
    }));
  });
};

const schoolChange = (value) => {
  formModel.id = value;
};

const onSubmit = () => {
  form.value.validate((valid) => {
    if (valid) {
      const option = formOptions.school?.filter((item) => item.key === formModel.name);
      option?.length && (formModel.name = option[0].value);
      delete formModel.areas;

      const params = {
        ...formModel,
        areas: undefined,
        logo: fileList[0].url
      };
      schoolEdit(params).then(({ content }) => {
        router.back();
      });
    }
  });
};
</script>

<style lang="less" scoped>
.container-box {
  width: 550px;
}
</style>
