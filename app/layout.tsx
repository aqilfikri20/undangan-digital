import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'UndangYuk — Buat undangan jadi cerita',
  description: 'Buat undangan digital yang terasa seperti kamu.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
