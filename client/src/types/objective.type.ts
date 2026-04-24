import type { QueryClient } from "@tanstack/react-query";
import type { RiskResponse } from "./risk.type";

export interface ObjectiveResponse {
  id: string;
  name: string;
  risks?:RiskResponse[];
}

export interface CreateObjectiveRequest {
  name: string;
}

export interface ObjectiveFormState extends ObjectiveResponse {
  isExpanding?: boolean;
  risks: RiskResponse[];
}

export interface UpdateObjectiveRequest {
  name: string;
}

export interface UpdateObjectiveParams {
  objectiveId: string;
  updateData: UpdateObjectiveRequest;
  queryClient: QueryClient;
}