import { KumaRegistry } from '@kuma-ui/next-plugin/registry';
import '@repo/ui/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Playground',
  description: 'My first monorepo playground',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <KumaRegistry>{children}</KumaRegistry>
      </body>
    </html>
  );
}
