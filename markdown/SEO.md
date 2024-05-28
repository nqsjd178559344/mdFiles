### [相关知识网站](https://github.com/topics/seo)
1. [htmlhead](https://htmlhead.dev/)
2. [next-seo](https://github.com/garmeeh/next-seo)
   1. 优点: 支持rebot 与 sitemap
   
### 关键属性

   ```tsx
   <meta data-rh="true" name="applicable-device" content="pc, mobile" />
   // 适用于网页引用了大量其他域名的资源，例如电商网站
   <meta http-equiv="x-dns-prefetch-control" content="on" />
   // 重定向
   <link rel="canonical" href={process.env['url']}/>
   <title>{process.env['title']}</title>
   <meta content={process.env['keywords']} name="keywords" />
   <meta name="description" content={process.env['description']}/>
   <meta name="robots" content="index,follow" />
   <meta name="googlebot" content="index,follow" />
   ```