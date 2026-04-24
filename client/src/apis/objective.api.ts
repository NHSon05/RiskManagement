import type { CreateObjectiveRequest, ObjectiveResponse } from "@/types/objective.type";
import http from "@/utils/http";

export const objectiveApi = {
  // POST: /projects/{projectId}/objectives
  createObjective: (projectId: string | number, body: CreateObjectiveRequest) => {
    return http.post<ObjectiveResponse>(`/projects/${projectId}/objectives`, body);
  },
  // GET: /projects/{projectId}/objectives
  getObjectives: (projectId: string | number) => {
    return http.get<ObjectiveResponse[]>(`/projects/${projectId}/objectives`);
  },
  // DELETE: /projects/{projectId}/objectives/{objectiveId}
  deleteObjective: (projectId: string | number, objectiveId: string | number) => {
    return http.delete<void>(`/projects/${projectId}/objectives/${objectiveId}`);
  },
  // PUT: /projects/{projectId}/objectives/{objectiveId}
  updateObjective: (projectId: string | number, objectiveId: string | number, body: CreateObjectiveRequest) => {
    return http.put<ObjectiveResponse>(`/projects/${projectId}/objectives/${objectiveId}`, body);
  }
}