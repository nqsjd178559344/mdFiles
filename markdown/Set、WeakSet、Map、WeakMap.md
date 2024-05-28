1. Set:不存储重复值[5 !== "5" ] [NaN === NaN] [{} !== {}]
   1. 属性
      1. size: Set实例的成员总数
   2. 方法
      1. 操作
         1. 新增: add(value) **返回Set解构本身**
         2. 删除: delete(value) **返回true/false**
         3. 是否存在: has(value) **返回true/false**
         4. 清空: clear() **无返回值**
      2. 遍历
         1. keys()
         2. values()
         3. entries()
            ```
            for (let item of set.keys()) {
                console.log(item);
            }
            for (let item of set.values()) {
                console.log(item);
            }
            for (let item of set.entries()) {
                console.log(item);
            }

            for (let item of set) { //  = set.values()
                console.log(item);
            }
            
            ```
         4. forEach()
         5. map()
         6. filter()
            ```
            let set = new Set([1, 2, 3]);
            set = new Set([...set].map(x => x * 2));
            // 返回Set结构：{2, 4, 6}

            let set = new Set([1, 2, 3, 4, 5]);
            set = new Set([...set].filter(x => (x % 2) == 0));
            // 返回Set结构：{2, 4}
            ```
   3. 转为数组 :Array.from()
   4. 交并补
      ```
        // 并集
        let union = new Set([...a, ...b]);
        // Set {1, 2, 3, 4}

        // 交集
        let intersect = new Set([...a].filter(x => b.has(x)));
        // set {2, 3}

        // （a 相对于 b 的）差集
        let difference = new Set([...a].filter(x => !b.has(x)));
        // Set {1}
      ```
    5. 改变原数据
       ```
       // 方法一
        let set = new Set([1, 2, 3]);
        set = new Set([...set].map(val => val * 2));
        // set的值是2, 4, 6

        // 方法二
        let set = new Set([1, 2, 3]);
        set = new Set(Array.from(set, val => val * 2));
        // set的值是2, 4, 6
       ```

2. WeakSet
   1. 与Set的区别
      1. 成员只能是对象
      2. 内的对象弱引用 **即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。**
      3. 不适合引用
      4. 不可遍历（无size属性）
   2. 操作
      1. 新增: add(value) **返回Set解构本身**
      2. 删除: delete(value) **返回true/false**
      3. 是否存在: has(value) **返回true/false**
   3. 用处: *储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。*
   
3. Map **Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。**
   1. 同Set，存在 size/set *.set('edition', 6)* /delete *key* /has *key* /get *key* / clear 方法 等
   2. 遍历
      1. keys()
      2. values()
      3. entries()
         ```
         for (let item of map) { //  = map.entries()
             console.log(item);
         }
         
         ```
      4. forEach()
   3. 是否是同一个key:
      1. 0/-0 true
      2. true/"true" false
      3. NaN/NaN true
   4. 链式调用
      ```
      let map = new Map()
      .set(1, 'a')
      .set(2, 'b')
      .set(3, 'c');
      ```
   5. forEach() **可以接受第二个参数，用来绑定this**
      ```
      const reporter = {
        report: function(key, value) {
          console.log("Key: %s, Value: %s", key, value);
        }
      };

      map.forEach(function(value, key, map) {
        this.report(key, value);
      }, reporter);
      ```
   6. map()
   7. filter()
      ```
      const map0 = new Map()
        .set(1, 'a')
        .set(2, 'b')
        .set(3, 'c');

      const map1 = new Map(
        [...map0].filter(([k, v]) => k < 3)
      );
      // 产生 Map 结构 {1 => 'a', 2 => 'b'}

      const map2 = new Map(
        [...map0].map(([k, v]) => [k * 2, '_' + v])
          );
      // 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}
      ```
   8. 与其他数据结构的互相转换
      1. Map 转为 数组
      2. 数组 转为 Map
      3. Map 转为 对象
      4. 对象 转为 Map
      ```
      let map = new Map().set("name", 'zhangfafa').set("age", '25').set("gender", 'female')

      //! Map 转为 数组
      let isArray = [...map]

      //! 数组 转为 Map
      let isMap = new Map(isArray)

      //! Map 转为 对象
      let isObject = {}
      for (let [key, value] of map) {
          isObject[key] = value
      }
      
      //! 对象 转为 Map
      let objectToMap = new Map(Object.entries(isObject))
      ```

4. WeakMap
   1. 与Map的区别
      1. 只接受 {} 作为 key
      2. 内的对象弱引用 **即垃圾回收机制不考虑 WeakMap 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakMap 之中。**
      4. 不适合引用
      5. 不可遍历（无size属性）
   2. 操作[无法清空，即不支持clear]
      1. 新增: set(value) 
      2. 获取: get()
      3. 删除: delete(value) **返回true/false**
      4. 是否存在: has(value) **返回true/false**
   3. 用处: *在网页的 DOM 元素上添加数据，就可以使用WeakMap结构。当该 DOM 元素被清除，其所对应的WeakMap记录就会自动被移除。* ———— DOM 节点作为键名

      