import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "es"];
const defaultLocale = "en";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  const acceptLanguage = request.headers.get("Accept-Language");
  const preferredLanguages = acceptLanguage
    ? acceptLanguage.split(",").map((lang) => lang.split(";")[0].trim())
    : [];
  const locale =
    preferredLanguages
      .map((lang) => lang.split("-")[0])
      .find((lang) => locales.includes(lang)) || defaultLocale;

  request.nextUrl.pathname = `/${locale}${pathname}/home`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api|.*\\..*).*)"],
};
