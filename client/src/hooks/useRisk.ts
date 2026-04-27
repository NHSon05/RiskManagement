import { assessmentApi } from "@/apis/assessment.api";
import { riskApi } from "@/apis/risk.api";
import type { CreateRiskRequest, UpdateAssessmentRequest } from "@/types/risk.type";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";

export const useGetRisk = (objectiveIds : (string | number)[]) => {
  return useQueries({
    queries: objectiveIds.map((objectiveId) => ({
      queryKey: ['risks', objectiveId],
      queryFn: () => riskApi.getRisks(objectiveId),
      enabled: !!objectiveId,
    }))
  })
} 

export const useCreateRisk = (projectId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({objectiveId, body} : {objectiveId: string | number; body: CreateRiskRequest}) => 
      riskApi.createRisk(objectiveId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['objectives', projectId] });
    },
    onError: (error) => {
      console.error("Lỗi khi tạo rủi ro:", error);
      alert("Có lỗi xảy ra khi tạo rủi ro, vui lòng thử lại!");
    }
  })
}

export const useUpdateRisk = (projectId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({riskId, body} : {riskId: string | number; body: CreateRiskRequest}) => 
      riskApi.updateRisk(riskId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['objectives', projectId] });
    },
    onError: (error) => {
      console.error("Lỗi khi cập nhật rủi ro:", error);
      alert("Có lỗi xảy ra khi cập nhật rủi ro, vui lòng thử lại!");
    }
  })
}

export const useDeleteRisk = (projectId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (riskId: string | number) => 
      riskApi.deleteRisk(riskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['objectives', projectId] });
    },
    onError: (error) => {
      console.error("Lỗi khi xóa rủi ro:", error);
      alert("Có lỗi xảy ra khi xóa rủi ro, vui lòng thử lại!");
    }
  })
}

export const useUpdateAssessment = (projectId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({riskId, body} : {riskId: string | number; body: UpdateAssessmentRequest}) => 
      assessmentApi.updateAssessment(riskId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['objectives', projectId] });
    },
    onError: (error) => {
      console.error("Lỗi khi cập nhật đánh giá rủi ro:", error);
      alert("Có lỗi xảy ra khi cập nhật đánh giá, vui lòng thử lại!");
    }
  })
}