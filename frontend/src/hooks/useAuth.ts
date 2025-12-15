"use client";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RegisterForm } from "@/types/register";
import { useRouter } from "next/navigation";

export function useAuthActions() {
  const { setAuthenticated, setUser } = useAuth();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await api.post<RegisterForm>("/auth/login", {
        email,
        password,
      });
      return res.data;
    },
    onSuccess: async () => {
    setAuthenticated(true);
    const me = await api.get("/users/me");
    setUser(me.data);
    router.push("/");
  },
    onError: () => {
      setAuthenticated(false);
      setUser(null);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout");
    },
    onSuccess: () => {
      setAuthenticated(false);
      setUser(null);
      router.push("/");
    },
  });

  const checkSession = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const res = await api.get("/users/me");
      return res.data;
    },
  });

  const registerUser = useMutation({
    mutationFn: async (data: RegisterForm) => {
      const res = await api.post("/auth/register", data);
      return res.data;
    },
    onSuccess: () => {
      router.push("/login");
    },
  });

  return { loginMutation, logoutMutation, checkSession, registerUser };
}
