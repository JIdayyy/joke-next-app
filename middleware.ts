import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "src/service/security/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest): Promise<NextResponse> {
    const token = request.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
        const url = request.nextUrl.clone();
        url.pathname = "/hello-nextjs";
        return NextResponse.redirect(new URL("/api/unauthorized", request.url));
    }

    const decoded = await verify(token, process.env.SECRET as string, request);

    if (typeof decoded === "string") {
        request.nextUrl.pathname = "/auth/login";
        return NextResponse.redirect(request.nextUrl);
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: "/api/joke/:path*",
};
