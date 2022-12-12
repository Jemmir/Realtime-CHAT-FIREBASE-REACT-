

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { HomeMiddleware, LoginRegisterMiddleware } from './middlewares/middlewares';
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeMiddleware><Home /></HomeMiddleware>} />
          <Route path="/register" element={<LoginRegisterMiddleware><Register /></LoginRegisterMiddleware>} />
          <Route path="/login" element={<LoginRegisterMiddleware><Login /></LoginRegisterMiddleware>} />
          <Route parh="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
