// Import middleware xác thực của Clerk
import { authMiddleware } from "@clerk/nextjs";
 
// Cấu hình middleware
export default authMiddleware({
  // Các route public (không cần đăng nhập vẫn truy cập được)
  // Ở đây: mọi route bắt đầu bằng /api/ đều public
  publicRoutes: ["/api/:path*"]
});

// Cấu hình matcher để Next.js biết middleware này sẽ chạy ở đâu
export const config = {
  matcher: [
    // Áp dụng cho mọi route, trừ file tĩnh (có đuôi .js, .css, .png, v.v.) và thư mục _next
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Áp dụng cho trang gốc "/"
    "/",
    // Áp dụng cho tất cả route bắt đầu bằng /api hoặc /trpc
    "/(api|trpc)(.*)"
  ],
};
