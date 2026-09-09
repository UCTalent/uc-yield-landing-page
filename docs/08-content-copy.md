# 08 — Content Copy (VI + EN, copy-paste vào Figma)

> Quy ước: mỗi khối ghi `VI:` rồi `EN:`. Hash/địa chỉ/period giữ nguyên. Nút chính luôn có `→`.

## Hero

- Badge — VI: `● Đang chạy trên Base Sepolia · Shadow Ledger v2` / EN: `● Live on Base Sepolia · Shadow Ledger v2`
- H1 — VI: `Hạ tầng dữ liệu real-yield / xác minh được / trên Base` (highlight dòng 2) / EN: `Verifiable real-yield / data infrastructure / on Base`
- Sub — VI: `Issuer commit hash xác định của dữ liệu vận hành lên smart contract. Dữ liệu thô không bao giờ on-chain — bất kỳ ai cũng có thể xác minh lại.` / EN: `Issuers commit deterministic hashes of operating data on-chain. Raw data never touches the chain — anyone can re-verify.`
- CTA1 — VI: `Dùng thử ngay →` / EN: `Try it now →` (đích `https://issuer.ucyield.com/dashboard?utm_source=landing`)
- CTA2 — VI: `Cách hoạt động ↓` / EN: `How it works ↓`
- Micro-trust — VI: `Không giữ private key · Hash xác định · Đã verify trên Basescan` / EN: `Non-custodial · Deterministic hashing · Verified on Basescan`
- Stats: `100% deterministic hashing` · `0 raw bytes on-chain` · `5 roles AccessControl` · `3 steps to commit` (giữ nguyên mọi ngôn ngữ)

## How it works

- H2 — VI: `Từ file dữ liệu đến commitment on-chain` / EN: `From raw file to on-chain commitment`
- Sub — VI: `Ba bước, ba phút, một hash duy nhất cho mỗi kỳ dữ liệu.` / EN: `Three steps, three minutes, one hash per data period.`
- Step 01 — VI: `Tải lên & chuẩn hóa` / `File metrics được chuẩn hóa thành bytes xác định, băm keccak256 thành Merkle root.` / EN: `Upload & canonicalize` / `Metrics are canonicalized into deterministic bytes, hashed with keccak256 into a Merkle root.`
- Step 02 — VI: `Ký & commit on-chain` / `Ví của issuer (CDP/MetaMask) ký giao dịch commitData, tự trả gas, nhận receipt.` / EN: `Sign & commit on-chain` / `The issuer wallet (CDP/MetaMask) signs commitData, pays its own gas, receives the receipt.`
- Step 03 — VI: `Xác minh & underwrite` / `Chạy lại lib hashing trên file gốc — khớp root là tin được.` / EN: `Verify & underwrite` / `Re-run the hashing lib on the raw file — matching root means trusted.`

## Features

- H2 — VI: `Vì sao investor tin được?` / EN: `Why investors can trust it`
- F1 — VI: `Commitment-first` / `On-chain chỉ lưu hash/root + metadata. Dữ liệu thô nằm off-chain, mã hóa AES-GCM.` / EN: `Commitment-first` / `On-chain stores only hash/root + metadata. Raw data stays off-chain, AES-GCM encrypted.`
- F2 — VI: `Xác định tuyệt đối` / `Cùng một input, cùng một hash — ở mọi nơi, mãi mãi.` / EN: `Absolute determinism` / `Same input, same hash — everywhere, forever.`
- F3 — VI: `Không giữ key` / `Private key không bao giờ chạm vào server của chúng tôi.` / EN: `Non-custodial` / `No private key ever touches our servers.`
- F4 — VI: `Mở rộng không đập đi xây lại` / `Thêm loại tài sản mới không đổi core — chỉ cần schemaVersion mới.` / EN: `Extensible without rewrites` / `New asset types need no core change — just a new schemaVersion.`
- Banner phụ — VI: `Đã chờ sẵn cho phase sau: vai trò Oracle consumer + attestation cho Chainlink/TEE.` / EN: `Ready for what's next: oracle consumer role + attestations for Chainlink/TEE.`

## Technology

