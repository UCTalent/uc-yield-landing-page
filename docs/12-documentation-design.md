# Documentation — nghiên cứu sản phẩm và thiết kế

Ngày đối chiếu: 04/10/2026. Task: thiết kế và xây mục documentation trong `uc-yield-landing-page`.
Nguồn sản phẩm: `/Users/admin/repos/uctalents/ucyield`, branch `feat/ucy-completion`, HEAD `67ebd977`.
Landing baseline: `61e45ee`. Mã nguồn sản phẩm được khảo sát chỉ đọc; không thay API, DB hoặc chain.

## 1. Kết luận nghiên cứu

UCYield là hạ tầng dữ liệu vận hành có thể kiểm chứng trên Base. Shadow Ledger là dòng sản phẩm
đang phát triển. Các package hashing/verifier và luồng ingest → commit off-chain → verify → anchor
là trục nội dung public. Module phát hành RWA/B20, investor portal và các phần tài chính trong
monorepo không nên trở thành hướng dẫn bắt đầu của documentation mới.

Không thể dùng một tài liệu cũ làm đại diện toàn bộ hệ thống. PRD gốc mô tả CRE/Chainlink và GCP/TEE;
ADR-0031 chuyển lời khẳng định sản phẩm sang UCYield Verified, bỏ CRE/Nitro khỏi đường sản phẩm
hiện hành. ADR-0032, 0034–0039 tiếp tục thay đổi lifecycle, trust, commit độc lập và recovery.
Đối chiếu ADR và implementation là điều bắt buộc khi biên tập bài mới.

### Những khác biệt quan trọng đã đối chiếu

| Chủ đề | Nguồn / điều đọc được | Cách đưa vào docs |
|---|---|---|
| Định vị | PRD, docs/README, ADR-0022 | Verifiable real-yield data infrastructure, không dẫn người đọc vào issuance cũ |
| Verified | ADR-0031, verifier/verify-record.ts | Tính toàn vẹn và khả năng tái tạo; không chứng minh số đầu vào là thật |
| Phí / chữ ký | ADR-0031, anchor-batches.controller.ts | IssuerAdmin ký đồng ý qua CDP, platform chi trả giao dịch |
| Quyền dữ liệu | PlantAccessService, record-l2-reader | Tenant + membership + plant scope; chain metadata công khai |
| Upload | shadow-ledger.controller.ts, schema-v2.ts | JSON ≤ 1.000.000 byte; 1–12 tháng; plantCode phải khớp |
| Hash | canonicalize.ts, hash-v2.ts, spec ucy-hash-v2 | Header + periods + salts; raw upload đơn lẻ không tái tạo được root |
| Registry | RecordIngestService, evidence builder | Snapshot tại ingest; không lấy dictionary hiện tại thay snapshot lịch sử |
| Ledger v3 | ShadowLedgerV3.sol, ADR-0034, config | Đã có code; runtime mặc định v2; không tự nhận v3 đã live |
| Tạm tính | provisional.ts, ADR-0034 amendment | Cố định theo ingestedAt/timezone; không neo; phải ingest lại sau tháng đóng |
| Chồng tháng | contract v3, period slot / period label code | Theo v3; nhãn thay đổi không chặn; lịch sử sequence |
| Recovery | ADR-0036, state helpers | Hạ tầng unavailable không thành bằng chứng fail; hết retry cần phục hồi |
| CLI | verifier/cli.ts và package.json | Chạy trong workspace private, trust độc lập; RPC + ledger pin để kiểm chain |
| CSV/XLSX | packages/ingest; controller JSON-only; kế hoạch v3 | Thư viện / backlog khác với endpoint đã sử dụng được |
| Source replay | ADR-0035, PLAN-independent §2 D-C | Chưa khẳng định bundle hiện hành replay đầy đủ source → metrics |
| Triển khai | config, WORKLOG-core-flow, deployment docs | Không có kết quả live đủ để chứng nhận deployment v3 trong lần đọc này |
| Phạm vi Phase 2 | architecture/08, AGENTS | Mainnet / tài chính có cổng riêng, không đưa vào quickstart |

### Bản đồ hệ thống phục vụ nội dung

