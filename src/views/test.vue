<template>
  <div>
    <ul>
      <li v-for="(item, index) of list">{{ item.title }}</li>
    </ul>
    <button @click="onClick">修改list 数组</button>

    <h3>{{ msg }}</h3>
    <button @click="changeMsg">修改msg</button>

    <br />
    newMsg: {{ newMsg }}

    <br/>
    original: {{ original }}
    copy: {{ copy }}
    <div></div>
    <button @click="original.count++">修改 original</button>
    <button @click="copy.count++">修改 copy</button>

    <br/>
    shallow：{{ shallow }}
    <button @click="changeShallow">修改 shallow</button>
    <button @click="triggerRefFn">触发 shallow</button>
  </div>
</template>

<script setup>
import { ref, unref, reactive, computed, readonly, watchEffect, isProxy, isReadonly, onUpdated, shallowRef, triggerRef  } from 'vue'; 

const originalList = [{ title: '11' }, { title: '22' }, { title: '33' }, { title: '44' }];
const list = reactive(originalList);
const readonlyList = readonly(originalList);
console.log('isProxy 1', isProxy(list));
console.log('isProxy 2', isProxy(readonlyList));
console.log('isReadonly', isReadonly(readonlyList));

// const onClick = () => list.push({ title: '55' });
// const onClick = () => list.splice(0, 1);
const onClick = () => (list[0].title = 'list 修改了');

const msg = ref('字符串');
const changeMsg = () => (msg.value = 'msg 修改了');
console.log('unref', unref(msg));

const newMsg = computed(() => 'new' + msg.value);



const original = reactive({ count: 0 })
const copy = readonly(original)

watchEffect(() => {
  // works for reactivity tracking
  console.log('copy count', copy.count)
})

const hello = {
  greet: 'Hello, world'
};
const shallow = shallowRef(hello)

// 触发该副作用第一次应该会打印 "Hello, world"
watchEffect(() => {
  console.log('shallow。。', shallow.value.greet)
})

// 这次变更不应触发副作用，因为这个 ref 是浅层的
const changeShallow = () => {
  hello.greet = 'hello you !'
  // shallow.value = { greet: 'Hello, universe' };
console.log('hello', shallow.value);
};

// 打印 "Hello, universe"
const triggerRefFn =  () => triggerRef(shallow)
onUpdated(() => {
  console.log('onUpdated。。', list)
});
</script>

<style lang="less" scoped></style>
