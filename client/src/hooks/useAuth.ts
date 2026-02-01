import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

export const useLogout = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const logout = () => {
    // DeleteToken
    localStorage.removeItem("accessToken")
    localStorage.removeItem("accessToken")
    localStorage.removeItem("projectFormData")
    queryClient.clear()
    navigate('/');
  }
  return { logout }
}