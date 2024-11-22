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
    user: '',
    email: '',
    senha: '',
    date: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evento.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Limpa erros ao atualizar campos
  };

  const validateInputs = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Validação: Nome completo
    if (!user.user.trim() || user.user.split(' ').length < 2) {
      newErrors.user = 'Por favor, informe o nome completo.';
    }

    // Validação: Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      newErrors.email = 'Por favor, insira um email válido.';
    }

    // Validação: Senha
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!senhaRegex.test(user.senha)) {
      newErrors.senha =
        'A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.';
    }

    // Validação: Confirmar Senha
    if (user.senha !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem.';
    }

    // Validação: Data de nascimento
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(user.date)) {
      newErrors.date = 'A data de nascimento deve estar no formato YYYY-MM-DD.';
    } else {
      const date = new Date(user.date);
      if (isNaN(date.getTime())) {
        newErrors.date = 'Por favor, insira uma data válida.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true se não houver erros
  };

  const handleSignup = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (!validateInputs()) {
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
        setConfirmPassword('');
        await login(user.email, user.senha);
        navigate.push('/cadastro');
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
            {errors.user && <p className="error-message">{errors.user}</p>}
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
            {errors.email && <p className="error-message">{errors.user}</p>}
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
            {errors.senha && <p className="error-message">{errors.senha}</p>}
          </div>
          <div>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirme a senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="date"
              id="dtNascimento"
              placeholder="Data de Nascimento (YYYY-MM-DD)"
              value={user.date}
              onChange={handleChange}
              required
            />
            {errors.date && <p className="error-message">{errors.date}</p>}
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
