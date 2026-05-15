import { assessmentApi } from "@/apis/assessment.api";
import { riskApi } from "@/apis/risk.api";
import type { CreateRiskRequest, UpdateAssessmentRequest, UpdateRiskRequest } from "@/types/risk.type";
import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetRisk = (objectiveIds : (string | number)[]) => {
  return useQueries({
    queries: objectiveIds.map((objectiveId) => ({
      queryKey: ['risks', objectiveId],
      queryFn: () => riskApi.getRisks(objectiveId),
      enabled: !!objectiveId,
    }))
  })
}

export const useGetRiskById = (objectiveId: string | number) => {
  return useQuery({
    queryKey: ['risks', objectiveId],
    queryFn: () => riskApi.getRisks(objectiveId),
    enabled: !!objectiveId,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })
}

export const useCreateRisk = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({objectiveId, body} : {objectiveId: string | number; body: CreateRiskRequest}) => 
      riskApi.createRisk(objectiveId, body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['risks', variables.objectiveId] });
      queryClient.invalidateQueries({ queryKey: ['objectives'] });
    },
    onError: (error) => {
      console.error("Lỗi khi tạo rủi ro:", error);
      alert("Có lỗi xảy ra khi tạo rủi ro, vui lòng thử lại!");
    }
  })
}

export const useUpdateRisk = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({riskId, body} : {riskId: string | number; body: UpdateRiskRequest}) => 
      riskApi.updateRisk(riskId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['objectives'] });
    },
    onError: (error) => {
      console.error("Lỗi khi cập nhật rủi ro:", error);
      alert("Có lỗi xảy ra khi cập nhật rủi ro, vui lòng thử lại!");
    }
  })
}

export const useDeleteRisk = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (riskId: string | number) => 
      riskApi.deleteRisk(riskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['risks'] });
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

export const useGetRiskRanking = (projectId: string | number) => {
  return useQuery({
    queryKey: ['risks', projectId, 'ranking'],
    queryFn: () => riskApi.getRiskRanking(projectId),
    enabled: !!projectId,
  })
}