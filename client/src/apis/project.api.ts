import type { CreateProjectBody, ProjectResponse } from "@/types/project.type";
import http from "@/utils/http";

export const projectApi = {
  // POST: /projects?userId = {userId}
  createProject: (userId: number, body: CreateProjectBody) => {
    return http.post<ProjectResponse>(`projects?userId=${userId}`, body);
  },
  // GET: /projects?userId = {userId}
  getProjects: (userId: number) => {
    return http.get<ProjectResponse[]>(`projects?userId=${userId}`)
  },
  // GET: /projects/{projectId}
  getProjectById: (projectId: number) => {
    return http.get<ProjectResponse>(`projects/${projectId}`)
  },
  // PUT: /projects/{projectId}
  updateProject: (projectId: number, body: CreateProjectBody) => {
    return http.put<ProjectResponse>(`projects/${projectId}`, body)
  },
  // DELETE: /projects/{projectId}
  deleteProject: (projectId: number) => {
    return http.delete<ProjectResponse>(`projects/${projectId}`)
  }
} 