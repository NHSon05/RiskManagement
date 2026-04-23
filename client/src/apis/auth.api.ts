import http from "@/utils/http";

export const authApi = {
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
  getProfile: () => http.get('/auth/me'),

  logout: () => http.post('/auth/logout')
}