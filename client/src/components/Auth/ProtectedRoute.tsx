//# Component bảo vệ route (đã bàn ở trên)
// Đã login
// export default function ProtectedRoute() {
//   return (
//     <div>ProtectedRoute</div>
//   )
// }
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('accessToken');
  if (isAuthenticated) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;