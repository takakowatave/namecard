import { Routes, Route } from "react-router-dom";
import Card from "../pages/Card";
import RegisterCard from "../pages/RegisterCard";
import Top from "../pages/Top";


const Router = () => (
    <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/cards/:id" element={<Card />} />
        <Route path="/cards/register" element={<RegisterCard />} />
    </Routes>
);

export default Router;