- H2 — VI: `Xây bằng đồ thật, mở để kiểm chứng` / EN: `Built with real primitives, open to verify`
- Code tab: `commitData.sol` — snippet:
  ```solidity
  shadowLedger.commitData(
    assetType,      // "solar"
    projectId,      // "CAS-01"
    periodId,       // "2026/01 - 2026/06"
    root,           // 0x9f3a...c41d
    dataUriHash,    // keccak256(storageUri)
    schemaVersion   // "1.0.0"
  );
  ```
- Dưới code — VI: `Đã deploy: 0x… (Base Sepolia) · Đã verify ✓` / EN: `Deployed: 0x… (Base Sepolia) · Verified ✓`
- Nút — VI: `Xem contract ↗` / `Đọc tài liệu ↗` / EN: `View contract ↗` / `Read docs ↗`

## Pilot CAS Energy

- Chip — VI: `● Pilot — CAS Energy` / EN: `● Pilot — CAS Energy`
- H3 — VI: `Điện mặt trời: từ số kWh đến commitment on-chain` / EN: `Solar power: from kWh readings to on-chain commitment`
- Metrics: `1.284 MWh sản lượng` · `Kỳ 2026/01 – 2026/06` · `Root 0x9f…c41d ✓` / EN: `1.284 MWh output` · `Period 2026/01 – 2026/06` · `Root 0x9f…c41d ✓`
- Quote (placeholder) — VI: `"Chúng tôi muốn mỗi kỳ sản lượng đều có một hash để đối chiếu — không còn tranh cãi về số liệu."` / EN: `"We want every production period to have one hash to reconcile — no more disputes over numbers."`
- Disclaimer — VI: `Số liệu minh họa từ sample dataset — đang chờ mapping dữ liệu thật (UCY-26).` / EN: `Illustrative sample dataset — awaiting real export mapping (UCY-26).`

## FAQ (6 câu)

1. VI: `Đã lên mainnet chưa?` / `Chưa. Phase 1 chạy trên Base Sepolia. Mainnet cần legal readiness gate — xem footnote.` / EN: `Is it on mainnet?` / `Not yet. Phase 1 runs on Base Sepolia. Mainnet requires the legal readiness gate.`
2. VI: `Các bạn có giữ tiền hoặc private key của tôi không?` / `Không. Ví do bạn tự giữ (CDP/MetaMask), ký ngay trên máy bạn.` / EN: `Do you custody funds or keys?` / `No. You hold your own wallet (CDP/MetaMask) and sign locally.`
3. VI: `Dữ liệu thô của tôi nằm ở đâu?` / `Off-chain, mã hóa AES-GCM. On-chain chỉ có hash, Merkle root và metadata.` / EN: `Where is my raw data?` / `Off-chain, AES-GCM encrypted. On-chain holds only hash, Merkle root and metadata.`
4. VI: `Oracle và TEE đâu?` / `Là phase sau. Contract đã chừa sẵn vai trò oracle consumer và attestation.` / EN: `Where are oracles and TEE?` / `A later phase. The contract already reserves the oracle consumer role and attestations.`
5. VI: `Ai dùng issuer dashboard?` / `Đội ngũ issuer: upload dữ liệu, ký commit, xem lịch sử commitment.` / EN: `Who uses the issuer dashboard?` / `Issuer teams: upload data, sign commits, browse commitment history.`
6. VI: `Tôi xác minh độc lập thế nào?` / `Lấy file gốc + chạy lib hashing công khai — so root với on-chain trên Basescan.` / EN: `How do I verify independently?` / `Take the raw file + run the public hashing lib — compare the root with on-chain data on Basescan.`

## Final CTA + Footer

- H2 — VI: `Mang dữ liệu yield của bạn lên ledger.` / EN: `Bring your yield data on-ledger.`
- Sub — VI: `Testnet miễn phí · Không giữ key · 3 phút cho commitment đầu tiên.` / EN: `Free on testnet · No key custody · 3 minutes to your first commit.`
- Nút — VI: `Dùng thử ngay — Mở issuer dashboard →` / EN: `Try it now — Open issuer dashboard →`
- Footer tagline — VI: `Hạ tầng dữ liệu real-yield xác minh được trên Base.` / EN: `Verifiable real-yield data infrastructure on Base.`
- Footnote — VI: `Phase 1 = chỉ Sepolia · Pilot giới hạn · Mainnet cần legal readiness.` / EN: `Phase 1 = Sepolia-only · Gated pilot · Mainnet requires legal readiness.`
