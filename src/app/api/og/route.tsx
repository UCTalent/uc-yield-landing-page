import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'UC Yield';
      
    const hasDesc = searchParams.has('desc');
    const desc = hasDesc
      ? searchParams.get('desc')?.slice(0, 200)
      : 'The First Verifiable Data Protocol for Real-World Assets';

    const origin = request.nextUrl.origin;
    const logoUrl = `${origin}/thumnail_logo.png`;

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
            <img src={logoUrl} width="120" height="120" style={{ borderRadius: 16 }} />
          </div>
          
          <h1 style={{ fontSize: 64, fontWeight: 'bold', margin: 0, fontFamily: 'sans-serif', textAlign: 'center' }}>
            {title}
          </h1>

          <p style={{ fontSize: 32, textAlign: 'center', color: '#93A1C0', maxWidth: 800, marginTop: 24 }}>
            {desc}
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
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error('Error generating OG image:', e);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
