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
  metadataBase: new URL('https://the-first-semester.vercel.app'),
  title: 'Semester I, unit by unit, in 3D · LNJPIT Chapra',
  description:
    'Interactive 3D notebook study platform for B.Tech Mathematics & Computing (Semester I, Group A) at LNJPIT Chapra. 100% offline-first with KaTeX derivations and AI tutor.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/logo.png', sizes: '512x512', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/logo.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/logo.svg'],
  },
  openGraph: {
    title: 'The First Semester — Unit by Unit, in 3D',
    description:
      'Official interactive 3D study companion for B.Tech Mathematics & Computing at LNJPIT Chapra. Live syllabus notes, KaTeX formulas, and multimodal AI tutor.',
    url: 'https://the-first-semester.vercel.app',
    siteName: 'The First Semester',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'The First Semester Application Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'The First Semester — Unit by Unit, in 3D',
    description:
      'Official study companion for B.Tech Mathematics & Computing at LNJPIT Chapra. Live on Vercel.',
    images: ['/logo.png'],
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
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className={`${inter.className} font-sans bg-paper text-ink antialiased`}>
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}
