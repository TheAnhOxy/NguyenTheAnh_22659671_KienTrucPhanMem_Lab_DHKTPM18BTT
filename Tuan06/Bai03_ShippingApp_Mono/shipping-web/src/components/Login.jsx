import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLoginSuccess }) => {
  const [user, setUser] = useState({ username: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        user,
      );
      // res.data lúc này là ApiResponse { status, message, data }
      if (res.data.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data.data));
        onLoginSuccess(res.data.data);
        alert(res.data.message);
      }
    } catch (error) {
      alert(
        "Đăng nhập thất bại: " +
          (error.response?.data?.message || "Lỗi kết nối"),
      );
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-backdrop auth-backdrop-one" />
      <div className="auth-backdrop auth-backdrop-two" />
      <div className="auth-card">
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Tài khoản</label>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn-login">
            Đăng Nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
