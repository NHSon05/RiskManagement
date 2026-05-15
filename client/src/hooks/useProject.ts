import { projectApi } from "@/apis/project.api";
import type { CreateProjectBody } from "@/types/project.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify";

export const useCreateProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({userId, body} : {userId:number; body: CreateProjectBody}) => 
      projectApi.createProject(userId,body),
    onSuccess: () => {
      // Báo cho React Query biết là dữ liệu đã cũ, hãy gọi lại API get list dự án đi!
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success("Tạo dự án thành công")
    },
    onError: (error) => {
      console.error("Lỗi khi tạo dự án:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  })
}

export const useGetProjectsByUserId = (userId: number) => {
  return useQuery({
    queryKey: ['projects', userId],
    queryFn: () => projectApi.getProjects(userId),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    enabled: !!userId
  })
}

export const useGetProjectById = (id: number) => {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => projectApi.getProjectById(id),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    enabled: !!id
  })
}

export const useUpdateProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({projectId, body} : {projectId:number; body: CreateProjectBody}) => 
      projectApi.updateProject(projectId,body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success("Cập nhật dự án thành công");
    },
    onError: (error) => {
      console.error("Lỗi khi cập nhật dự án:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  })
}

export const useDeleteProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (projectId: number) => 
      projectApi.deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success("Xóa dự án thành công");
    },
    onError: (error) => {
      console.error("Lỗi khi xóa dự án:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  })
}

export const useDeleteProjectImage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (projectId : number) => 
      projectApi.deleteProjectImage({projectId}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success("Xóa ảnh dự án thành công");
    },
    onError: (error) => {
      console.error("Lỗi khi xóa ảnh dự án:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  })
}

export const useUpdateDataProjectImage = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({projectId, file } : {projectId: number; file: File} ) =>
      projectApi.updateProjectImage(projectId, file),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['projects', variables.projectId] });
      toast.success("Cập nhật ảnh dự án thành công");
    },
    onError: (error) => {
      console.error("Lỗi khi cập nhật ảnh dự án:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  })
}

// useMutation response
/*
{
  mutate: (variables) => { ... }, // Hàm để bạn gọi lúc submit form
  mutateAsync: (variables) => { ... }, // Giống mutate nhưng trả về Promise
  isPending: false, // Bằng true khi API đang chạy (đang xoay vòng vòng)
  isSuccess: false, // Bằng true khi API gọi thành công
  isError: false,   // Bằng true khi API bị lỗi 
  data: undefined,  // Chứa dữ liệu Backend trả về (nếu thành công)
  error: null,      // Chứa thông tin lỗi (nếu thất bại)
  // ... và vài chục biến khác nữa
}
*/