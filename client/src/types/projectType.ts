export interface Info{
  prj_id: string;
  prj_name: string;
  prj_level: string;
  prj_location: string;
  prj_fund: string;
  prj_role: string;
  // PESTEL_SWOT
  // political?: string;
  // economic?: string;
  // social?: string;
  // technology?: string;
  // environment?: string;
  // legal?: string;
  pestel: PestelSwot[]
  swot: PestelSwot[]
  // strengths?: string;
  // weakness?: string;
  // opportunities?: string;
  // threats?: string;
  prj_target: Target[]
}


export interface Risk {
  id: string;
  name: string;
  probability: string;
  probability_level: number;
  impact: string;
  impact_level: number
  risk_level: number
  strategy: string
  response_plans: ResponsePlan[]
}
export interface Target {
  id: string;
  name: string;
  risks: Risk[];
}

export interface ResponsePlan {
  owner: string;
  content: string;
}

export interface PestelSwot {
  code: string
  label: string
  item: PestelSwotItem[]
}
export interface PestelSwotItem {
  content: string
}