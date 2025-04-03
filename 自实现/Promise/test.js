function sleep(ms) {
  // 请实现这个函数

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

// 使用方式：
async function testSleep() {
  console.log(1);
  await sleep(1000); // 延迟1秒
  console.log(2);
}

function retry(fn, times = 3) {
  // 请实现这个函数
  let time = times;
  return new Promise(async (resolve, reject) => {
    while (time > 0) {
      try {
        const result = await fn();
        resolve(result);
      } catch (error) {
        time--;
        if (time === 0) reject(error);
      }
    }

    reject();
  });
}

// 使用方式：
async function testRetry() {
  const result = await retry(async () => {
    const res = await fetch("http://api.example.com");
    return res.json();
  }, 3);
}

function timeout(promise, ms) {
  // 请实现这个函数
  return new Promise(async (resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject();
    }, ms);
    promise
      .then((res) => {
        clearTimeout(timeoutId);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        reject(err);
      });
  });
}

// 使用方式：
async function testTimeout() {
  try {
    const result = await timeout(fetch("http://api.example.com"), 5000);
  } catch (error) {
    console.log("请求超时或失败");
  }
}

function parallel(tasks, limit) {
  let executing = [];
  let index = 0;
  let results = [];

  return new Promise((resolve, reject) => {
    async function runTask(task, index) {
      // 为了看得更清楚，delay 2s
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      await delay(2000);
      try {
        const result = await task();
        results[index] = result;
      } catch (error) {
        results[index] = error;
      }
    }

    function executeNext() {
      if (index >= tasks.length) {
        if (executing.length === 0) resolve(results);

        return;
      }

      const taskIndex = index;
      const task = tasks[index++];
      const promise = runTask(task, taskIndex);
      executing.push(promise);

      promise.then(() => {
        // 修改：使用 filter 来移除完成的 promise
        executing = executing.filter((p) => p !== promise);
        executeNext();
      });
    }

    const firstLength = tasks.length < limit ? tasks.length : limit;

    for (let i = 0; i < firstLength; i++) {
      executeNext();
    }

    if (tasks.length === 0) resolve([]);
  });
}

// 使用方式：
async function testParallel() {
  const tasks = [
    () => fetch("url1"),
    () => fetch("url2"),
    () => fetch("url3"),
    () => fetch("url4"),
    () => fetch("url5"),
    () => fetch("url6"),
    () => fetch("url7"),
    // ...更多任务
  ];
  const results = await parallel(tasks, 2); // 最多同时执行2个任务

  console.log(results, "~results");
}

// testSleep();
// testRetry();
// testTimeout();
testParallel();
