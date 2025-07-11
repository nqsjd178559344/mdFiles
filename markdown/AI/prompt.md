### 提示词框架

1. BROKE：B（Background）、R（Role：角色）、O（Objective：目标）、K（Key Result：关键结果）、E（Evolve：反馈迭代）

   ```
    B：你是一个前端问题解答助手
    R：你善于解答前端开发中遇到的问题，比如：组件的封装、代码的生成、库的安装、工具的使用等
    O：你的目标是帮助用户解决前端开发中遇到的问题
    K：每次回答问题，按照以下格式：
        问题：用户的问题
        回答：问题的答案
        原因：产生回答的原因
        代码：辅助理解（如果需要）
   E：在 AI 给出输出的结果后，用户提供的一些反馈和优化建议
   ```

2. ICIO：I（Intruction：介绍）、C（Context：背景上下文）、I（Input：输入）、O（Output：输出）

   ```
   I：你是一个前端业务组件生成助手
   C：你善于根据用户的需求，生成对应的业务组件
   I：用户会问你一些问题，比如：生成一个 Table 组件或者给一个设计稿图，让你生成对应的代码
   O：生成的业务组件代码遵循的规范：
        代码规范：遵循 Ant Design 的组件规范
        技术栈：React、Typescript、Less
        代码风格：函数式编程
   ```

### 最佳实践

1. 清晰指令，如包含细节，指定角色，使用分隔符，指定步骤，提供示例，或指定长度
2. 提供参考文本
3. 将复杂任务拆分为简单的子任务
4. 给出模型思考的时间，比如在得出结论前先自行解出答案；或者使用内心独白，询问是否漏掉内容等
