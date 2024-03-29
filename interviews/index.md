## HTML

<!-- * finish -->

1.  ::before 和 :after 中双冒号和单冒号有什么区别？这两个伪元素的作用是什么？（一般）
    答:
    ::为伪元素，:为伪类
    伪元素为元素形式存在，定义在元素主题内容前，仅在  CSS  渲染层加入，故只存在于页面中，不会改变文档内容，也不存在于 dom 中
    :after 已于 css3 改为::，现在除兼容 IE 浏览器外不推荐此方法

2.  浏览器缓存包含哪些内容？cookie、localStorage、sessionStorage 是否可以跨域访问？（一般）
    答: 1. 1. http 缓存，通过 Http 请求头判断 2. WebSQL 3. indexDB 4. Cookie 1. 是浏览器访问服务器后，服务器传给浏览器的一段数据。 2. 浏览器需要保存这段数据，不得轻易删除。 3. 此后每次浏览器访问该服务器，都必须带上这段数据。

           5. LocalStorage
           6. SessionStorage
           7. Application cache
           8. cacheStorage
           9.  flash缓存
        2. cookie 可以设置成相同主域的时候，跨子域访问，另外两个是不能跨域访问的，哪怕只是端口号不同，都不能访问

<!-- * finish -->

1. innerHTML 和 innerText 的区别？
   eg:

   ```html
   <div id="test"><span style="color:red">test1</span> test2</div>
   ```

   innerHTML: `<span style="color:red">test1</span> test2`
   innerText: test1

   ```tsx
   // 如何将 innerHTML 内容转换成 innerText
   const text = document.getElementById("test");
   function removeTag(fragment) {
     return (
       new DOMParser().parseFromString(fragment, "text/html").body
         .textContent || ""
     );
   }

   text.innerText === removeTag(text.innerHTML);
   ```

## CSS

<!-- * finish -->

1. 标准盒子模型中，盒子所占宽度是怎样构成的？（简单）
   盒子模型设置值:content-box = content-box|border-box|inherit;

   1. content-box: **标准盒子模型** 宽度和高度分别应用到元素的内容框,在宽度和高度之外绘制元素的内边距和边框。即:width = content ; totalWidth = width + 2*border + 2* padding + 2\* margin ;
   2. border-box: **怪异盒子模型** 为元素设定的宽度和高度决定了元素的边框盒。即为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。通过从已设定的宽度和高度分别减去边框和内边距才能得到内容的宽度和高度。即: width = content + border + padding； totalWidth = width + 2\* margin
   3. inherit: 继承

<!-- * finish -->

2. 简述一下 css 的权重规则（简单）: **_同级比较; 权重相等时后覆盖前_**

   1. 样式类型
      1. 行间
      2. 内联
      3. 外部
   2. 选择器类型
   3. 权重计算
      1. important
      2. 内联 => 1000
      3. #id => 100
      4. .class => 10
      5. 选择器 => 1

   Important> 内联 > id > class | 属性（[type="text"]） > 类型选择器 | 伪元素选择器 > 通配符 | 子选择器 | 相邻选择权

<!-- * finish -->

1. css 选择器有哪些？相邻选择器写法？（简单）
   1. 1. 简单选择器
      2. 组合器选择器
      3. 伪类选择器
      4. 伪元素选择器
      5. 属性选择器
   2. 相邻选择器: ele1 + ele2

<!-- * finish -->

2. 如何让一个 div 垂直居中，至少说出两种（简单）

   1. flex 布局
   2.

   ```css
   position: absolute;
   left: 0;
   right: 0;
   top: 0;
   bottom: 0;
   margin: auto;
   ```

   3.

   ```css
   left: 50%;
   position: absolute;
   top: 50%;
   transform: translate(-50%, -50%);
   ```

<!-- * finish -->

3. 纯 css 实现一个向下的小三角（简单）

   ```css
      width: 0px;
      height: 0px;
      border-left: 20px solid transparent;
      border-right: 20px solid transparent;
      border-top: 20px solid red;

      <!-- 进阶: 纯 css 实现一个向下的扇形 -->
      border-radius: 20px;
   ```

<!-- * finish -->

4. 设置元素浮动后，该元素的 display 值是多少？（有迷惑性，简单）
   Block

<!-- * finish -->

