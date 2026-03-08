import { NextResponse } from "next/server";

export function middleware(req) {
  const auth = req.headers.get("authorization");

  const valid =
    "Basic " + Buffer.from("admin:henpro123").toString("base64");

  if (auth !== valid) {
    return new Response("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Admin Area"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // middleware runs ONLY on /admin
};