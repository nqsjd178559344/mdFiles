const index = require('./index.js')
const { getBool, num } = require('./index.js')
function fn() {
    const res = getBool();
    console.log(res, "~res", num);
    if (num >= 20) clearInterval(intervalID);
}
index.a = 2333
console.log("2333",index.a);

const intervalID = setInterval(fn, 500);

index.a = 2444
console.log("2444",index.a);

setTimeout(() => {
    console.log(num, "~");

    index.a = 5555
    console.log("5555",index.a);
}, 5000);