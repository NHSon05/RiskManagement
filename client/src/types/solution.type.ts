export interface SolutionResponse {
  id: number | string;
  content: string;
  personInCharge: string;
}

export interface CreateSolutionRequest {
  content: string;
  personInCharge: string;
}

export interface CreateSolutionParams {
  updateLibrary: boolean;
}