5. 什么是 BFC？（简单）
   块级格式化上下文，可看作独立的容器，容器内的元素不会影响容器外的元素
   **特点**

   1. 同一个 BFC 的相邻 Box 的 margin 会重叠
   2. 不给父级高度，自己浮动，则父级会发生高度塌陷 => 父级清除浮动

   **创建方式**

   1. float: !none
   2. display: inline-block | flex | table-cell | table-caption
   3. overflow: !visible
   4. position: !static && !relative

6. less、sass 的一些基础用法 （一般）
   (1)Less

<!-- * finish -->

7.  flex

    1. 属性<common : flex-start; center; flex-end>
       1. display:flex
       2. flex-direction<排布方式>:
          1. column: 纵轴
          2. reverse-column: 倒序纵轴 **_column-reverse_**
          3. row: 默认
          4. reverse-row: 倒序默认 **_row-reverse_**
       3. **_flex-wrap<折行方式>_**:
          1. no-wrap
          2. wrap
          3. **_wrap-reverse_**
       4. **_flex-flow_**
       5. justify-content<横轴排列方式>:
          ...common,space-around; space-between
       6. align-items<交叉轴排列方式>:
          ...common,**_baseline_**,**_stretch_**
       7. order
       8. 多行排列??? => **_align-content<多轴线>_**
          **_...align-items , ...justify-content_**
       9. flex-self => **_align-self_**
          **_...align-items,auto_**
       10. flex-grow<放大>:**_init = 0_**
       11. flex-shrink<缩小>:**_init = 1_**
       12. flex-**_basis_**<默认>: **_init = auto_**
    2. flex:inital/flex:1/flex:auto/flex:none 区别

       1. flex:inital => 0 1 auto
       2. flex:1 => 0 1 0% =>**_1 1 0%_**
       3. flex:auto => 1 1 auto
       4. flex:none => 0 0 auto

    3. flex-shrink 计算方式
       eg:

       ```css
       wrapper = 500
       item1~item5 = 120
       item-n: flex-shrink:n
       求:
       item1~5各剩余多少?
       ```

       答:
       120\*5 = 600,600 - 500 = 100
       故 item1~5 共收缩 100
       因 1+2+...+5 = 15

    故 item-n: 120 - 100 / 15* n = 120- 6.667n
    item-1: 120-6.667 *1 = 113.333 => 向上取整两位 113.34
    item-2: 120-6.667* 2 = 106.666 => 向上取整两位 106.66
    item-3: 120-6.667 *3 = 99.999 => 向上取整两位 100
    item-4: 120-6.667* 4 = 93.332 => 向上取整两位 93.34
    item-5: 120-6.667 * 5 = 86.665 => 向上取整两位 86.66

<!-- * finish -->

8. css 会继承的属性[自测版]
   1. font<所有属性[可能有兼容性问题]>:
      1. font-size
      2. font-family
      3. font-weight
      4. font-style
      5. ...
      6. font-variant
      7. font-feature-settings
      8. font-stretch
      9. font-variant-ligatures
      10. font-kerning
      11. font-optical-sizing
      <!-- 兼容性 -->
      12. font-size-adjust
      13. font-synthesis
      14. font-variant-alternates
      15. font-language-override
      16. font-size-adjust
   2. text<所有属性[可能有兼容性问题]>:
      1. text-align
      2. text-decoration
      3. text-transform
      4. text-overflow
      5. text-shadow
      6. text-indent
      7. ...
   3. visibility / opacity
   4. color
   5. 表格:
   6. 列表:
      list-style :
      1. list-style-position
      2. list-style-image
      3. list-style-type
   7. 光标: cursor

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

<!-- * finish -->

3. 正则考察：电话号/4 位验证码（一般）
   1. 电话号:
      /^1[3589]\d{9}/g
   1. 4 位验证码:
      /^[a-zA-Z0-9]{4}$/g

<!-- * finish -->

