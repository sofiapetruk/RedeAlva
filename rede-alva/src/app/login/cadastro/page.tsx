'use client';
import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TipoUser } from '@/types/types';

export default function Cadastro() {
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login } = useAuth();
  const navigate = useRouter(); 

  const [user, setUser] = useState<TipoUser>({
    user: "",
    email: "",
    senha: "",
    date: "",
  });

  const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evento.target;
    setUser({ ...user, [name]: value });
  };

  const handleSignup = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
  
    if (user.senha !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }
  
    try {
        const response = await fetch('http://localhost:8080/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          alert('Usuário cadastrado com sucesso!');
          setUser({
            user: '',
            email: '',
            senha: '',
            date: '',
          });
          login();
          navigate.push('/');
        } else {
          alert(`Erro no cadastro: ${data.message || 'Verifique os dados informados.'}`);
        }
    } catch (error) {
      console.error('Erro ao realizar cadastro:', error);
      alert('Erro no servidor. Tente novamente mais tarde.');
    }
  };
  

  return (
    <div className="container-cadastro">
      <div className="form-login">
        <h1>CADASTRO</h1>
        <form onSubmit={handleSignup} className="">
          <div>
            <input
              type="text"
              name="user"
              id="username"
              placeholder="Nome Completo"
              value={user.user}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="senha"
              id="password"
              placeholder="Senha"
              value={user.senha}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirme a senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} // Atualiza o estado corretamente
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="date"
              id="dtNascimento"
              placeholder="Data de Nascimento"
              value={user.date}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Cadastrar
          </button>
        </form>
        <p>
          Já tem uma conta? <Link href="/login/login">Faça login</Link>
        </p>
      </div>
      <div className="info-login">
        <h1>Bem vindo de Volta!</h1>
        <p>
          Para se manter conectado conosco por favor faça login com suas
          informações
        </p>
        <button className="cadastro-btn">
          <Link href="/login/login">LOGIN</Link>
        </button>
      </div>
    </div>
  );
}
