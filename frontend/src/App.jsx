import './App.css'
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import HouseList from "./components/HouseList";
import HouseDetails from "./components/HouseDetails";
import Footer from "./components/Footer";
import CreateListing from "./components/CreateListing";
import EditHouse from "./components/EditHouse";
import Cart from "./components/Cart";
import AdminPanel from './components/AdminPanel';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from './context/AuthContext';
import MyListings from './components/MyListings';

function App() {
  return (
    <>
      <CartProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <Routes>
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/" element={<HouseList />} />
                <Route path="/my-listings" element={<MyListings />} />
                <Route path="/house/:id" element={<HouseDetails />} />
                <Route path="/login" element={<Login />} /> {/* Add this */}
                <Route path="/signup" element={<SignUp />} /> {/* Add this */}
                <Route path="/listing" element={<CreateListing />} /> {/* Add this */}
                <Route path="/edit-house/:id" element={<EditHouse />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </CartProvider>
    </>
  )
}

export default App
