import type { PestelData } from "@/types/pestel.type"
import http from "@/utils/http"

export const pestelApi = {
  // GET: /projects/{prjId}/pestel
  getPestel: (prjId: number) => {
    http.get<PestelData>(`/projects/${prjId}/pestel`)
  },
  savePestel: (prjId: number, data: PestelData) => {
    http.post<PestelData>(`/projects/${prjId}/pestel`, data)
  }
}