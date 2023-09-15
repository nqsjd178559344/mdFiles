//1.  提供一个异步 add 方法如下，需要实现一个 await sum(...args) 函数：
function asyncAdd(a, b, callback) {
  setTimeout(function () {
    callback(null, a + b);
  }, 1000);
}

function add(a, b) {
  return new Promise((resolve) => {
    asyncAdd(a, b, (_, sum) => {
      resolve(sum);
    });
  });
}

// 方法1
function sum1(...args) {
  return new Promise((resolve) => {
    resolve(
      args.reduce(async (p, c) => await add(await Promise.resolve(p), c), 0)
    );
  });
}

// 方法2
function sum2(...args) {
  return new Promise((resolve) => {
    args
      .reduce((p, c) => Promise.resolve(p).then((total) => add(total, c)), 0)
      .then(resolve);
  });
}

// 使用
(async function () {
  const result1 = await sum1(1, 2, 3, 4);
  const result2 = await sum12(1, 2, 3, 4);
  console.log(result1, result2);
})();

// 变种：如果后端设置了并发限制，一次不能请求超过三个，怎么办？

// 2.判断输出并解释
Promise.resolve() // pr1
  .then(() => {
    console.log(0);
    // p4
    return Promise.resolve(4);
  })
  .then((res) => {
    // p4
    console.log(res);
  });

Promise.resolve() // pr2
  .then(() => {
    console.log(1);
  })
  .then(() => {
    // p2
    console.log(2);
  })
  .then(() => {
    // p3
    console.log(3);
  })
  .then(() => {
    // p5
    console.log(5);
  })
  .then(() => {
    // p6
    console.log(6);
  });

// 总结:  遇见 promise 返回 Promise.resolve(4)时候,当前promise 的状态跟随 Promise.resolve(4) Promise.resolve(4).then(()=>完成promise)
/**
 * () => {
    console.log(0);
    // p4
    return Promise.resolve(4);
  }

  () => {
    console.log(1);
  }

  Promise.resolve(4).then(()=>完成当前promise //  微任务)

  () => {
    // p2
    console.log(2);
  }

  ()=>完成当前promise //  微任务

  () => {
    // p3
    console.log(3);
  }

  (res) => {
    // p4
    console.log(res);
  }

  () => {
    // p5
    console.log(5);
  }

  () => {
    // p6
    console.log(6);
  }
 * 
 * 
 */
