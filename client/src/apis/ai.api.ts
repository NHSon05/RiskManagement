import http from "@/utils/http";
import type {
  AIResponse,
  GenerateAssessmentRequest,
  GenerateObjectiveRequest,
  GenerateSolutionRequest
} from "@/types/ai.type";

export const aiApi = {
  // 1. API: /ai/objectives
  generateObjectives: (body: GenerateObjectiveRequest) => {
    return http.post<AIResponse>('/ai/objectives', body);
  },

  // 2. API: /ai/assessments
  generateAssessments: (body: GenerateAssessmentRequest) => {
    return http.post<AIResponse>('/ai/assessments', body);
  },

  // 3. API: /ai/solutions
  generateSolutions: (body: GenerateSolutionRequest) => {
    return http.post<AIResponse>('/ai/solutions', body);
  }
};