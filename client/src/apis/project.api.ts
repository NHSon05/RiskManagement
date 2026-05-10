import type { CreateProjectBody, ProjectResponse } from "@/types/project.type";
import http from "@/utils/http";

export const projectApi = {
  // POST: /projects?userId = {userId}
  createProject: (userId: number, body: CreateProjectBody) => {
    return http.post<ProjectResponse>(`projects?userId=${userId}`, body);
  },
  // GET: /projects?userId = {userId}
  getProjects: async (userId: number) => {
    const res = await http.get<ProjectResponse[]>(`projects?userId=${userId}`);
    return res.data;
  },
  // GET: /projects/{projectId}
  getProjectById: async (projectId: number) => {
    const res = await http.get<ProjectResponse>(`projects/${projectId}`);
    return res.data;
  },
  // PUT: /projects/{projectId}
  updateProject: async (projectId: number, body: CreateProjectBody) => {
    const res = await http.put<ProjectResponse>(`projects/${projectId}`, body);
    return res.data;
  },

  updateProjectImage: async (projectId : number, file : File) => {
    const formData = new FormData()
    formData.append("file", file)
    const response = await http.patch<ProjectResponse>(
      `projects/${projectId}/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    )
    return response.data;
  },

  // DELETE: /projects/{projectId}/image
  deleteProjectImage: async ({projectId} : {projectId: number}) => {
    const response = await http.delete<ProjectResponse>(`projects/${projectId}/image`);
    return response.data;
  },

  // DELETE: /projects/{projectId}
  deleteProject: async (projectId: number) => {
    const res = await http.delete<ProjectResponse>(`projects/${projectId}`);
    return res.data;
  }
} 