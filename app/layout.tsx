import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "RedHi - Decentralized Exchange on Hive",
  description: "Trade spot, perpetuals, and swap tokens on the Hive blockchain with up to 50x leverage",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans font-normal text-gray-900 theme-transition antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
