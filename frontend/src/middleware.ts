import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 🔐 Middleware pour protéger les routes
// Place ce fichier à la racine de ton projet Next.js : middleware.ts

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Routes publiques (toujours accessibles)
  const publicRoutes = ["/", "/login", "/register"];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Routes protégées (nécessitent une authentification)
  const protectedRoutes = ["/account", "/dashboard", "/profile"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Si pas de token et route protégée → redirect vers login
  if (!token && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    // Optionnel : ajouter l'URL de retour
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // Si token existe et route login/register → redirect vers account
  if (token && (pathname === "/login" || pathname === "/register")) {
    const url = request.nextUrl.clone();
    url.pathname = "/account";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configuration : sur quelles routes le middleware s'applique
export const config = {
  matcher: [
    /*
     * Match toutes les routes sauf :
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
