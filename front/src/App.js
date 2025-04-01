import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import SignUp from './components/SignUp';



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
        <Route path="/signup" element={<SignUp />}/>
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
