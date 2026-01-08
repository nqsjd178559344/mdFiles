import { useEffect } from "react";
import microApp from "@micro-zoe/micro-app";

const subAppName = "vue-sub-app";

const SubAppContainer = () => {
  // 基座向子应用发送消息
  useEffect(() => {
    const timer = setTimeout(() => {
      // microApp.dispatch(subAppName, {
      //   type: "from-base",
      //   data: "React 基座（Vite）传递的消息",
      // });
      // 发送数据给子应用 my-app，setData第二个参数只接受对象类型
      microApp.setData(subAppName, {
        type: "from-base",
        data: "React 基座（Vite）传递的消息",
      });
    }, 1000);

    // 监听子应用消息
    const handleMessage = (data: any) => {
      console.log("基座收到:", data);
    };
    microApp.addDataListener(subAppName, handleMessage);

    return () => {
      clearTimeout(timer);
      microApp.removeDataListener(subAppName, handleMessage); // 移除监听
    };
  }, []);

  return (
    <div>
      <h2>React 基座（Vite）</h2>
      {/* 嵌入 Vue 子应用 */}
      <micro-app
        name={subAppName}
        baseroute="/sub-vue"
        url="http://localhost:8080/"
        iframe
        onCreated={() => console.log("子应用创建")}
        onMounted={() => console.log("子应用挂载")}
      />
    </div>
  );
};

export default SubAppContainer;
