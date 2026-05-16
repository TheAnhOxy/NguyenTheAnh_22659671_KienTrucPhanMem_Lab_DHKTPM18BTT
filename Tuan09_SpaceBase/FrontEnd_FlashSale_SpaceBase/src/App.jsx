import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

const USER_ID = "user_demo";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [services, setServices] = useState({
    pu1: false, pu2: false, pu3: false, pu4: false,
  });

  const fetchCartCount = async () => {
    try {
      const res = await axios.get(`/api/cart/${USER_ID}`);
      const items = res.data?.data?.items || [];
      setCartCount(items.reduce((s, i) => s + i.quantity, 0));
    } catch {
      setCartCount(0);
    }
  };

  const checkServices = async () => {
    const checks = await Promise.allSettled([
      axios.get("/api/products/health"),
      axios.get("/api/cart/health"),
      axios.get("/api/orders/health"),
      axios.get("/api/stock/health"),
    ]);
    setServices({
      pu1: checks[0].status === "fulfilled",
      pu2: checks[1].status === "fulfilled",
      pu3: checks[2].status === "fulfilled",
      pu4: checks[3].status === "fulfilled",
    });
  };

  useEffect(() => {
    fetchCartCount();
    checkServices();
    const timer = setInterval(fetchCartCount, 3000);
    return () => clearInterval(timer);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Service Status Bar */}
      <div className="status-bar">
        <div className="container">
          <div className="status-bar-inner">
            <span style={{ color: "#c9b8ff", fontWeight: 700 }}>⚡ Space-Based Architecture</span>
            <span className="status-item">
              <span className={`status-dot ${services.pu1 ? "" : "inactive"}`} />
              PU1 Product :8081
            </span>
            <span className="status-item">
              <span className={`status-dot ${services.pu2 ? "" : "inactive"}`} />
              PU2 Cart :8082
            </span>
            <span className="status-item">
              <span className={`status-dot ${services.pu3 ? "" : "inactive"}`} />
              PU3 Order :8083
            </span>
            <span className="status-item">
              <span className={`status-dot ${services.pu4 ? "" : "inactive"}`} />
              PU4 Inventory :8084
            </span>
            <span className="status-item">
              <span className="status-dot" />
              Data Grid (Redis) :6379
            </span>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="container navbar-inner">
          <div className="navbar-logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            ⚡ <span>Flash</span>Sale
            <span className="badge">SBA</span>
          </div>
          <div className="navbar-nav">
            <button
              id="nav-products"
              className={`nav-link ${isActive("/") ? "active" : ""}`}
              onClick={() => navigate("/")}
            >
              🛍️ Sản phẩm
            </button>
            <button
              id="nav-cart"
              className={`nav-link ${isActive("/cart") ? "active" : ""}`}
              onClick={() => navigate("/cart")}
            >
              Giỏ hàng
            </button>
            <button
              id="nav-cart-icon"
              className="cart-btn"
              onClick={() => navigate("/cart")}
            >
              🛒 Giỏ hàng
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<ProductList userId={USER_ID} onCartUpdate={fetchCartCount} />} />
        <Route path="/cart" element={<Cart userId={USER_ID} onCartUpdate={fetchCartCount} />} />
        <Route path="/checkout" element={<Checkout userId={USER_ID} onCartUpdate={fetchCartCount} />} />
      </Routes>
    </>
  );
}
