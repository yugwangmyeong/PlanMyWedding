import './App.css';
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Calender from "./components/Calender.jsx";
import Mainpage from "./components/Mainpage";
import MoneyControl from "./components/Moneycontrol";
import RecWedding from "./components/RecommendPage/RecWedding";
import Register from './components/Register';
import Community from './components/Community';
import CommunityWrite from './components/CommunityWrite';
import CommunityPost from './components/CommunityPost';
import Setting from './components/Setting';
import Member from "./components/Member"; // ✅ 컴포넌트가 있어야 함

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
              
                <div className="fix">
                  <Mainpage />
                </div>
              
            }
          />

          {
            <Route
              path="/calender"
              element={<Calender />}
            />
          }
          
          {
            <Route
              path="/moneycontrol"
              element={<MoneyControl />}
            />
          }

          {
            <Route
              path="/recwedding"
              element={<RecWedding />}
            />
          }

          {
            <Route
            path="/setting"
            element={isLoggedIn ? <Setting /> : <Navigate to="/login" />}
          />
          }

          {
            <Route
            path="/member"
            element={isLoggedIn ? <Member /> : <Navigate to="/login" />}
          />
          }
          
        <Route path="/header" element={<Header />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/setting" element={<Setting />} />
        <Route path="/register" element={<Register />}/>
        <Route path="/community" element={<Community />} />
        <Route path="/community/write" element={<CommunityWrite />} />
        <Route path="/community/post/:postId" element={<CommunityPost />} />
      </Routes>
    </div>
  </BrowserRouter>

  );
}

export default App;
