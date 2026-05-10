import type { UserResponse } from "./user.type";

export interface CreateProjectBody {
  name: string;
  prjLevel: string;
  location: string;
  capital: string;
  role: string;
}

// Response
export interface ProjectResponse {
  id: number;
  name: string;
  status: string;
  createAt: string;
  finishAt: string;
  role: string;
  location: string;
  capital: string;
  prjLevel: string;
  user: Pick<UserResponse, 'email' | 'id' | 'name'>;
  backgroundImageUrl?: string;
  backgroundImageId?: string;
}

export interface ImageProjectProps {
  projectId: number;
  currentImageUrl?: string | null;
}