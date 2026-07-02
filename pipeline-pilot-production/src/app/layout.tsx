import type { Metadata, Viewport } from 'next';
import { DM_Sans, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: {
    default: 'Pipeline Pilot — Sales Operations Platform',
    template: '%s · Pipeline Pilot',
  },
  description:
    'Pipeline Pilot is a premium sales operations dashboard for revenue leaders — pipeline, forecasting, deals, customers, and team performance in one workspace.',
  applicationName: 'Pipeline Pilot',
  authors: [{ name: 'Pipeline Pilot' }],
  keywords: [
    'sales operations',
    'pipeline',
    'forecasting',
    'CRM',
    'revenue',
    'quota',
    'deals',
    'saas',
  ],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'Pipeline Pilot — Sales Operations Platform',
    description:
      'Premium sales operations dashboard for revenue leaders. Pipeline, forecasting, deals, customers and team performance in one workspace.',
    type: 'website',
    siteName: 'Pipeline Pilot',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#171717' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
