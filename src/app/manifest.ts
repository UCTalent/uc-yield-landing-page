import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'UC Yield - The Transparent RWA Protocol',
    short_name: 'UC Yield',
    description: '100% transparent Real-World Assets verification protocol.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050B18',
    theme_color: '#050B18',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
