import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Inter, Merriweather } from "next/font/google"

import "./globals.css"
import { Navbar } from "@/components/Navbar"
import { ThemeProvider } from "@/context/ThemeContext"

// Initialize the serif font
const serif = Merriweather({ 
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Vihaan Jagiasi",
  description: "Engineer, Product, and Design",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${serif.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          <div className="mx-auto max-w-2xl px-4">
            <Navbar />  
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

