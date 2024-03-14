// MyClass.js

// 导入装饰器
import { MyDecorator } from './decorator';

// 定义一个普通的 JavaScript 类
class MyClass {
  // 在这里可以定义类的属性和方法

  // 使用装饰器装饰方法
  @MyDecorator
  myMethod() {
    console.log('This is my method.');
  }
}

export default MyClass;
