// 一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法。

function fn(n){
    if( n <= 2) return n

    return fn(n-1) + fn(n-2)
}

const res1 = fn(20)
const res2 = fn(10)
const res3 = fn(5)

console.log(res1,res2,res3,'~')
