<template>
  <div class="container-box">
    <div>index页面, visible: {{ parentData.visible }}</div>
    <br />
    <h1>{{ parentModel }}</h1>  
    <childComponent ref="child" v-model="parentModel" :message="parentData.message" v-model:visible="parentData.visible" />

  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import childComponent from './child.vue';

const parentData = reactive({ message: '全国中小学', visible: true });

const parentModel = ref('测试v-model');

onMounted(() => {
const child = ref(null);
console.log('child 2w6。。', child.value);
});


</script>

<style lang="less" scoped></style>
