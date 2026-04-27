import type { RiskResponse, UpdateAssessmentRequest } from "@/types/risk.type";
import http from "@/utils/http";

export const assessmentApi = {
  // POST: /risks/{riskId}/assessment
  updateAssessment: (riskId: string | number, body: UpdateAssessmentRequest) => {
    return http.post<RiskResponse>(`/risks/${riskId}/assessment`, body);
  }
}