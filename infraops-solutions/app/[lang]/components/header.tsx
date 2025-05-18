"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslation } from "@/app/i18n/client"
import { Button } from "@/components/ui/button"
import { Menu, X, Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header({ lang }: { lang: string }) {
  const { t } = useTranslation(lang)
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const redirectedPathname = (locale: string) => {
    if (!pathname) return "/"
    const segments = pathname.split("/")
    segments[1] = locale
    return segments.join("/")
  }

  const navItems = [
    { href: `/${lang}`, label: t("nav.home") },
    { href: `/${lang}/services`, label: t("nav.services") },
    { href: `/${lang}/contact`, label: t("nav.contact") },
  ]

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href={`/${lang}`} className="text-xl font-bold">
            InfraOps Solutions
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            <ul className="flex space-x-6 rtl:space-x-reverse">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <LanguageSwitcher lang={lang} redirectedPathname={redirectedPathname} />
          </nav>

          {/* Mobile Navigation */}
          <div className="flex items-center md:hidden">
            <LanguageSwitcher lang={lang} redirectedPathname={redirectedPathname} />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="ml-2 rtl:ml-0 rtl:mr-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <ul className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}

function LanguageSwitcher({
  lang,
  redirectedPathname,
}: {
  lang: string
  redirectedPathname: (locale: string) => string
}) {
  const { t } = useTranslation(lang)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Globe size={20} />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={redirectedPathname("en")} locale="en">
            {t("language.en")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={redirectedPathname("ar")} locale="ar">
            {t("language.ar")}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
