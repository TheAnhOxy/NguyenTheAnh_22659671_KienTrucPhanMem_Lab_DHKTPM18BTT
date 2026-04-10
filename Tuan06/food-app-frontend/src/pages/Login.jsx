import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import api from "../api/axios";

const Login = () => {
  const [form, setForm] = useState({ login: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/user/auth/login", form);
      const userData = res.data.data;
      localStorage.setItem("token", res.data.data.accessToken);
      localStorage.setItem("role", res.data.data.role);
      localStorage.setItem("userName", userData.fullName || userData.username);
      setError("");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Sai tài khoản hoặc mật khẩu!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={5} xl={4}>
            <Card className="auth-card border-0 shadow-lg">
              <Card.Body className="p-4 p-lg-5">
                <div className="mb-4">
                  <p className="text-secondary small mb-1">Chào mừng trở lại</p>
                  <h2 className="h3 fw-bold mb-0">Đăng nhập</h2>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleLogin} className="d-grid gap-3">
                  <Form.Group>
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control
                      value={form.login}
                      onChange={(e) =>
                        setForm({ ...form, login: e.target.value })
                      }
                      placeholder="Nhập tên đăng nhập"
                      autoComplete="username"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control
                      type="password"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      placeholder="Nhập mật khẩu"
                      autoComplete="current-password"
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="dark"
                    className="rounded-pill py-2"
                    disabled={loading}
                  >
                    {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                  </Button>
                </Form>

                <p className="text-center mt-4 mb-0 text-secondary small">
                  Chưa có tài khoản?{" "}
                  <Link to="/register" className="text-dark fw-semibold">
                    Đăng ký tại đây
                  </Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
