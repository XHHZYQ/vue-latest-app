<template>
  <div class="container-box">
    <div>index页面, visible: {{ parentData.visible }}</div>
    <br />
    <h1>{{ parentModel }}</h1>
    <childComponent
      ref="childRef"
      v-model="parentModel"
      :message="parentData.message"
      v-model:visible="parentData.visible"
    >
      <template #content="{ value }">
        <div>{{ value }}</div>
      </template>
    </childComponent>


    <el-button @click="callChildMethod">调用子组件方法</el-button>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import childComponent from './child.vue';

const parentData = reactive({ message: '全国中小学', visible: true });

const parentModel = ref('测试v-model');

const childRef = ref(null);
const callChildMethod = () => {
  console.log('childRef', childRef.value.changeVisible);
  childRef.value.changeVisible();
};

onMounted(() => {
  const { changeVisible, changeData } = childRef.value;
  console.log('changeVisible。。', changeVisible, changeData);
});
</script>

<style lang="less" scoped>
:deep(.input-box) {
  border: 1px solid red;
}

::v-deep .input-box {
  border: 1px solid #ccc;
}

</style>
