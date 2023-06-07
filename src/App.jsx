import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Contact from "./pages/Contact";
import ComparePr from "./pages/ComparePr";
import WishList from "./pages/WishList";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ResetPass from "./pages/ResetPass";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import ToS from "./pages/ToS";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import ProtectedRoute from "./routes/ProtectedRoute";
import OpenRoute from "./routes/OpenRoute"
import CheckOut from "./pages/CheckOut";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Sstore from "./pages/Sstore";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/checkout" element={<ProtectedRoute><CheckOut /></ProtectedRoute>} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="store" element={<Store />} />
            <Route path="store/:id" element={<Sstore />} />
            <Route path="contact" element={<Contact />} />
            <Route path="compare" element={<ProtectedRoute><ComparePr /></ProtectedRoute>} />
            <Route path="wish" element={<ProtectedRoute><WishList /></ProtectedRoute>} />
            <Route path="login" element={<OpenRoute><Login /></OpenRoute>} />
            <Route path="signup" element={<OpenRoute><SignUp /></OpenRoute>} />
            <Route path="cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="reset-password" element={<ResetPass />} />
            <Route path="product-page/:id" element={<Product />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="shipping-policy" element={<ShippingPolicy />} />
            <Route path="refund-policy" element={<RefundPolicy />} />
            <Route path="tos" element={<ToS />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
