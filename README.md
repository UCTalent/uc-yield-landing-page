<div align="center">
  <h1>🌌 UC Yield</h1>
  <h3>Hạ Tầng Dữ Liệu Real-Yield Xác Minh Được Trên Base</h3>
  
  <p>
    <a href="https://ucyield.com">Live Preview</a>
    ·
    <a href="https://issuer.ucyield.com/dashboard">Issuer Dashboard</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Base-0052FF?style=for-the-badge&logo=base" alt="Base" />
    <img src="https://img.shields.io/badge/Motion-black?style=for-the-badge&logo=framer" alt="Motion" />
  </p>
</div>

<br />

## 🌟 Về Dự Án

**UC Yield** là hạ tầng cung cấp dữ liệu real-yield minh bạch, được xác minh trên **Base (Shadow Ledger)**. 
Repository này chứa toàn bộ mã nguồn và tài liệu thiết kế (Design Docs) cho Landing Page chính thức tại `ucyield.com`.

Landing page được thiết kế theo phong cách **dark theme premium** (fintech + on-chain), tập trung vào các animation mượt mà, sống động, đẳng cấp như Stripe, Linear hay Vercel nhằm thu hút **Investors**, **Partners** và **Issuers**.

---

## 🚀 Tính Năng & Trải Nghiệm (Vibe)

- ⚡️ **Hiệu suất tối đa:** Xây dựng với Next.js 16 (App Router) & React 19.
- 🎨 **Giao diện Đẳng cấp:** Nền đen-xanh sâu thẳm, lưới grid mờ, glow xanh Base, nhấn nhá vàng yield (Tailwind CSS v4).
- 💫 **Motion & Animation Đỉnh cao:** Chuyển động siêu mượt với `motion`, scroll reveal, ticker chạy ngang, counter đếm số, và parallax glow.
- 🌐 **Đa ngôn ngữ (i18n):** Hỗ trợ chuẩn song ngữ Anh (EN) - Việt (VI) với cơ chế switch mượt mà.
- 🧩 **Minh hoạ Sống động:** Các khối kỹ thuật (hashing, Merkle, commitData) không khô khan mà được hình tượng hoá qua animated SVG & diagrams.

---

## 🛠 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation:** [Motion](https://motion.dev/)
- **UI Components:** [@base-ui/react](https://base-ui.com/), [Shadcn UI](https://ui.shadcn.com/)
- **i18n:** [next-intl](https://next-intl-docs.vercel.app/)

---

## 📂 Tài Liệu Thiết Kế (Design Specs)

Toàn bộ tài liệu cho Designer (làm cơ sở dựng Figma) nằm trong thư mục `docs/`. Quy trình chuẩn: đọc từ đầu đến cuối trước khi thiết kế.

| File | Nội dung |
| :--- | :--- |
| 📄 `01-product-brief.md` | Định vị sản phẩm, 2 audience, thông điệp, funnel CTA |
| 🗺 `02-information-architecture.md` | Sitemap, nav, route `/` + `/en`, footer, i18n |
| 🎨 `03-visual-design-system.md` | Màu sắc, typography, spacing, lưới grid, elevation |
| 🧩 `04-page-sections-spec.md` | **Spec chi tiết từng section** (layout, copy, visual, animation) 🔥 |
| 🧱 `05-components-library.md` | Button, card, badge, header, FAQ, ticker... & states |
| 🎬 `06-motion-interaction.md` | Scroll reveal, counters, parallax, hover effects |
| 📱 `07-responsive-seo-a11y.md` | Breakpoints (390/768/1024/1440), SEO, OG, performance |
| ✍️ `08-content-copy.md` | Toàn bộ text copy-paste cho Figma (VI & EN) |
| 🖼 `09-assets-checklist.md` | Checklist Logo, ảnh, icon, hình nền cần chuẩn bị |

---

## 💻 Hướng Dẫn Chạy Local

Yêu cầu: **Node.js 22.6+** & **pnpm 11+**

```bash
# Cài đặt dependencies
pnpm install

# Chạy development server
pnpm dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

---

## 🔗 Liên Kết & Quy Ước 

- 🌍 **Domain Landing:** [https://ucyield.com](https://ucyield.com) (`www` sẽ redirect về root).
- 🎯 **Nút Hành Động (CTA):** Nút CTA chính trên toàn trang luôn là **"Try it now"** (EN) / **"Dùng thử ngay"** (VI).
- 📊 **Mục Tiêu CTA:** Trỏ trực tiếp về [https://issuer.ucyield.com/dashboard](https://issuer.ucyield.com/dashboard).

<br />
<div align="center">
  <i>Coded with 🩵 by UC Yield Team</i>
</div>

## Documentation

Documentation chạy cùng website tại `/docs` (VI) và `/en/docs` (EN), gồm 16 bài trong 6 nhóm.
Thiết kế và nghiên cứu nguồn UCYield: [docs/12-documentation-design.md](docs/12-documentation-design.md).
Nội dung bài: `messages/docs/{vi,en}.json`; copy UI: namespace `Docs` trong `messages/{vi,en}.json`.

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Search/sidebar/sitemap lấy từ catalog; khi thêm bài, giữ slug và section IDs giống nhau giữa VI/EN.
Bài mới cần nguồn đối chiếu và phân biệt có code với đã xác nhận triển khai live.
