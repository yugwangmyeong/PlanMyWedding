import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Login from './components/Login.jsx';
import Community from './components/Community.jsx'; // 확장자 변경

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
          <Route path="/header" element={<Header />} />
          <Route path="/community" element={<Community />} /> {/* 커뮤니티 추가 */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;