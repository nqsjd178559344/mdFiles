1. React理念 => **快速响应**
   1. 决定因素
      1. 当遇到大计算量的操作或者设备性能不足使页面掉帧，导致卡顿。 => CPU瓶颈
         1. 解决方式 => 时间切片 => **同步更新转为可中断的异步更新**
      2. 发送网络请求后，由于需要等待数据返回才能进一步操作导致不能快速响应。 => IO瓶颈
         1. 解决方式 => 尽可能无感知: Suspense功能及配套的hook——useDeferredValue => **同步更新转为可中断的异步更新**

2. V15为什么不满足快速响应而被重构?
   1. V15架构:
      1. 协调器(*Reconciler*) => **负责找出变化的组件**
         1. 更新时操作
            1. 调用函数组件、或class组件的render方法，将返回的JSX转化为虚拟DOM
            2. 将虚拟DOM和上次更新时的虚拟DOM对比
            3. 通过对比找出本次更新中变化的虚拟DOM
            4. 通知渲染器将变化的虚拟DOM渲染到页面上
      2. 渲染器(*Renderer*) => **负责将变化的组件渲染到页面上**
         1. 种类
            1. ReactDOM => 浏览器环境渲染
            2. ReactNative => APP原生组件
            3. ReactTest => 渲染出纯js对象用于测试
            4. ReactArt => 渲染到Canvas | SVG | VML(IE8)
         2. 操作 => 在每次更新发生时，渲染器接到协调器通知，将变化的组件渲染在当前宿主环境。
   2. 缺点:
      1. 协调器阶段时, mount组件会调用mountComponent, update组件会调用updateComponent => *二者均递归更新子组件*
      2. 递归更新的缺点:
         1. 无法中断，层级很深时，时间会超过16ms， 用户交互卡顿
         2. 如实现中断更新，则可能发生视图错误*因协调器/渲染器交互工作*
3. V16如何实现支持异步更新?
   1. V16架构
      1. 调度器(*Scheduler*) => **调度任务的优先级，高优任务优先进入协调器** (requestIdleCallback's polyfill)
         1. 实现 => 浏览器有空闲时间通知
            1. 为什么不用 *requestIdleCallback*?
               1. 浏览器兼容性
               2. 触发频率不稳定, 受很多因素影响
            2. Scheduler 优点? 
               1. 除了在空闲时触发回调的功能外，Scheduler还提供了多种调度优先级供任务设置。
      2. 协调器(*Reconciler*)
         1. 更改=> 从递归变为可中断的循环过程, 每次循环都会调用 *shouldYield* 判断当前是否有剩余时间
      3. 渲染器(*Renderer*)
   2. 如何解决中断更新时dom渲染不完全?
      1. 协调器 / 渲染器 顺序工作
         1. 当调度器将任务交给 协调器 时, 协调器会为变化的虚拟dom打上标记(增删改)
         2. 调度器 / 协调器工作均发生于**内存**中, 只有当所有组件均完成 协调器 的工作, 才会统一交给 渲染器 => 故反复中断也不会被用户觉察
   3. ![例子](https://react.iamkasong.com/img/process.png)
      1. 红框中可能因为什么原因被中断?
         1. 有更高优先级的任务需要先更新
         2. 当前帧无剩余时间
4. React的<代数效应>
   1. 解释: 将副作用从函数逻辑中抽离，使函数关注点保持纯粹
   2. 使用: Hooks => 不需要考虑State是如何保存于hooks中，仅使用就好
   3. 为何不用 Generator:
      1. 与 async 类似,Generator具备传染性[如想子事件同步更新,父事件如想同步获取子事件结果,则父事件也需使用async]
      2. Generator的中间状态与上下关联
5. Fiber = 虚拟DOM
   1. React Fiber: React内部自实现的一套状态更新机制,支持任务不同优先级,可中断/恢复,并且恢复后可复用之前的中间状态
6. 双缓存
   1. 解释: 在内存中构建并直接替换
   2. 双缓存Fiber树 **二者通过 *alternate* 属性互相链接**
      1. currentFiber => 屏幕中正在显示的
      2. workInProgressFiber => 内存中构建的
   *React应用的根节点通过使current指针在不同Fiber树的rootFiber间切换来完成current Fiber树指向的切换。*
   流程:
      1. mount:
         1. 创建fiberRootNode[整个应用的根节点]与rootFiber[当前组件树的根节点]
         2. fiberRootNode.current = rootFiber , 此时rootFiber无子节点
      2. render:
         1. 尝试复用且构建新的 workInProgressFiber树[复用currentFiber对应的节点数据]
         2. fiberRootNode.current = workInProgressFiber树
         3. workInProgressFiber树 在 commit阶段 渲染到页面
         4. currentFiber = workInProgressFiber树
      3. update:
         1. 开启新的render阶段[重复上诉操作]
7. render阶段
   1. 调用 performSyncWorkOnRoot[同步] 与 performConcurrentWorkOnRoot[异步], 二者调用 performUnitOfWork()  *performUnitOfWork: 创建下一个Fiber节点并赋值给workInProgress，并将workInProgress与已创建的Fiber节点连接起来构成Fiber树。*
   2. performUnitOfWork ![图例](https://react.iamkasong.com/img/fiber.png)
      1. 递: beginWork => 根据传入的Fiber节点创建子Fiber节点，并将这两个Fiber节点连接起来。当无子节点时归
         判断是mount阶段还是update阶段 => current === null ? mount : update
            1. mount: 根据fiber.tag 创建Fiber子节点,**FunctionComponent/ClassComponent/HostComponent组件类型调用 reconcileChildren()**
            2. update: 满足*oldProps === newProps && workInProgress.type === current.type || 当前Fiber节点优先级不够*时可复用current的子节点 作为 workInProgress 的 子节点,否则走新建逻辑
            reconcileChildren: 为生成的Fiber节点带上effectTag属性 => effectTag: 要执行的DOM操作
            ![beginWork流程](https://react.iamkasong.com/img/beginWork.png)

            
      2. 归: completeWork => 处理Props: *如onClick等回调函数的注册/style/children等* => 赋值给 workInProgress.updateQueue 数组
         1. mount:
            1. 生成Fiber节点对应的DOM节点
            2. 将子DOM节点插入新生成的DOM节点中
            3. 处理Props 
         2. update
            1. 处理Props
            ![completeWork流程](https://react.iamkasong.com/img/completeWork.png)


   https://react.iamkasong.com/
   