// 确保一个类只有一个实例存在，并提供一个全局访问点来获取该实例。在上述示例中，无论创建多少次 Singleton 类的实例，最终得到的都是同一个实例。这在需要全局唯一的资源或对象时很有用，比如全局配置对象、数据库连接等。
class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
  }
}

// 使用
const a = new Singleton();
const b = new Singleton();

console.log(a === b);
