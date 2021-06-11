## HTML
<!-- * finish -->
1. ::before 和 :after 中双冒号和单冒号有什么区别？这两个伪元素的作用是什么？（一般）
    答:
        ::为伪元素，:为伪类
        伪元素为元素形式存在，定义在元素主题内容前，仅在 CSS 渲染层加入，故只存在于页面中，不会改变文档内容，也不存在于dom中
        :after已于css3改为::，现在除兼容IE浏览器外不推荐此方法

2. 浏览器缓存包含哪些内容？cookie、localStorage、sessionStorage 是否可以跨域访问？（一般）
    答:
        1. 
           1. http缓存，通过Http请求头判断
           2. WebSQL
           3. indexDB
           4. Cookie 
               1. 是浏览器访问服务器后，服务器传给浏览器的一段数据。
               2. 浏览器需要保存这段数据，不得轻易删除。
               3. 此后每次浏览器访问该服务器，都必须带上这段数据。
   
           5. LocalStorage
           6. SessionStorage
           7. Application cache
           8. cacheStorage
           9.  flash缓存
        2. cookie 可以设置成相同主域的时候，跨子域访问，另外两个是不能跨域访问的，哪怕只是端口号不同，都不能访问


## CSS
<!-- * finish -->
1. 标准盒子模型中，盒子所占宽度是怎样构成的？（简单）
    盒子模型设置值:content-box = content-box|border-box|inherit;

    1. content-box: **标准盒子模型** 宽度和高度分别应用到元素的内容框,在宽度和高度之外绘制元素的内边距和边框。即:width = content ; totalWidth = width + 2* border + 2* padding + 2* margin ;
    2. border-box: **怪异盒子模型** 为元素设定的宽度和高度决定了元素的边框盒。即为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。通过从已设定的宽度和高度分别减去边框和内边距才能得到内容的宽度和高度。即: width = content + border + padding； totalWidth = width + 2* margin
    3. inherit: 继承

2. 简述一下 css 的权重规则（简单）
    Important> 内联 >  id >  class | 属性（[type="text"]） > 类型选择器 | 伪元素选择器 > 通配符 | 子选择器 | 相邻选择权

<!-- * finish -->
1. css 选择器有哪些？相邻选择器写法？（简单）
   1.   
        1. 简单选择器
        2. 组合器选择器
        3. 伪类选择器
        4. 伪元素选择器
        5. 属性选择器
   2. 相邻选择器: ele1 + ele2

<!-- * finish -->
2. 如何让一个 div 垂直居中，至少说出两种（简单）
    1. flex布局
    2. 
    ```
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto
    ```
    3. 
    ```
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    ```

<!-- * finish -->
3. 纯css 实现一个向下的小三角（简单）
    ```
    width: 0px;
    height: 0px;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 20px solid red;
    ```

<!-- * finish -->
4. 设置元素浮动后，该元素的 display 值是多少？（有迷惑性，简单）
    Block

<!-- * finish -->
5. 什么是 BFC？（简单）
    块级格式化上下文，可看作独立的容器，容器内的元素不会影响容器外的元素
    **特点**
    1. 同一个BFC的相邻Box的margin会重叠
    2. 不给父级高度，自己浮动，则父级会发生高度塌陷 => 父级清除浮动
   
    **创建方式**
    1. float: !none
    2. display: inline-block | flex | table-cell | table-caption
    3. overflow: !visible
    4. position: !static && !relative

6. less、sass 的一些基础用法 （一般）
    (1)Less

### JS
<!-- * finish -->
1. 基础数据类型有哪些？引用数据类型有哪些？基础数据类型和引用类型的区别？（简单）
    1. 基本数据类型: **boolean** | string | number | null | undefined | Symbol | **BigInt**
    2. 引用数据类型: array | object | **function** | **RegExp | Date**
    3. 区别: 
       1. 基本数据类型: 
           1. 保存于栈中
           2. 值不可变
           3. 不可添加属性和方法
           4. 赋值的是: 简单赋值
           5. 比较的是: 值比较
       2. 引用数据类型: 
           1. 指针保存于栈中，指向存储对象的内存地址; 实体保存于堆中
           2. 值可变
           3. 可以添加属性和方法
           4. 赋值的是: 对象引用
           5. 比较的是: 引用地址

2. const，let，var 的区别（简单），const 定义的对象的属性是否可以改变？（简单）
   1. const: 造成 暂时性死区 ，不可修改; (const 对象时，仍可更改该对象)
   2. let: 暂时性死区  , 其下可修改
   3. var: 全局可用，均可修改，挂载到this上(默认为window)
   
