export interface  ProjectInfo{
    id: string;
    name: string;
    project_level: string;
    localtion: string;
    funding_source: string;
    user_role: string;
    slug?: string;
    // PESTEL_SWOT
    political?: string;
    economic?: string;
    social?: string;
    technology?: string;
    environment?: string;
    legal?: string;
    strengths?: string;
    weakness?: string;
    opportunities?: string;
    threats?: string;
}

export interface ProjectTarget {
    id: string;
    projectId: string;
    name: string;
}

export interface ProjectRisk {
    id: string;
    projectId: string;
    name: string;
    category: string;
    probability: number;
    impact: number;
    risk_level: string;
}
