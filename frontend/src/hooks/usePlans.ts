"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";
import { Plan, PaginatedPlans, PlanFormData, PlanUpdateData } from "@/types/plan";

export function useCreatePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (plan: PlanFormData) => {
      const res = await api.post<PlanFormData>("/plan", plan);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
  });
}

export function useFetchPlans() {
  return useQuery<PaginatedPlans, Error>({
    queryKey: ["plans"],
    queryFn: async () => {
      const res = await api.get<PaginatedPlans>("/plan");
      return res.data;
    },
  });
}

export function useFetchPlan(id: number) {
  return useQuery<Plan, Error>({
    queryKey: ["plan", id],
    queryFn: async () => {
      const res = await api.get<Plan>(`/plan/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useUpdatePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: { id: number } & PlanUpdateData) => {
      const res = await api.patch<Plan>(`/plan/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
  });
}


export function useDeletePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/plan/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
  });
}

export function useFetchPlansPaginated(page = 1, limit = 10) {
  return useQuery({
    queryKey: ["plans", page, limit],
    queryFn: async () => {
      const res = await api.get(`/plan?page=${page}&limit=${limit}`);
      return res.data;
    },
  });
}




