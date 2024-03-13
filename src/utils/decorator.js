
// 定义一个装饰器函数
export function MyDecorator(target, key, descriptor) {
  // 这里可以对类的方法进行装饰或修改
  console.log('Decorating my method.');

  // 返回修改后的 descriptor
  return descriptor;
}
