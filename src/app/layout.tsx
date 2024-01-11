import type { Metadata } from 'next'
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Roboto_Mono } from 'next/font/google'
import './globals.css'

const roboto = Roboto_Mono({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MSD Test App',
  description: 'Created by Andrii Kalashnik',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={roboto.className}>
        <AntdRegistry>
          {children}
        </AntdRegistry>
      </body>
    </html>
  )
}
