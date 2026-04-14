# Game Admin Dashboard

Dự án này là một hệ thống quản lý admin game gồm:
- Backend: Node.js + Express + Mongoose
- Frontend: React + Vite + TypeScript + TailwindCSS + Axios
- Database: MongoDB local

## 1. Chuẩn bị môi trường

### Cài đặt MongoDB
1. Tải MongoDB Community Server từ: https://www.mongodb.com/try/download/community
2. Cài đặt bằng MSI installer.
3. Chọn `Complete` và bật `Install MongoDB as a Service` nếu muốn chạy tự động.

### Khởi động MongoDB trên localhost:27017
- Nếu cài dưới dạng service thì MongoDB sẽ chạy tự động.
- Nếu chạy thủ công, mở PowerShell và dùng lệnh (điều chỉnh đường dẫn nếu cần):

```powershell
"C:\Program Files\MongoDB\Server\<version>\bin\mongod.exe" --dbpath "C:\data\db"
```

### Kết nối kiểm tra
- Mở MongoDB Compass hoặc Mongo Shell.
- Kết nối với:

```text
mongodb://localhost:27017
```

### Lưu ý khi mở cho mạng LAN
- Nếu muốn truy cập từ máy khác, cấu hình `bindIp` trong `mongod.cfg`:

```yaml
net:
  port: 27017
  bindIp: 0.0.0.0
```

- Mở port `27017` trong Windows Firewall cho mạng Private.
- Khi đó máy khác có thể kết nối bằng:

```text
mongodb://<IP-máy-chủ>:27017/gamedb
```

## 2. Chạy backend

### Cài đặt phụ thuộc

```powershell
cd backend
npm install
```

### Biến môi trường
Backend dùng biến `MONGO_CONNECTION_URI` nếu có, hoặc mặc định là:

```text
mongodb://localhost:27017/gamedb
```

Tạo file `backend/.env` nếu cần:

```text
MONGO_CONNECTION_URI=mongodb://localhost:27017/gamedb
PORT=5000
```

### Khởi chạy backend

```powershell
npm run dev
```

- Máy chủ backend mặc định chạy tại: `http://localhost:5000`
- Server bind tới `0.0.0.0`, nên có thể truy cập từ mạng LAN nếu port `5000` mở.

## 3. Chạy frontend

### Cài đặt phụ thuộc

```powershell
cd frontend
npm install
```

### Biến môi trường frontend
Nếu cần cấu hình API URL, tạo file `frontend/.env` với nội dung:

```text
VITE_API_URL=http://localhost:5000
```

### Khởi chạy frontend

```powershell
npm run dev
```

- Mở URL mà Vite cung cấp, thường là `http://localhost:5173`.

## 4. Các tính năng chính

- Dashboard hiển thị chỉ số doanh thu và người dùng
- Trang Users: tìm kiếm, lọc, phân trang
- Trang Items: tìm kiếm, lọc, phân trang, tạo/sửa/xóa
- Trang Orders: xem danh sách đơn hàng
- Trang Payments: xem danh sách thanh toán

## 5. API chính

### Users
- `GET /users` - lấy danh sách người dùng
- `PATCH /users/:id` - cập nhật thông tin người dùng

### Items
- `GET /items` - lấy danh sách item
- `GET /items/:id` - lấy chi tiết item
- `POST /items` - tạo item mới
- `PATCH /items/:id` - cập nhật item
- `DELETE /items/:id` - xóa item

### Orders
- `GET /orders` - lấy danh sách đơn hàng

### Payments
- `GET /payments` - lấy danh sách thanh toán

### Stats
- `GET /stats/revenue` - thống kê doanh thu
- `GET /stats/users` - thống kê người dùng

## 6. Lưu ý thêm

- Khi backend kết nối MongoDB thành công, nếu database chưa có dữ liệu thì hệ thống sẽ tự seed dữ liệu mẫu.
- Nếu dùng trong mạng LAN, hãy đảm bảo `MONGO_CONNECTION_URI` trỏ đúng tới IP/Máy chủ MongoDB và `VITE_API_URL` trỏ đúng tới backend.
- Nếu chỉ chạy trên máy local, giữ nguyên cấu hình mặc định.

## 7. Cấu trúc thư mục

- `backend/` - mã nguồn server Express
- `frontend/` - mã nguồn giao diện React
- `backend/config/` - cấu hình MongoDB
- `backend/routes/` - định nghĩa route API
- `backend/controllers/` - xử lý request
- `backend/models/` - schema Mongoose
- `backend/data/sampleData.js` - dữ liệu mẫu

---

Chúc bạn setup thành công và deploy dự án lên GitHub dễ dàng!