- `apps/api`: NestJS modular monolith; Shadow Ledger controller, command handler, reader, fetch,
  relay/indexer, workers; Prisma/PostgreSQL; audit và outbox cùng transaction.
- `apps/issuer-dashboard`: Next.js UI; upload, các milestone của record, anchor flow, viewer,
  evidence download và `/verify`; i18n vi-first.
- `apps/investor-portal`: dòng issuance cũ, không là lối vào tài liệu Shadow Ledger mới.
- `packages/shared`, `domain`, `infrastructure`, `contracts`: errors, pure domain, adapters và Zod.
- `packages/hashing`: strict parser, canonicalization, decimals, registry, salts, Merkle và roots.
- `packages/verifier`: evidence schema, seal/receipt verification, C1–C10, RPC reader và CLI.
- `packages/ingest`: parsers và provider mapping; khả dụng của từng endpoint cần xác minh riêng.
- `contracts/`: ledger v2/v3, forwarder, AccessControl; hoạt động live phụ thuộc deployment/cutover.
- `deploy/`, `docs/architecture/01..06 + 08`: deployment/tenancy, security, CQRS, outbox, chain safety
  và cổng pháp lý; public docs giữ thông tin cần cho việc sử dụng, không đưa secret/runbook admin vào UI.

### Giới hạn khảo sát

Khảo sát tập trung vào bản đồ monorepo, tài liệu định vị/kiến trúc/ADR và source paths của các luồng
công khai sẽ viết docs. Đây không phải audit từng dòng của mọi file, vendored dependency hoặc
chứng nhận production. Không đọc `.env`, không truy cập DB/provider/RPC thật. Source review không
thay thế smoke live. WORKLOG live chưa đủ bằng chứng để gọi v3 là deployed.

## 2. Information architecture

`/docs` là trang định hướng. VI mặc định URL sạch; EN `/en/docs`. Slug giống nhau ở hai ngôn ngữ
để đổi locale vẫn ở đúng bài. 16 bài trong 6 nhóm:

| Nhóm | Route dưới /docs | Mục tiêu |
|---|---|---|
| Bắt đầu | introduction, quickstart | Hiểu sản phẩm và có bản ghi đầu tiên |
| Khái niệm | shadow-ledger, record-lifecycle, privacy | Đọc root, state và quyền dữ liệu |
| Hướng dẫn issuer | upload-data, provider-ingestion, team-access | Thao tác có ngữ cảnh, dữ liệu hợp lệ |
| Kiểm chứng | ucyield-verified, independent-verification | Hiểu đúng lời khẳng định và kiểm lại bằng chứng |
| Tham chiếu | hashing, api, smart-contracts, architecture | Nối thuật toán, endpoint và contract |
| Tài nguyên | scope-and-roadmap, glossary | Phạm vi khả dụng và thuật ngữ |

Ba lối vào theo công việc: issuer → quickstart; reviewer → independent-verification; developer → api.
Không chia theo sơ đồ thư mục repo; source paths nằm trong disclosure cuối bài cho reviewer.
API page là bản đồ endpoint có attribution, chưa là interactive OpenAPI explorer. Một reference
đầy đủ nên sinh từ `packages/contracts`/`docs/api/openapi.yaml` khi có cơ chế xuất bản contract ổn định.

## 3. Thiết kế giao diện

Giữ brand dark navy/Base blue của landing; bỏ chuyển động liên tục khỏi trải nghiệm đọc. Nền
`#070e1c`, lớp panel `#0c1628`, viền trầm, màu text có độ tương phản tốt. Dùng đúng font hiện có:
Space Grotesk cho heading, Inter cho nội dung, JetBrains Mono cho code.

- Header sticky: logo, nhãn Tài liệu, search, đổi VI/EN và dashboard CTA.
- Desktop sidebar 244px: overview, 6 nhóm route, active state, network và link về website.
- Overview: tiêu đề hai dòng, CTA bắt đầu, featured quickstart + diagram 4 bước, 3 lối vào và
  index dạng hàng để quét nhanh. Diagram ghi rõ minh họa, không giả dashboard live.
