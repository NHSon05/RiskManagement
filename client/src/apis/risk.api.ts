import type { CreateRiskRequest, RiskResponse, UpdateRiskRequest } from "@/types/risk.type";
import http from "@/utils/http";

export const riskApi = {
  // POST: /objectives/{objectiveId}/risks
  createRisk: (objectiveId: string | number, body: CreateRiskRequest) => {
    return http.post<RiskResponse>(`/objectives/${objectiveId}/risks`, body);
  },
  // GET: /objectives/{objectiveId}/risks
  getRisks: async(objectiveId: string | number) => {
    const res = await http.get<RiskResponse[]>(`/objectives/${objectiveId}/risks`)
    return res.data;
  },
  // DELETE: /risks/{riskId}
  deleteRisk: (riskId: string | number) => {
    return http.delete<void>(`/risks/${riskId}`);
  },
  // PUT: /risks/{riskId}
  updateRisk: (riskId: string | number, body: UpdateRiskRequest) => {
    return http.put<RiskResponse>(`/risks/${riskId}`, body);
  },

  // GET: Risk Ranking (with query: /projects/{projectId}/risks/ranking)
  getRiskRanking: async (projectId: string | number) => {
    const res = await http.get<RiskResponse[]>(`/projects/${projectId}/risks/ranking`)
    return res.data;
  }
}