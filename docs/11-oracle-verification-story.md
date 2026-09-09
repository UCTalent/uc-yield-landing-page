# Chainlink CRE Oracle Verification Story

## 1. Source of Truth (Codebase Implementation)
The current UI story represents the exact state of the `packages/cre/oracle-verify-workflow/` simulator implementation.
- **Trigger**: HTTP trigger receives a JSON payload containing the `{commitmentId}`.
- **Workflow**: The Chainlink CRE workflow takes the `commitmentId`, ABI encodes it, and sends a dummy report through a forwarder to the `OracleConsumer` contract.
- **On-chain State**: `OracleConsumer._processReport` decodes the dummy payload and executes `ShadowLedger.markOracleVerified(commitmentId)`.
- **Indexing**: This emits a `CommitmentOracleVerified` event, which the backend indexer picks up (60s poll) and maps to the dashboard, tagging it as "Oracle-verified ✓".
- **Limitations & Integrity**: We do NOT claim that this is live on full DON consensus mainnet yet. We strictly declare that the current implementation is running on a **Testnet Pilot via Local Simulator**, and that "Mainnet verification pending DON deployment." We do not make false claims about audited status or mainnet availability.

## 2. 4-Stage Lifecycle Story
The entire landing page must reflect a 4-step lifecycle instead of the previous 3-step model:
1. **Upload**
2. **Commit** (Status: `DataCommitted`)
3. **Oracle Verify** (Status: `OracleVerified`)
4. **Underwrite**

## 3. Approved UI Copy (VI / EN)
- **Features Banner**: `Mạng lưới Oracle Verification (Chainlink CRE) · Decentralized verification →` / `Oracle Verification Network (Chainlink CRE) · Decentralized verification →`
- **FAQ q4**: Explain how the Oracle Verification is performed and admit the testnet pilot simulator limitations: "The CRE workflow calls the on-chain OracleConsumer and seals the OracleVerified status. Currently running on testnet pilot via local simulator; mainnet will use full DON consensus."
- **Testnet Pilot Chip**: "Oracle verification — live on testnet pilot" / "Xác minh oracle — đang chạy pilot trên testnet", with a footnote: "Mainnet verification pending DON deployment."
- **TrustBar**: Add `ORACLE-VERIFIED BY CHAINLINK CRE`.
- **Ticker Feed**: Add an interwoven row that states `CommitmentOracleVerified · CAS-SOLAR · #id · ✓`.
- **Ledger Card**: Show `OracleVerified ✓` status in cyan instead of just `Verified ✓` for relevant periods.

## 4. Simulator Integrity Check
- Do not claim "DON consensus live".
- Do not make up fake verified numbers.
- Clarify testnet pilot whenever relevant.
