import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {
	const { nextUrl, nextauth } = req;

	const rolePaths = {
		admin: "/admin",
		manajer: "/manajer",
		kasir: "/kasir",
	};

	const userRole = nextauth.token?.role;
	const requestedPath = nextUrl.pathname;

	if (requestedPath.startsWith("/transaksi")) {
		return NextResponse.next();
	}

	const isAuthorized = Object.entries(rolePaths).some(
		([role, path]) => userRole === role && requestedPath.startsWith(path)
	);

	if (!isAuthorized) {
		return NextResponse.rewrite(new URL("/accesdenied", req.url), {
			status: 403,
		});
	}

	return NextResponse.next();
});

export const config = {
	matcher: [
		"/kasir/:path*",
		"/manajer/:path*",
		"/admin/:path*",
		"/transaksi/:path*",
	],
};
