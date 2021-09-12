# react 17.0.0

dangerfile: 代码检测,不通过则不可提交

1. 怎样学习源码[推荐源码]**lodash | vite | vue | react**

   1. 掌握对应的 API
   2. 根据某个具体的 API, 通过 debug 去逐步的 debug 相关 API 的源码
   3. debug 时抓大放小, 先看主要部分
   4. 至少先明白是干嘛的,再去弄懂怎样实现
   5. 可以结合一些 react 的 issue, 及别的开发者整理的文章
   6. 做些简单的 demo 来实际运行
   7. **大库捡重点的看**

2. 概念:

   1. 批处理: 生命周期中 setState 不会马上执行,而是会放一起统一执行[优化] => !root[首次渲染]不批处理控制事件: **unbatchedUpdated** 多个批处理 = 多个更新

   2. 取到 <App/> react 元素[fiberRoot]: ${#app}.\_reactRootContainer.\_internalRoot
   3. 优先级[expirationTime]
      1. 区分[5 种]:
         1. 生命周期: 同步
         2. 受控用户输入: 同步
         3. 交互事件[动画等]: 高优先级
         4. 其他[数据请求等]: 低优先级
      2. 计算: expirationTime = currentTime + N
      3. _优先级会随着时间的流逝而提升_: currentTime > expirationTime ? 优先级 max => 一次处理一个优先级任务

3. react<16>的问题:expirationTime 糅合了优先级 + 批处理 => [Suspense:子组件返回后才显示 => 接口返回才进行后续任务异步] 出现后, 高优先级 IO 任务会阻塞低优先级 CPU 任务 **react 中 IO 任务指与 Suspense 机制相关的任务[如果一个任务会引起 Suspense 下子组件抛出 thenable 对象则为 IO 任务],其余为 CPU 任务**
   eg: <https://codesandbox.io/s/demo-before-using-lane-model-txsnw?file=/src/index.js:1970-1977>

4. react<17>: 新增 **lanes[31 种]** => lane: 优先级 | lanes: 批处理优先级 s
   1. wipLanes: 当前需要更新的优先级[已被占用的lane]
   2. 优先级 计算:

      ```
      function pickArbitraryLane(当前优先级类型 & ~wipLanes) => 先对 wipLanes 取非然后按位与[均 1 才 1]
      pickArbitraryLane: (lanes)=>lanes & -lanes[lanes.补码]
      ```
