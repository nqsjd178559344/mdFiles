import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import SubAppContainer from "./pages/SubAppContainer";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sub-vue" element={<SubAppContainer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
