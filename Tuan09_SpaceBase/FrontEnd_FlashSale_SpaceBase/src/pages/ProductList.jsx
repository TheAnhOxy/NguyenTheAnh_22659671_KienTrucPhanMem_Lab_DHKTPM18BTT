import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const DISCOUNT = (original, current) =>
  Math.round(((original - current) / original) * 100);

function Countdown() {
  const [time, setTime] = useState({ h: 1, m: 59, s: 42 });

  useEffect(() => {
    const t = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 1; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="countdown-bar">
      <span className="countdown-label">🔥 KẾT THÚC SAU</span>
      <div className="countdown-timers">
        {[
          { val: time.h, label: "Giờ" },
          { val: time.m, label: "Phút" },
          { val: time.s, label: "Giây" },
        ].map(({ val, label }) => (
          <div className="countdown-unit" key={label}>
            <div className="countdown-num">{String(val).padStart(2, "0")}</div>
            <div className="countdown-unit-label">{label}</div>
          </div>
        ))}
      </div>
      <span style={{ marginLeft: "auto", fontSize: "0.8rem", color: "#9090a8" }}>
        Data Grid (Redis) | Không qua DB
      </span>
    </div>
  );
}

export default function ProductList({ userId, onCartUpdate }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState(null);

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(fetchProducts, 5000); // refresh stock mỗi 5s
    return () => clearInterval(interval);
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data.data || []);
    } catch (err) {
      toast.error("Không thể kết nối PU1 – Product Service");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    setAddingId(product.id);
    try {
      await axios.post("/api/cart/add", {
        userId,
        productId: product.id,
        quantity: 1,
      });
      toast.success(`✅ Đã thêm "${product.name}" vào giỏ`, { duration: 2000 });
      onCartUpdate();
      fetchProducts(); // refresh stock
    } catch (err) {
      toast.error(err.response?.data?.message || "Lỗi thêm vào giỏ");
    } finally {
      setAddingId(null);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading-screen">
          <div className="spinner" />
          <p className="loading-text">Đang tải từ Data Grid (Redis)...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-tag">⚡ Space-Based Architecture Demo</div>
          <h1 className="hero-title">
            Flash Sale <span className="highlight">Siêu Tốc</span>
            <br />Không DB · Toàn Redis
          </h1>
          <p className="hero-subtitle">
            Hệ thống xử lý 1000+ request/giây. Dữ liệu nằm trong Data Grid (Redis).
            Mỗi Processing Unit xử lý độc lập — không bottleneck database.
          </p>
          <div className="hero-stats">
            {[
              { value: "4", label: "Processing Units" },
              { value: "1ms", label: "Latency (avg)" },
              { value: "100%", label: "In-Memory" },
              { value: "0", label: "DB Queries" },
            ].map(({ value, label }) => (
              <div className="hero-stat" key={label}>
                <div className="hero-stat-value">{value}</div>
                <div className="hero-stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <Countdown />

        {/* Architecture Info */}
        <div className="arch-info">
          <span className="arch-icon">🏗️</span>
          <div className="arch-text">
            <strong>Space-Based Architecture</strong>: Frontend → PU1 (Product :8081) →
            Data Grid (Redis :6379). Tồn kho được PU4 (Inventory :8084) giảm trực tiếp trên Redis
            khi checkout. <strong>Không đọc DB.</strong>
          </div>
        </div>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">
              Sản phẩm <span>Flash Sale</span>
            </h2>
            <span className="section-badge">📡 Nguồn: Data Grid</span>
          </div>
          <div className="products-grid">
            {products.map((p) => (
              <div className="product-card" key={p.id}>
                <img src={p.image} alt={p.name} className="product-img" />
                <div className="product-badge">-{DISCOUNT(p.originalPrice, p.price)}%</div>
                <div className="product-info">
                  <div className="product-category">{p.category}</div>
                  <div className="product-name">{p.name}</div>
                  <div className="product-rating">
                    {"★".repeat(Math.floor(p.rating))}
                    <span>({p.sold.toLocaleString()} đã bán)</span>
                  </div>
                  <div className="product-price">
                    <span className="product-price-current">
                      {p.price.toLocaleString("vi-VN")}₫
                    </span>
                    <span className="product-price-original">
                      {p.originalPrice.toLocaleString("vi-VN")}₫
                    </span>
                  </div>
                  <div className="product-stock">
                    <div className="stock-bar-bg">
                      <div
                        className="stock-bar"
                        style={{ width: `${Math.min(100, (p.stock / 100) * 100)}%` }}
                      />
                    </div>
                    <div className="stock-text">
                      {p.stock > 0
                        ? `🟢 Còn ${p.stock} sản phẩm (Data Grid)`
                        : "🔴 Hết hàng"}
                    </div>
                  </div>
                  <button
                    id={`btn-add-${p.id}`}
                    className={`btn-add-cart ${addingId === p.id ? "loading" : ""}`}
                    onClick={() => addToCart(p)}
                    disabled={p.stock === 0 || addingId === p.id}
                  >
                    {addingId === p.id
                      ? "⏳ Đang thêm..."
                      : p.stock === 0
                      ? "Hết hàng"
                      : "🛒 Thêm vào giỏ"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
