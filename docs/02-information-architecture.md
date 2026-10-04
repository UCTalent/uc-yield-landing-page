# 02 — Information Architecture

## 2.1 Sitemap (landing + documentation)

```text
/            (tiếng Việt, mặc định)
  #top
  #how-it-works
  #features
  #technology
  #pilot
  #faq
  #cta
/en          (tiếng Anh, mirror toàn bộ anchor trên)
```

Theo yêu cầu owner ngày 04/10/2026, bổ sung `/docs` và `/en/docs` với 16 bài viết song ngữ.
Thiết kế, phạm vi nguồn và routes: [12 — Documentation](12-documentation-design.md).
`robots.txt` cho index landing và docs; sitemap có alternate `vi/en`.

## 2.2 Header (sticky, blur khi scroll)

Từ trái sang phải (desktop ≥1024):

`[Logo UC Yield]  Cách hoạt động | Tính năng | Công nghệ | Pilot | FAQ    [🌐 VI/EN] [Dùng thử ngay →]`

- Mobile <1024: logo + CTA mini + hamburger → full-screen menu, mỗi link đóng menu + smooth scroll.
- Header trong suốt ở hero, chuyển `blur + border-bottom` sau 24px scroll.
- Language switcher: pill `VI | EN`, active state rõ, đổi là chuyển `/ ↔ /en` giữ nguyên anchor.

## 2.3 Thứ tự section trên page (không được đổi thứ tự khi thiết kế)

| Order | Section ID | Tên hiển thị | Mục đích 5 giây |
|---|---|---|---|
| 1 | `#top` hero | Hero + stats + ledger visual | Hiểu sản phẩm + bấm CTA |
| 2 | trust bar | Dải trust chạy ngang | Tin ngay (Base, Sepolia, non-custodial) |
| 3 | `#how-it-works` | 3 bước Upload → Commit → Verify | Hiểu flow |
| 4 | `#features` | 4 cards giá trị | Thấy khác biệt |
| 5 | `#technology` | 2 cột lib + contract + code snippet | Thuyết phục kỹ thuật |
| 6 | `#pilot` | CAS Energy pilot card + sample metrics | Thấy đồ thật |
| 7 | live ticker (dải ngang) | Commitment ticker mô phỏng | Cảm giác ledger đang sống |
| 8 | `#faq` | Accordion 6 câu | Xóa nghi ngờ |
| 9 | `#cta` | Final banner gradient | Bấm Try it now lần cuối |
| 10 | footer | 4 cột + footnote pháp lý | Điều hướng phụ + trust |

Chi tiết từng section xem `04-page-sections-spec.md`.

## 2.4 Footer (4 cột + bottom bar)

- **Cột 1 Brand:** logo, 1 câu tagline, badge `Built on Base`, language mini.
- **Cột 2 Product:** `Issuer dashboard` (→ issuer URL), `How it works` (#how-it-works), `Pilot` (#pilot), `FAQ` (#faq).
- **Cột 3 Developers:** `Smart contract` (Basescan), `Documentation` (#), `Hashing library` (#), `Status: Sepolia` (dot xanh nhấp nháy).
- **Cột 4 Legal:** `Phase 1 Sepolia-only`, `Pilot gated`, `Contact: hello@ucyield.com` (placeholder).
- **Bottom bar:** `© 2026 UC Yield` + `Commitment-first · Raw data never on-chain` + `Back to top ↑`.

## 2.5 i18n (song ngữ từ ngày đầu)

- Mọi string trong `08-content-copy.md` có cặp VI/EN. Thiết kế Figma nên làm **2 page song song**: `Landing — VI` và `Landing — EN`.
- Lưu ý text EN ngắn hơn VI ~15–20%: button EN `Try it now →` vs VI `Dùng thử ngay →` — frame button phải co giãn (auto-layout hug, min-width 168px, không fix cứng).
- Hash/địa chỉ/periodId giữ nguyên mọi ngôn ngữ, font mono.
