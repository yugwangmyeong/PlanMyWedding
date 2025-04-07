import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";

function App() {
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

          <Route
            path="/header"
            element={isLoggedIn ? <Header /> : <Navigate to="/" />}
          />

          {/* <Route
            path="/schedule"
            element={isLoggedIn ? <Schedule /> : <Navigate to="/" />}
          /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
