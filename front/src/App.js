import "./App.css";
import Register from "./components/Register";
import Community from "./components/Community";
import CommunityWrite from "./components/CommunityWrite";
import CommunityPost from "./components/CommunityPost";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Schedule from "./components/Schedule";
import Mainpage from "./components/Mainpage";
import MoneyControl from "./components/Moneycontrol";
import RecWedding from "./components/RecommendPage/RecWedding";

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
            element={
              isLoggedIn ? (
                <div className="fix">
                  <Mainpage />
                </div>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          {
            <Route
              path="/schedule"
              element={isLoggedIn ? <Schedule /> : <Navigate to="/" />}
            />
          }

          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/write" element={<CommunityWrite />} />
          <Route path="/community/post/:postId" element={<CommunityPost />} />
          <Route path="recwedding" element={<RecWedding />} />
          <Route path="moneycontrol" element={<MoneyControl/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
