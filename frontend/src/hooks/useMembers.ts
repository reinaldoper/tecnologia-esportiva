"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";
import { Member } from "@/types/members";

export function useFetchMembers(page = 1, limit = 10) {
  return useQuery({
    queryKey: ["members", page, limit],
    queryFn: async () => {
      const res = await api.get(`/members?page=${page}&limit=${limit}`);
      return res.data;
    },
  });
}

export function useCreateMember() {
  const queryClient = useQueryClient();

  return useMutation<Member, Error, Omit<Member, "id">>({
    mutationFn: async (data) => {
      const res = await api.post<Member>("/members", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });
}

export function useFetchMember(id: number) {
  return useQuery<Member, Error>({
    queryKey: ["member", id],
    queryFn: async () => {
      const res = await api.get<Member>(`/members/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useUpdateMember() {
  const queryClient = useQueryClient();

  return useMutation<Member, Error, Member>({
    mutationFn: async (member) => {
      const res = await api.patch<Member>(`/members/${member.id}`, member);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });
}

export function useDeleteMember() {
  const queryClient = useQueryClient();

  return useMutation<number, Error, number>({
    mutationFn: async (id) => {
      await api.delete(`/members/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });
}
