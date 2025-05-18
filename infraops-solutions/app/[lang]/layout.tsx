import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { dir } from "i18next"
import { languages } from "../i18n/settings"
import "../globals.css"
import { Header } from "./components/header"
import { Footer } from "./components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { notFound } from "next/navigation"
import { Chatbot } from "./components/chatbot"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "InfraOps Solutions",
  description: "DevOps and Multi-Cloud infrastructure services",
}

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }))
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  // Validate that the lang parameter is supported
  if (!languages.includes(lang)) {
    notFound()
  }

  return (
    <html lang={lang} dir={dir(lang)} suppressHydrationWarning>
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Header lang={lang} />
          <main className="flex-grow">{children}</main>
          <Footer lang={lang} />
          <Chatbot lang={lang} />
        </ThemeProvider>
      </body>
    </html>
  )
}
