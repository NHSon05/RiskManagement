import { objectiveApi } from "@/apis/objective.api";
import type { CreateObjectiveRequest } from "@/types/objective.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetObjectives = (projectId: string | number) => {
  return useQuery({
    queryKey: ['objectives', projectId],
    queryFn: () => objectiveApi.getObjectives(projectId),
    enabled: !!projectId
  });
};

export const useCreateObjective = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({projectId, body} : {projectId: string | number; body: CreateObjectiveRequest}) => 
      objectiveApi.createObjective(projectId, body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['objectives', variables.projectId] });
    },
    onError: (error) => {
      console.error("Lỗi khi tạo mục tiêu:", error);
      alert("Có lỗi xảy ra khi tạo mục tiêu, vui lòng thử lại!");
    }
  })
}

export const useUpdateObjective = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({projectId, objectiveId, body} : {projectId: string | number; objectiveId: string | number; body: CreateObjectiveRequest}) => 
      objectiveApi.updateObjective(projectId, objectiveId, body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['objectives', variables.projectId] });
    },
    onError: (error) => {
      console.error("Lỗi khi cập nhật mục tiêu:", error);
      alert("Có lỗi xảy ra khi cập nhật mục tiêu, vui lòng thử lại!");
    }
  })
}

export const useDeleteObjective = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({projectId, objectiveId}: {projectId: string | number; objectiveId: string | number}) => 
      objectiveApi.deleteObjective(projectId, objectiveId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['objectives', variables.projectId] });
    },
    onError: (error) => {
      console.error("Lỗi khi xóa mục tiêu:", error);
      alert("Có lỗi xảy ra khi xóa mục tiêu, vui lòng thử lại!");
    }
  })
}