export interface GenerateObjectiveRequest {
  prjName: string;
  prjLevel: string;
  location: string;
  capital: string;
  pestelData: string;
  swotData: string;
}

export interface GenerateAssessmentRequest {
  objectiveName: string;
}

export interface GenerateSolutionRequest {
  objectiveName: string;
}

// Interface chung cho Response trả về từ AI
export interface AIResponse<T = any> {
  data: T;
  message?: string;
  status?: number;
}