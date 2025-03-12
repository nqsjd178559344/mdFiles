const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.json());
// 修改静态文件服务的路径配置
app.use(express.static(path.join(__dirname)));

// 模拟AI响应生成
function generateAIResponse(message) {
  const responses = [
    "思考中...",
    "正在处理您的问题...",
    "让我想想...",
    `对于"${message}"，我的回答是...`,
    "希望这个回答对您有帮助！",
  ];
  return responses;
}

// 处理SSE响应的公共函数
function handleSSEResponse(res, responses) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let index = 0;
  const interval = setInterval(() => {
    if (index < responses.length) {
      const data = JSON.stringify({ text: responses[index] });
      // 将一条消息分成两部分发送
      const part1 = `data: ${data.substring(0, data.length / 2)}`;
      const part2 = `${data.substring(data.length / 2)}\n\n`; // \n\n表示一条 SSE 消息的结束

      res.write(part1);
      // 延迟100ms发送第二部分
      setTimeout(() => {
        res.write(part2);
      }, 100);
      index++;
    } else {
      clearInterval(interval);
      res.end();
    }
  }, 1000);

  res.on("close", () => {
    clearInterval(interval);
  });
}

// TODO 处理GET聊天消息
// app.get("/chat", (req, res) => {
//   const message = req.query.message;
//   const responses = generateAIResponse(message);

//   handleSSEResponse(res, responses);
// });

// TODO 处理POST聊天消息
app.post("/chat", (req, res) => {
  const message = req.body.message;
  const responses = generateAIResponse(message);

  handleSSEResponse(res, responses);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
