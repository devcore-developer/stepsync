import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ token, req }) => {
      const path = req.nextUrl.pathname;
      
      // Admin protection
      if (path.startsWith("/admin")) {
        return token?.role === "ADMIN";
      }
      
      // General auth protection
      return !!token;
    }
  }
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/study/:path*",
    "/performance/:path*",
    "/questions/:path*",
    "/review/:path*",
    "/readiness/:path*",
    "/assistant/:path*",
    "/accountability/:path*",
    "/notifications/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/resources/:path*",
    "/study-plans/:path*",
    "/admin/:path*" // Include admin routes
  ],
};