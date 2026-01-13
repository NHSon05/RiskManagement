// <-- File chặn route (chưa login)
// export default function PublicRoute() {
//   return (
//     <div>PublicRoute</div>
//   )
// }
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  // 1. Kiểm tra xem người dùng có token đăng nhập chưa
  // (Hãy đảm bảo key 'accessToken' khớp với lúc bạn lưu khi login thành công)
  const isAuthenticated = localStorage.getItem('accessToken'); 

  // Nếu ĐÃ có token (đã đăng nhập) -> Không cho ở lại đây -> Đẩy về '/home'
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  return <Outlet />;
};
export default PublicRoute;