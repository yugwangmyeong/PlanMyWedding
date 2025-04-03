import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Schedule from "./components/Schedule";
import Moneycontrol from "../src/components/Moneycontrol/Moneycontrol";
import Mainpage from "./components/Mainpage/Mainpage";
import Community from "./components/Community";
function App() {
  const [token, setToken] = useState(localStorage.getItem("token")); // ✅ 상태 생성

  const isLoggedIn = !!token;
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <div className="App-header">
                <Login setToken={setToken} />
              </div>
            }
          />
          <Route path="/mainpage" element={<Mainpage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/moneycontrol" element={<Moneycontrol/>} />
          <Route path="/schedule" element={<Schedule/>} />
          <Route path="/community" element={<Community/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
