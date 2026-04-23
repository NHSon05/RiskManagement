import type { SwotData } from "@/types/swot.type"
import http from "@/utils/http"

export const swotApi = {
  getSwot: (prjId: number) => {
    http.get<SwotData>(`/projects/${prjId}/swot`)
  },
  saveSwot: (prjId : number, data: SwotData) => {
    http.post<SwotData>(`/projects/${prjId}/swot`, data)
  }
}