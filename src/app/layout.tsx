import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Semester I, unit by unit, in 3D · LNJPIT Chapra',
  description:
    'Interactive 3D notebook study platform for B.Tech Mathematics & Computing (Semester I, Group A) at LNJPIT Chapra.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
