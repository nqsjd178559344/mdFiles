1. 优势

   ```
    1. Next.js 为应用程序的开发和生产阶段提供了功能。例如：

      在开发阶段，Next.js 针对开发人员及其构建应用程序的经验进行了优化。它具有旨在改善开发人员体验的功能，例如 TypeScript 和 ESLint 集成、 快速刷新等。
      在生产阶段，Next.js 针对最终用户及其使用应用程序的体验进行了优化。它旨在转换代码以使其具有高性能和可访问性。
    2. 可服务器端渲染
   ```

2. nextjs的三种模式

      1. SSR
          ```tsx
          getServerSideProps 
          // 返回值
          {
              props: { data } 
            };
          ```

   2. ISR
      1. 定时刷新: getStaticProps 的 revalidate 属性 // 重新生成静态页面的时间间隔（s）
      ```tsx
      // 返回值
      {
          props: {},
          revalidate: 60  // 表示每 60 秒重新验证并可能重新生成页面
        };
        ```
      2. 某些条件时刷新: [revalidatePath(path: string, type?: 'page' | 'layout')](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)
      ```tsx
        // API端点触发
        import { revalidatePath } from 'next/cache';
        在api/对应页面的 handler 中触发
      ```
      
      3. SSG
      静态页面,有利于SEO

3. 发邮件

   1. 在 /api 文件夹下 创建与指定文件名字相同的文件
   2. 使用 nodemailer 操作

      ```tsx
      const nodemailer = require("nodemailer");

      export default (req, res) => {
        const { name, tel, companyName, position, question } = req.body;
        const transporter = nodemailer.createTransport({
          host: "smtp.ym.163.com",
          // todo 文档上为25,但阿里云默认屏蔽25端口
          port: 465,
          // secure: true,
          auth: {
            user: "邮箱",
            pass: "邮箱密码",
          },
        });

        const html = `你的HTML`;

        const mailOption = {
          from: `邮箱`,
          to: "邮箱",
          subject: `主题`,
          html,
        };

        transporter.sendMail(mailOption, (err, data) => {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .json({ success: false, message: "发送失败" });
          }
          return res.status(200).json({ success: true });
        });
      };
      ```

   3. 如果使用的为 qq 邮箱, 则

      ```tsx
      const nodemailer = require("nodemailer");
      export default (req, res) => {
        const { name, tel, companyName, position, question } = req.body;
        const transporter = nodemailer.createTransport({
          service: "qq",
          auth: {
            user: "邮箱",
            pass: "邮箱密码",
          },
        });
        const html = `你的HTML`;
        const mailOption = {
          from: `邮箱`,
          to: "邮箱",
          subject: `主题`,
          html,
        };
        transporter.sendMail(mailOption, (err, data) => {
          if (err) {
            return res
              .status(500)
              .json({ success: false, message: "发送失败" });
          }
          return res.status(200).json({ success: true });
        });
      };
      ```
