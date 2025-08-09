import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Zaggy Entregador',
    default: 'Zaggy Entregador - Portal Web'
  },
  description: 'Portal web para entregadores acessarem relatórios detalhados, histórico e funcionalidades avançadas.',
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