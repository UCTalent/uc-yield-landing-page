# 01 — Product Brief (cho Designer)

## 1.1 UC Yield là gì (nói 1 câu)

**UC Yield là hạ tầng dữ liệu real-yield xác minh được trên Base — Shadow Ledger:**
issuer ký và commit **hash xác định** của dữ liệu vận hành lên smart contract,
bên được ủy quyền underwrite dựa trên commitment đã xác minh thay vì tin vào file Excel/PDF.

## 1.2 Ba khối kỹ thuật phải xuất hiện bằng hình ảnh (không chỉ chữ)

| Khối | Hiểu nôm na | Visual gợi ý trên landing |
|---|---|---|
| **Hashing lib (UCY-19)** | Chuẩn hóa dữ liệu → keccak256 → Merkle root. Cùng 1 input thì cùng 1 hash, mãi mãi | Animation: file CSV/solar metrics bay vào → ra chuỗi hex `0x9f…c41d` + cây Merkle mini |
| **ShadowLedger.sol (UCY-21)** | Registry on-chain lưu `root + metadata`, không lưu dữ liệu thô. Role-gated, 1 commitment cho mỗi `(issuer, assetType, projectId, periodId)` | Card smart-contract phát sáng + dòng `commitData(...)` + badge `Base Sepolia · Verified` |
| **Upload & Commit flow (UCY-22)** | Issuer upload → mã hóa off-chain AES-GCM → ký ví (CDP/MetaMask) → broadcast → receipt xác nhận | Stepper 3 bước có đường nối animated, mỗi bước 1 icon + mock UI nhỏ |

> Nguyên tắc commitment-first (phải thể hiện rõ): **on-chain chỉ có hash/root + metadata, dữ liệu thô không bao giờ on-chain.**

## 1.3 Hai audience (thiết kế phải chiều cả hai, nhưng ưu tiên investor)

1. **Investor / đối tác (ưu tiên số 1):** cần cảm giác *tin cậy + minh bạch + real yield*. Họ không đọc code — họ cần số liệu, diagram đơn giản, pilot thật (CAS Energy), badge Base/Basescan.
2. **Issuer / admin vận hành (ưu tiên số 2):** cần thấy *"ồ, có dashboard dùng được ngay"*. Họ là người bấm Try it now.

Tone: tự tin, minh bạch, kỹ thuật nhưng không khoe jargon. Tránh từ "RWA issuance/tokenize" (legacy, đã đóng băng) — chỉ dùng ngôn ngữ **verifiable data / commitment / attestation**.

## 1.4 Funnel CTA (quan trọng — thiết kế không được làm loãng)

- **1 CTA chính duy nhất** xuất hiện 4 lần: header sticky, hero, giữa trang (sau Tech), final banner.
  - EN: `Try it now →` / VI: `Dùng thử ngay →`
  - Đích: `https://issuer.ucyield.com/dashboard?utm_source=landing`
  - Style: nút pill gradient xanh Base → cyan, chữ trắng, glow, mũi tên trượt khi hover.
- **2 CTA phụ** (dạng ghost/outline, không cạnh tranh màu chính):
  - `How it works` (scroll xuống `#how-it-works`)
  - `View contract` (ra Basescan Sepolia) + `Read docs` (ra docs).
- Quy tắc: trên mỗi viewport chỉ có **1 nút gradient nổi bật**. Nút phụ luôn outline/muted.

## 1.5 Trust signals bắt buộc (để investor tin)

- Badge `Live on Base Sepolia` + logo Base.
- Link `Verified on Basescan` (chờ địa chỉ contract thật — tạm dùng `#` + note "mainnet gated").
- Pilot `CAS Energy` card có số liệu mẫu (solar kWh, periodId `2026/01 - 2026/06`).
- Dòng pháp lý nhẹ ở footer: `Phase 1 = Sepolia-only · Pilot gated · Mainnet requires legal readiness` — trình bày như footnote tin cậy, không dọa user.
- Không bịa TVL, APY, partner logo nếu chưa có thật. Thà để "Pilot metrics (sample)" còn hơn số giả.

## 1.6 Điều KHÔNG làm

- Không ví UC Yield như sàn/đầu tư lợi nhuận — đây là **data infrastructure**, không hứa lãi.
- Không dùng hình stock tiền/coin generic. Mọi visual phải là diagram dữ liệu, ledger, chain.
- Không quá 1 font display + 1 font body + 1 font mono (cho hash/địa chỉ).
