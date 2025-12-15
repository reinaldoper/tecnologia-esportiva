'use client';
import Navbar from '@/components/Navbar';
import PlanList from './components/PlanList';
import PlanForm from './components/PlanForm';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PlansPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen wave-bg">
      <Navbar />
      <main className="p-6">
        <h1 className="text-2xl font-bold text-green-700 mb-4">Planos</h1>
        <PlanForm />
        <PlanList />
      </main>
    </div>
  );
}
