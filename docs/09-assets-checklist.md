# 09 — Assets Checklist (cần chuẩn bị trước khi dev)

## 9.1 Bắt buộc (không có thì dùng placeholder đã ghi)

| # | Asset | Spec | Trạng thái |
|---|---|---|---|
| 1 | Logo UC Yield (SVG) | 1 bản trắng + 1 bản màu, chữ đọc được ở 28px | ⬜ Chờ bạn gửi — tạm dùng text logo Space Grotesk |
| 2 | Logo Base (SVG) | Dùng official, 24px trong card hero + footer | ⬜ Tải từ base.org/brand |
| 3 | OG cover 1200×630 | Nền dark + logo + H1 ngắn + badge Base, <300KB PNG | ⬜ Designer xuất từ Figma |
| 4 | Favicon SVG | Mark "UC" bo tròn trên nền gradient xanh | ⬜ Vẽ mới 5 phút |
| 5 | Ảnh pilot solar farm | 1600px WebP <200KB, duotone xanh đen (xử lý trong Figma) | ⬜ Dùng Unsplash tạm, thay ảnh thật CAS sau |
| 6 | Địa chỉ contract + link Basescan | `0x…` Base Sepolia, link verify | ⬜ Chờ deploy/verify xong |
| 7 | URL docs công khai | Link `Read docs` trỏ tới đâu | ⬜ Chờ bạn chốt |
| 8 | Quote + tên người pilot CAS | 1 câu + tên/chức (cần duyệt wording) | ⬜ Chờ xác nhận |
| 9 | Email liên hệ footer | `hello@ucyield.com` hay địa chỉ khác | ⬜ Chờ bạn chốt |

## 9.2 Icon (Lucide, không cần vẽ mới)

`arrow-right · arrow-up · upload-cloud · pen-line · shield-check · layers · fingerprint · key-round · puzzle · check · plus · copy · external-link · globe · menu · x · zap · database · link-2`

## 9.3 Bàn giao cho dev (sau khi thiết kế xong)

- Figma link (5 pages §3.6) + export tokens (variables → CSS).
- Ghi chú prototype: thứ tự reveal, tốc độ marquee, bản reduced-motion static.
- Đánh dấu asset nào là placeholder (contract address, quote, ảnh CAS) để dev gắn `TODO` + env.
