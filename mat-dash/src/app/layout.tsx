import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import './css/globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import SiteLoader from './components/loaders/SiteLoader'

const manrope = Manrope({ subsets: ["latin"] });

const BASE_URL = 'https://mtverse.dev'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'mtverse — Modern Admin Dashboard & UI Kit',
    template: '%s | mtverse',
  },
  description: 'mtverse is a premium modern admin dashboard built with Next.js 16, React 19, Tailwind CSS 4, and shadcn/ui. 96+ pages, 25+ components, full dark mode, charts, tables, forms, ecommerce, kanban, chat, calendar, and more. Production-ready, fully responsive, accessible.',
  keywords: [
    // English
    'admin dashboard', 'admin template', 'dashboard ui kit', 'nextjs dashboard', 'react dashboard',
    'tailwind dashboard', 'shadcn ui', 'saas dashboard', 'analytics dashboard', 'crm dashboard',
    'ecommerce dashboard', 'admin panel', 'control panel', 'backend ui', 'management system',
    'ui components', 'chart library', 'data table', 'kanban board', 'chat application',
    'calendar app', 'invoice generator', 'forms', 'authentication', 'dark mode dashboard',
    'responsive admin', 'premium dashboard', 'modern ui', 'dashboard template', 'web app template',
    // Spanish
    'panel de administración', 'plantilla dashboard', 'panel admin', 'sistema de gestión',
    // French
    'tableau de bord', 'panneau d administration', 'modèle dashboard',
    // German
    'admin dashboard vorlage', 'verwaltungspanel', 'bedienfeld',
    // Portuguese
    'painel administrativo', 'modelo dashboard', 'painel de controle',
    // Italian
    'pannello di amministrazione', 'modello dashboard',
    // Russian
    'админ панель', 'панель управления', 'дашборд',
    // Chinese
    '管理后台', '仪表盘', '后台模板',
    // Japanese
    '管理パネル', 'ダッシュボード', '管理画面',
    // Korean
    '관리자 패널', '대시보드', '관리자 대시보드',
    // Arabic
    'لوحة التحكم', 'لوحة الإدارة', 'قالب لوحة التحكم',
    // Hindi
    'एडमिन पैनल', 'डैशबोर्ड', 'प्रबंधन प्रणाली',
    // Turkish
    'yönetim paneli', 'kontrol paneli', 'gösterge paneli',
    // Dutch
    'beheerdersdashboard', 'configuratiescherm',
    // Polish
    'panel administracyjny', 'pulpit nawigacyjny',
    // Swedish
    'adminpanel', 'instrumentpanel',
    // Brand
    'mtverse', 'mt verse', 'mtverse dashboard', 'mtverse ui kit',
  ],
  authors: [{ name: 'mtverse' }],
  creator: 'mtverse',
  publisher: 'mtverse',
  applicationName: 'mtverse',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      'en': BASE_URL,
      'es': `${BASE_URL}/es`,
      'fr': `${BASE_URL}/fr`,
      'de': `${BASE_URL}/de`,
      'pt': `${BASE_URL}/pt`,
      'it': `${BASE_URL}/it`,
      'ru': `${BASE_URL}/ru`,
      'zh': `${BASE_URL}/zh`,
      'ja': `${BASE_URL}/ja`,
      'ko': `${BASE_URL}/ko`,
      'ar': `${BASE_URL}/ar`,
      'hi': `${BASE_URL}/hi`,
      'tr': `${BASE_URL}/tr`,
      'nl': `${BASE_URL}/nl`,
      'pl': `${BASE_URL}/pl`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_ES', 'fr_FR', 'de_DE', 'pt_BR', 'it_IT', 'ru_RU', 'zh_CN', 'ja_JP', 'ko_KR', 'ar_AR', 'hi_IN', 'tr_TR', 'nl_NL', 'pl_PL'],
    url: BASE_URL,
    siteName: 'mtverse',
    title: 'mtverse — Modern Admin Dashboard & UI Kit',
    description: 'Premium admin dashboard with 96+ pages, 25+ components, dark mode, charts, tables, forms, ecommerce, kanban, chat, calendar. Production-ready Next.js 16 + React 19 + Tailwind CSS 4.',
    images: [
      {
        url: '/images/logos/mtverse-logo.png',
        width: 512,
        height: 512,
        alt: 'mtverse dashboard logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'mtverse — Modern Admin Dashboard & UI Kit',
    description: 'Premium admin dashboard with 96+ pages, 25+ components, dark mode, charts, tables, forms, ecommerce, kanban, chat, calendar. Production-ready.',
    images: ['/images/logos/mtverse-logo.png'],
    creator: '@mtverse',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/favicon.png', sizes: '512x512' },
    ],
    shortcut: ['/favicon.png'],
  },
  category: 'technology',
  classification: 'Admin Dashboard, UI Kit, Web Application Template',
  other: {
    'theme-color': '#237DD9',
    'color-scheme': 'light dark',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'mtverse',
    'mobile-web-app-capable': 'yes',
    'application-name': 'mtverse',
    'msapplication-TileColor': '#237DD9',
    'msapplication-config': '/browserconfig.xml',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0F172A' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: 'light dark',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'mtverse',
  description: 'Modern admin dashboard and UI kit built with Next.js, React, and Tailwind CSS.',
  url: BASE_URL,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript. Requires HTML5.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  creator: {
    '@type': 'Organization',
    name: 'mtverse',
    url: BASE_URL,
  },
  featureList: [
    '96+ pre-built pages',
    '25+ UI components',
    'Dark mode support',
    'Responsive design',
    'Charts and data visualization',
    'Data tables with sorting, filtering, pagination',
    'Forms with validation',
    'Ecommerce flows',
    'Kanban board',
    'Chat application',
    'Calendar',
    'Email client',
    'Invoice generator',
    'Authentication flows',
    'Role-based access control',
    'Advanced search (Cmd+K)',
    'AI builders',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '10247',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel='icon' href='/favicon.png' type='image/png' />
        <meta name='application-name' content='mtverse' />
        <meta name='msapplication-TileColor' content='#237DD9' />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${manrope.className}`}>
        <SiteLoader />
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
