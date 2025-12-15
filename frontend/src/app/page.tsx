'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useEffect } from 'react';
import { useFetchPlans } from '@/hooks/usePlans';
import { useFetchMembers } from '@/hooks/useMembers';
import { useFetchAffiliateRanking } from '@/hooks/useAffiliate';

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const { data: plans } = useFetchPlans();
  const { data: members } = useFetchMembers();
  const { data: ranking } = useFetchAffiliateRanking();

  useEffect(() => {
    if (!isAuthenticated) router.push('/login');
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <div className="min-h-screen wave-bg"></div>;
  }

  return (
    <div className="min-h-screen wave-bg">
      <Navbar />
      <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded p-6 text-center">
          <h2 className="text-lg font-bold text-green-700">📊 Planos ativos</h2>
          <p className="text-2xl mt-2">{plans ? plans.data.length : '...'}</p>
        </div>

        <div className="bg-white shadow rounded p-6 text-center">
          <h2 className="text-lg font-bold text-green-700">👥 Sócios-torcedores</h2>
          <p className="text-2xl mt-2">{members ? members.data.length : '...'}</p>
        </div>

        <div className="bg-white shadow rounded p-6 text-center">
          <h2 className="text-lg font-bold text-green-700">🏆 Top Afiliado</h2>
          <p className="text-xl mt-2">
            {ranking && ranking.length > 0 ? ranking[0].nome : '...'}
          </p>
          <p className="text-sm text-gray-500">
            {ranking && ranking.length > 0 ? `${ranking[0].totalIndicados} indicados` : ''}
          </p>
        </div>
      </main>
    </div>
  );
}
