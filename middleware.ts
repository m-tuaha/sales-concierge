import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next({ request: { headers: req.headers } });
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = req.nextUrl;
  const isLoginRoute = pathname === "/login";
  const isProtectedRoute =
    pathname === "/" || pathname.startsWith("/api/create-session");
  const isAsset = pathname.startsWith("/assets/");

  if (isAsset) {
    return res;
  }

  if (isLoginRoute) {
    if (session) {
      return buildRedirectResponse(req, res, "/");
    }
    return res;
  }

  if (isProtectedRoute && !session) {
    return buildRedirectResponse(req, res, "/login");
  }

  return res;
}

function buildRedirectResponse(
  req: NextRequest,
  res: NextResponse,
  path: string
) {
  const redirectUrl = new URL(path, req.url);
  const redirectResponse = NextResponse.redirect(redirectUrl);

  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    redirectResponse.headers.set("set-cookie", setCookie);
  }

  return redirectResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
