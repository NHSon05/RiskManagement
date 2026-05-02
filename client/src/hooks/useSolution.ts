import { solutionApi } from "@/apis/solution.api";
import type { CreateSolutionRequest } from "@/types/solution.type";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify";

export const useCreateSolution = (riskId: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({riskId, body}: {riskId: string | number; body: CreateSolutionRequest}) => 
      solutionApi.createSolution(riskId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['risks', riskId]})
      toast.success("Thêm kế hoạch thành công!")
    },
    onError: (error) => {
      console.error("Lỗi khi tạo giải pháp", error)
      toast.error("Có lỗi xảy ra khi tạo giải pháp, vui lòng thử lại!")
    }
  })
}