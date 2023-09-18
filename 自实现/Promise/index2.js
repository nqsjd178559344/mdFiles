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

  static resolve(item) {
    if (typeof item !== "function") {
      return new MyPromise((_resolve) =>  _resolve(item));
    }
    // ! 静态方法包含this关键字，这个this指的是类，而不是实例。
    const p = new MyPromise(item)
    if (p.#isPromiseLike(item)) {
      return item;
    }
  }

  static reject(item) {
    if (typeof item !== "function") {
      return new MyPromise((_resolve, _reject) => {
        _reject(item);
      });
    }
    if (this._isPromiseLike(item)) {
      return item;
    }
  }

  // 均完成时resolve;否则reject第一个error
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        reject();
      }
      if (!promises.length) {
        resolve([]);
      }
      const length = promises.length;
      let count = 0;
      const values = [];
      for (let index = 0; index < length; index++) {
        const item = promises[index];
        item.then(
          (value) => {
            values[index] = value;
            count++;
            if (count === length) {
              resolve(values);
            }
          },
          (error) => reject(error)
        );
      }
    });
  }

  static allSettled(promises) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        reject();
      }

      if (!promises.length) {
        resolve([]);
      }

      const length = promises.length;
      let values = [];
      function oneSettled(index, value) {
        values[index] = value;

        if (values.length === length) {
          resolve(values);
        }
      }

      for (let index = 0; index < length; index++) {
        const item = promises[index];
        const p = new MyPromise(item);
        const _item = p.#isPromiseLike(item) ? item : p.constructor.resolve(item);
        _item.then(
          (value) => {
            oneSettled(index, { status: FULFILLED, value });
          },
          (error) => {
            oneSettled(index, { status: REJECTED, reason: error });
          }
        );
      }
    });
  }

  // 返回第一个率先改变状态的实例，且状态跟随其一起改变
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        reject();
      }

      if (!promises.length) {
        resolve([]);
      }

      for (let index = 0; index < promises.length; index++) {
        const item = promises[index];
        const p = new MyPromise(item)
        console.log(item,'~item',p)
        const _item = p.#isPromiseLike(item) ? item : p.constructor.resolve(item);
        _item.then(resolve, reject);
      }
    });
  }

   finally(callback) {
    return this.then(
      (value) => this.constructor.resolve(callback()).then(() => value),
      (error) =>
        this.constructor.resolve(callback()).then(() => {
          throw error;
        })
    );
  }


  // * 自定义方法: 成功后 resolve 结果，失败后重试，尝试超过一定次数才真正的 reject
  static retry(promise, time = 3) {
    return new MyPromise(async (_resolve, _reject) => {
      while (time > 0) {
        try {
          const data = await promise();
          _resolve(data);
          time = 0;
        } catch (error) {
          if (time === 1) _reject(error);
        }
        time--;
      }
    });
  }
}

// todo 基础使用
// new MyPromise((resolve) => {
//   resolve(1);
// }).then((res) => {
//   console.log(res, "res");
//   return 2;
// });

// todo 状态不变
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
// setTimeout(() => {
//   console.log(3);
// }, 0);

// new MyPromise((resolve, reject) => {
//   resolve(2);
// }).then(
//   (res) => {
//     console.log(res);
//   },
//   (error) => {
//     console.log(error, "error");
//   }
// );

// console.log(1);

// todo 测试Promise.resolve
// const p1 =MyPromise.resolve(1),
//   p2 = MyPromise.resolve(2),
//   p3 = MyPromise.resolve(3);

// const p11 = p1.then((res) => console.log(res, "p11"));
// const p12 = p2.then((res) => console.log(res, "p12"));
// const p13 = p3.then((res) => console.log(res, "p13"));

// todo 测试Promise.reject
// MyPromise.reject("出错了").then(null, function (s) {
//   console.log(s);
// });

