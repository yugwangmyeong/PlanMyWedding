// App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Member from "./components/Member"; // ✅ 컴포넌트가 있어야 함
import Header from './components/Header';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* 기존 라우트 */}
          <Route path="/" element={<Login />} />
          <Route path="/header" element={<Header />} />

          {/* ✅ 추가된 WeddingHall 경로 */}
          <Route path="/member" element={<Member />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
