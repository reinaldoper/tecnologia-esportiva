export type Member = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  planoId: number;
  affiliateId?: number | null;
};