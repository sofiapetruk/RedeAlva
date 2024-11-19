'use client';
import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="container-login">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-lg">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
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
                <button
                    type="submit"
                    className="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                    Entrar
                </button>
                </form>
                <p className="text-center text-sm text-gray-600">
                    Não tem uma conta? <a href="/login/cadastro" className="text-indigo-600 hover:underline">Cadastre-se</a>
                </p>
            </div>
        </div>
      
    </div>
  );
}