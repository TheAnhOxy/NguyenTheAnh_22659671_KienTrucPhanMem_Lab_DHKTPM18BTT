import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Badge,
  Container,
  Nav,
  Navbar as BootstrapNavbar,
} from "react-bootstrap";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("userName");
  const cartCount = cart.reduce((total, item) => total + item.qty, 0);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <BootstrapNavbar
      expand="lg"
      bg="white"
      variant="light"
      className="shadow-sm border-bottom sticky-top"
    >
      <Container>
        <BootstrapNavbar.Brand
          as={Link}
          to="/"
          className="fw-bold text-dark d-flex align-items-center gap-2"
        >
          <span className="text-secondary">IUH</span>
          <span>Food</span>
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="main-navbar" />
        <BootstrapNavbar.Collapse id="main-navbar">
          <Nav className="me-auto align-items-lg-center gap-lg-2">
            <Nav.Link as={Link} to="/" className="text-dark">
              Trang chủ
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/cart"
              className="text-dark d-flex align-items-center gap-2"
            >
              Giỏ hàng
              {cartCount > 0 && (
                <Badge bg="dark" pill>
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>
            {role === "ADMIN" && (
              <>
                <Nav.Link as={Link} to="/admin/foods" className="text-dark">
                  Quản lý sản phẩm
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/logs" className="text-dark">
                  Thông báo
                </Nav.Link>
              </>
            )}
          </Nav>

          <div className="d-flex align-items-center gap-2 ms-lg-3 mt-3 mt-lg-0">
            {userName ? (
              <>
                <span className="text-secondary small">
                  Xin chào,{" "}
                  <span className="fw-semibold text-dark">{userName}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-secondary btn-sm rounded-pill px-3"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <BootstrapNavbar.Text className="small text-secondary d-none d-md-inline">
                  Tài khoản của bạn
                </BootstrapNavbar.Text>
                <Link
                  to="/login"
                  className="btn btn-dark btn-sm rounded-pill px-3"
                >
                  Đăng nhập
                </Link>
              </>
            )}
          </div>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
