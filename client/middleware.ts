import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    const { pathname } = request.nextUrl;

    const publicRoutes = ["/", "/login", "/register"];

    const isPublicRoute = publicRoutes.includes(pathname);

    if (!token && !isPublicRoute) {
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    if (token && (pathname === "/login" || pathname === "/register")) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
          Match all routes except:
          - _next/static
          - _next/image
          - favicon.ico
        */
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};