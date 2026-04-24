import type { SolutionResponse } from "./solution.type";

export interface RiskAssessment {
  probability: number;
  impact: number;
  riskLevel: number;
}

export interface RiskResponse {
  id: number;
  name: string;
  assessment: RiskAssessment | null;
  solutions: SolutionResponse[];
}

export interface CreateRiskRequest {
  name: string;
}

export interface UpdateAssessmentRequest {
  probability: number;
  impact: number;
}