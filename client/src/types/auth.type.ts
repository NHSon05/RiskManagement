export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  userId: number;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  company: string;
}

export interface RegisterResponse {
  active: string;
  company: string;
  email: string;
  id: number;
  name: string;
  phoneNumber: string;
  role: string;
}

