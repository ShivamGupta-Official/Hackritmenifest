import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ContentOS — AI Content & Growth Intelligence Operating System',
  description: 'Evidence-driven marketing intelligence operating system. Connect organic content, audience signals, Content DNA, and advertising campaigns into a continuous growth loop.',
  keywords: ['ContentOS', 'Growth Intelligence', 'Content DNA', 'AI Marketing Brain', 'Marketing Attribution'],
  authors: [{ name: 'ContentOS Team' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
