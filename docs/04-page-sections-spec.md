# 04 — Page Sections Spec (FILE QUAN TRỌNG NHẤT)

> Thiết kế từ trên xuống dưới đúng thứ tự này. Mỗi section ghi rõ: **layout – nội dung hiển thị – visual sống động – animation**.
> Copy chữ đầy đủ lấy ở `08-content-copy.md`, ở đây chỉ ghi cấu trúc + ý đồ.

---

## S1 — Hero (`#top`, full viewport ~820px)

**Layout desktop:** 2 cột (text 55% trái / visual 45% phải). Mobile xếp chồng: text trước, visual sau.

**Trái — text:**
1. Badge pill trên cùng: `● Live on Base Sepolia` (dot xanh nhấp nháy) + divider + `Shadow Ledger v2`.
2. H1 (3 dòng, highlight gradient dòng 2): `Verifiable real-yield / data infrastructure / on Base` — chữ "real-yield" phủ gradient xanh→cyan.
3. Sub 2 dòng: giải thích commitment-first, raw data không on-chain (lấy nguyên văn ở file 08).
4. Cụm 2 nút: `[Dùng thử ngay →]` gradient + `[Cách hoạt động ↓]` outline.
5. Dòng micro-trust: `✓ Non-custodial · ✓ Deterministic hashing · ✓ Verified on Basescan` (icon check xanh, chữ muted 14px).

**Phải — ledger visual (linh hồn của hero, phải sống động):**
- Card glass lớn tiêu đề `Shadow Ledger — Live commitments`: 3 dòng commitment mẫu (`CAS-SOLAR · 2026/01-06 · 0x9f…c41d · Verified ✓`), mỗi dòng có status chip xanh.
- Từ card tỏa 1 đường nối phát sáng xuống card nhỏ `Base Sepolia · Block #21,448,903` + logo Base.
- Góc card bay 2 chip mono nhỏ: `keccak256` và `Merkle root` (float animation lên xuống 6px, delay khác nhau).
- Nền sau card: blob glow xanh + grid perspective.

**Stats row dưới hero (4 số, counter đếm lên khi scroll tới):**
`100% deterministic hashing` · `0 raw bytes on-chain` · `5 roles AccessControl` · `3 steps to commit`
Trình bày số lớn 32px trắng + label muted. Số đếm animation 1.2s ease-out.

**Animation:** badge fade → H1 từng dòng slide-up stagger 120ms → nút pop → visual card float + dash chạy trên đường nối (CSS/SVG dashoffset loop).

---

## S2 — Trust bar (dải ngang, nền `bg-900`)

Một hàng logo/text muted chạy marquee chậm (30s/vòng, pause khi hover):
`BASE · BASESCAN VERIFIED · SHADOW LEDGER · NON-CUSTODIAL · DETERMINISTIC HASHING · AES-GCM OFF-CHAIN · CAS ENERGY PILOT`
Mỗi item cách nhau dấu ✦ vàng nhỏ. Không dùng logo thương hiệu chưa được phép — chỉ text + logo Base.

---

## S3 — How it works (`#how-it-works`, 3 bước)

**Layout:** H2 giữa + sub + 3 cards ngang nối nhau bằng đường glow có dot chạy (desktop). Mobile thành dọc, đường nối xoay dọc.

| Step | Icon | Tiêu đề | Mô tả 1 câu + mock mini |
|---|---|---|---|
| 01 Upload | `upload-cloud` | Upload & chuẩn hóa | File metrics → canonical bytes → `keccak256`. Mock: thanh progress + chuỗi hex hiện dần |
| 02 Commit | `pen-line` | Ký & commit on-chain | Ví CDP/MetaMask ký `commitData`, trả phí gas, nhận receipt. Mock: nút Sign + chip `Block confirmed` |
| 03 Verify | `shield-check` | Xác minh & underwrite | Bất kỳ ai cũng re-hash file gốc để đối chiếu root. Mock: `✓ hash match` |

Mỗi card: số step mono lớn mờ nền (`01`), icon trong ô glow, hover nâng 4px + viền sáng. Đường nối: SVG dashed animated.

---

## S4 — Features (`#features`, 4 cards 2×2)

H2: `Vì sao investor tin được?` + sub commitment-first.

