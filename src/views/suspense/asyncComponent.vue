// AsyncComponent.vue
<template>
  <div>
    <p>{{ data }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const data = ref('');
console.log('11。。');
await new Promise((resolve) => {
  setTimeout(() => {
    data.value = 'This async component is loaded!';
    resolve();
  }, 2000);
});
console.log('22。。');

// export default {
//   data() {
//     return {
//       data: ''
//     };
//   },
//   // Simulate asynchronous loading with setTimeout
//   created() {
//     setTimeout(() => {
//       this.data = 'This async component is loaded!';
//     }, 5000);
//   }
// };
</script>
