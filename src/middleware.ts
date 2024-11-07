import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

export function middleware(request: NextRequest) {
	const session = request.cookies.get("firebase-session-token");

	if (!session && request.nextUrl.pathname === "/chat") {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (session && request.nextUrl.pathname === "/login") {
		return NextResponse.redirect(new URL("/chat", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/chat", "/login"],
};
