1. 任何 await 后面的Promise抛出错误，则整个async都会中断执行
2. await命令只能用在async函数之中，如用在普通函数，则报错
3. 继发关系
   ```
    1. 
    let foo = await getFoo();
    let bar = await getBar();

    2. 
    async function dbFuc(db) {
        let docs = [{}, {}, {}];

        for (let doc of docs) { // forEach 为并发进行
            await db.post(doc);
        }
    }

    3. 
    let docs = [{}, {}, {}];

    await docs.reduce(async (_, doc) => {
        await _;
        await db.post(doc);
    }, undefined);
   ```
4. 多个await后的异步操作，如不存在继发关系，最好让它们并发进行
   ```
    1. 
    let [foo, bar] = await Promise.all([getFoo(), getBar()]);

    2. 
    let fooPromise = getFoo();
    let barPromise = getBar();
    let foo = await fooPromise;
    let bar = await barPromise;

    3.
    let docs = [{}, {}, {}];
    docs.forEach(async function (doc) {
        await db.post(doc);
    });

    4. 
    async function dbFuc(db) {
    let docs = [{}, {}, {}];
    let promises = docs.map((doc) => db.post(doc));

    let results = [];
    for (let promise of promises) { // for of
        results.push(await promise);
    }
    console.log(results);
    }
   ```