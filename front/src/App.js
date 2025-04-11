<<<<<<< HEAD
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Login from './components/Login.jsx';
import Community from './components/Community.jsx';
import Community_write from './components/Community_write.jsx'; // 커뮤니티 글쓰기 추가
=======
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Community from "./components/Community";
import CommunityWrite from "./components/CommunityWrite";
import CommunityPost from "./components/CommunityPost";
import Login from "./components/Login";
import Mainpage from "./components/Mainpage";
import MoneyControl from "./components/Moneycontrol";
import RecWedding from "./components/RecommendPage/RecWedding";
import Calender from "./components/Schedule/Calender";
import Member from "./components/Member/Member";
import Setting from "./components/Member/Setting";
import SettingLayout from "./components/Member/SettingLayout";
>>>>>>> origin/main

function App() {
  const [token, setToken] = useState(null);
  const isLoggedIn = !!token;
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
<<<<<<< HEAD
            path="/"
            element={
              <div className="App-header">
                <Login />
              </div>
            }
          />
          <Route path="/header" element={<Header />} />
          <Route path="/community" element={<Community />} /> {/* 커뮤니티 추가 */}
          <Route path="/community_write" element={<Community_write />} /> {/* 커뮤니티 글쓰기 추가 */}
=======
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
          {<Route path="/calender" element={<Calender />} />}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/write" element={<CommunityWrite />} />
          <Route path="/community/:postId" element={<CommunityPost />} />
          <Route path="recwedding" element={<RecWedding />} />
          <Route path="moneycontrol" element={<MoneyControl />} />
          <Route path="calendar" element={<Calender />} />
          <Route path="setting" element={<Setting />} />
          <Route path="member" element={<Member />} />
          <Route path="/setting" element={<SettingLayout />}>
            <Route index element={<Setting />} />
            <Route path="member" element={<Member />} />
          </Route>
>>>>>>> origin/main
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
