export type Member = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  planoId: number;
  affiliateId?: number | null;
};

export type MemberFormData = {
  nome: string;
  email: string;
  telefone: string;
  planoId: number;
  affiliateId?: number | null;
};