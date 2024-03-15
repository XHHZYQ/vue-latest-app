<template>
  <div>
    <div><span>My input</span> <input v-model="childModel" /></div>

    <div>
      信息：<span>{{ message }}</span>
    </div>
    <div>
      visible: <span>{{ visible }}</span>
    </div>

    <el-button @click="changeVisible">修改 visible</el-button>
  </div>
</template>

<script setup>
const props = defineProps({
  message: { type: String },
  visible: { type: Boolean }
});

const emits = defineEmits(['update:visible']);

const changeVisible = () => emits('update:visible', false);
const changeData = () => { console.log('changeData。。'); };

const childModel = defineModel();

defineExpose({
  changeVisible,
  changeData
});
</script>

<style lang="less" scoped></style>
