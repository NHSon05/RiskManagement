import type { CreateSolutionRequest } from "@/types/solution.type";
import http from "@/utils/http"

export const solutionApi = {
  // POST: /risks/{riskId}/solutions
  createSolution: (riskId: string | number, body: CreateSolutionRequest) => {
    return http.post<CreateSolutionRequest>(`/risks/${riskId}/solutions`, body)
  },
}