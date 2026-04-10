import React from "react";
import { useCart } from "../context/CartContext";
import api from "../api/axios";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
} from "react-bootstrap";

const Cart = () => {
  const { cart, cartTotal, clearCart } = useCart();

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    try {
      // 1. Gọi Order Service
      const orderRes = await api.post("/order/orders", {
        userId: 1, // Giả định user đang login là ID 1
        foodId: cart[0].id, // Demo món đầu tiên
        quantity: cart[0].qty,
        paymentMethod: "BANKING",
      });

      const orderId = orderRes.data.data.id;

      // 2. Gọi Payment Service
      await api.post("/payment/payments", {
        orderId: orderId,
        amount: cartTotal,
        paymentMethod: "BANKING",
      });

      alert("Đặt hàng và Thanh toán thành công!");
      clearCart();
    } catch (err) {
      alert("Lỗi khi xử lý: " + err.message);
    }
  };

  return (
    <Container className="py-4 py-lg-5">
      <Row className="justify-content-center">
        <Col lg={10} xl={8}>
          <Card className="hero-panel border-0 mb-4">
            <Card.Body className="p-4 p-lg-5 d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-center">
              <div>
                <p className="text-secondary small mb-1">Đơn hàng của bạn</p>
                <h2 className="h3 fw-bold mb-2">Giỏ hàng</h2>
                <p className="text-secondary mb-0">
                  Xem lại món đã chọn trước khi thanh toán.
                </p>
              </div>
              <Badge
                bg="dark"
                pill
                className="px-3 py-2 align-self-start align-self-md-center"
              >
                {cart.length} món
              </Badge>
            </Card.Body>
          </Card>

          {cart.length === 0 ? (
            <Alert variant="light" className="border section-card">
              Chưa có món nào trong giỏ. Hãy quay lại trang chủ để chọn món.
            </Alert>
          ) : (
            <Row className="g-4">
              <Col lg={7}>
                <Card className="section-card border-0">
                  <Card.Body className="p-0">
                    <ListGroup variant="flush">
                      {cart.map((item) => (
                        <ListGroup.Item key={item.id} className="py-3 px-4">
                          <div className="d-flex justify-content-between gap-3 align-items-start">
                            <div>
                              <div className="fw-semibold">{item.name}</div>
                              <div className="text-secondary small">
                                Số lượng: {item.qty}
                              </div>
                            </div>
                            <div className="fw-semibold text-dark">
                              {(
                                Number(item.price || 0) * item.qty
                              ).toLocaleString("vi-VN")}
                              đ
                            </div>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={5}>
                <Card
                  className="summary-card border-0 position-sticky"
                  style={{ top: 96 }}
                >
                  <Card.Body className="p-4">
                    <p className="text-secondary small mb-1">
                      Tóm tắt thanh toán
                    </p>
                    <h3 className="h4 fw-bold mb-4">Tổng cộng</h3>
                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-secondary">Giá trị đơn hàng</span>
                      <span className="fw-semibold">
                        {cartTotal.toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                    <Button
                      onClick={handleCheckout}
                      variant="dark"
                      className="w-100 rounded-pill py-2"
                    >
                      Thanh toán ngay
                    </Button>
                    <p className="text-secondary small mt-3 mb-0">
                      Thanh toán demo hiện chỉ xử lý món đầu tiên trong giỏ.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
