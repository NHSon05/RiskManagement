export interface Info{
  prj_id: string;
  prj_name: string;
  prj_level: string;
  prj_location: string;
  prj_fund: string;
  prj_role: string;
  pestel: PestelSwot[]
  swot: PestelSwot[]
  prj_targets: Target[]
}

export interface PestelSwot {
  code: string
  label: string
  items: PestelSwotItem[]
}
export interface PestelSwotItem {
  content: string
}
export interface Target {
  id: string;
  name: string;
  risks: Risk[];
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

export interface ResponsePlan {
  id: string;
  owner: string;
  name: string;
}

