import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const locales = ["en", "ar"]
const defaultLocale = "en"

export function middleware(request: NextRequest) {
  // Get the pathname from the URL
  const { pathname } = request.nextUrl

  // Skip for static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next()
  }

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  // If the pathname doesn't have a locale, redirect to the default locale
  if (!pathnameHasLocale) {
    const url = new URL(`/${defaultLocale}${pathname === "/" ? "" : pathname}`, request.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|api|_vercel|favicon.ico|.*\\.).*)"],
}
