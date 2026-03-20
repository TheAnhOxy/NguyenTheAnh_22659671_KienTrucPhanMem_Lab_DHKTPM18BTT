const express = require('express');
const app = express();
const PORT = 3000;

app.get('/api/data', (req, res) => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] Service B: Đang xử lý request...`);

    res.json({
        status: "Success",
        data: "Dữ liệu quan trọng từ Service B",
        time: timestamp
    });
});

app.listen(PORT, () => {
    console.log(`✅ Service B (Provider) đang chạy tại: http://localhost:${PORT}`);
});