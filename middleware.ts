import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SUPPORTED_LOCALES = ['en', 'es', 'fr', 'de', 'pt', 'it', 'nl', 'ja']
const DEFAULT_LOCALE = 'en'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 跳过静态文件和API路由
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/flags') ||
    pathname.includes('.') // 所有带扩展名的文件（图片、favicon等）
  ) {
    return NextResponse.next()
  }

  const pathHasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )

  if (!pathHasLocale) {
    return NextResponse.redirect(
      new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.webp|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.ico).*)',
  ],
}
