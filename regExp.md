1. 中文匹配 0 次或多次

   ```tsx
   const reg1 = new RegExp(/^([\u4e00-\u9fa5]+)?$/);
   const reg2 = new RegExp(/^[\u4e00-\u9fa5]{0,}$/);
   ```

2. 反向引用
3. 先行断言&后行断言

   1. 先行断言

      ```tsx
      /*
      1. x(?=y) 仅匹配被 y 跟随的 x
      举个例子，/Jack(?=Sprat)/，如果"Jack"后面跟着 sprat，则匹配之。
      /Jack(?=Sprat|Frost)/ ，如果"Jack"后面跟着"Sprat"或者"Frost"，则匹配之。但是，"Sprat" 和"Frost" 都不会在匹配结果中出现。
      
      2. x(?!y) 仅匹配不被y跟随的x。
      举个例子，/\d+(?!\.)/ 只会匹配不被点（.）跟随的数字。
      /\d+(?!\.)/.exec('3.141') 匹配"141"，而不是"3.141"
      */
      ```
