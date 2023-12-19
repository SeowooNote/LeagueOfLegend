import { Route, Routes, json } from "react-router-dom";
import "./App.css";
import Main from "./components/main";
import Header from "./layouts/header";
import Champion from "./leagueOfLegendAPI/champion";
import Items from "./components/items";
import MyPage from "./components/myPage/myPage";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  // onAuthStateChanged((user) => {
  //   if(user) {
  //     localStorage.setItem(
  //       'user',
  //       JSON.stringify({
  //         uid: user.uuid,
  //         displayName: user.nickname,
  //         email: user.email,
  //         // profileImage: profileImage,
  //         // backgroundImage: backgroundImage
  //       })
  //     )
  //   }
  // })

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/champion" element={<Champion />}></Route>
        <Route path="/items" element={<Items />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
