import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { pestelApi } from "@/apis/pestel.api";
import type { PestelData } from "@/types/pestel.type";

// Query and Mutation
export const usePestel = (projectId: number) => {
  const queryClient = useQueryClient();

  // Get Pestel data
  const pestelQuery = useQuery({
    queryKey: ['pestel', projectId],
    queryFn: () => pestelApi.getPestel(projectId),
    enabled: !!projectId, //Chỉ gọi API nếu có projectId
  })
  // Save and Update PESTEL
  const savePestelMutation = useMutation({
    mutationFn: async (data: PestelData) => await pestelApi.savePestel(projectId, data),
    onSuccess: () => {
      // Refresh after save
      queryClient.invalidateQueries({queryKey: ['pestel', projectId]})
      alert("Đã lưu pestel thành công")
    },
    onError: (error) => {
      console.error("Lỗi khi lưu PESTEL", error)
    }
  })
  return { pestelQuery, savePestelMutation }
}