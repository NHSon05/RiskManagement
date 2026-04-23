import type { QueryClient } from "@tanstack/react-query";

export interface UserResponse {
  active: string;
  company: string;
  email: string;
  id: number;
  name: string;
  phoneNumber: string;
  role: string | null;
}

export interface UserFormState extends UserResponse {
  isEditing: boolean;
}

export interface UpdateUserRequest {
  name: string;
  phoneNumber: string;
  role: string;
  active: string;
  company: string;
}

export interface UpdateUserParams {
  userId: number;
  updateData: UpdateUserRequest;
  queryClient: QueryClient;
}