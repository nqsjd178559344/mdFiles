1. 优势

   ```
    1. Next.js 为应用程序的开发和生产阶段提供了功能。例如：

      在开发阶段，Next.js 针对开发人员及其构建应用程序的经验进行了优化。它具有旨在改善开发人员体验的功能，例如 TypeScript 和 ESLint 集成、 快速刷新等。
      在生产阶段，Next.js 针对最终用户及其使用应用程序的体验进行了优化。它旨在转换代码以使其具有高性能和可访问性。
    2. 可服务器端渲染
   ```

2. nextjs的三种模式

      1. SSR<在服务器端生成 HTML 页面，然后发送给客户端>
          ```tsx
          getServerSideProps 
          // 返回值
          {
              props: { data } 
            };
          ```

   2. ISR<在页面构建后，根据设定的时间间隔或事件触发重新生成静态页面>
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
      
      3. SSG<在构建阶段进行页面渲染>
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
4. output:export | standalone 的区别
   1. standalone 支持 SSR 和 ISR
   2. export 
      1. 只支持 SSG
      2. 动态路由（如pages/post/[id].js），需要通过getStaticProps函数进行静态数据获取，并在构建时生成相应的静态页面。如果使用了getServerSideProps，则会在构建时发出警告，因为该模式下不支持服务器端渲染。
      <!-- 通常情况下，Next.js 会对项目中引入的图片进行自动优化。它会根据不同设备的屏幕分辨率、网络状况等因素，生成合适尺寸和格式（如 WebP、AVIF 等）的图片，以减少图片文件大小，加快页面加载速度，提升用户体验。例如，对于高清屏幕设备，Next.js 会提供更高分辨率的图片，而对于移动设备或网络较差的用户，会提供经过压缩的小尺寸图片。 -->
      3. images.unoptimized 需为 true // 禁用优化
