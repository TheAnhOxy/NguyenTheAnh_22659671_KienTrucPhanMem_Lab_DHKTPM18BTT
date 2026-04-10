import React, { useCallback, useEffect, useState } from "react";
import api from "../api/axios";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";

const AdminFoods = () => {
  const [newFood, setNewFood] = useState({
    name: "",
    price: 0,
    category: "",
    description: "",
  });
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const normalizeFoods = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.content)) return payload.content;
    return [];
  };

  const fetchFoods = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/food/foods");
      setFoods(normalizeFoods(res.data));
      setError("");
    } catch (err) {
      console.error(err);
      setError("Không tải được danh sách sản phẩm.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      fetchFoods();
    }, 0);
    return () => clearTimeout(initialTimer);
  }, [fetchFoods]);

  const handleAddFood = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await api.post("/food/foods", newFood);
      setNewFood({ name: "", price: 0, category: "", description: "" });
      await fetchFoods();
      setError("");
    } catch (err) {
      console.error(err);
      setError("Lỗi: không thể thêm sản phẩm hoặc bạn không có quyền.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="py-4 py-lg-5">
      <Row className="g-4">
        <Col xl={5}>
          <Card className="hero-panel border-0 h-100">
            <Card.Body className="p-4 p-lg-5">
              <Badge bg="secondary" className="soft-badge mb-3">
                Quản lý sản phẩm
              </Badge>
              <h2 className="h3 fw-bold mb-2">Thêm món mới</h2>
              <p className="text-secondary mb-4">
                Giao diện đơn giản, rõ ràng để nhập và cập nhật sản phẩm.
              </p>

              {error && <Alert variant="warning">{error}</Alert>}

              <Form onSubmit={handleAddFood} className="d-grid gap-3">
                <Form.Group>
                  <Form.Label>Tên món</Form.Label>
                  <Form.Control
                    value={newFood.name}
                    onChange={(e) =>
                      setNewFood({ ...newFood, name: e.target.value })
                    }
                    placeholder="Nhập tên món"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Giá</Form.Label>
                  <Form.Control
                    value={newFood.price}
                    onChange={(e) =>
                      setNewFood({ ...newFood, price: e.target.value })
                    }
                    type="number"
                    placeholder="Nhập giá"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Loại</Form.Label>
                  <Form.Control
                    value={newFood.category}
                    onChange={(e) =>
                      setNewFood({ ...newFood, category: e.target.value })
                    }
                    placeholder="Ví dụ: Cơm, Bún, Nước"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Mô tả</Form.Label>
                  <Form.Control
                    value={newFood.description}
                    onChange={(e) =>
                      setNewFood({ ...newFood, description: e.target.value })
                    }
                    as="textarea"
                    rows={4}
                    placeholder="Mô tả ngắn cho món ăn"
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="dark"
                  className="rounded-pill py-2"
                  disabled={submitting}
                >
                  {submitting ? "Đang lưu..." : "Lưu món ăn"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={7}>
          <Card className="section-card border-0 h-100">
            <Card.Body className="p-4 p-lg-5">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
                <div>
                  <p className="text-secondary small mb-1">Danh sách hiện có</p>
                  <h3 className="h4 fw-bold mb-0">Sản phẩm</h3>
                </div>
                <Badge bg="light" text="dark" className="align-self-start">
                  {foods.length} món
                </Badge>
              </div>

              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="secondary" />
                </div>
              ) : (
                <div className="table-responsive">
                  <Table hover className="align-middle mb-0">
                    <thead>
                      <tr>
                        <th>Tên</th>
                        <th>Loại</th>
                        <th>Giá</th>
                        <th>Mô tả</th>
                      </tr>
                    </thead>
                    <tbody>
                      {foods.length === 0 ? (
                        <tr>
                          <td
                            colSpan={4}
                            className="text-center text-secondary py-4"
                          >
                            Chưa có sản phẩm nào.
                          </td>
                        </tr>
                      ) : (
                        foods.map((food) => (
                          <tr key={food.id}>
                            <td className="fw-semibold">{food.name}</td>
                            <td>
                              {food.category ? (
                                <Badge bg="secondary" className="soft-badge">
                                  {food.category}
                                </Badge>
                              ) : (
                                <span className="text-secondary">-</span>
                              )}
                            </td>
                            <td>
                              {Number(food.price || 0).toLocaleString("vi-VN")}đ
                            </td>
                            <td className="text-secondary">
                              {food.description || (
                                <span className="fst-italic">
                                  Không có mô tả
                                </span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminFoods;
