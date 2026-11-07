export const ISSUER_URL = "https://issuer.ucyield.com";

export function issuerHref(path: string, utmSource: string = "landing") {
  return `${ISSUER_URL}${path}?utm_source=${utmSource}`;
}

// ShadowLedgerV3 on Base Sepolia (ucyield docs/deployments.md). Older ledgers 0x0DC9…, 0x381B… are retired.
export const LEDGER_ADDRESS = "0x43708854b2A6AF7b1AbdF6569C4958eFe5dE5B0a";
export const LEDGER_SHORT = "0x4370…5B0a";
export const LEDGER_BASESCAN_URL = `https://sepolia.basescan.org/address/${LEDGER_ADDRESS}`;
