import React, { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const loadFoods = async () => {
      try {
        setLoading(true);
        const res = await api.get("/food/foods");
        const payload = res.data?.data ?? res.data;
        setFoods(Array.isArray(payload) ? payload : []);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Không tải được danh sách món ăn.");
      } finally {
        setLoading(false);
      }
    };

    loadFoods();
  }, []);

  return (
    <Container className="py-4 py-lg-5">
      <Card className="hero-panel mb-4 border-0">
        <Card.Body className="p-4 p-lg-5">
          <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 align-items-lg-end">
            <div>
              <Badge bg="secondary" className="soft-badge mb-3">
                Hôm nay
              </Badge>
              <h1 className="display-6 fw-bold mb-2">
                Thực đơn gọn gàng, dễ xem
              </h1>
              <p className="text-secondary mb-0">
                Giao diện trung tính để tập trung vào món ăn, không quá màu mè.
              </p>
            </div>
            <div className="text-lg-end text-secondary small">
              {foods.length} món đang hiển thị
            </div>
          </div>
        </Card.Body>
      </Card>

      {error && <Alert variant="warning">{error}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="secondary" />
        </div>
      ) : (
        <Row xs={1} md={2} xl={3} className="g-4">
          {foods.map((food) => (
            <Col key={food.id}>
              <Card className="h-100 section-card border-0 overflow-hidden">
                <div className="food-thumb d-flex align-items-center justify-content-center fs-1">
                  🍽️
                </div>
                <Card.Body className="p-4 d-flex flex-column">
                  <div className="d-flex align-items-start justify-content-between gap-2 mb-2">
                    <Card.Title className="mb-0 fw-semibold">
                      {food.name}
                    </Card.Title>
                    {food.category && (
                      <Badge bg="light" text="dark">
                        {food.category}
                      </Badge>
                    )}
                  </div>
                  <Card.Text className="text-secondary small flex-grow-1">
                    {food.description ||
                      "Món ăn được hiển thị với thông tin tối giản, rõ ràng."}
                  </Card.Text>
                  <div className="d-flex align-items-center justify-content-between gap-3 mt-auto">
                    <div className="fw-bold text-dark fs-5">
                      {Number(food.price || 0).toLocaleString("vi-VN")}đ
                    </div>
                    <Button
                      variant="dark"
                      className="rounded-pill px-3"
                      onClick={() => addToCart(food)}
                    >
                      Thêm vào giỏ
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Home;
