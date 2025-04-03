import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Community from './components/Community';
import CommunityWrite from './components/CommunityWrite';
import CommunityPost from './components/CommunityPost';


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
        <Route path="/header" element={<Header />}/>
        <Route path="/login" element={<Login />}/>
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
