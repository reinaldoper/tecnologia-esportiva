import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";
import { Affiliate, AffiliateUpdateData, PaginatedAffiliates } from "@/types/affiliate";

export function useCreateAffiliate() {
  const queryClient = useQueryClient();

  return useMutation<Affiliate, Error, Omit<Affiliate, "id" | "membersIndicados">>({
    mutationFn: async (data) => {
      const res = await api.post<Affiliate>("/affiliates", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["affiliates"] });
      queryClient.invalidateQueries({ queryKey: ["affiliate-ranking"] });
    },
  });
}

export function useFetchAffiliates(page = 1, limit = 10) {
  return useQuery<PaginatedAffiliates, Error>({
    queryKey: ["affiliates", page, limit],
    queryFn: async () => {
      const res = await api.get<PaginatedAffiliates>(`/affiliates?page=${page}&limit=${limit}`);
      return res.data;
    },
  });
}

export function useFetchAffiliate(id: number) {
  return useQuery<Affiliate, Error>({
    queryKey: ["affiliate", id],
    queryFn: async () => {
      const res = await api.get<Affiliate>(`/affiliates/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useUpdateAffiliate() {
  const queryClient = useQueryClient();

  return useMutation<Affiliate, Error, { id: number } & AffiliateUpdateData>({
    mutationFn: async ({ id, ...data }) => {
      const res = await api.patch<Affiliate>(`/affiliates/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["affiliates"] });
      queryClient.invalidateQueries({ queryKey: ["affiliate-ranking"] });
    },
  });
}


export function useDeleteAffiliate() {
  const queryClient = useQueryClient();

  return useMutation<number, Error, number>({
    mutationFn: async (id) => {
      await api.delete(`/affiliates/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["affiliates"] });
      queryClient.invalidateQueries({ queryKey: ["affiliate-ranking"] });
    },
  });
}

export function useCountMembers(id: number) {
  return useQuery<{ id: number; nome: string; totalIndicados: number }, Error>({
    queryKey: ["affiliate-members-count", id],
    queryFn: async () => {
      const res = await api.get(`/affiliates/${id}/members-count`);
      return res.data;
    },
    enabled: !!id,
  });
}


export function useFetchAffiliateRanking() {
  return useQuery<
    { id: number; nome: string; codigo: string; totalIndicados: number }[],
    Error
  >({
    queryKey: ["affiliate-ranking"],
    queryFn: async () => {
      const res = await api.get("/affiliates/ranking/list");
      return res.data;
    },
  });
}


