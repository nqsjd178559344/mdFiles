const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  #status = PENDING;
  #result = null;
  #unfinishedEvents = [];
  constructor(callback) {
    const _resolve = (data) => {
      this.#changeState(FULFILLED, data);
    };
    const _reject = (reason) => {
      this.#changeState(REJECTED, reason);
    };

    try {
      callback(_resolve, _reject);
    } catch (error) {
      _reject(error);
    }
  }

  #changeState(state, result) {
    if (this.#status !== PENDING) return;
    this.#status = state;
    this.#result = result;
    this.#run();
  }

  //  todo Promise 的互通性
  #isPromiseLike(executor) {
    if (
      executor &&
      (typeof executor == "function" || typeof executor == "object")
    ) {
      return executor.then && typeof executor.then === "function";
    }

    return false;
  }

  //   微队列
  #runMicroTask(fun) {
    // 1. node环境
    if (typeof process === "object" && typeof process.nextTick === "function") {
      process.nextTick(fun);

      return;
    }

    // 2. windows环境
    if (typeof MutationObserver === "function") {
      const ob = new MutationObserver(fun);
      const textNode = document.createTextNode("a");
      ob.observe(textNode, {
        characterData: true,
      });
      textNode.data = "b";

      return;
    }

    setTimeout(fun, 0);
  }

  #runOne(callback, resolve, reject) {
    this.#runMicroTask(() => {
      if (typeof callback !== "function") {
        const settled = this.#status === FULFILLED ? resolve : reject;
        settled(this.#result);
        return;
      }
      try {
        const data = callback(this.#result);
        if (this.#isPromiseLike(data)) {
          data.then(resolve, reject);
        } else {
          resolve(data);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  #run() {
    if (this.#status === PENDING) return;
    while (this.#unfinishedEvents.length) {
      const { onFulfilled, onReject, resolve, reject } =
        this.#unfinishedEvents.shift();
      if (this.#status === FULFILLED) {
        this.#runOne(onFulfilled, resolve, reject);
      } else {
        this.#runOne(onReject, resolve, reject);
      }
    }
  }
  then(onFulfilled, onReject) {
    return new MyPromise((resolve, reject) => {
      this.#unfinishedEvents.push({
        onFulfilled,
        onReject,
        resolve,
        reject,
      });
      this.#run();
    });
  }
}

// todo 基础使用
// new MyPromise((resolve, reject) => {
//   resolve(1);
// }).then((res) => {
//   console.log(res, "res");
//   return 2;
// });

// 状态不变
// new MyPromise((resolve, reject) => {
//   resolve(1);
//   reject(1);
// }).then(
//   (res) => {
//     console.log(res, "res");
//   },
//   (error) => {
//     console.log(error, "error");
//   }
// );

// todo 处理异步
// new MyPromise((resolve, reject) => {
//   setTimeout(function () {
//     reject(2);
//     resolve(1);
//   }, 1000);
// }).then(
//   (res) => {
//     console.log(res, "res");
//   },
//   (error) => {
//     console.log(error, "error");
//   }
// );

// todo 链式调用
// new MyPromise((resolve, reject) => {
//   console.log("1~1");
//   resolve(1);
// })
//   .then((res) => {
//     console.log(res, "2~2");
//     return res + "2~2";
//   })
//   .then((res) => {
//     console.log(res, "3~3");
//     return res + "3~3";
//   })
//   .then((res) => {
//     console.log(res, "4~4");
//     return res + "4~4";
//   })
//   .then(
//     (res) => {
//       console.log(res, "res");
//     },
//     (error) => {
//       console.log(error, "error");
//     }
//   );

// todo Promise的互通性

// new Promise((resolve, reject) => {
//   console.log("1~1");
//   resolve(1);
// })
//   .then((res) => {
//     return new MyPromise((resolve, reject) => {
//       setTimeout(() => {
//         console.log("2~2");
//         resolve(2);
//       }, 1000);
//     });
//   })
//   .then((res) => {
//     console.log(res, "3~3");
//   });

// new MyPromise((resolve, reject) => {
//   console.log("1~1~1");
//   resolve(1);
// })
//   .then((res) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         console.log("2~2~2");
//         resolve(2);
//       }, 1000);
//     });
//   })
//   .then((res) => {
//     console.log(res, "3~3~3");
//   });

// todo Promise的微队列
setTimeout(() => {
  console.log(3);
}, 0);

new MyPromise((resolve, reject) => {
  resolve(2);
}).then(
  (res) => {
    console.log(res);
  },
  (error) => {
    console.log(error, "error");
  }
);

console.log(1);