4. 至少三种数组去重（简单数组/对象数组）的方式，越多越好（一般）

   1. 简单数组去重:

      ```js
      let array = [
        1, 2, 13, 4, 3, 2, 4, 4, 3, 5, 3, 4, 5, 4, 6, 1, 6, 4, 4, 1, 2, 1, 3,
      ];
      // 理论值: [1,2,13,4,3,4,5,6]
      function uniq1(array) {
        return [...new Set(array)];
      }

      function uniq2(array) {
        let obj = {};
        for (let i = 0, j = array.length; i < j; i++) {
          if (!obj[array[i]]) {
            obj[array[i]] = true;
          }
        }
        return Object.keys(obj);
      }

      function uniq3(array) {
        let obj = {};
        for (let i = 0, j = array.length; i < j; i++) {
          if (!obj[array[i]]) {
            obj[array[i]] = true;
          } else {
            i++;
          }
        }
        return Object.keys(obj);
      }

      const res1 = uniq1(array);
      const res2 = uniq2(array);
      const res3 = uniq3(array);
      ```

   2. 对象数组去重:

      ```js
      // 2. 对象数组去重
      var arr = [
        {
          key: "01",
          value: "乐乐",
        },
        {
          key: "02",
          value: "博博",
        },
        {
          key: "03",
          value: "淘淘",
        },
        {
          key: "04",
          value: "哈哈",
        },
        {
          key: "01",
          value: "乐乐",
        },
      ];

      function uniqObj1(array) {
        let arr = [];
        for (let i = 0, j = array.length; i < j; i++) {
          let item = array[i];
          let firstIndex = array.findIndex((i) => i.key === item.key);
          if (firstIndex !== i) {
            i++;
          } else {
            arr.push(array[i]);
          }
        }

        return arr;
      }

      function uniqObj2(array) {
        let obj = {};
        for (let i = 0, j = array.length; i < j; i++) {
          let item = array[i];
          let key = item.key;
          if (!obj[key]) {
            obj[key] = true;
          } else {
            array.splice(i, 1);
            i++;
          }
        }
        return array;
      }

      const resObj1 = uniqObj1(arr);
      const resObj2 = uniqObj2(arr);
      ```

5. 如何避免回调地狱？（一般）
   1. 使用 Promise
   2. async、await
6. 什么是事件循环（event loop）（一般）

7. 防抖和节流的实现方式，一般使用场景（一般）

   1. 防抖: 一般用于 input 框输入，即输入完成后才去做事（景区大巴车）
      实现

   2. 节流: 一般用于阶段性传递信息（普通公交车）
      实现

8. async、await / promise / generator 区别（一般）
   1. async、await => Promise 优化版
      1. async 函数完全可以看作多个异步操作，包装成的一个 Promise 对象
      2. await 命令就是内部 then 命令的语法糖。
   2. async、await = generator + 执行器

<!-- * finish -->

9. 前端模块化:

   1. commonJS / AMD / CMD / ES6 区别?

      1. commonJS: **运行时加载 | 输出值的拷贝(缓存) | 同步加载 | this 存在**
         1. 特性
            1. 第一次加载某个模块时，Node 会缓存该模块。以后再加载该模块，就直接从缓存取出该模块的 module.exports 属性。
            2. 一旦输出一个值，模块内部的变化就影响不到这个值。
               module.exports / require
      2. AMD: **异步加载**[requirejs]

         ```
         定义:
         define(function(){ return 模块 })
         define(['依赖模块1','依赖模块2'],function(m1,m2){ return 模块 })
         引入:
         require(['依赖模块1','依赖模块2'],function(m1,m2){ 使用 })
         ```

      3. CMD: **用于浏览器端，模块异步加载，使用时加载执行**[seajs]

         ```
         定义:
         define(function(require,exports,module){ return 模块 })
         引入:
         define(function(require){ var m1 = require('./index) ; })
         ```

      4. ES6:export (default) / import **编译时加载/静态加载 | 输出值的引用 | 异步加载 |自动严格模式 | !some**

         1. some: this | arguments | require | module | exports | **filename |**dirname
         2. 如多次重复执行同一句 import 语句，那么只会执行一次，而不会执行多次。
         3. 重复导入某模块的不同模块时，会一次性加载
         4. 快捷写法

            ```js
            export { add as default };
            // 等同于
            // export default add;

            // app.js
            import { default as foo } from "modules";
            // 等同于
            // import foo from 'modules';
            ```

      ```
      commonJS的，引入的值，可以在外面更改，但是暴露的原始值不可以更改,也就是值的复制,复制出来是可以改的
      export的，不可以在外面给他重新赋值，但是如果它本身改变，外面的值也会改变，也就是值的引用
      ```

      eg:

      ```js
      // CommonJS模块
      let { stat, exists, readfile } = require("fs");

      // 等同于
      let _fs = require("fs"); // 整体加载
      let stat = _fs.stat;
      let exists = _fs.exists;
      let readfile = _fs.readfile;

      // ES6模块
      import { stat, exists, readFile } from "fs"; // 局部加载
      ```

