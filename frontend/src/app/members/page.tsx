"use client";
import Navbar from "@/components/Navbar";
import MemberForm from "./components/MemberForm";
import MemberList from "./components/MemberList";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function MembersPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen wave-bg">
      <Navbar />
      <main className="p-6">
        <h1 className="text-2xl font-bold text-green-700 mb-6">Sócios-torcedores</h1>
        <MemberForm />
        <MemberList />
      </main>
    </div>
  );
}
