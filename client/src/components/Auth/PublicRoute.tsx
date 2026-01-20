// <-- File chặn route (chưa login)
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const isAuthenticated = localStorage.getItem('accessToken'); 
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  return <Outlet />;
};
export default PublicRoute;