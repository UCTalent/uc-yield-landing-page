# 03 — Visual Design System

> Mục tiêu: **dark premium fintech** — nhìn là thấy tiền/infra thật, nhưng vẫn sáng sủa, sống động, không u ám.
> Tham chiếu: Base.org (xanh dương), Linear (dark + glow), Stripe (gradient mesh), Vercel (grid + mono).

## 3.1 Màu sắc (thiết kế Figma variables đúng mã này)

**Nền (dark-first):**

| Token | Hex | Dùng ở đâu |
|---|---|---|
| `bg-950` | `#050B18` | Nền toàn trang |
| `bg-900` | `#0A1428` | Nền section xen kẽ |
| `bg-card` | `#0D1B33` / alpha 60% + blur | Card glass |
| `grid-line` | `#FFFFFF` 4% opacity | Lưới background |
| `border-subtle` | `#1E2F52` | Viền card, divider |

**Brand:**

| Token | Hex | Dùng ở đâu |
|---|---|---|
| `base-blue` | `#0052FF` | Primary, gradient start, link |
| `cyan-glow` | `#00D4FF` | Gradient end, glow, ticker |
| `yield-gold` | `#FFC531` | Accent "yield", số APY/stat, star |
| `success` | `#22C55E` | Badge verified, dot live |
| `text-primary` | `#F2F6FF` | Heading |
| `text-muted` | `#93A1C0` | Body, caption |

**Gradient chuẩn (dùng cho mọi CTA + final banner):**

```text
linear-gradient(135deg, #0052FF 0%, #00A3FF 55%, #00D4FF 100%)
+ shadow: 0 8px 32px rgba(0,82,255,.45)
```

**Mesh background hero:** 2–3 blob radial (`#0052FF` 25%, `#00D4FF` 12%, `#7C3AED` 10%) trên `bg-950`, blur 120px, thêm grid perspective ở chân hero.

> Light mode: không bắt buộc phase 1. Nếu làm, chỉ invert hero sang trắng + giữ CTA gradient. Ưu tiên hoàn thiện dark trước.

## 3.2 Typography (3 font, không thêm)

| Vai trò | Font | Weight / Size desktop |
|---|---|---|
| Display / H1-H2 | `Space Grotesk` hoặc `Sora` (chọn 1) | H1 64–76px / 700, letter-spacing -0.03em |
| Body / UI | `Inter` | Body 17–18px / 400, line-height 1.65 |
| Mono (hash, address, code) | `JetBrains Mono` / `Geist Mono` | 13–14px, tracking 0 |

Scale: H1 68 → H2 40 → H3 24 → body 17 → caption 14. Mobile H1 40px.
Tiếng Việt phải kiểm tra dấu đầy đủ (Space Grotesk + Inter đều hỗ trợ VI tốt).

## 3.3 Layout & spacing

- Container: `max-width 1200px`, padding ngang 24px (mobile 20px).
- Section padding dọc: desktop 120px, mobile 72px. Xen kẽ nền `bg-950 / bg-900` + divider glow 1px.
- Grid: 12 cột, gap 24px. Cards radius 20px, nút pill radius 999px, badge radius 999px.
- Glass card công thức: `bg #0D1B33 @60% + backdrop-blur 16px + border 1px #1E2F52 + inner highlight top 1px rgba(255,255,255,.08)`.

## 3.4 Icon & visual language

- Icon: Lucide outline, stroke 1.75px, size 20–22px trong ô vuông bo 12px có glow nhẹ. Không dùng emoji.
- Hash/address luôn mono + truncate giữa (`0x9f3a…c41d`) + nút copy.
- Mọi diagram kỹ thuật vẽ dạng **node + đường nối phát sáng** (xanh → cyan), dot chạy dọc đường nối (dash animation).
- Ảnh pilot (solar farm) xử lý duotone xanh đen + overlay gradient để chìm vào dark theme, không để ảnh sáng lạc tông.

## 3.5 Elevation & shadow

- Card thường: `0 4px 24px rgba(0,0,0,.4)`.
- Card nổi (hero visual, pilot): `0 24px 80px rgba(0,82,255,.25)` + viền gradient.
- Nút primary hover: nâng 1px + glow mạnh hơn + mũi tên dịch 4px.

## 3.6 Figma setup đề nghị

- 1 file, pages: `01-Styles`, `02-Landing-VI`, `03-Landing-EN`, `04-Components`, `05-Mobile`.
- Variables: color tokens trên + type styles `H1/H2/H3/Body/Caption/Mono`.
- Auto-layout toàn bộ, button dùng component + variants (sẽ spec ở file 05).
