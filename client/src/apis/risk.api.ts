import type { CreateRiskRequest, RiskResponse } from "@/types/risk.type";
import http from "@/utils/http";

export const riskApi = {
  // POST: /objectives/{objectiveId}/risks
  createRisk: (objectiveId: string | number, body: CreateRiskRequest) => {
    return http.post<RiskResponse>(`/objectives/${objectiveId}/risks`, body);
  },
  // GET: /objectives/{objectiveId}/risks
  getRisks: (objectiveId: string | number) => {
    return http.get<RiskResponse[]>(`/objectives/${objectiveId}/risks`);
  },
  // DELETE: /risks/{riskId}
  deleteRisk: (riskId: string | number) => {
    return http.delete<void>(`/risks/${riskId}`);
  },
  // PUT: /risks/{riskId}
  updateRisk: (riskId: string | number, body: CreateRiskRequest) => {
    return http.put<RiskResponse>(`/risks/${riskId}`, body);
  }
}