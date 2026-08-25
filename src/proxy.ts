import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, isLocale } from "@/i18n/locales";

function getPreferredLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const preferred = acceptLanguage
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase());

  for (const lang of preferred) {
    const base = lang.split("-")[0];
    if (isLocale(base)) return base;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (pathnameHasLocale) return;

  const locale = getPreferredLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip API routes, Next.js internals, and any request for a static file (has a file extension).
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
