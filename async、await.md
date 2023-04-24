1. 任何 await 后面的 Promise 抛出错误，则整个 async 都会中断执行
2. await 命令只能用在 async 函数之中，如用在普通函数，则报错
3. async 函数不管有没有 return 语句，总是返回一个 Promise 对象。
   1. async 函数内部 return 语句返回的值，会成为 then 方法回调函数的参数。
   2. async 函数内部抛出错误，会导致返回的 Promise 对象变为 reject 状态。
4. 继发关系

   ```jsx
   1;
   let foo = await getFoo();
   let bar = await getBar();

   2;
   async function dbFuc(db) {
     let docs = [{}, {}, {}];

     for (let doc of docs) {
       // forEach 为并发进行
       await db.post(doc);
     }
   }

   3;
   let docs = [{}, {}, {}];

   await docs.reduce(async (_, doc) => {
     await _;
     await db.post(doc);
   }, undefined);
   ```

5. 多个 await 后的异步操作，如不存在继发关系，最好让它们并发进行

   ```jsx
   1;
   let [foo, bar] = await Promise.all([getFoo(), getBar()]);

   2;
   let fooPromise = getFoo();
   let barPromise = getBar();
   let foo = await fooPromise;
   let bar = await barPromise;

   3;
   let docs = [{}, {}, {}];
   docs.forEach(async function (doc) {
     await db.post(doc);
   });

   4;
   async function dbFuc(db) {
     let docs = [{}, {}, {}];
     let promises = docs.map((doc) => db.post(doc));

     let results = [];
     for (let promise of promises) {
       // for of
       results.push(await promise);
     }
     console.log(results);
   }
   ```
