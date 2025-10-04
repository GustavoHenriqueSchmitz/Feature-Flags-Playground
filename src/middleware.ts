import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get("userProfile");

  if (userCookie) {
    return NextResponse.next();
  }

  const newUserProfile = {
    userID: crypto.randomUUID(),
    custom: {
      role: Math.random() > 0.5 ? "admin" : "user",
    },
  };

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-profile", JSON.stringify(newUserProfile));

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.cookies.set("userProfile", JSON.stringify(newUserProfile), {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
