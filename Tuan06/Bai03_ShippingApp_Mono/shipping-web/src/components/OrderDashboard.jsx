import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderDashboard = ({ currentUser }) => {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    totalPrice: "",
    address: "",
    paymentMethod: "COD",
  });

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/orders");
      if (res.data.status === 200) {
        setOrders(res.data.data); // Lấy list từ field data của ApiResponse
      }
    } catch {
      console.error("Lỗi load đơn hàng");
    }
  };

  useEffect(() => {
    const loadOrders = async () => {
      await fetchOrders();
    };

    loadOrders();
  }, []);

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    const payload = {
      user: { id: currentUser.id },
      totalPrice: formData.totalPrice,
      address: formData.address,
      paymentMethod: formData.paymentMethod,
      status: "PENDING",
    };

    try {
      const res = await axios.post("http://localhost:8080/api/orders", payload);
      if (res.data.status === 201 || res.data.status === 200) {
        alert(res.data.message);
        fetchOrders(); // Refresh danh sách
        setFormData({ ...formData, totalPrice: "", address: "" }); // Clear form
      }
    } catch {
      alert("Lỗi đặt hàng!");
    }
  };

  return (
    <div className="dashboard-shell">
      <section className="dashboard-hero">
        <div>
          <p className="eyebrow">Order Center</p>
          <h1>Quản lý đơn hàng nhanh, rõ và đẹp hơn.</h1>
          <p className="hero-copy">
            Tạo đơn mới, theo dõi trạng thái, và quản lý lịch sử trong một giao
            diện gọn gàng.
          </p>
        </div>
        <div className="hero-stats">
          <div className="stat-card">
            <span>Đang xử lý</span>
            <strong>
              {orders.filter((order) => order.status === "PENDING").length}
            </strong>
          </div>
          <div className="stat-card">
            <span>Đã hoàn thành</span>
            <strong>
              {orders.filter((order) => order.status === "COMPLETED").length}
            </strong>
          </div>
        </div>
      </section>

      {/* Cột trái: Form */}
      <div className="side-panel dashboard-grid">
        <div className="card">
          <h3>Tạo Đơn Hàng</h3>
          <form onSubmit={handleCreateOrder}>
            <label>Tổng tiền (VND)</label>
            <input
              type="number"
              value={formData.totalPrice}
              onChange={(e) =>
                setFormData({ ...formData, totalPrice: e.target.value })
              }
              required
            />

            <label>Địa chỉ giao hàng</label>
            <textarea
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
            />

            <label>Thanh toán</label>
            <select
              onChange={(e) =>
                setFormData({ ...formData, paymentMethod: e.target.value })
              }
            >
              <option value="COD">Tiền mặt (COD)</option>
              <option value="BANK">Chuyển khoản</option>
            </select>
            <button type="submit" className="btn-submit">
              Xác nhận
            </button>
          </form>
        </div>
      </div>

      {/* Cột phải: Danh sách */}
      <div className="main-panel">
        <div className="card">
          <h3>Lịch Sử Đơn Hàng</h3>
          <table className="order-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tổng Tiền</th>
                <th>Trạng Thái</th>
                <th>Ngày Tạo</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{Number(order.totalPrice || 0).toLocaleString()} đ</td>
                    <td>
                      <span className={`status-badge ${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString("vi-VN")
                        : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="empty-state">
                    Chưa có đơn hàng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDashboard;
