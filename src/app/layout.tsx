import type { Metadata, Viewport } from 'next';
import './globals.css';
import 'katex/dist/katex.min.css';
import { Inter, Caveat } from 'next/font/google';
import { ServiceWorkerRegistration } from '@/components/pwa/ServiceWorkerRegistration';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Semester I, unit by unit, in 3D · LNJPIT Chapra',
  description:
    'Interactive 3D notebook study platform for B.Tech Mathematics & Computing (Semester I, Group A) at LNJPIT Chapra.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/icons/icon.svg', type: 'image/svg+xml' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'LNJPIT Sem 1',
  },
};

export const viewport: Viewport = {
  themeColor: '#f6f0e1',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${caveat.variable}`}>
      <head>
        <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.className} font-sans bg-paper text-ink antialiased`}>
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}
