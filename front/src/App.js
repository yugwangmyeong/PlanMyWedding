import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Schedule from "./components/Schedule";
import Moneycontrol from "../src/components/Moneycontrol/Moneycontrol";
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
              <Login />
            </div>
          }
        />
        <Route path="/header" element={<Header />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
