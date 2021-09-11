### 意义

    浏览器提供的数据库, 用以减轻服务器压力

### 优缺点

    1. cookie: 存储内容小[4KB], 且每次都会带回给浏览器
    2. localStorage: 存储内容稍大[2.5~10MB],但较难搜索 [同步操作]
    3. IndexedDB: 可存储较大资源, 提供查询接口,可建立索引[不支持SQL查询语句]

### 特点

    1. 键值对存储
    2. 异步操作
    3. 支持事务[一系列操作事件中, 如任意步骤失败, 则整体回退至事物发生前状态]
    4. 同源限制
    5. 存储空间大[>=250MB]
    6. 支持二进制存储[ArrayBuffer || Blob]

### 类别

    1. 数据库: IDBDatabase 对象 => 每个域名可新建多个[存在版本]
    2. 对象仓库: IDBObjectStore 对象
       1. 意义: 每个数据库下存在多个, 类似于关系型数据库中的表格
       2. 对象仓库 中保存的为 *数据记录 = 主键[唯一] + 数据体*
    3. 索引: IDBIndex 对象
    4. 事务: IDBTransaction 对象
       1. 意义: 数据记录 的增删改查都要通过事务完成
       2. 事件: error | abort | complete => 监听操作结果
    5. 操作请求: IDBRequest 对象
       1. 意义: 打开数据库的操作结果
       2. 事件: error | success[request.result = 数据库] | upgradeneeded[数据库升级]
    6. 指针: IDBCursor 对象
    7. 主键集合: IDBKeyRange 对象

### 操作流程
    1. 打开: var request = window.IndexedDB.open(databaseName,version = 1) request = typeof IDBRequest
