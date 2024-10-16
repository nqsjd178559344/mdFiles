// 将一个类的接口转换成客户端所期望的另一个接口。

class OldSystem {
  oldMethod() {
    return `我是旧系统的结果`;
  }
}

class Adapter {
  constructor(oldSystem) {
    this.oldSystem = oldSystem;
  }
  newMethod() {
    const result = this.oldSystem.oldMethod();
    return `我是新系统的结果，她是——${result}`;
  }
}

// 使用
const oldSystem = new OldSystem();
const adapter = new Adapter(oldSystem);

console.log(adapter.newMethod());
