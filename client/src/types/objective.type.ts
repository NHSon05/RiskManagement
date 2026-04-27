import type { QueryClient } from "@tanstack/react-query";
import type { RiskResponse } from "./risk.type";

export interface ObjectivesResponse {
  id: number;
  name: string;
  risks?:RiskResponse[];
}

export interface CreateObjectiveRequest {
  name: string;
}

export interface ObjectiveFormState extends ObjectivesResponse {
  isExpanding?: boolean;
  risks: RiskResponse[];
}

export interface UpdateObjectivesRequest {
  name: number;
}

export interface UpdateObjectivesParams {
  objectiveId: number;
  updateData: UpdateObjectivesRequest;
  queryClient: QueryClient;
}