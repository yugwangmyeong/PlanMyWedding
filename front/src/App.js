import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
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
import Community from "./components/Community.jsx";
import FindId from "./components/FindId.jsx";
import FindPassword from "./components/FindPassword.jsx";
import BbbbFrame from "./components/BbbbFrame.jsx";

function App() {
  const [token, setToken] = useState(null);
  const isLoggedIn = !!token;
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          
         
          {<Route path="/login" element=
          {
            <div className="App-header">
              <Login setToken={setToken} />
            </div>
          }
          />}
          <Route
            path="/mainpage"
            element={
              <div className="fix">
                <Mainpage />
              </div>
            }
          />
          {<Route path="/calender" element={<Calender />} />}
          {<Route path="/calender" element={<Calender />} />}
          <Route path="/login" element={<Login />} />

            {/*아이디 비밀번호 찾기*/}
          <Route path="/find-id" element={<FindId />} />
          <Route path="/find-password" element={<FindPassword />} />


          <Route path="/register" element={<Register />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/write" element={<CommunityWrite />} />

      
          <Route path="/community/post/:postId" element={<CommunityPost />} />
          <Route path="/community/update/:id" element={<CommunityWrite />} />

          <Route path="recwedding" element={<RecWedding />} />
          <Route path="moneycontrol" element={<MoneyControl />} />
          <Route path="calendar" element={<Calender />} />

          <Route path="/setting" element={<SettingLayout />}>
            <Route index element={<Setting />} />
            <Route path="member" element={<Member />} />
            
          </Route>
          <Route path="/Bbbb" element={<BbbbFrame/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
