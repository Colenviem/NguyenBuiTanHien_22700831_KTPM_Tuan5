# Sử dụng phiên bản Python rút gọn để nhẹ image
FROM python:3.11-slim

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy file requirements và cài đặt thư viện
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy toàn bộ code vào container
COPY . .

# Flask mặc định chạy ở cổng 5000
EXPOSE 5000

# Lệnh khởi chạy ứng dụng
CMD ["python", "app.py"]