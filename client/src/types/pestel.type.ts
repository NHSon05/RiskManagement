export interface PestelData {
  political: string;
  economic: string;
  social: string;
  technological: string;
  environmental: string;
  legal: string;
}

export type PestelFormState = Record<keyof PestelData, string[]>;

export interface PestelDataResponse extends PestelData {
  id: string;
}

export interface PestelItem {
  content: string;
}

export interface PestelRawData {
  code: string;
  label: string;
  items: PestelItem[];
}