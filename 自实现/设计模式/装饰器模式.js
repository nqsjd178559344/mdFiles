// 在不修改原有函数的情况下，动态地为函数添加额外的功能。在示例中，decorator 函数接受一个原始函数 func ，并返回一个新的函数。新函数在执行原始函数前后添加了额外的操作，实现了对原始函数的装饰。

function decorator(fn) {
  return function (...args) {
    console.log("我是之前做的");
    fn(...args);
    console.log("我是之后做的");
  };
}

function originalFunction(message) {
  console.log(message);
}

// 使用
const decoratedFunction = decorator(originalFunction);

decoratedFunction("这是被装饰的函数");

console.log("~~~~分割线~~~~");

class Decorator {
  constructor(originalFunction) {
    this.originalFunction = originalFunction;
  }

  execute(...args) {
    console.log("我是之前做的");
    this.originalFunction(...args);
    console.log("我是之后做的");
  }
}

// 使用
const decorated = new Decorator(originalFunction);

decorated.execute("这是被装饰的函数2");
