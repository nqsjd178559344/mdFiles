export let num = 1

export let a = 1

export const getBool = () => {
    // function fn() {
    //     num++
    // }
    // const id = setTimeout(fn, 500)
    // if (num === 5) clearTimeout(id)
    return num++
}

export default getBool

