import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Zaggy Restaurante',
    default: 'Zaggy Restaurante - Dashboard de Gestão de Entregas'
  },
  description: 'Plataforma completa para restaurantes gerenciarem entregadores, vagas e pagamentos de forma eficiente.',
  keywords: ['restaurante', 'delivery', 'entregadores', 'gestão', 'vagas', 'zaggy'],
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