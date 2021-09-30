const memoryUsage = require('process').memoryUsage
console.log(memoryUsage())

/**
 {
  rss: 23543808, // 常驻集大小，是进程在主内存设备（即总分配内存的子集）中占用的空间量[表示给这个node进程分配了多少物理内存]，包括所有 C++ 和 JavaScript 对象和代码。这些物理内存中包含堆，栈和代码片段。对象，闭包等存于堆内存，变量存于栈内存，实际的JavaScript源代码存于代码段内存。使用Worker线程时，rss将会是一个对整个进程有效的值，而其他字段则只针对当前线程。
  heapTotal: 4677632, // 当前申请到的堆内存总大小。
  heapUsed: 2909224, // 当前内存使用量
  external: 985996, // 指的是绑定到 V8 管理的 JavaScript 对象的 C++ 对象的内存使用量。
  arrayBuffers: 17574 // 是指为 ArrayBuffer 和 SharedArrayBuffer 分配的内存，包括所有 Node.js Buffer。 这也包含在 external 值中。 当 Node.js 被用作嵌入式库时，此值可能为 0，因为在这种情况下可能不会跟踪 ArrayBuffer 的分配。
}
 */