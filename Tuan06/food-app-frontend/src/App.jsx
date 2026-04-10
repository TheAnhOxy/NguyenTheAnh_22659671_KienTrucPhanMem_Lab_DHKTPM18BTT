import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import AdminLogs from "./pages/AdminLogs";
import Navbar from "./components/Navbar";
import AdminFoods from "./pages/AdminFoods";
import Register from "./pages/Register";

function App() {
  const role = localStorage.getItem("role");

  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin/logs" element={<AdminLogs />} />
          <Route path="/register" element={<Register />} />
          {/* Bảo vệ route Admin: Chỉ cho vào nếu là ADMIN */}
          {role === "ADMIN" && (
            <Route path="/admin/foods" element={<AdminFoods />} />
          )}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
