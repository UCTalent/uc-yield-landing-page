# 07 — Responsive, SEO & Accessibility

## 7.1 Breakpoints (thiết kế 3 khổ, Figma 3 frames)

| Khổ | Width | Thay đổi chính |
|---|---|---|
| Desktop | 1440 (container 1200) | Full 2 cột, 3–4 cards/hàng, H1 68px |
| Tablet | 768 | Hero 1 cột (text trước visual sau), features 2 cột, H1 48px |
| Mobile | 390 | 1 cột hết, header gọn (logo + CTA mini + burger), H1 40px, section padding 72px, ticker vẫn chạy |

- Không giấu CTA trên mobile — header luôn giữ nút mini `Thử ngay`.
- Code window mobile: scroll ngang + nút copy giữ nguyên.
- Ảnh pilot mobile: tỉ lệ 16/10, text chồng gradient đáy (không để chữ trên ảnh sáng).

## 7.2 SEO (dev sẽ code, designer chuẩn bị nội dung)

- Title VI: `UC Yield — Hạ tầng dữ liệu real-yield xác minh được trên Base`
- Title EN: `UC Yield — Verifiable Real-Yield Data Infrastructure on Base`
- Description: `Issuer commit hash dữ liệu vận hành lên Shadow Ledger. Raw data không bao giờ on-chain. Live on Base Sepolia.` (EN mirror).
- OG image 1200×630: nền dark + logo + H1 ngắn + badge Base (spec asset ở file 09). 1 ảnh dùng chung vi/en.
- Canonical `https://ucyield.com/` + alternate `/en`. JSON-LD Organization (name, url, logo, sameAs Basescan).

## 7.3 Performance budget (ảnh hưởng thiết kế)

- Tổng page < 1.2MB, LCP < 2.5s: tối đa 1 ảnh lớn (pilot, WebP < 200KB), còn lại SVG/CSS effect.
- Font: display + body + mono, `display=swap`, subset VI.
- Không video nền phase 1 — mọi "sống động" làm bằng CSS/SVG animation (nhẹ, đã spec ở file 06).

## 7.4 Accessibility (không thỏa hiệp)

- Tương phản text/border ≥ 4.5:1 (muted `#93A1C0` trên `bg-950` đạt ~7:1 — giữ nguyên, không làm mờ thêm).
- Mọi icon ý nghĩa có label; focus-visible ring cyan 2px; accordion/ menu dùng được bằng bàn phím (Tab/Enter/Escape).
- Marquee/ticker có `aria-hidden` + bản text tĩnh cho screen reader; tôn trọng `prefers-reduced-motion`.
