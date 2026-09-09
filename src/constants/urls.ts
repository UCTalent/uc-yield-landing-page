export const ISSUER_URL = "https://issuer.ucyield.com";

export function issuerHref(path: string, utmSource: string = "landing") {
  return `${ISSUER_URL}${path}?utm_source=${utmSource}`;
}
