import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Schedule from "./components/styles/Schedule";

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

          <Route
            path="/header"
            element={isLoggedIn ? <Header /> : <Navigate to="/" />}
          />

          <Route
            path="/schedule"
            element={isLoggedIn ? <Schedule /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
