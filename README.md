# 🌟 RiskManagement (Nền tảng quản lý rủi ro dự án của bạn)

Một ứng dụng web quản lý rủi ro dự án, cung cấp luồng thao tác mượt mà cho người dùng từ giao diện đến tương tác API.

## 🚀 Công nghệ sử dụng

- **Core:**
  - **Frontend:** React, JavaScript, TypeScript, Tanstack Query, Zod, Vite, TailwindCSS, Shadcn/UI.
  - **Backend:** Java, Spring Boot, Spring Security, RESTful API, JWT.
  - **Database:** MySQL.
  - **AI:** Google Gemini API.
  - **Cloudinary:** Cloudinary API.

## 📋 Yêu cầu hệ thống

Đảm bảo máy của bạn đã cài đặt sẵn:

- Node.js (v18.x trở lên khuyến nghị)
- Java (v17 trở lên khuyến nghị)
- Maven (v3.8.x trở lên khuyến nghị)
- MySQL (v8.0 trở lên khuyến nghị)
- Docker (v24.0.0 trở lên khuyến nghị)
- npm hoặc yarn

## 🛠️ Hướng dẫn cài đặt và chạy dự án

1. **Clone repository về máy:**

   ```bash
   git clone https://github.com/NHSon05/RiskManagement.git
   ```

2. **Di chuyển vào thư mục dự án**

   ```bash
   cd RiskManagement
   ```

3. **Di chuyển vào thư mục `server`**

   ```bash
   cd server
   ```

4. **Thiết lập cấu hình**
   Tạo file `src/main/resources/application.properties` và điền đầy đủ các thông tin:

   ```properties
   server.port=8080

   # Cấu hình kết nối Database thật của bạn
   spring.datasource.url=jdbc:mysql://localhost:3306/risk_management_db?useSSL=false&serverTimezone=UTC
   spring.datasource.username=TEN_DANG_NHAP_DB
   spring.datasource.password=MAT_KHAU_DB_CUA_BAN

   # Cấu hình kết nối Google Gemini API
   gemini.api.url=[https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=](https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=)
   gemini.api.key=${API_KEY}

   # Cấu hình Cloudinary
   cloudinary.cloud-name=YOUR_CLOUDINARY_CLOUD_NAME
   cloudinary.api-key=YOUR_CLOUDINARY_API_KEY
   cloudinary.api-secret=YOUR_CLOUDINARY_API_SECRET
   ```

5. **Chạy server:**

   ```bash
   mvn spring-boot:run
   ```

> Backend đã sẵn sàng phục vụ tại: `http://localhost:8080`

6. **Di chuyển vào thư mục `client` và chạy dự án:**
   ```bash
   cd client
   npm install
   ```
7. **Cấu hình endpoint kết nối**

   Tạo file .env nằm ngang hàng với file package.json ở Frontend và điền:

   ```properties
   VITE_API_BASE_URL=http://localhost:8080
   ```

8. **Chạy client:**

   ```bash
   npm run dev
   ```

> Sau khi chạy dự án, bạn có thể truy cập ứng dụng tại `http://localhost:5173`
