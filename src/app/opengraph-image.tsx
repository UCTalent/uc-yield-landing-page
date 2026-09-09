import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
export const alt = 'UC Yield - Transparent RWA Protocol';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #050B18, #0A1428)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#F2F6FF',
          padding: 80,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 40 }}>
          <div style={{ display: 'flex', width: 64, height: 64, borderRadius: 16, background: 'linear-gradient(to right, #0052FF, #00D4FF)' }}></div>
          <h1 style={{ fontSize: 64, fontWeight: 'bold', margin: 0, fontFamily: 'sans-serif' }}>UC Yield</h1>
        </div>
        <p style={{ fontSize: 32, textAlign: 'center', color: '#93A1C0', maxWidth: 800 }}>
          The First Verifiable Data Protocol for Real-World Assets
        </p>
        <div style={{ display: 'flex', gap: 20, marginTop: 40 }}>
          <div style={{ padding: '8px 24px', background: 'rgba(255,255,255,0.1)', borderRadius: 100, border: '1px solid rgba(255,255,255,0.2)', fontSize: 24, display: 'flex' }}>
            Base Sepolia
          </div>
          <div style={{ padding: '8px 24px', background: 'rgba(34, 197, 94, 0.2)', color: '#22C55E', borderRadius: 100, border: '1px solid rgba(34, 197, 94, 0.4)', fontSize: 24, display: 'flex' }}>
            Live
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
