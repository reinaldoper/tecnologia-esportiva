import { Member } from "./members";

export type Affiliate = {
  id: number;
  nome: string;
  codigo: string;
  totalIndicados?: Member[];
};

export type AffiliateFindId = {
  id: number;
  nome: string;
  codigo: string;
  membersIndicados: Member[];
}


export type AffiliateFormData = {
  nome: string;
  codigo: string;
};

export type AffiliateUpdateData = {
  nome?: string;
  codigo?: string;
};

export type PaginatedAffiliates = {
  data: Affiliate[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};