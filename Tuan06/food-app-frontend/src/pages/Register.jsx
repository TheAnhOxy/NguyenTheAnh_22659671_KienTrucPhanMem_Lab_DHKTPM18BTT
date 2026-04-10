import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";

const Register = () => {
  const [form, setForm] = useState({
    fullName: "",
    login: "",
    password: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/user/auth/register", form);
      console.log("Dữ liệu từ DB trả về:", res.data);
      setError("");
      navigate("/login"); // Chuyển hướng sang trang đăng nhập
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Đăng ký thất bại, tài khoản có thể đã tồn tại.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={9} lg={6} xl={5}>
            <Card className="auth-card border-0 shadow-lg">
              <Card.Body className="p-4 p-lg-5">
                <p className="text-secondary small mb-1">Tạo tài khoản mới</p>
                <h2 className="h3 fw-bold mb-4">Đăng ký</h2>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleRegister} className="d-grid gap-3">
                  <Form.Group>
                    <Form.Label>Họ và tên</Form.Label>
                    <Form.Control
                      value={form.fullName}
                      onChange={(e) =>
                        setForm({ ...form, fullName: e.target.value })
                      }
                      placeholder="Nhập họ và tên"
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control
                      value={form.login}
                      onChange={(e) =>
                        setForm({ ...form, login: e.target.value })
                      }
                      placeholder="Nhập tên đăng nhập"
                      required
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
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                      value={form.phoneNumber}
                      onChange={(e) =>
                        setForm({ ...form, phoneNumber: e.target.value })
                      }
                      placeholder="Nhập số điện thoại"
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="dark"
                    className="rounded-pill py-2"
                    disabled={loading}
                  >
                    {loading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
                  </Button>
                </Form>

                <p className="text-center mt-4 mb-0 text-secondary small">
                  Đã có tài khoản?{" "}
                  <Link to="/login" className="text-dark fw-semibold">
                    Đăng nhập ngay
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

export default Register;