<!-- * finish -->
3. 正则考察：电话号/4位验证码（一般）
   1. 电话号: 
        /^1[3589]\d{9}/g
   1. 4位验证码: 
        /^[a-zA-Z0-9]{4}$/g
   
<!-- * finish -->
4. 至少三种数组去重（简单数组/对象数组）的方式，越多越好（一般）
   1. 简单数组去重:
      ```
        let array = [1, 2, 13, 4, 3, 2, 4, 4, 3, 5, 3, 4, 5, 4, 6, 1, 6, 4, 4, 1, 2, 1, 3]
        // 理论值: [1,2,13,4,3,4,5,6]
        function uniq1(array) {
            return [...new Set(array)]
        }

        function uniq2(array) {
            let obj = {}
            for (let i = 0, j = array.length; i < j; i++) {
                if (!obj[array[i]]) {
                    obj[array[i]] = true
                }
            }
            return Object.keys(obj)
        }

        function uniq3(array) {
            let obj = {}
            for (let i = 0, j = array.length; i < j; i++) {
                if (!obj[array[i]]) {
                    obj[array[i]] = true
                } else {
                    i++
                }
            }
            return Object.keys(obj)
        }

        const res1 = uniq1(array)
        const res2 = uniq2(array)
        const res3 = uniq3(array)
      ```
   2. 对象数组去重:
      ```
      // 2. 对象数组去重
        var arr = [
            {
                key: '01',
                value: '乐乐'
            },
            {
                key: '02',
                value: '博博'
            },
            {
                key: '03',
                value: '淘淘'
            },
            {
                key: '04',
                value: '哈哈'
            },
            {
                key: '01',
                value: '乐乐'
            }
        ];

        function uniqObj1(array) {
            let arr = []
            for (let i = 0, j = array.length; i < j; i++) {
                let item = array[i]
                let firstIndex = array.findIndex((i)=>i.key === item.key)
                if(firstIndex !== i){
                    i++
                }else{
                    arr.push(array[i])
                }
            }

            return arr
        }

        function uniqObj2(array) {
            let obj = {}
            for (let i = 0, j = array.length; i < j; i++) {
                let item = array[i]
                let key = item.key
                if (!obj[key]) {
                    obj[key] = true
                } else {
                    array.splice(i, 1)
                    i++
                }
            }
            return array
        }

        const resObj1 = uniqObj1(arr)
        const resObj2 = uniqObj2(arr)
      ```

5. 如何避免回调地狱？（一般）
   1. 使用Promise
   2. async、await
6. 什么是事件循环（event loop）（一般）
   1. 
7. 防抖和节流的实现方式，一般使用场景（一般）
   1. 防抖: 一般用于input框输入，即输入完成后才去做事（景区大巴车）
        实现
   2. 节流: 一般用于阶段性传递信息（普通公交车）
        实现

## React
<!-- * finish -->
1. React的生命周期以及发生的顺序？（简单）
   1. 挂载
      1. constructor
         1. 通过给 this.state 赋值对象来初始化内部 state
         2. 为事件处理函数绑定实例
      2. static getDerivedStateFromProps()
         1. 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。
         2. 它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。
      3. render()
      4. * componentDidMount
   2. 更新
      1. static getDerivedStateFromProps()
      2. shouldComponentUpdate()
      1. render()
      2. getSnapshotBeforeUpdate()
      3. * componentDidUpdate()
   3.  卸载
       1. * componentWillUnmount
   4.  错误处理
       1.  static getDerivedStateFromError()
       2. * componentDidCatch()
   
2. React的Key有什么作用？（简单）
   1. diff算法时标明当前数据有无变更
   
3. this.setState有几个参数？第二个参数是干什么用的？（简单）
   1. 两个: setState(updater, [callback])
      1. updater: 
         1. { quantity:2 }
         2. (state,props)=>{ return { quantity:state.quantity + 1 } }
      2. callback:
         1. 在 setState 完成合并并重新渲染组件后执行。通常，我们建议使用 componentDidUpdate() 来代替此方式。*
   
4. 数组渲染是否能使用index？为什么？（简单）
    如果显示的仅为item，则可使用index;其他情况最好不要
   
5. Component，PureComponent，FunctionComponent分别是什么？有些什么样的特点？作用？（一般）
   1. Component: 组件式
   2. PureComponent: Component加强版，对 props 和 state 进行浅层比较，并减少了跳过必要更新的可能性。(自动进行了shouldComponentUpdate)
   3. FunctionComponent: 函数式组件


## Vue
1. Vue的生命周期？
2. 关于技术栈vue和react，你倾向于用那种，为什么？可以简单聊一聊你对这两种框架各有的优势。