
import { Button } from "@chakra-ui/react";
import { Routes, Route, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { supabase } from "./utils/supabaseClient";
import { Card } from "./components/Card";


const App = () => {
  const { id } = useParams(); // id = "sample-id"
  const [user, setUser] = useState(null);

  useEffect(() => {
  const fetchData = async () => {
  // userテーブルの中からidが一致するものを一つだけ選ぶ
  const result = await supabase.from("Users").select("*").eq("id", id).single();
  const { data, error } = result; //取得した結果をdataとエラーに分ける
    
  console.log(error); //エラーの条件分岐
  if (error) {
    console.log(error);
    return;
  } 
    setUser(data); //取得したデータをuserに保存する
  };
    fetchData(); //作った関数を実行
  }, [id]); //第二引数にidを指定（idが変わったときだけuseEffectを再実行する）
    return (
    <Routes>
      <Route path="/cards/:id" element={<Card user={user} />} />
    </Routes>)
};

export default App;
