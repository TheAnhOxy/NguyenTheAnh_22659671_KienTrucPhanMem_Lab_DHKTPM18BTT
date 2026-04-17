import React, { useState } from "react";
import Login from "./components/Login";
import OrderDashboard from "./components/OrderDashboard";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")),
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <div className="app-container">
      {currentUser ? (
        <>
          <nav className="navbar">
            <span className="logo">🚀 Shipping Web</span>
            <div className="user-menu">
              <span>
                Xin chào, <b>{currentUser.username}</b>
              </span>
              <button onClick={handleLogout} className="btn-logout">
                Đăng xuất
              </button>
            </div>
          </nav>
          <OrderDashboard currentUser={currentUser} />
        </>
      ) : (
        <Login onLoginSuccess={(user) => setCurrentUser(user)} />
      )}
    </div>
  );
}

export default App;
