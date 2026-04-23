import type { SwotData, SwotDataReponse, SwotFormState } from "@/types/swot.type"
import http from "@/utils/http"

export const swotApi = {
  getSwot: (prjId: number) => {
    return http.get<SwotDataReponse>(`/projects/${prjId}/swot`)
  },
  saveSwot: (prjId : number, data: SwotFormState) => {
    const payload: SwotData = {
      strengths: JSON.stringify(data.strengths || []),
      weaknesses: JSON.stringify(data.weaknesses || []),
      opportunities: JSON.stringify(data.opportunities || []),
      threats: JSON.stringify(data.threats || []),
    };
    return http.post<SwotDataReponse>(`/projects/${prjId}/swot`, payload)
  }
}