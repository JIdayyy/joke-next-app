import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { NextRequest, NextResponse } from "next/server";

export type JWTUserPayload = {
    id: string;
    email: string;
    userName: string;
};

export async function sign(
    payload: JWTUserPayload,
    secret: string,
): Promise<string> {
    return new SignJWT({ ...payload })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .sign(new TextEncoder().encode(secret));
}

export async function verify(
    token: string,
    secret: string,
    request?: NextRequest,
): Promise<JWTPayload> {
    const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(secret),
    );

    if (!request) {
        return payload;
    }

    if (!payload.id && request) {
        request.nextUrl.pathname = "/auth/register";
        NextResponse.redirect(request.nextUrl);
    }

    return payload;
}
