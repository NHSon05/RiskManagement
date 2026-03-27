import http from "@/utils/http";

export const authService = {
  login: (data: {
    email: string,
    password: string
  }) =>  http.post('/auth/login', data),

  register: (data: {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    phoneNumber: string,
    company: string,
  }) => http.post('/auth/register', data),

  // Get Profile
  getProfile: () => http.get('/users/me'),

  logout: () => http.post('/auth/logout')
  // logout: () => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve({ data: { message: "Đăng xuất local thành công" } });
  //     }, 100); 
  //   });
  // }
}