# 06 — Motion & Interaction

> Quy tắc vàng: **mọi thứ chuyển động đều có lý do** (dẫn mắt tới CTA hoặc giải thích flow). Tốc độ nhanh, mượt, không say sóng.

## 6.1 Scroll reveal (áp dụng mọi section)

- Mặc định: `fade + translateY(24px) → 0`, 600ms `cubic-bezier(.21,.9,.25,1)`, stagger 120ms giữa các card trong cùng hàng.
- Trigger khi 20% element vào viewport, chạy 1 lần (không re-trigger khi scroll lên).
- H1 hero đặc biệt: từng dòng slide-up riêng, delay 0/120/240ms.

## 6.2 Hero visual sống động

- Card ledger float ±6px, 5s loop ease-in-out; 2 chip mono float ngược pha.
- Đường nối hero → Base block: SVG dashed, `stroke-dashoffset` loop 2.4s, dot sáng chạy dọc.
- Stats counter: đếm từ 0 lên số thật 1.2s khi vào viewport (format `1,284`, giữ nguyên `0`, `100%`).

## 6.3 Marquee (trust bar + ticker)

- Trust bar: 30s/vòng, ticker: 40s/vòng (2 hàng ngược chiều). `pause on hover`, blur 40px 2 mép.
- Giảm chuyển động (`prefers-reduced-motion`): dừng marquee + float, chỉ giữ fade tĩnh — dev sẽ implement, designer ghi chú trong Figma prototype (1 bản static).

## 6.4 Hover & micro-interaction

- Nút primary: glow `0 8px 32px → 0 12px 44px`, mũi tên `translateX(4px)`, 200ms.
- Card: `translateY(-4px)` + border sáng + glow, 250ms. Tuyệt đối không xoay/lật card.
- Copy button (hash, code): click → check ✓ 1.5s + tooltip `Copied`.
- Accordion: height auto 300ms ease + plus xoay.

## 6.5 Page behavior

- Smooth scroll cho anchor (`scroll-behavior: smooth`, offset header 80px).
- Header: transparent → blur sau 24px (transition 200ms). Back-to-top xuất hiện sau 1200px.
- Không preloader, không intro animation toàn màn hình — investor cần thấy nội dung trong <1s.
