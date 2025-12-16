'use client';
import { useAuthActions } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FaFutbol } from 'react-icons/fa';
import { LoginForm } from '@/types/login';
import Link from 'next/link';


export default function LoginPage() {
  const { loginMutation } = useAuthActions();
  const { register, handleSubmit } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden wave-bg">
      
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        className="absolute top-10 left-10 opacity-10 text-green-800"
      >
        <FaFutbol size={250} />
      </motion.div>

      
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md relative z-10">
        <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Login - Tecnologia Esportiva
        </h1>
        <Link href="/register" className="text-blue-500 hover:underline">
          Não possui uma conta? Registre-se
        </Link>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              placeholder='Email'
              type="email"
              {...register('email')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              placeholder='Senha'
              type="password"
              {...register('password')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            {loginMutation.isPending ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        {loginMutation.isError && (
          <p className="mt-4 text-red-500 text-sm text-center">
            Erro ao fazer login. Verifique suas credenciais.
          </p>
        )}
      </div>
    </div>
  );
}
