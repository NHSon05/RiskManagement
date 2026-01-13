//# Component bảo vệ route (đã bàn ở trên)
// Đã login
// export default function ProtectedRoute() {
//   return (
//     <div>ProtectedRoute</div>
//   )
// }
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // 1. Kiểm tra token trong localStorage
  // (Giả sử bạn chưa có tính năng login thật, bước này sẽ trả về null -> Coi như chưa đăng nhập)
  const isAuthenticated = localStorage.getItem('accessToken');

  // 2. Nếu CÓ token -> Cho phép đi tiếp vào trong (Outlet)
  if (isAuthenticated) {
    return <Outlet />;
  }
  // 3. Nếu KHÔNG có token -> Đá về trang Login ngay lập tức
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;