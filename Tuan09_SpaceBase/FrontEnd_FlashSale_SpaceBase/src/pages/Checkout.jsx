import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Checkout({ userId, onCartUpdate }) {
  const navigate = useNavigate();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`/api/cart/${userId}`);
      setCart(res.data.data || { items: [] });
    } catch {
      toast.error("Lỗi kết nối PU2 – Cart Service");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setSubmitting(true);
    try {
      const res = await axios.post("/api/checkout", {
        userId,
        ...form,
      });

      setOrder(res.data.data);
      onCartUpdate();
      toast.success("🎉 Đặt hàng thành công!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Lỗi đặt hàng");
    } finally {
      setSubmitting(false);
    }
  };

  const total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (loading) {
    return (
      <div className="container loading-screen">
        <div className="spinner" />
        <p className="loading-text">Đang tải...</p>
      </div>
    );
  }

  if (cart.items.length === 0 && !order) {
    return (
      <div className="container">
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <div className="empty-title">Giỏ hàng trống</div>
          <div className="empty-subtitle">Thêm sản phẩm trước khi đặt hàng</div>
          <button className="btn-back" onClick={() => navigate("/")}>
            ← Mua sắm ngay
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Success Modal */}
      {order && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-icon">🎉</div>
            <h2 className="modal-title">Đặt hàng thành công!</h2>
            <p className="modal-subtitle">
              Đơn hàng đã được xử lý qua Data Grid — không chờ DB
            </p>
            <div className="modal-detail">
              {[
                { label: "Mã đơn", value: order.orderId?.slice(0, 8).toUpperCase() },
                { label: "Khách hàng", value: order.customerName },
                { label: "Tổng tiền", value: `${order.totalAmount?.toLocaleString("vi-VN")}₫` },
                { label: "Thời gian xử lý", value: order.processingTime },
                { label: "Nguồn dữ liệu", value: "Data Grid (Redis) ✅" },
                { label: "DB queries", value: "0 – Không cần DB 🚀" },
              ].map(({ label, value }) => (
                <div className="modal-detail-row" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
            <button
              id="btn-continue-shopping"
              className="modal-btn"
              onClick={() => navigate("/")}
            >
              ← Tiếp tục mua sắm
            </button>
          </div>
        </div>
      )}

      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Thanh toán <span>đơn hàng</span></h1>
          <p className="page-subtitle">
            ⚡ PU3 – Order Service (:8083) · PU4 – Inventory Service (:8084)
          </p>
        </div>

        <div className="arch-info">
          <span className="arch-icon">⚡</span>
          <div className="arch-text">
            <strong>Luồng checkout (Space-Based)</strong>: PU3 lấy cart từ Redis → Gọi PU4 giảm
            stock trên Redis (DECRBY atomic) → Tạo order trong Redis → Xóa cart.{" "}
            <strong>Hoàn tất không qua DB, latency &lt; 5ms.</strong>
          </div>
        </div>

        <div className="checkout-layout">
          {/* Form */}
          <form className="form-card" onSubmit={handleCheckout}>
            <div className="form-title">📦 Thông tin nhận hàng</div>
            <div className="form-group">
              <label className="form-label">Họ và tên *</label>
              <input
                id="input-name"
                className="form-input"
                type="text"
                name="name"
                placeholder="Nguyễn Văn A"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Số điện thoại *</label>
              <input
                id="input-phone"
                className="form-input"
                type="tel"
                name="phone"
                placeholder="0912 345 678"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Địa chỉ giao hàng *</label>
              <input
                id="input-address"
                className="form-input"
                type="text"
                name="address"
                placeholder="123 Nguyễn Trãi, Q1, TP.HCM"
                value={form.address}
                onChange={handleChange}
              />
            </div>

            <div className="summary-divider" />
            <div style={{ fontSize: "0.8rem", color: "#9090a8", marginBottom: 16 }}>
              🏗️ Xử lý bởi: <strong style={{ color: "#c9b8ff" }}>PU3 (Order) + PU4 (Inventory)</strong>
              <br />📦 Dữ liệu: <strong style={{ color: "#c9b8ff" }}>Data Grid (Redis) — Không cần DB</strong>
            </div>

            <button
              id="btn-place-order"
              type="submit"
              className="btn-checkout"
              disabled={submitting}
            >
              {submitting ? "⏳ Đang xử lý..." : "⚡ Xác nhận đặt hàng"}
            </button>
          </form>

          {/* Order Summary */}
          <div className="order-summary">
            <div className="summary-title">🧾 Đơn hàng của bạn</div>
            {cart.items.map((item) => (
              <div className="summary-row" key={item.productId}>
                <span style={{ maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.name} × {item.quantity}
                </span>
                <span>{(item.price * item.quantity).toLocaleString("vi-VN")}₫</span>
              </div>
            ))}
            <div className="summary-divider" />
            <div className="summary-row">
              <span>Vận chuyển</span>
              <span className="text-success">Miễn phí</span>
            </div>
            <div className="summary-row">
              <span className="fw-800">Tổng</span>
              <span className="summary-total">{total.toLocaleString("vi-VN")}₫</span>
            </div>
            <div style={{ marginTop: 16, padding: "12px 16px", background: "rgba(0,214,143,0.06)", border: "1px solid rgba(0,214,143,0.15)", borderRadius: 8 }}>
              <div style={{ fontSize: "0.75rem", color: "#00d68f", fontWeight: 700, marginBottom: 4 }}>
                ⚡ Space-Based Guarantee
              </div>
              <div style={{ fontSize: "0.72rem", color: "#9090a8" }}>
                Tồn kho giảm tức thì trên Data Grid<br />
                Không chờ write-through DB<br />
                Xử lý atomic DECRBY trong Redis
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
