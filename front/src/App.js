import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Community from "./components/Community";
import Hall from "./components/Community/Hall";
import Dress from "./components/Community/Dress";
import Makeup from "./components/Community/Makeup";
import Studio from "./components/Community/Studio";
import Honeymoon from "./components/Community/Honeymoon";
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

function App() {
  const [token, setToken] = useState(null);
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
          {<Route path="/calender" element={<Calender />} />}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/hall" element={<Hall />} />
          <Route path="/community/dress" element={<Dress />} />
          <Route path="/community/makeup" element={<Makeup />} />
          <Route path="/community/studio" element={<Studio />} />
          <Route path="/community/honeymoon" element={<Honeymoon />} />
          <Route path="/community/write" element={<CommunityWrite />} />
          <Route path="/community/post/:postId" element={<CommunityPost />} />
          <Route path="recwedding" element={<RecWedding />} />
          <Route path="moneycontrol" element={<MoneyControl />} />
          <Route path="calendar" element={<Calender />} />
          <Route path="setting" element={<Setting />} />
          <Route path="member" element={<Member />} />
          <Route path="/setting" element={<SettingLayout />}>
            <Route index element={<Setting />} />
            <Route path="member" element={<Member />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
