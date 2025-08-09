import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Zaggy - Super App para Entregadores',
    default: 'Zaggy - O Primeiro Super App para Entregadores do Brasil'
  },
  description: 'Organize toda sua vida profissional de entregador em um só lugar. Central financeira multi-apps, controle de documentos, gestão MEI e muito mais. Grátis para entregadores.',
  keywords: [
    'app entregadores',
    'gestão financeira entregadores', 
    'MEI entregadores',
    'iFood Rappi Uber',
    'CNH renovação',
    'marketplace entrega',
    'zaggy app',
    'super app delivery',
    'entregador profissional',
    'delivery brasil'
  ],
  authors: [{ name: 'Zaggy Brasil' }],
  creator: 'Zaggy',
  publisher: 'Zaggy Brasil',
  metadataBase: new URL('https://zaggy.com.br'),
  openGraph: {
    title: 'Zaggy - O Super App que Todo Entregador Precisa',
    description: 'Organize receitas de todos os apps, controle documentos, gestão MEI e muito mais. Grátis para entregadores, sem taxas.',
    url: 'https://zaggy.com.br',
    siteName: 'Zaggy',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zaggy - Super App para Entregadores',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaggy - Super App para Entregadores',
    description: 'Central financeira, gestão de documentos, MEI organizado. Tudo que o entregador precisa em um app.',
    images: ['/twitter-image.jpg'],
    creator: '@zaggyapp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}