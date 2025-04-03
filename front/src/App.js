import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Schedule from "./components/Schedule";
import Mainpage from "./components/Mainpage";
import MoneyControl from "./components/Moneycontrol";
function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const isLoggedIn = !!token;

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={
              <div className="App-header">
                <Login setToken={setToken} />
              </div>
            }
          />
          <Route
            path="/mainpage"
            element={isLoggedIn ? <div className="fix"><Mainpage /></div> : <Navigate to="/" />}
          />

          { <Route
            path="/schedule"
            element={isLoggedIn ? <Schedule /> : <Navigate to="/" />}
          /> }

          { <Route
            path="/moneycontrol"
            element={isLoggedIn ? <MoneyControl /> : <Navigate to="/" />}
          /> }

         
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;