import { authService } from "@/pages/services/authService"
import { removeAccessToken, setAccessToken } from "@/utils/auth"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

export const useAuth = () => {
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  // login
  const login = useMutation({
    mutationFn: authService.login,
    onSuccess: (res) => {
      setAccessToken(res.data.token)
      queryClient.invalidateQueries({queryKey: ['profile']})
    }
  })
  // register
  const register = useMutation({
    mutationFn: authService.register,
  })

  // logout
  const logout = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      removeAccessToken()
      queryClient.clear()
      navigate('/')
    }
  })
  return { login, register, logout}
}