import "./globals.css"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { validateEnv } from "./config"
import { Analytics } from '@vercel/analytics/next';

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "PRO-HELPER | Project Suggester",
  description: "Get personalized project ideas based on your tech niche, skill level, and target audience",
}

validateEnv()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>{children}
      <Analytics />
      </body>
    </html>
  )
}

