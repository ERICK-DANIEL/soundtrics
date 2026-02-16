import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const locales = ["en", "es"];
const defaultLocale = "en";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some((locale) =>
    pathname.startsWith(`/${locale}`),
  );

  if (!pathnameHasLocale) {
    const acceptLanguage = request.headers.get("Accept-Language");
    const preferredLanguages = acceptLanguage
      ? acceptLanguage.split(",").map((l) => l.split(";")[0].trim())
      : [];

    const locale =
      preferredLanguages
        .map((l) => l.split("-")[0])
        .find((l) => locales.includes(l)) || defaultLocale;

    return NextResponse.redirect(new URL(`/${locale}/home`, request.url));
  }

  const publicPaths = ["/home"];
  const locale = pathname.split("/")[1];
  const pathWithoutLocale = pathname.replace(`/${locale}`, "");

  const isPublic = publicPaths.some(
    (path) =>
      pathWithoutLocale === path || pathWithoutLocale.startsWith(path + "/"),
  );

  const token = await getToken({ req: request });

  if (!token && !isPublic) {
    return NextResponse.redirect(
      new URL("/api/auth/signin/spotify", request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|.*\\..*).*)"],
};
