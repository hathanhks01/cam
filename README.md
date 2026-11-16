# CamRent - Web Cho Thuê Máy Ảnh (PWA Standalone cho iPhone)

Ứng dụng web cho thuê máy ảnh, ống kính và thiết bị quay chụp chuyên nghiệp, được xây dựng bằng **ReactJS + Vite + Tailwind CSS + PWA (Progressive Web App)** tối ưu hiển thị độc lập (Standalone) trên iPhone mà không cần xuất bản lên App Store.

---

## 📱 Cách Mở Dạng App Mobile Trên iPhone (Không Có Thanh Địa Chỉ Safari)

1. **Đảm bảo iPhone và máy tính kết nối chung một mạng Wi-Fi.**
2. Trên iPhone, mở trình duyệt **Safari** và truy cập vào địa chỉ IP nội bộ:
   ```text
   http://192.168.1.7:3000
   ```
   *(Hoặc địa chỉ IP hiển thị khi chạy lệnh `npm run dev`)*

3. Ở thanh công cụ dưới đáy Safari, nhấn vào biểu tượng **Chia sẻ (Share)** (biểu tượng hình vuông có mũi tên chỉ lên ⎋).
4. Cuộn xuống và chọn **"Thêm vào MH chính" (Add to Home Screen)**.
5. Nhấn **Thêm (Add)** ở góc trên bên phải.
6. Quay ra màn hình chính iPhone, chạm vào biểu tượng ứng dụng **CamRent**.
   👉 **Ứng dụng sẽ mở toàn màn hình (Standalone) độc lập, ẩn toàn bộ thanh địa chỉ và thanh điều hướng của Safari, giao diện chuẩn Native Mobile App!**

---

## 🛠️ Các Tính Năng Đã Xây Dựng

- **Giao diện chuẩn iOS Mobile First**: Hỗ trợ Safe Area (tai thỏ, Dynamic Island, thanh gạt Home Bar), Dark Mode sang trọng.
- **Danh mục thiết bị phong phú**:
  - Máy ảnh: Sony A7 IV, Sony FX3 Cinema, Canon R6 Mark II, Fujifilm X-T5, Fujifilm X100VI...
  - Ống kính: Sony 24-70 GM II, Canon RF 24-70L...
  - Thiết bị quay: DJI Osmo Pocket 3, Flycam Mavic 3 Pro, Gimbal RS3 Pro...
- **Bộ lọc & Tìm kiếm tức thì**: Lọc theo hãng (Sony, Canon, Fujifilm, DJI), loại thiết bị, sắp xếp theo giá thuê.
- **Xem chi tiết máy**: Thông số kỹ thuật, phụ kiện kèm sẵn (pin, sạc, thẻ nhớ), chính sách cọc & giấy tờ.
- **Gói Combo tiết kiệm**: Gói tiệc cưới, gói làm vlog/tiktok, gói quay MV.
- **Đơn thuê & Chọn ngày linh hoạt**:
  - Tự động tính số ngày thuê và chi phí.
  - Tự động áp dụng chiết khấu 10% khi thuê từ 3 ngày trở lên.
  - Form đặt máy (nhận tại quầy hoặc giao tận nơi).
  - Xuất mã đơn hàng và mã QR nhận máy test tại quầy.
- **PWA Standalone & iOS Config**:
  - `apple-mobile-web-app-capable: yes`
  - `apple-mobile-web-app-status-bar-style: black-translucent`
  - `apple-touch-icon.png` sắc nét
  - `manifest.webmanifest` chế độ `display: standalone`

---

## 🚀 Khởi Chạy Lại Sau Này

```bash
# Cài thư viện (nếu mới clone)
npm install

# Khởi chạy server nội bộ (cho iPhone cùng mạng Wi-Fi kết nối)
npm run dev -- --host 0.0.0.0 --port 3000

# Hoặc build bản tối ưu hóa
npm run build
```