- Article: breadcrumb, tiêu đề, mô tả, thời gian đọc, ngày đối chiếu nguồn, version notice,
  nội dung dạng section, bảng có header semantic, code copy, source disclosure, previous/next.
- Desktop rộng: mục lục sticky bên phải; dưới 1250px dùng disclosure mục lục trong bài.
- Dưới 1024px: sidebar thành drawer, focus trap/Escape/close qua Base UI Dialog.
- Mobile: search icon có accessible name, đổi locale luôn hiện; cards/rows về một cột,
  code/bảng cuộn ngang trong khung, không làm trang tràn.
- Search: tiêu đề + mô tả + nội dung; bỏ dấu tiếng Việt/đ, xếp hạng title trước, tối đa 12 kết quả.
  `⌘/Ctrl K`, Escape, Tab và Enter để thao tác; không gọi dịch vụ search bên ngoài.
- Accessibility: skip link, h1 duy nhất, nav có nhãn, aria-current, focus ring, dialog focus trap,
  code-copy feedback, tôn trọng reduced motion.

## 4. Triển khai và duy trì

Không thêm CMS/MDX dependency. Nội dung bilingual có cấu trúc trong `messages/docs/{vi,en}.json`;
copy UI trong `messages/{vi,en}.json` namespace Docs. Đọc content phía server ở `src/server/docs.ts`.
Route optional catch-all prerender overview + 16 bài mỗi locale. Client chỉ dành cho tương tác.

Khi thêm bài: thêm cùng slug/group/section IDs ở VI/EN; thêm attribution đúng nguồn; nội dung mới
phải phân biệt code-reviewed và live-confirmed. Search/sidebar/sitemap/static params tự lấy từ
catalog. Code example được render như text và sao chép nguyên bytes, không đưa qua ICU.

SEO: mỗi route có title, description, canonical, hreflang vi/en, OpenGraph/Twitter riêng; sitemap
bao gồm các route docs và sửa URL VI home từ `/vi` về `/`. Proxy cần matcher `/docs/:path*` để URL
VI sạch hoạt động. Landing có docs entry tại header mobile/desktop, technology CTA và footer.

User yêu cầu mở rộng docs supersedes quy tắc one-pager cũ ở `02-information-architecture.md`.
Scope ghi ở tài liệu này; không thay cấu trúc sản phẩm hay API UCYield.

**SCOPE-CHANGE — 2026-10-04:** Theo yêu cầu trực tiếp của người dùng, mở rộng landing one-pager
thành website có khu documentation tại `/docs` và `/en/docs`. Thay đổi chỉ trong repo landing;
không mở rộng Phase 1, module issuance hoặc khả năng API của sản phẩm.

## 5. Những việc biên tập nên tiếp tục

1. Sau xác nhận live/cutover, ghi ledger address/version và ngày kiểm tra thật; cập nhật availability.
2. Xuất API reference từ OpenAPI thay vì chép payload bằng tay.
3. Bổ sung walkthrough có ảnh dashboard đã kiểm chứng, FAQ lỗi theo mã thật, hướng dẫn provider
   theo endpoint/UI được ship; tài liệu này đã có trang đầu cho các chủ đề đó.
4. Đồng bộ copy landing cũ: TrustBar, HowItWorks, Features, Technology, FAQ và CTA vẫn có câu CRE/
   Oracle/self-paid; CodeWindow dùng địa chỉ/ABI thế hệ cũ. Đợt này nối docs nhưng chưa viết lại
   toàn bộ nội dung marketing. Không lấy các claim cũ đó làm nguồn cho bài docs mới.
5. Một quy trình review nội dung nên kiểm source commit, trạng thái ship và VI/EN cùng lần cập nhật.

## 6. Validation

Các gate và bằng chứng browser cuối task được ghi ở `.agent/HANDOFF.md`. Static website không có
PostgreSQL/API integration suite; không chạy migration hay suite ucyield khi không sửa monorepo.
Kiểm content parity, route/anchor uniqueness và search bằng `pnpm test`; lint/typecheck/build ở repo
landing. Browser kiểm VI/EN, tìm kiếm, điều hướng bài, drawer/mục lục mobile và không tràn ngang.
