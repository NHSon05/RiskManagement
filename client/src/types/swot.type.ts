export interface SwotData {
  strengths: string;
  weaknesses: string;
  opportunities:string;
  threats: string;
}

export interface SwotDataReponse extends SwotData {
  id: number;
}

export type SwotFormState = Record< keyof  SwotData, string[]>;