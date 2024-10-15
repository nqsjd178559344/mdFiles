const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// 静态文件服务
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

http.listen(3000, () => {
  console.log("Server is running on port 3000");
});
