import {React, useState} from "react";
import SearchButton from "./components/searchbutton";
import Floatingmsg from './components/floatingmsg'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Mainpage from "./pages/mainpage";


function App() {
  const [login ,setlogin] = useState(0)
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element = {<SearchButton/>} path = "/search" />
          <Route element = {login ? <SearchButton/> :<Mainpage/>} path = "/" />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
