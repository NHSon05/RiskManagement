import { swotApi } from "@/apis/swot.api"
import type { SwotData } from "@/types/swot.type"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useSwot = (projectId: number) => {
  const queryClient = useQueryClient()

  // Get Swot data
  const swotQuery = useQuery({
    queryKey: ['swot', projectId],
    queryFn: () => swotApi.getSwot(projectId),
    enabled: !!projectId,
  })

  const saveSwotMutation = useMutation({
    mutationFn: async (data: SwotData) => await swotApi.saveSwot(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['pestel', projectId]})
    },
    onError: (error) => {
      console.error("Lỗi khi lưu SWOT", error)
    }
  })
  return { swotQuery , saveSwotMutation }
}