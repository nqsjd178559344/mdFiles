let num = 1

const getBool = () => {
    setTimeout(() => {
        num++
    }, 50)
    console.log(num, 'num')
    return num
}

const intervalID = setInterval(getBool, 500);


module.exports = {
    a:1,
    num,
    getBool
}
