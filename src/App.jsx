import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ListingDetail from './pages/ListingDetail';
import Bookings from './pages/Bookings';

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));
  const location = useLocation();

  useEffect(() => {
    setIsAuth(!!localStorage.getItem('token'));
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={isAuth ? <Home /> : <Navigate to="/register" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/listings/:id" element={isAuth ? <ListingDetail /> : <Navigate to="/register" />} />
      <Route path="/bookings" element={isAuth ? <Bookings /> : <Navigate to="/register" />} />
      <Route path="*" element={<Navigate to="/register" />} />
    </Routes>
  );
}

export default App;
