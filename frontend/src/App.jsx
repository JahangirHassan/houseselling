import './App.css'
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
// import HouseList from "./components/HouseList";
import HouseDetails from "./components/HouseDetails";
import Footer from "./components/Footer";
import CreateListing from "./components/CreateListing";
import EditHouse from "./components/EditHouse";
import Cart from "./components/Cart";
import AdminPanel from './components/AdminPanel';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from './context/AuthContext';
import MyListings from './components/MyListings';
import AboutPage from './components/AboutPage';
import HomePage from './components/HomePage';
import MyAdmin from './components/MyAdmin';
import SideBar from './components/SideBaar';
import GetAllusers from './components/GetAllusers';
import PrivateRoute from './context/Protected';
import HouseList from './components/HouseList';


import { useEffect } from 'react';

function LayoutWrapper() {
  const location = useLocation();
  const layoutAPaths = ['/listings','/admin','/users','/listing',];
  const layoutBPaths = ['/','/login', '/signup','/about','/listing' , '/house', '/edit-house', '/cart', ];

  const currentPath = location.pathname;

  const useLayoutA = layoutAPaths.some(path => currentPath.startsWith(path));
  const useLayoutB = layoutBPaths.some(path => currentPath.startsWith(path));

  const NavbarComponent = useLayoutA ? SideBar : Navbar;
  const FooterComponent = useLayoutA ? null : useLayoutB ? Footer : null;


  return (
    <div className="min-h-screen flex flex-col">
      {NavbarComponent && <NavbarComponent />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listings" element={<PrivateRoute><MyListings /></PrivateRoute>} />
        <Route path="/house/:id" element={<PrivateRoute><HouseDetails /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/listing" element={<PrivateRoute><CreateListing /></PrivateRoute>} />
        <Route path="/edit-house/:id" element={<PrivateRoute><EditHouse /></PrivateRoute>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/house" element={<HouseList />} />
        <Route path="/admin" element={<PrivateRoute><MyAdmin /></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute><GetAllusers /></PrivateRoute>} />
      </Routes>
      {FooterComponent && <FooterComponent />}
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <Router>
          <LayoutWrapper />
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
