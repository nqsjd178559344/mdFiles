import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  // 示例：展示基座应用的基本信息
  const [appInfo, setAppInfo] = useState({
    name: "React 基座应用（Vite + Monorepo）",
    status: "运行中",
    subApps: ["Vue 子应用"],
  });

  // 模拟基座初始化逻辑（如检查子应用状态）
  useEffect(() => {
    console.log("基座首页初始化");
    // 实际场景中可在这里加载全局配置、用户信息等
  }, []);

  return (
    <div className="home-container">
      {/* 基座标题与信息 */}
      <header className="text-black">
        <h1>{appInfo.name}</h1>
        <p>
          状态：<span>{appInfo.status}</span>
        </p>
        <p>当前集成子应用：{appInfo.subApps.join("、")}</p>
      </header>

      {/* 导航区域：跳转到子应用 */}
      <nav className="nav-links">
        <h3>子应用入口</h3>
        <Link to="/sub-vue" className="link-button">
          进入 Vue 子应用
        </Link>
        {/* 未来新增子应用可在此添加更多链接 */}
      </nav>

      {/* 基座自身功能区（可选） */}
      <section className="base-features">
        <h3>基座功能区</h3>
        <p>这里可以放置基座独有的功能，如全局设置、用户中心等。</p>
        <button
          onClick={() => alert("这是基座的全局按钮")}
          className="base-button"
        >
          基座全局操作
        </button>
      </section>

      <style>{`
        .home-container {
          max-width: 1000px;
          margin: 2rem auto;
          padding: 0 1rem;
          font-family: sans-serif;
        }
        header {
          padding: 2rem;
          color: #000;
          background: #f5f5f5;
          border-radius: 8px;
          margin-bottom: 2rem;
        }
        .status {
          color: #2196f3;
          font-weight: bold;
        }
        .nav-links {
          margin: 2rem 0;
          padding: 1rem;
          border: 1px solid #eee;
          border-radius: 8px;
        }
        .link-button {
          display: inline-block;
          margin: 0.5rem 0;
          padding: 0.8rem 1.5rem;
          background: #2196f3;
          color: white;
          text-decoration: none;
          border-radius: 4px;
          transition: background 0.3s;
        }
        .link-button:hover {
          background: #0b7dda;
        }
        .base-features {
          padding: 1rem;
          border: 1px dashed #ccc;
          border-radius: 8px;
        }
        .base-button {
          margin-top: 1rem;
          padding: 0.6rem 1.2rem;
          background: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .base-button:hover {
          background: #3d8b40;
        }
      `}</style>
    </div>
  );
};

export default Home;
