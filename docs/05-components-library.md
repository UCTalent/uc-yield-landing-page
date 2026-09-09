# 05 — Components Library (Figma components + variants)

> Dựng mỗi component 1 lần, reuse khắp page. Đặt tên đúng để dev map sang shadcn sau.

## 5.1 Button (quan trọng nhất)

| Variant | Style | Dùng ở đâu |
|---|---|---|
| `Primary / gradient` | pill 999px, padding 14×28, gradient §3.1, chữ trắng 16px/600, icon `arrow-right` 18px, glow | Mọi CTA "Try it now" (header, hero, pilot, final — final bản nền trắng chữ xanh) |
| `Secondary / outline` | pill, border 1px `#2A3F68`, text `#DCE6FF`, bg transparent → hover bg `#FFFFFF10` | "How it works", "View contract", "Read docs" |
| `Mini` | height 36px, text 14px | Header mobile, card pilot |

States bắt buộc: default / hover (nâng 1px + glow + mũi tên dịch 4px) / active (scale .98) / disabled (opacity 40%) / focus (ring 2px cyan offset 2px). Min-width 168px, hug content, không fix width.

## 5.2 Badge / Chip / Status

- `Live badge`: dot 8px xanh + pulse ring + text 13px mono uppercase.
- `Status chip`: `Verified ✓` (xanh lá bg 12%) / `Pending ⏳` (vàng bg 12%) / `Sepolia` (xanh dương bg 12%). Radius 999, padding 4×10, text 12px/600.
- `Tech chip`: mono 13px, bg `#FFFFFF08`, border subtle, dùng cho `keccak256`, `commitData`, `schemaVersion`.

## 5.3 Cards

- `Glass card` (features, steps): radius 20, padding 28, công thức glass §3.3, hover: border chuyển `#2E5BFF66` + translateY(-4px) + glow.
- `Ledger row` (hero visual, ticker): hàng mono 13px: `[icon] PROJECT · period · hash · status`, divider 1px subtle, hover bg lighten.
- `Metric`: số 32px/700 trắng + label 14px muted + icon nhỏ vàng.

## 5.4 Header / Nav / Menu

- Desktop: height 72px, blur 16px khi scroll, link 15px/500 muted → hover trắng + underline gradient 2px animated.
- Language pill: 2 ô `VI|EN` trong khung radius 999, active nền `#FFFFFF14` chữ trắng.
- Mobile menu: full-screen `bg-950/95 blur`, link 28px, mỗi link + CTA + language ở đáy, đóng khi chọn.

## 5.5 Accordion FAQ

Item radius 16, border `#1E2F52`, padding 20×24; question 17px/600 trắng + icon plus; answer 16px muted + link xanh. Mở: border sáng + bg `#FFFFFF04`, plus xoay 45° (300ms ease). Chỉ 1 item mở.

## 5.6 Code window + Ticker + Banner CTA

- Code window: header dots + tab + copy btn; body mono 13.5px/1.7, syntax colors: keyword `#7DD3FC`, string `#86EFAC`, comment `#5B6B8C`, function `#FFC531`.
- Ticker card: mono 12.5px, padding 10×16, radius 12, border subtle, 2 hàng marquee ngược chiều.
- Final banner: radius 28, padding 64 (mobile 40×24), H2 trắng + nút trắng + mesh bg (không dùng ảnh ngoài).