<!-- * finish -->

10. script 加载

```js
   1. <script src="path/to/myModule.js" defer></script>
   // defer: 渲染完再执行,按顺序执行
   2. <script src="path/to/myModule.js" async></script>
   // async: 下载完就执行,不保证顺序
   3. <script type="module" src="./foo.js"></script> => ES6 模块 | defer
```

<!-- * finish -->

11. webSocket

    1.  解决问题：

        1. 服务端主动推消息到客户端 / 客户端主动推消息到服务端

    2.  特点:
        1. 数据格式轻量，性能开销小，通信高效
        2. 无同源限制
    3.  API
        1. 开始连接: const ws = new WebSocket("url")
        2. 发送数据: ws.send(msg)
        3. 连接成功后的回调: ws.onopen
        4. 连接关闭后的回调: ws.onclose
        5. 接收数据后的回调: ws.onmessage
        6. 报错时的回调: ws.onerror

12. JS 的事件机制[顺序执行] => e.stopPropagation();//阻止冒泡|捕获

    1. 事件捕获:
    2. 目标
    3. 事件冒泡: 子元素的事件被触发,父元素的相同事件也会被触发

    4. 通用: 冒泡 | 事件委托 e.preventDefault() => 阻止默认操作
    5. 事件委托: 事件目标自身不处理事件，而是把处理任务委托给其父元素或者祖先元素。当点击子元素，根据"事件冒泡"，该子元素的父级元素捕获了该次点击事件，并触发自己的方法。

## React

<!-- * finish -->

1. React 的生命周期以及发生的顺序？（简单）
   1. 挂载
      1. constructor
         1. 通过给 this.state 赋值对象来初始化内部 state
         2. 为事件处理函数绑定实例
      2. static getDerivedStateFromProps()
         1. 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。
         2. 它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。
      3. render()
      4. - componentDidMount
   2. 更新
      1. static getDerivedStateFromProps()
      2. shouldComponentUpdate()
      3. render()
      4. getSnapshotBeforeUpdate()
      5. - componentDidUpdate()
   3. 卸载
      1. - componentWillUnmount
   4. 错误处理
      1. static getDerivedStateFromError()
      2. - componentDidCatch()
   5. ![图](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7083cad1a8a846aba4d9aed65f64e024~tplv-k3u1fbpfcp-watermark.awebp)

<!-- * finish -->

2. React 的 Key 有什么作用？（简单）
   diff 算法时标明当前数据有无变更

<!-- * finish -->

3. React 的 Fragment 与 <> </> 有什么区别？（简单）
   Fragment 可指定 Key,后者不可

<!-- * finish -->

4. this.setState 有几个参数？第二个参数是干什么用的？（简单）

   1. 两个: setState(updater, [callback])
      1. updater:
         1. { quantity:2 }
         2. (state,props)=>{ return { quantity:state.quantity + 1 } }
      2. callback:
         1. 在 setState 完成合并并重新渲染组件后执行。通常，我们建议使用 componentDidUpdate() 来代替此方式。\*

5. this.setState 什么时候是异步,什么时候是同步? 异步 => 多个 state 批量更新
   在由 React 引发的生命周期函数/事件处理[onClick 等]时异步,否则同步[可自己 addEventListener 添加监听]

6. 数组渲染是否能使用 index？为什么？（简单）
   如果显示的仅为 item，则可使用 index;其他情况最好不要

<!-- * finish -->

7. Component，PureComponent，FunctionComponent 分别是什么？有些什么样的特点？作用？（一般）
   **原答案**
   1. Component: 有自己独立的状态，业务逻辑，比价重。
   2. PureComponent: 简略的实现了一套浅层对比的 shouldComponentUpdate。对象引用不改变，属性改变就不起作用了。
   3. FunctionComponent: 没有 state，纯渲染，速度快。

为什么函数组件的性能比类组件的性能要高？因为类组件使用的时候要实例化

**网络上的回答**

1. 生成元素的差异:经过 React.createElement 处理之后，三个组件的区别就是 type 不一样了
   1. Component: type: class Comp
   2. PureComponent: type: class PureComp
   3. FunctionComponent: type f FunctionComp()

**本人答案**

