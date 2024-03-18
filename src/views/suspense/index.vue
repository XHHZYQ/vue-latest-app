// App.vue
<template>
  <div>
    <div class="msg-box">
      {{ msg }}
      <Teleport to="body" :disabled="teleportDisabled">
        <section id="teleport-box">测试 teleport</section>
      </Teleport>
      <el-button @click="teleportDisabled = !teleportDisabled">修改 teleport </el-button>
    </div>

    <hr />

    <Suspense @pending="pending" @resolved="resolved" @fallback="fallback">
      <!-- 异步组件加载完成后显示 -->
      <template #default>
        <AsyncComponent />
      </template>

      <!-- 加载中显示的占位内容 -->
      <template #fallback>
        <p>Loading...</p>
      </template>
    </Suspense>
  </div>
</template>

<script>
import { ref, Suspense, defineAsyncComponent } from 'vue';

export default {
  components: {
    AsyncComponent: defineAsyncComponent(() => import('./asyncComponent.vue'))
  },
  setup() {
    const msg = ref('文本。。');
    const teleportDisabled = ref(false);
    const pending = () => {
      console.log('pending。。');
    };
    const resolved = () => {
      console.log('resolved。。');
    };
    const fallback = () => {
      console.log('fallback。。');
    };

    return {
      msg,
      teleportDisabled,
      pending,
      resolved,
      fallback
    };
  }
};
</script>
