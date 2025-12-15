'use client';
import Navbar from '@/components/Navbar';
import AffiliateForm from './components/AffiliateForm';
import AffiliateList from './components/AffiliateList';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

export default function AffiliatesPage() {
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
        <h1 className="text-2xl font-bold text-green-700 mb-6">Afiliados</h1>
        <AffiliateForm />
        <AffiliateList />
      </main>
    </div>
  );
}