1.  Component: 使用 ES6 classes 方式定义 React 组件 ; 不管 props 和 state 是否变化,组件都会更新
2.  PureComponent: Component 加强版，对 props 和 state 进行浅层比较[不会比较对象深层次的值是否相等]，并减少了跳过必要更新的可能性。(自动进行 shouldComponentUpdate)
3.  FunctionComponent: 函数式组件;

4.  React Hook 参数

    1.  基本
        1. useState
        2. useEffect
        3. useContext
    2.  额外
        1. useReducer
        2. useMemo
        3. useCallback
        4. useRef
        5. useLayoutEffect
        6. **useDebugValue**
        7. **useImperativeHandle**

5.  React 事件

    1.  合成事件

        1.  意义: 避免 DOM 上绑定过多的事件处理函数[占用内存 && 影响页面响应] && 屏蔽浏览器不同造成事件不同, 而生成的中间件
        2.  原理:

            1.  在 document 中监听所支持的事件,当事件调用并冒泡到 document 时,React 调用真正的处理函数执行
            2.  **合成事件的捕获阶段同样晚于原生事件的捕获阶段**

        3.  图例: ![图例](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/10/9/8792eeae6dc6011274986acf42a76b15~tplv-t2oaga2asx-watermark.awebp)

    2.  原生事件

        1.  思路: componentDidMount 阶段/ref 的函数执行阶段进行绑定至真实 DOM 操作，在 componentWillUnmount 阶段进行解绑操作以避免内存泄漏。
        2.  在 Class 组件中[ReactDOM.findDOMNode(component)仅支持 Class 组件], 进行绑定操作

            ```js
             componentDidMount() {
                const $this = ReactDOM.findDOMNode(this)
                $this.addEventListener('click', this.onDOMClick, false)
            }
            ```

    3.  响应顺序

        1. 捕获: 先监听的原生事件执行,捕获到 current 元素后,合成事件执行=> .addEventListener("click", this.onDOMClick, true);
        2. 冒泡: 先监听的原生事件执行,冒泡到 document 后,合成事件执行 => .addEventListener("click", this.onDOMClick, false);
        3. 如合成事件|原生事件执行时 e.stopPropagation(),则后续事件不会触发

    4.  ```jsx
        function Example() {
          return (
            <div
              tabIndex={1}
              onFocus={(e) => {
                console.log(e.currentTarget, e.relatedTarget, e.target);
                if (e.currentTarget === e.target) {
                  console.log("开始聚焦啦");
                } else {
                  console.log("聚焦子集啦", e.target);
                }
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  // Not triggered when swapping focus between children
                  console.log("焦点已进入");
                }
              }}
              onBlur={(e) => {
                if (e.currentTarget === e.target) {
                  console.log("开始失焦啦");
                } else {
                  console.log("失焦子集啦", e.target);
                }
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  // Not triggered when swapping focus between children
                  console.log("焦点已移出");
                }
              }}
            >
              <input id="1" />
              <input id="2" />
            </div>
          );
        }
        ```

## Vue

1. Vue 的生命周期？
2. Vue 父子组件传值/传事件
   1. 子组件设置 ref,父组件通过 this.$ref.refName.事件 调用子组件事件
   2. $on(eventName)/$emit(eventName,payload)
3. vue-router
4. VUEX
   1. State
   2. Getters
   3. Mutations
   4. Actions
   5. Modules
5. 关于技术栈 vue 和 react，你倾向于用那种，为什么？可以简单聊一聊你对这两种框架各有的优势。

## Store

1. mobx-react
   1. 参数
      1. @observable
      2. @computed
      3. @action

## TS

1. interface / type 区别

   1. 相同点

      1. 均可以描述对象或函数
      2. 均允许扩展(extends)

      ```ts
      1; // type 扩展 type
      type Name = {
        name: string;
      };

      2; // interface 扩展 interface
      interface Name {
        name: string;
      }
      interface User extends Name {
        age: number;
      }

      3; // interface 扩展 type
      type Name = {
        name: string;
      };
      interface User extends Name {
        age: number;
      }

      4; // type 扩展 interface
      interface Name {
        name: string;
      }
      type User = Name & {
        age: number;
      };
      ```

   2. type 可以 但 interface 不可
      1. 声明基本类型别名
      2. 声明联合类型
      3. 声明元祖
      4. 声明 typeof A
   3. interface 可以 但 type 不可
      1. 声明合并
   4. 使用偏向: interface:后台接口|SDK|前端库中最好使用; 日常可 type

## taro

3. 1/2 与 3 版本的区别?
