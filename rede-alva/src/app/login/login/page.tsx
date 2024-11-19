'use client';
import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login();
  };

  return (
        <div className="container-login">
            <div className="info-login">
                <h1>
                    Seja bem vindo!
                </h1>
                <p>
                    Caso não possua uma conta, faça seu cadastro clicando no botão abaixo
                </p>
                <button className='cadastro-btn'>
                    <Link href="/login/cadastro">Cadastrar</Link>
                </button>
            </div>
            <div className="form-login">
                <h1>LOGIN</h1>
                <form onSubmit={handleLogin} className="form">
                    <div>
                        <input
                        type="email"
                        id="email"
                        value={email}
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    </div>
                    <div>
                        <input
                        type="password"
                        id="password"
                        value={password}
                        placeholder='Senha'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </div>
                    <button type="submit" className='submit-btn'>
                        Entrar
                    </button>
                </form>
            </div>
        </div>
  );
}