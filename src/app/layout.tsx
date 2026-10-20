import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { Providers } from "@/components/layout/providers"
import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "SEO Growth Command Center",
  description: "Ethical SEO tracking, prioritized checklist, and 90-day action plan for sustainable organic growth.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased overflow-hidden`}>
        <Providers>
          <Navbar />
          <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-background p-6 md:p-8 lg:p-10">
              {children}
            </main>
          </div>
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  )
}