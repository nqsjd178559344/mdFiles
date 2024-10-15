// 定义了一种一对多的依赖关系，当主题对象的状态发生改变时，所有依赖它的观察者对象都会得到通知并自动更新。在示例中，Subject 类是被观察的主题，Observer 类是观察者。主题通过 addObserver 方法添加观察者，当有消息需要通知时，使用 notifyObservers 方法遍历所有观察者并调用它们的 update 方法。

class Subject {
  observers = [];

  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers(message) {
    for (const observer of this.observers) {
      observer.update(message);
    }
  }
}

class Observer {
  update(message) {
    console.log(`接收到${message}啦`);
  }
}

// 使用
const subject = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();
const observer3 = new Observer();

subject.addObserver(observer1);
subject.addObserver(observer2);
subject.addObserver(observer3);

subject.notifyObservers("重要通知");
