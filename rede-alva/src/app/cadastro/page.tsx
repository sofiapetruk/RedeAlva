'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';

export default function Cadastro() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login/login'); // Redireciona para login se não estiver autenticado
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null; // Evita renderizar antes de redirecionar

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Cadastro</h1>
      <p className="mt-2 text-gray-600">
        Escolha uma das opções abaixo para continuar o cadastro:
      </p>
      <div className="mt-4 space-y-4">
        <Link href="/comunidades/cad-comunidades">
          <button className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700">
            Cadastrar Comunidade
          </button>
        </Link>
        <Link href="/unidades/cad-unidades">
          <button className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700">
            Cadastrar Unidade
          </button>
        </Link>
      </div>
      <button
        onClick={logout}
        className="mt-8 px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
