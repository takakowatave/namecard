import { Routes, Route } from "react-router-dom";
import Card from "./page/Card";
import RegisterCard from "./page/RegisterCard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<div>トップページ</div>} />
      <Route path="/cards/:id" element={<Card />} />
      <Route path="/cards/register" element={<RegisterCard />} />
    </Routes>
  );
};

export default App;
