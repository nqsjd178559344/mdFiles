1. 文档 https://classic.yarnpkg.com/en/docs/cli/
2. API
   1. 更新 yarn upgrade /yarn upgrade [package]
      1. 注: 大版本更新不会自动给更新 需要比对 yarn outdated 的 红色结果 自行更新 (可用 https://github.com/raineorshine/npm-check-updates 一键升级， 该库 不为正确版本背书 : npx ncu -u)
   2. 删除 yarn remove [package]
   3. 可选择性的更新 yarn upgrade-interactive(仅捕捉小版本，跨大版本升级需 --latest)
   4. 查询 yarn why [package]
3. package.json 解析文档 https://classic.yarnpkg.com/en/docs/package-json#toc-scripts
4. npm 文档 https://docs.npmjs.com/cli/v8/using-npm/scripts
5. ^a.b.c 与 ~a.b.c 与 a.b.c 的区别

   ```json
      ^a.b.c: >= a.b.c && < (a+1).b.c
      ~a.b.c: >= a.b.c && < a.(b+1).c
       a.b.c：固定版本
   ```

   <!-- todo -->

   ```
   如何在不看最新版本号的情况下升级到^a.latest.latest?
   ```
