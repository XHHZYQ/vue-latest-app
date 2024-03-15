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

    <!-- <slot name="content"></slot> -->
    <slot name="content" :value="slotValue"></slot>
  </div>
</template>

<script setup>
import { defineModel, defineEmits, defineProps, defineExpose, defineSlots, useSlots } from 'vue';
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

// // 定义插槽
// const { content } = defineSlots();
// // 使用插槽内容
// const slotValue = useSlots().content();
const slotValue = { a: 10, b: 20 };
</script>

<style lang="less" scoped></style>
