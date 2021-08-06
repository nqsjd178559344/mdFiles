// setTimeout(() => {

//     console.log('setTimeout start');

//     new Promise((resolve) => {

//         console.log('promise1 start');

//         resolve();

//     }).then(() => {

//         console.log('promise1 end');

//     })

//     console.log('setTimeout end');

// }, 0);

// function promise1() {

//     return new Promise((resolve) => {

//         console.log('promise2');

//         resolve();

//     })

// }

// async function async1() {

//     console.log('async1 start');

//     await promise1();

//     console.log('async1 end');

// }

// async1();

// console.log('script end');
// console.log('script end2');

/**
 * todo 答案
 * async1 start 
 * promise2 
 * script end
 * script end2
 * async1 end
 * setTimeout start
 * promise1 start
 * setTimeout end
 * promise1 end
 */

// console.log(1);
// setTimeout(() => { // setTimeout1
//   console.log(2);
//   Promise.resolve().then(() => {
//     console.log(3)
//   })
// })
// new Promise((res) => {  // Promise1
//   console.log(4);
//   res(5)
// }).then((data) => {
//   console.log(data);
//   Promise.resolve().then(() => {
//     console.log(6);

//   }).then(() => {
//     console.log(7);
//     setTimeout(() => {
//       console.log(8);

//     }, 0)

//   })
// })
// setTimeout(() => { // setTimeout2
//   console.log(9);

// })
// console.log(10);

/**
 * todo 答案
 * 1
 * 4
 * 10
 * 5
 * 6
 * 7
 * 2
 * 3
 * 9
 * 8
 */

// console.log('1');
// setTimeout(function () {  // setTimeout1
//     console.log('2');
//     process.nextTick(function () {
//         console.log('3');
//     })
//     new Promise(function (resolve) {
//         console.log('4');
//         resolve();
//     }).then(function () {
//         console.log('5')
//     })
// })
// process.nextTick(function () {
//     console.log('6');
// })
// new Promise(function (resolve) {
//     console.log('7');
//     resolve();
// }).then(function () {
//     console.log('8')
// })
// setTimeout(function () { //  setTimeout2
//     console.log('9');
//     process.nextTick(function () {
//         console.log('10');
//     })
//     new Promise(function (resolve) {
//         console.log('11');
//         resolve();
//     }).then(function () {
//         console.log('12')
//     })
// })

/**
 * todo 答案
 * 1
 * 7
 * 6
 * 8
 * 2
 * 4
 * 3
 * 5
 * 9
 * 11
 * 10
 * 12
 */

// const p1 = () => (new Promise((resolve, reject) => {
//     console.log(1);
//     let p2 = new Promise((resolve, reject) => {
//         console.log(2);
//         const timeOut1 = setTimeout(() => {
//             console.log(3);
//             resolve(4);
//         }, 0)
//         resolve(5);
//     });
//     resolve(6);
//     p2.then((arg) => {
//         console.log(arg);
//     });

// }));
// const timeOut2 = setTimeout(() => {
//     console.log(8);
//     const p3 = new Promise(reject => {
//         reject(9);
//     }).then(res => {
//         console.log(res)
//     })
// }, 0)

// p1().then((arg) => {
//     console.log(arg);
// });
// console.log(10); 

/** 
 * todo 答案
 * 1
 * 2
 * 10
 * 5
 * 6
 * 8
 * 9
 * 3
 * 
 */

var resolveAfter2Seconds = function () {
    console.log("starting slow promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("slow");
            console.log("slow promise is done");
        }, 2000);
    });
};

var resolveAfter1Second = function () {
    console.log("starting fast promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("fast");
            console.log("fast promise is done");
        }, 1000);
    });
};

var sequentialStart = async function () {
    console.log('==SEQUENTIAL START==');

    const slow = await resolveAfter2Seconds();
    console.log(slow);

    const fast = await resolveAfter1Second();
    console.log(fast);
}

var concurrentStart = async function () {
    console.log('==CONCURRENT START with await==');
    const slow = resolveAfter2Seconds();
    const fast = resolveAfter1Second();

    console.log(await slow); 
    console.log(await fast);
}

var concurrentPromise = function () {
    console.log('==CONCURRENT START with Promise.all==');
    return Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then((messages) => {
        console.log(messages[0]);
        console.log(messages[1]);
    });
}

var parallel = async function () {
    console.log('==PARALLEL with await Promise.all==');

    await Promise.all([
        (async () => console.log(await resolveAfter2Seconds()))(),
        (async () => console.log(await resolveAfter1Second()))()
    ]);
}

var parallelPromise = function () {
    console.log('==PARALLEL with Promise.then==');
    resolveAfter2Seconds().then((message) => console.log(message));
    resolveAfter1Second().then((message) => console.log(message));
}

sequentialStart();

setTimeout(concurrentStart, 4000);

setTimeout(concurrentPromise, 7000);

setTimeout(parallel, 10000);

setTimeout(parallelPromise, 13000); 

/** 
 * todo 答案
 * ! sequentialStart
 * ==SEQUENTIAL START==
 * starting slow promise
 * slow promise is done
 * slow
 * 
 * starting fast promise
 * fast promise is done
 * fast
 * 
 * !concurrentStart
 * ==CONCURRENT START with await==
 * starting slow promise
 * starting fast promise
 * fast promise is done
 * slow promise is done
 * slow
 * fast
 * 
 * !concurrentPromise
 * ==CONCURRENT START with Promise.all==
 * starting slow promise
 * starting fast promise
 * @fast promise is done
 * @slow promise is done
 * slow
 * fast
 * 
 * !parallel
 * ==PARALLEL with await Promise.all==
 * starting slow promise
 * starting fast promise
 * @fast promise is done
 * @fast
 * @slow promise is done 
 * @slow
 * 
 * !parallelPromise
 * ==PARALLEL with Promise.then==
 * starting slow promise
 * starting fast promise
 * fast promise is done
 * fast
 * slow promise is done
 * slow 
 */


