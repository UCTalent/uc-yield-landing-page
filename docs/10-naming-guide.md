# Naming Glossary & Content Rules

## 1. UI Copy Renaming Table
These replacements must be strictly applied across the entire landing page UI to maintain a premium and professional image. Internal jargon and tracking codes are strictly prohibited in user-facing text.

| Old (Internal / Previous) | New (Production / Verified) | Location / Context |
|---|---|---|
| `packages/hashing` / `UCY-19` | Deterministic Hashing Engine | Technology block 1, docs |
| `ShadowLedger.sol` / `UCY-21` | Shadow Ledger Registry | Technology block 2, docs |
| `UCY-22 flow` | Upload & Commit | N/A (Keep internal docs only) |
| `UCY-26` | `pilot dataset · production mapping in progress` | Pilot disclaimer |
| `purity: zero internal deps` | `Self-contained engine — no internal dependencies` | Technology block 1 purity |
| `ORACLE_CONSUMER_ROLE` / `attachAttestation` | `Oracle Verification Network` | Features banner, FAQ |
| `5 roles AccessControl` | `5 role-based access roles` | Stats |

## 2. Content Rules & Guidelines
1. **No Jira/Internal Codes:** Internal ticket numbers like `UCY-19`, `UCY-21` must **never** appear on the UI. They should only be used in internal documentation, PRs, and commits.
2. **Technical Details are Code Chips Only:** Contract paths (`packages/hashing`, `ShadowLedger.sol`), constants (`ORACLE_CONSUMER_ROLE`), and function names (`commitData()`, `markOracleVerified()`) should only be rendered in mono-spaced code chips (`font-mono text-[13px]`) or Code Windows. **Never use them in headlines, banners, or paragraph text.**
3. **Consistent Naming:** If you need to refer to a new feature, consult this glossary first. Do not invent new terms.
4. **Professional Tone:** Avoid highly developer-centric slang ("purity", "deps") in consumer-facing features. Instead, translate it to professional engineering terms ("self-contained", "dependencies").
