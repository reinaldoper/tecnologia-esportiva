'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useAuthActions } from '@/hooks/useAuth';
import { FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const { isAuthenticated, user } = useAuth();
  const { logoutMutation } = useAuthActions();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-green-600 text-white px-6 py-3">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg">Tecnologia Esportiva</h2>

        
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        
        {isAuthenticated && (
          <div className="hidden md:flex items-center gap-6">
            <Link href="/plans" className="hover:underline">Planos</Link>
            <Link href="/members" className="hover:underline">Sócios</Link>
            <Link href="/affiliates" className="hover:underline">Afiliados</Link>
            {pathname !== '/' && (<Link href="/" className="hover:underline">Home</Link>
            )}

            <div className="flex items-center gap-2">
              <FaUserCircle size={24} />
              <span>{user?.name}</span>
            </div>

            <button
              onClick={() => logoutMutation.mutate()}
              className="bg-white text-green-600 px-3 py-1 rounded hover:bg-gray-100"
            >
              Sair
            </button>
          </div>
        )}
      </div>

      
      {menuOpen && isAuthenticated && (
        <div className="flex flex-col gap-4 mt-4 md:hidden">
          <Link href="/plans" className="hover:underline">Planos</Link>
          <Link href="/members" className="hover:underline">Sócios</Link>
          <Link href="/affiliates" className="hover:underline">Afiliados</Link>
          <Link href="/" className="hover:underline">Home</Link>


          <div className="flex items-center gap-2">
            <FaUserCircle size={24} />
            <span>{user?.name}</span>
          </div>

          <button
            onClick={() => logoutMutation.mutate()}
            className="bg-white text-green-600 px-3 py-1 rounded hover:bg-gray-100"
          >
            Sair
          </button>
        </div>
      )}
    </nav>
  );
}
