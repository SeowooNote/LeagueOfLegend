import { Route, Routes } from "react-router-dom";
import "./App.css";
import Authentication from "./components/authentication";
import Main from "./components/main";
import Header from "./layouts/header";
import Champion from "./leagueOfLegendAPI/champion";
import Items from "./components/items";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/champion" element={<Champion />}></Route>
        <Route path="/items" element={<Items />}></Route>
      </Routes>
    </div>
  );
}

export default App;
