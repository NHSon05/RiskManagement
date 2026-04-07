import { projectApi } from "@/apis/project.api";
import type { CreateProjectBody } from "@/types/project.type";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({userId, body} : {userId:number; body: CreateProjectBody}) => 
      projectApi.createProject(userId,body),
    onSuccess: () => {
      // Báo cho React Query biết là dữ liệu đã cũ, hãy gọi lại API get list dự án đi!
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      alert("Tạo dự án thành công")
    },
    onError: (error) => {
      console.error("Lỗi khi tạo dự án:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
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