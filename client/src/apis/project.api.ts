import type { CreateProjectBody, ProjectResponse } from "@/types/project.type";
import http from "@/utils/http";

export const projectApi = {
  // POST: /projects?userId = {userId}
  createProject: (userId: number, body: CreateProjectBody) => {
    return http.post<ProjectResponse>(`projects?userId=${userId}`, body);
  },
  getProjects: (userId: number) => {
    return http.get<ProjectResponse[]>(`projects?userId=${userId}`)
  }
}