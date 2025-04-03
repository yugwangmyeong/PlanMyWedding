import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Calender from './components/Calender'; // ✅ 캘린더 import 추가

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
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
          <Route path="/header" element={<Header />} />
          <Route path="/calender" element={<Calender />} /> {/* ✅ 요게 핵심! */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;