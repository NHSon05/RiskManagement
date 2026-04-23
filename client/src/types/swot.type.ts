export interface SwotData {
  strengths: string;
  weaknesses: string;
  opportunities:string;
  threats: string;
}

export type SwotFormState = Record< keyof  SwotData, string[]>;