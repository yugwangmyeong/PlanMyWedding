import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Schedule from "./components/Schedule";
<<<<<<< HEAD
import Moneycontrol from "./components/Moneycontrol";
=======
import Moneycontrol from "../src/components/Moneycontrol/Moneycontrol";
>>>>>>> 18f7682a14c29f663e45ca958bfabf806bf6cd91
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
            element={isLoggedIn ? <div className="fix"><Header /></div> : <Navigate to="/" />}
          />

          { <Route
            path="/schedule"
            element={isLoggedIn ? <Schedule /> : <Navigate to="/" />}
          /> }

          { <Route
            path="/moneycontrol"
            element={isLoggedIn ? <Moneycontrol /> : <Navigate to="/" />}
          /> }

         
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
