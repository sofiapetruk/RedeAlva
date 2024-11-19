'use client';
import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Cadastro() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dtNascimento, setDtNascimento] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }
    // Aqui você pode implementar a lógica de cadastro (chamar uma API para criar a conta)
    login(); // Exemplo: faz login automaticamente após o cadastro
    router.push('/cadastro');
  };

  return (
    <div className="container-cadastro">
        <div className="form-login">
            <h1>CADASTRO</h1>
            <form onSubmit={handleSignup} className="">
              <div>
                  <input
                  type="text"
                  id="username"
                  placeholder='Nome Completo'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  
                  />
              </div>
              <div>
                  <input
                  type="email"
                  id="email"
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  
                  />
              </div>
              <div>
                  <input
                  type="password"
                  id="password"
                  placeholder='Senha'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  
                  />
              </div>
              <div>
                  <input
                  type="password"
                  id="confirmPassword"
                  placeholder='Confirme a senha'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  />
              </div>
              <div>
                  <input
                  type="text"
                  id="dtNascimento"
                  placeholder='Data de Nascimento'
                  value={dtNascimento}
                  onChange={(e) => setDtNascimento(e.target.value)}
                  required
                  />
              </div>
              <button type="submit" className='submit-btn'>
                          Cadastrar
              </button>
            </form>
            <p >
            Já tem uma conta? <a href="/login/login" >Faça login</a>
            </p>
        </div>
        <div className="info-login">
                <h1>
                    Bem vindo de Volta!
                </h1>
                <p>
                  Para se manter conectado conosco por favor faça login com suas informações
                </p>
                <button className='cadastro-btn'>
                    <Link href="/login/login">LOGIN</Link>
                </button>
          </div>
    </div>
  );
}