import { Routes, Route } from "react-router-dom";
import Card from "./components/Card";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<div>トップページ</div>} />
      <Route path="/cards/:id" element={<Card />} />
    </Routes>
  );
};

export default App;
