
export interface Doctor {
  id: string;
  name: string;
  image: string;
  specialties: string[];
  consultationType: string;
  experience: number;
  fees: number;
  rating: number;
  bio: string;
}

export type ConsultationType = "Video Consult" | "In Clinic" | "";
export type SortOption = "fees" | "experience" | "";

export interface FilterState {
  search: string;
  consultationType: ConsultationType;
  specialties: string[];
  sort: SortOption;
}