// todo 测试Promise.all
// const p1 = MyPromise.resolve(1),
//   p2 = MyPromise.resolve(2),
//   p3 = MyPromise.resolve(3);
//   MyPromise.all([p1, p2, p3]).then(function (value) {
//   console.log(value, "~value");
// });

// const p1 = MyPromise.resolve(1),
//   p2 = MyPromise.resolve(2),
//   p3 = MyPromise.reject(3);
//   MyPromise.all([p1, p2, p3]).then(
//   function (value) {
//     console.log(value, "~value");
//   },
//   (error) => {
//     console.log(error, "~error");
//   }
// );

// todo 测试Promise.race
// const p1 = new MyPromise((resolve) => {
//     setTimeout(() => {
//       resolve("p1");
//     }, 5000);
//   }),
//   p2 = new MyPromise((resolve) => {
//     setTimeout(() => {
//       resolve("p2");
//     }, 2000);
//   }),
//   p3 = new MyPromise((resolve) => {
//     setTimeout(() => {
//       resolve("p3");
//     }, 3000);
//   });

//   MyPromise.race([p1, p2, p3]).then(function (value) {
//   console.log(value, "~value");
// },error=>{
//   console.log(error, "~error");
// });

// todo 测试Promise.race2
// const p1 = new MyPromise((_,reject) => {
//   setTimeout(() => {
//     reject("p1");
//   }, 1000);
// }), p2 = new MyPromise((resolve) => {
//     setTimeout(() => {
//       resolve("p2");
//     }, 2000);
//   }),
//   p3 = new MyPromise((resolve) => {
//     setTimeout(() => {
//       resolve("p3");
//     }, 3000);
//   });

// const p = MyPromise.race([p1, p2, p3,4]).then(function (value) {
//   console.log(value, "~value");
// },error=>{
//   console.log(error, "~error");
// });

// todo 测试Promise.finally1
// new MyPromise((resolve) => resolve(111))
//   .finally(() => {
//     console.log("finally");
//   })
//   .then(
//     (value) => {
//       console.log(value, "~value");
//     },
//     (error) => {
//       console.log(error, "~error");
//     }
//   );

// todo 测试Promise.finally2
// const p2 = new MyPromise((_, reject) => reject(2))
//   .finally(() => {
//     console.log("finally2");
//   })
//   .then(
//     (value) => {
//       console.log(value, "~value");
//     },
//     (error) => {
//       console.log(error, "~error");
//     }
//   );

// todo 测试Promise.retry
// MyPromise
//   .retry(() => {
//     const n = Math.random();
//     return new MyPromise((resolve, reject) => {
//       setTimeout(() => {
//         console.log(n,'n')
//          n > 0.9 ? resolve(n) : reject(n)
//       }, 1000);
//     });
//   })
//   .then(
//     (res) => {
//       console.log(res, "~res");
//     },
//     (error) => {
//       console.log(error, "~error");
//     }
//   );

// todo 测试Promise.retry2
// const test = function () {
//   return new Promise((resolve, reject) => {
//     const _num = Math.random() * 10;
//     const num = Math.floor(_num);
//     if (num > 7) {
//       resolve(num);
//     } else {
//       reject(new Error(num));
//     }
//   });
// };

// MyPromise.retry(test, 5).then(
//   (res) => {
//     console.log(res, "~res");
//   },
//   (error) => {
//     console.log(error, "~error");
//   }
// );

// todo 测试Promise.allSettled1
// const resolved = MyPromise.resolve(42);
// const rejected = MyPromise.reject(-1);

// const allSettledPromise = MyPromise.allSettled([resolved, rejected,4]);

// allSettledPromise.then(function (results) {
//   console.log(results, "~results");
// },error=>{
//   console.log(error, "~error");
// });

// todo 测试Promise.allSettled2
// const allSettledPromise = MyPromise
//   .allSettled([])
//   .then(function (results) {
//     console.log(results, "~results");
//   });
