import {React, useState} from "react";
import SearchButton from "./components/searchbutton";
import Floatingmsg from './components/floatingmsg'
import "./App.css"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Mainpage from "./pages/mainpage";
import Header from "./components/header"


function App() {
  const [login ,setlogin] = useState(0)
  return (
    <BrowserRouter>
      <div className="App">
      <div className="emptydiv"></div>
        <header>
          <Header/>
        </header>
        <Routes>
          <Route element = {<SearchButton/>} path = "/search" />
          <Route element = {login ? <SearchButton/> :<Mainpage/>} path = "/" />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
