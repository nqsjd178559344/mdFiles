1.  npm init 全默认 = npm init -y
2.  配置私有: private:true
3.  npm install -g/-D
4.  查看可安装版本: npm info
5.  查看并更换源

        ```js
        // 查看当前源指向
        npm config get registry
        // 换源
        npm config set registry https://registry.npmmirror.com/

        ```

6.  nrm

        ```js
        // 安装
        npm i -g nrm
        // 查看当前可使用的源
        nrm ls
        // 切换源
        nrm use xxx
        // 检测网速
        nrm test

        ```
