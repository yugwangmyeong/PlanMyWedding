import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Calender from './components/Calender'; // ✅ 캘린더 컴포넌트 import 추가

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* 기본 경로 → 로그인 */}
          <Route
            path="/"
            element={
              <div className="App-header">
                <Login />
              </div>
            }
          />

          {/* Header 컴포넌트 라우트 */}
          <Route path="/header" element={<Header />} />

          {/* ✅ Calender 컴포넌트 라우트 추가 */}
          <Route path="/calender" element={<Calender />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;