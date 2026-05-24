/**
 * @file layout.tsx
 * @description Root layout for the PIX simulator Next.js app, setting Spanish locale, dark theme provider and global font/CSS for every route.
 * @author Miguel Ángel Rico
 * @project MIPIT-PoC — Cross-border Instant Payments Middleware
 */
import type { Metadata } from 'next';
import { ThemeProvider } from '../components/theme-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'PIX Mock Simulator',
  description: 'Simulador de transacciones PIX',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
