import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authentication from './components/authentication';
import Main from './components/main';
import Header from './layouts/header';
import Champion from './leagueOfLegend/champion';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/'element={<Main/>}></Route>
        <Route path='/authentication'element={<Authentication/>}></Route>
        <Route path='/'element={<Main/>}></Route>
      </Routes>
      {/* <Champion/> */}
    </div>
  );
}

export default App;
