import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import SlidePage from './pages/SlidePage';
import Homepage from './pages/Homepage';
import ProtectedRoute from './components/ProtectedRoute';
import { createGlobalStyle } from 'styled-components';
import MainHeader from './components/PublicHeader';
import '@fontsource/poppins';
import '@fontsource/roboto';
import PreviewPage from './pages/PreviewPage';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  // When the window is opened, if local storage is not empty, get token.
  React.useEffect(() => {
    if (localStorage.getItem('token') != null) {
      setToken(localStorage.getItem('token'));
    }
  }, []);
  
  return (
    <BrowserRouter>
      <GlobalStyle />
      {!token ? (
        <>
          <MainHeader/>
        </>
      ) : (
        <ProtectedRoute token={token} />
      )}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register setTokenFn={setToken}/>} />
        <Route path="/login" element={<Login setTokenFn={setToken}/>} />
        <Route path="/:id/edit/:slideNumber" element={<SlidePage token={token} setTokenFn={setToken}/>} />
        <Route path="/:id/preview/:slideNumber" element={<PreviewPage token={token}/>} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute token={token} childPage={<Dashboard token={token} setTokenFn={setToken}/>} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App
