'use client';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FaFutbol } from 'react-icons/fa';
import { RegisterForm } from '@/types/register';
import { useAuthActions } from '@/hooks/useAuth';
import Link from 'next/link';


export default function RegisterPage() {
  const { registerUser } = useAuthActions();
  const { register, handleSubmit } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    registerUser.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden wave-bg">
      
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        className="absolute bottom-10 right-10 opacity-10 text-blue-500"
      >
        <FaFutbol size={250} />
      </motion.div>

     
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md relative z-10">
        <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Registro - Tecnologia Esportiva
        </h1>
        <Link href="/login" className="text-blue-500 hover:underline">
          Já possui uma conta? Faça login
        </Link>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              {...register('name')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              {...register('password')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={registerUser.isPending}
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            {registerUser.isPending ? 'Entrando...' : 'Registrar'}
          </button>
        </form>
        {registerUser.isError && (
          <p className="mt-4 text-red-500 text-sm text-center">
            Erro ao registrar. Verifique suas credenciais.
          </p>
        )}
      </div>
    </div>
  );
}
