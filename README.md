# UC Yield — Landing Page Design Docs

> Repo tài liệu thiết kế cho landing page `ucyield.com`.
> Tách hoàn toàn khỏi monorepo `uctalents/ucyield` (nơi chứa `issuer-dashboard` tại `issuer.ucyield.com`).
> Đối tượng đọc: **designer** — đọc từ đầu tới cuối rồi thiết kế Figma theo spec.

## Mục tiêu thiết kế

Landing phải khiến **investor / đối tác / issuer** hiểu trong 10 giây:

> **UC Yield = hạ tầng dữ liệu real-yield xác minh được trên Base (Shadow Ledger).**
> Issuer commit hash dữ liệu vận hành → on-chain minh bạch → authorized parties underwrite từ commitment đã xác minh.

Và bấm duy nhất 1 hành động: **Try it now → `https://issuer.ucyield.com/dashboard`**.

## Cảm giác giao diện (design vibe)

- **Siêu đẹp, chuyên nghiệp, sống động, thu hút investor** — đẳng cấp Stripe / Linear / Vercel / Base.
- Dark theme premium làm chủ đạo (fintech + on-chain), nền đen-xanh sâu, lưới grid mờ, glow xanh Base, accent vàng yield.
- Mọi section đều có **chuyển động**: fade-up khi scroll, counter đếm số, ticker commitment chạy ngang, diagram hash flow vẽ tay (animated SVG), parallax glow.
- Không được khô khan kiểu docs kỹ thuật. Mỗi khối kỹ thuật (hashing, Merkle, commitData) phải có **visual minh họa sống động**.

## Cấu trúc tài liệu

| File | Nội dung |
|---|---|
| `docs/01-product-brief.md` | Định vị sản phẩm, 2 audience, thông điệp, funnel CTA |
| `docs/02-information-architecture.md` | Sitemap, nav, route `/` + `/en`, footer, i18n |
| `docs/03-visual-design-system.md` | Màu, chữ, spacing, grid, elevation, dark/light |
| `docs/04-page-sections-spec.md` | Spec chi tiết từng section (layout, copy, visual, animation) — **file quan trọng nhất** |
| `docs/05-components-library.md` | Button, card, badge, header, FAQ, ticker... + states |
| `docs/06-motion-interaction.md` | Scroll reveal, counters, parallax, hover, reduced-motion |
| `docs/07-responsive-seo-a11y.md` | Breakpoints 390/768/1024/1440, SEO, OG, performance, a11y |
| `docs/08-content-copy.md` | Toàn bộ text VI + EN copy-paste cho Figma |
| `docs/09-assets-checklist.md` | Logo, ảnh, icon, OG cần chuẩn bị + placeholder |

## Quy ước nhanh

- Domain landing: `https://ucyield.com` (`www` redirect về root).
- Dashboard: `https://issuer.ucyield.com` — mọi CTA trong landing trỏ ra đây (xem `01-product-brief.md` §4).
- Ngôn ngữ: song ngữ `vi` (mặc định `/`) + `en` (`/en`), switcher trên header.
- CTA chính duy nhất: **"Try it now"** (EN) / **"Dùng thử ngay"** (VI).

## Bắt đầu từ đâu

1. Đọc `01` → `02` để hiểu story.
2. Đọc `03` để dựng Figma styles + variables.
3. Thiết kế theo `04` từng section từ trên xuống dưới, tra copy ở `08`.
4. Đối chiếu checklist ở `09` để biết asset nào còn thiếu.
