import type { PestelData, PestelDataResponse, PestelFormState } from "@/types/pestel.type"
import http from "@/utils/http"

export const pestelApi = {
  // GET: /projects/{prjId}/pestel
  getPestel: (prjId: number) => {
    return http.get<PestelDataResponse>(`/projects/${prjId}/pestel`)
  },
  savePestel: (prjId: number, data: PestelFormState) => {
    const payload: PestelData = {
      political: JSON.stringify(data.political || []),
      economic: JSON.stringify(data.economic || []),
      social: JSON.stringify(data.social || []),
      technological: JSON.stringify(data.technological || []),
      environmental: JSON.stringify(data.environmental || []),
      legal: JSON.stringify(data.legal || []),
    };
    return http.post<PestelDataResponse>(`/projects/${prjId}/pestel`, payload)
  }
}