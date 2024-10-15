const express = require("express");
const app = express();
const http = require("http");

// 创建 HTTP 服务器并将 Express 应用挂载到该服务器上
// createServer 接受一个回调函数作为参数，这个回调函数会在服务器接收到 HTTP 请求时被调用
const server = http.createServer(app);
const io = require("socket.io")(server);

// 将当前目录设置为静态文件服务的根目录: 当客户端请求静态文件（如 HTML、CSS、JavaScript 文件、图片等）时，如果请求的路径与当前目录下的文件路径匹配，Express 会自动提供这些文件。
app.use(express.static(__dirname));

// 监听文件修改
const fs = require("fs");
const path = require("path");

fs.watchFile(path.join(__dirname, "main.js"), (curr, prev) => {
  if (curr.mtime > prev.mtime) {
    // 读取修改后的文件内容
    fs.readFile(path.join(__dirname, "main.js"), (err, data) => {
      if (err) {
        console.error("Error reading updated file:", err);
        return;
      }

      // 通过 Socket.IO 向客户端发送更新通知
      io.emit("reload", { file: "main.js", content: data.toString() });
    });
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
