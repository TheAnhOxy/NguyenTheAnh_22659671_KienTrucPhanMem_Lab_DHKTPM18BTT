import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // State quản lý form
  const [formData, setFormData] = useState({
    userId: 1, // Giả định user admin id = 1
    totalPrice: "",
    address: "",
    paymentMethod: "COD",
  });

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Gọi đến API Spring Boot
      const res = await axios.post(
        "http://localhost:8080/api/orders/create",
        formData,
      );
      setResponse(res.data);
      alert("Đặt hàng thành công!");
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Không thể kết nối đến Server!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>📦 Tạo Đơn Hàng Mới</h2>
      <form onSubmit={handleSubmit}>
        <label>Mã khách hàng (User ID):</label>
        <input
          type="number"
          value={formData.userId}
          readOnly // Tạm thời để readOnly vì chưa làm phần Login
        />

        <label>Tổng số tiền (VND):</label>
        <input
          type="number"
          placeholder="Ví dụ: 500000"
          onChange={(e) =>
            setFormData({ ...formData, totalPrice: e.target.value })
          }
          required
        />

        <label>Địa chỉ giao hàng:</label>
        <textarea
          placeholder="Nhập địa chỉ chi tiết..."
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          required
        />

        <label>Phương thức thanh toán:</label>
        <select
          onChange={(e) =>
            setFormData({ ...formData, paymentMethod: e.target.value })
          }
        >
          <option value="COD">Thanh toán khi nhận hàng (COD)</option>
          <option value="BANKING">Chuyển khoản ngân hàng</option>
          <option value="MOMO">Ví MoMo</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Đang xử lý..." : "Xác nhận đặt hàng"}
        </button>
      </form>

      {/* Hiển thị kết quả sau khi đặt hàng thành công */}
      {response && (
        <div className="success-card">
          <h4>✅ Đặt hàng thành công!</h4>
          <p>
            Mã đơn hàng: <strong>#{response.id}</strong>
          </p>
          <p>Trạng thái: {response.status}</p>
          <p>Ngày tạo: {new Date(response.createdAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default App;
