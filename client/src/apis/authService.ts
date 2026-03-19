// src/hooks/useAuth.ts
import { useMutation } from '@tanstack/react-query';
// import axiosClient from '@/apis/axiosClient'; // Import client của bạn

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const registerRequest = async (data: any) => {
  // const res = await axiosClient.post('/auth/register', data);
  // return res.data;
  
  console.log("Đang gửi dữ liệu đăng ký lên Server:", data);
  // Giả lập delay 1.5s
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "Đăng ký thành công" }); 
    }, 1000);
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: registerRequest,
    onSuccess: (data) => {
      console.log("Đăng ký thành công:", data);
    },
    onError: (error) => {
      console.error("Lỗi đăng ký:", error);
    }
  });
};