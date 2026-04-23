import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { pestelApi } from "@/apis/pestel.api";
import type { PestelFormState } from "@/types/pestel.type";

export const usePestel = (projectId: number) => {
  const queryClient = useQueryClient();

  const pestelQuery = useQuery({
    queryKey: ['pestel', projectId],
    queryFn: () => pestelApi.getPestel(projectId),
    enabled: !!projectId,
  })

  const savePestelMutation = useMutation({
    mutationFn: async (data: PestelFormState) => await pestelApi.savePestel(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['pestel', projectId]})
      alert("Đã lưu pestel thành công")
    },
    onError: (error) => {
      console.error("Lỗi khi lưu PESTEL", error)
    }
  })
  return { pestelQuery, savePestelMutation }
}