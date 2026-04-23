import { authApi } from "@/apis/auth.api"
import { getAccessToken, removeAccessToken, setAccessToken } from "@/utils/auth"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

export const useAuth = () => {
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  // login
  const login = useMutation({
    mutationFn: authApi.login,
    onSuccess: (res) => {
      setAccessToken(res.data.accessToken)
      localStorage.setItem("userId", res.data.userId.toString());
      queryClient.invalidateQueries({queryKey: ['profile']})
    }
  })
  // register
  const register = useMutation({
    mutationFn: authApi.register,
  })

  // logout
  const logout = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      removeAccessToken()
      localStorage.removeItem("userId"); // Xóa userId đi
      queryClient.clear()
      navigate('/')
    }
  })

  // profile
  const profile = useQuery({
    queryKey: ['profile'],
    queryFn: authApi.getProfile,
    // Chỉ gọi API này nếu trong local có token (đỡ tốn request báo lỗi 401 khi chưa login)
    enabled: !!getAccessToken(),
    retry: false,
    staleTime: 5 * 60 * 1000, // (Optional): keep data in cache 5p
  })
  return { login, register, logout, profile}
}