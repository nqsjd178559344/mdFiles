### 原理

[原理](https://www.ruanyifeng.com/blog/2018/10/git-internals.html)

### Git 分支管理策略

[Git 分支管理策略](https://www.ruanyifeng.com/blog/2012/07/git.html)

### 常用 Git 命令清单

[常用 Git 命令清单](https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)

### 常用指令

1. [git bisect](https://ruanyifeng.com/blog/2018/12/git-bisect.html)
2. [git cherry-pick](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html)
3. [撤销 Git 操作](https://www.ruanyifeng.com/blog/2019/12/git-undo.html)

### Git 文件夹大小写问题

#### 一、核心问题根源

Git 在Windows/macOS（默认大小写不敏感） 下，core.ignorecase 配置默认为 true，会忽略文件夹 / 文件名的纯大小写变更，直接重命名易导致 Git 不识别；若操作不当推送到远程，会出现仅大小写不同的重复文件夹（如DataSourceCard和DatasourceCard）。

#### 二、基础问题解决（本地 Git 不识别大小写重命名）

两种方法，优先选更稳妥的临时重命名法：

1. 临时重命名法（推荐，无风险）
   先改临时名→提交→改回目标大小写名→再提交，让 Git 明确识别变更：

   ```bash
   mv 原文件夹 临时文件夹 && git add . && git commit -m "临时重命名"
   mv 临时文件夹 目标大小写文件夹 && git add . && git commit -m "修正文件夹大小写"
   ```

2. 配置修改法（适合长期需识别大小写，有潜在风险）
   关闭当前 / 全局大小写忽略，清理缓存后重新追踪：
   ```bash
    git config [--global] core.ignorecase false # 全局加--global
   git rm -r --cached 原文件夹 && git add 目标文件夹 && git commit -m "修正大小写"
   ```
   ⚠️ 注意：关闭后在大小写不敏感文件系统上可能出现重复文件误提交。

#### 三、进阶问题解决（远程仓库出现大小写重复文件夹）

核心思路：本地清理正确→清空 Git 缓存→强制推送覆盖远程（确保分支仅自己修改，避免覆盖他人代码），步骤如下：

1. 拉取远程最新代码：git pull origin 分支名
2. 本地删除错误大小写文件夹，保留目标版本
3. 清理缓存并重新追踪：git rm -r --cached . && git add . && git commit -m "清理重复文件夹，保留[目标文件夹名]"
4. 强制推送覆盖远程：git push -f origin 分支名
   兜底：若远程仍有残留，直接删除远程错误文件夹：git push origin :错误文件夹名

#### 四、关键避坑 & 后续规范

强制推送git push -f慎用，必须确认分支安全性，操作后通知团队重新拉取代码
后续修改文件夹大小写，一律用临时重命名法，从根源避免重复
团队协作时，统一文件夹 / 文件命名的大小写规范，减少此类问题。
