import { Button } from "@chakra-ui/react";
import { Routes, Route, useParams } from "react-router-dom";


function Card() {
  const { id } = useParams();
  return <div>{id}</div>;
}

function App() {
  return (
    <Routes>
      <Route path="/cards/:id" element={<Card />} />
    </Routes>
  );
}

export default App;