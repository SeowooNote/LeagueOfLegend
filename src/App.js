import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./components/main";
import Header from "./layouts/header";
import Champion from "./leagueOfLegendAPI/champion";
import Items from "./components/items";
import MyPage from "./components/myPage/myPage";
import { useState } from "react";

function App() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="App">
      <Header showPopup={showPopup} setShowPopup={setShowPopup} />
      <Routes>
        <Route path="/" element={<Main showPopup={showPopup} setShowPopup={setShowPopup} />}></Route>
        <Route path="/champion" element={<Champion />}></Route>
        <Route path="/items" element={<Items />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
