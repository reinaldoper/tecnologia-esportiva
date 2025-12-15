import { Member } from "./members";

export type Plan = {
  id: number;
  nome: string;
  precoMensal: number;
  beneficios: string;
  members?: Member[];
};


export type PaginatedPlans = {
  data: Plan[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type PlanUpdateData = {
  nome?: string;
  precoMensal?: number;
  beneficios?: string;
};


export type PlanFormData = {
  nome: string;
  precoMensal: number;
  beneficios: string;
};
