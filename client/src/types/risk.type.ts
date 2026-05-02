import type { ObjectivesResponse } from "./objective.type";
import type { SolutionResponse } from "./solution.type";

export interface RiskAssessment {
  probability: number;
  impact: number;
  riskLevel: number;
}

export interface RiskResponse {
  id: number;
  name: string;
  strategy?: string;
  assessment: RiskAssessment | null;
  solutions: SolutionResponse[];
}

export interface CreateRiskRequest {
  name: string | number;
}

export interface UpdateRiskRequest {
  name?: string;
  strategy?: string;
}

export interface UpdateAssessmentRequest {
  probability: number;
  impact: number;
}

export interface RiskWithObjective extends RiskResponse {
  objective: ObjectivesResponse;
}