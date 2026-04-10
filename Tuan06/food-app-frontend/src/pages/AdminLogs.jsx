import React, { useCallback, useEffect, useState } from "react";
import api from "../api/axios";
import {
  Alert,
  Badge,
  Card,
  Container,
  ListGroup,
  Spinner,
} from "react-bootstrap";

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const normalizeLogs = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.content)) return payload.content;
    if (Array.isArray(payload?.data?.content)) return payload.data.content;
    return [];
  };

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/notification/notifications/logs");
      setLogs(normalizeLogs(res.data));
      setError("");
    } catch (err) {
      console.error("Không lấy được log", err);
      setError("Không lấy được thông báo.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      fetchLogs();
    }, 0);
    const interval = setInterval(fetchLogs, 5000);
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [fetchLogs]);

  return (
    <Container className="py-4 py-lg-5">
      <Card className="hero-panel border-0 mb-4">
        <Card.Body className="p-4 p-lg-5 d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-center">
          <div>
            <p className="text-secondary small mb-1">Notification Service</p>
            <h2 className="h3 fw-bold mb-2">Nhật ký hệ thống</h2>
            <p className="text-secondary mb-0">
              Cập nhật mỗi 5 giây, hiển thị nhẹ và dễ đọc.
            </p>
          </div>
          <Badge
            bg="dark"
            pill
            className="px-3 py-2 align-self-start align-self-md-center"
          >
            Real-time
          </Badge>
        </Card.Body>
      </Card>

      {error && <p className="mb-4 text-red-500 text-sm">{error}</p>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="secondary" />
        </div>
      ) : logs.length === 0 ? (
        <Alert variant="light" className="border section-card">
          Chưa có thông báo nào.
        </Alert>
      ) : (
        <Card className="section-card border-0">
          <ListGroup variant="flush">
            {logs.map((log, index) => {
              const timestampValue =
                log.timestamp || log.createdAt || log.createdDate;
              const statusText = log.status || log.level || "INFO";
              return (
                <ListGroup.Item key={index} className="py-3 px-4">
                  <div className="d-flex justify-content-between gap-3 align-items-start">
                    <div>
                      <div className="fw-semibold text-dark mb-1">
                        {log.message || log.content || "(Không có nội dung)"}
                      </div>
                      <div className="text-secondary small">
                        {timestampValue
                          ? new Date(timestampValue).toLocaleString()
                          : "Không có thời gian"}
                      </div>
                    </div>
                    <Badge bg="light" text="dark" className="soft-badge">
                      {statusText}
                    </Badge>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card>
      )}
    </Container>
  );
};

export default AdminLogs;
