1. getStaticPaths / getStaticProps / getServerSideProps
2. 发邮件

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
         return res.status(500).json({ success: false, message: "发送失败" });
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
         return res.status(500).json({ success: false, message: "发送失败" });
       }
       return res.status(200).json({ success: true });
     });
   };
   ```
