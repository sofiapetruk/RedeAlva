'use client';
import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Cadastro() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }
    // Aqui você pode implementar a lógica de cadastro (ex: chamar uma API para criar a conta)
    login(); // Exemplo: faz login automaticamente após o cadastro
    router.push('/cadastro');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-lg">
            <h2 className="text-2xl font-bold text-center">Cadastro</h2>
            <form onSubmit={handleSignup} className="space-y-4">
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Nome de Usuário
                </label>
                <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
                </label>
                <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
                </label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                />
            </div>
            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirme a Senha
                </label>
                <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                />
            </div>
            <button
                type="submit"
                className="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
                Cadastrar
            </button>
            </form>
            <p className="text-center text-sm text-gray-600">
            Já tem uma conta? <a href="/login/login" className="text-indigo-600 hover:underline">Faça login</a>
            </p>
        </div>
    </div>
  );
}