| Card | Icon | Tiêu đề | Visual mini trong card |
|---|---|---|---|
| Commitment-first | `layers` | On-chain chỉ hash, không dữ liệu thô | Diagram: file (gạch chéo lên chain) vs hash (mũi tên lên chain) |
| Deterministic | `fingerprint` | Cùng input → cùng hash, mãi mãi | 2 input giống nhau → 2 hash giống nhau highlight |
| Non-custodial | `key-round` | Không ai giữ private key của bạn | Icon ví + dòng `Keys stay in your wallet` + dấu cấm server |
| Extensible | `puzzle` | Thêm asset không đổi core | Chip `solar` `agri` `+ more` + tag `schemaVersion` |

Card glass, icon ô vuông gradient viền, hover glow. Hàng dưới 4 card là banner mỏng: `Hợp đồng dự phòng Oracle/TEE: ORACLE_CONSUMER_ROLE + attachAttestation đã chờ sẵn →` (thể hiện tầm nhìn, muted).

---

## S5 — Technology (`#technology`, 2 cột + code)

**Trái:** H2 `Xây bằng đồ thật, mở để kiểm chứng` + 2 khối:
- Khối 1 `packages/hashing — UCY-19`: chips `canonicalize()` `keccak256` `Merkle root`, dòng `purity: zero internal deps`.
- Khối 2 `ShadowLedger.sol — UCY-21`: chips `AccessControl` `commitData` `markOracleVerified`, badge `OpenZeppelin`.
- 2 nút outline: `[View contract ↗]` `[Read docs ↗]`.

**Phải:** code window dark (mac dots + tab `commitData.sol`): snippet Solidity 8–10 dòng gọi `commitData` (lấy ở file 08), highlight dòng `root`, nút copy góc. Dưới là dòng `Deployed: 0x… (Base Sepolia) · Verified ✓`.

**Nền:** grid mờ + 1 đường chain node trang trí.

---

## S6 — Pilot (`#pilot`, CAS Energy — proof thật)

**Layout:** card lớn 2 cột: ảnh solar farm (duotone xanh, bo 20px, overlay gradient) + nội dung:
- Chip vàng `● Pilot — CAS Energy`.
- H3 `Điện mặt trời: từ số kWh đến commitment on-chain`.
- 3 metric dạng hàng: `Sản lượng 1.284 MWh` · `Kỳ 2026/01 – 2026/06` · `Root 0x9f…c41d ✓`.
- Quote 1 câu của pilot (italic, dấu ngoặc kép lớn mờ nền) — tạm dùng placeholder, chờ wording thật.
- Nút `[Mở issuer dashboard →]` (lại CTA chính, không tạo kiểu mới).

Dưới card: disclaimer nhỏ `Số liệu minh họa từ sample dataset (solar.json) — awaiting real export mapping (UCY-26)`.

---

## S7 — Live ticker (dải ngang sống động, không cần data thật)

Dải marquee 2 hàng ngược chiều, card mono nhỏ:
`DataCommitted · CAS-SOLAR · 0x9f…c41d · ✓` / `Attestation attached · ORACLE_CONSUMER · ⏳` ...
Tốc độ chậm, blur 2 mép, nền `bg-950`. Ghi chú cho dev sau: thay bằng event thật khi có indexer (UCY-23). Designer chỉ cần làm đẹp chuyển động.

---

## S8 — FAQ (`#faq`, accordion 2 cột: hỏi trái? — chọn 1 cột giữa max 760px)

H2 `Câu hỏi investor hay hỏi` + accordion 6 câu (copy ở file 08):
1. Mainnet chưa? 2. Các bạn có giữ tiền/key tôi không? 3. Dữ liệu thô ở đâu? 4. Oracle/TEE đâu? 5. Ai dùng dashboard? 6. Tôi xác minh độc lập thế nào?
- Item: radius 16px, border subtle, mở ra có answer + link nhỏ (Basescan/docs). Icon `plus` xoay 45° khi mở. Chỉ mở 1 item tại a time.

---

## S9 — Final CTA (`#cta`, banner gradient lớn)

Card full-width bo 28px, nền gradient xanh→cyan + mesh tối + grid trắng 6%:
- H2 trắng 44px: `Mang dữ liệu yield của bạn lên ledger.` + sub trắng 80%.
- Nút trắng nền (duy nhất trên trang nút trắng): `[Dùng thử ngay — Mở issuer dashboard →]` chữ xanh đậm.
- Dưới nút: `Free on testnet · No wallet custody · 3 minutes to first commit` (kèm icon check trắng).
- 2 chip mono trang trí góc: `commitData(...)` và `root: 0x…`.

---

## S10 — Footer (xem IA file 02 §2.4)

Nền `bg-900`, đỉnh có divider glow gradient 1px. Cột brand có logo + badge `Built on Base` + dot status `All systems operational` xanh nhấp nháy. Bottom bar footnote pháp lý 13px muted.
