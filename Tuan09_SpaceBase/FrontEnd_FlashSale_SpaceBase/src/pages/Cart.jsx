import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Cart({ userId, onCartUpdate }) {
  const navigate = useNavigate();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`/api/cart/${userId}`);
      setCart(res.data.data || { items: [] });
    } catch {
      toast.error("Không thể kết nối PU2 – Cart Service");
    } finally {
      setLoading(false);
    }
  };

  const updateQty = async (productId, quantity) => {
    try {
      await axios.put("/api/cart/update", { userId, productId, quantity });
      fetchCart();
      onCartUpdate();
    } catch (err) {
      toast.error(err.response?.data?.message || "Lỗi cập nhật");
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`/api/cart/${userId}`);
      setCart({ items: [] });
      onCartUpdate();
      toast.success("Đã xóa giỏ hàng");
    } catch {
      toast.error("Lỗi xóa giỏ");
    }
  };

  const total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);

  if (loading) {
    return (
      <div className="container loading-screen">
        <div className="spinner" />
        <p className="loading-text">Đang lấy giỏ hàng từ Data Grid...</p>
      </div>
    );
  }

  if (!cart.items.length) {
    return (
      <div className="container">
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <div className="empty-title">Giỏ hàng đang trống</div>
          <div className="empty-subtitle">Dữ liệu giỏ hàng lưu trong Data Grid (Redis)</div>
          <button className="btn-back" onClick={() => navigate("/")}>
            ← Tiếp tục mua sắm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Giỏ hàng <span>của bạn</span></h1>
        <p className="page-subtitle">
          📡 Dữ liệu từ PU2 – Cart Service (Data Grid Redis) · {itemCount} sản phẩm
        </p>
      </div>

      <div className="arch-info">
        <span className="arch-icon">📦</span>
        <div className="arch-text">
          <strong>PU2 – Cart Processing Unit (:8082)</strong>: Giỏ hàng lưu trong Redis với TTL 1h.
          Không cần database — đọc/ghi trực tiếp Data Grid.
        </div>
      </div>

      <div className="cart-layout">
        {/* Items */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontWeight: 700 }}>{cart.items.length} sản phẩm</span>
            <button
              style={{ background: "none", border: "1px solid rgba(233,69,96,0.3)", color: "#e94560", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: "0.8rem", fontFamily: "inherit" }}
              onClick={clearCart}
            >
              🗑️ Xóa tất cả
            </button>
          </div>
          <div className="cart-items">
            {cart.items.map((item) => (
              <div className="cart-item" key={item.productId}>
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">{item.price.toLocaleString("vi-VN")}₫</div>
                  <div className="cart-item-controls">
                    <button
                      id={`btn-dec-${item.productId}`}
                      className="qty-btn"
                      onClick={() => updateQty(item.productId, item.quantity - 1)}
                    >−</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      id={`btn-inc-${item.productId}`}
                      className="qty-btn"
                      onClick={() => updateQty(item.productId, item.quantity + 1)}
                    >+</button>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                  <div className="cart-item-total">
                    {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                  </div>
                  <button
                    className="btn-remove"
                    onClick={() => updateQty(item.productId, 0)}
                  >🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="order-summary">
          <div className="summary-title">📋 Tóm tắt đơn hàng</div>
          <div className="summary-row">
            <span>Tạm tính ({itemCount} sp)</span>
            <span>{total.toLocaleString("vi-VN")}₫</span>
          </div>
          <div className="summary-row">
            <span>Phí vận chuyển</span>
            <span className="text-success">Miễn phí</span>
          </div>
          <div className="summary-divider" />
          <div className="summary-row">
            <span className="fw-800">Tổng cộng</span>
            <span className="summary-total">{total.toLocaleString("vi-VN")}₫</span>
          </div>
          <button
            id="btn-checkout"
            className="btn-checkout"
            onClick={() => navigate("/checkout")}
          >
            ⚡ Đặt hàng ngay
          </button>
          <div style={{ textAlign: "center", marginTop: 12, fontSize: "0.75rem", color: "#9090a8" }}>
            🔒 Xử lý qua PU3 · Không chờ DB
          </div>
        </div>
      </div>
    </div>
  );
}
