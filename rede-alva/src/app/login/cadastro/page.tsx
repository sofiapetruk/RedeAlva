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

  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Armazena erros específicos para cada campo

  const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evento.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Limpa o erro ao alterar o campo
  };

  const handlePasswordChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(evento.target.value);
    setErrors({ ...errors, confirmPassword: "" }); // Limpa o erro ao alterar a confirmação de senha
  };

  const validateInputs = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!/^[a-zA-Z\s]{2,}$/.test(user.user)) {
      newErrors.user = "O nome deve conter apenas letras e ter pelo menos 2 caracteres.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      newErrors.email = "O e-mail inserido é inválido.";
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(user.senha)) {
      newErrors.senha = "A senha deve ter pelo menos 8 caracteres, incluindo letras, números e um caractere especial.";
    }

    if (user.senha !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem.";
    }

    const today = new Date();
    const birthDate = new Date(user.date);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      isNaN(birthDate.getTime()) || 
      age < 18 || 
      (age === 18 && monthDiff < 0) || 
      (age === 18 && monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      newErrors.date = "Você deve ter pelo menos 18 anos.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
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

      if (response.ok) {
        alert('Usuário cadastrado com sucesso!');
        setUser({
          user: '',
          email: '',
          senha: '',
          date: '',
        });
        setConfirmPassword("");
        login();
        navigate.push('/');
      } else {
        const data = await response.json();
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
            {errors.user && <p style={{ color: "red" }}>{errors.user}</p>}
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
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
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
            {errors.senha && <p style={{ color: "red" }}>{errors.senha}</p>}
          </div>
          <div>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirme a senha"
              value={confirmPassword}
              onChange={handlePasswordChange} // Atualiza o estado corretamente
              required
            />
            {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword}</p>}
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
            {errors.date && <p style={{ color: "red" }}>{errors.date}</p>}
          </div>
          <button type="submit" className="submit-btn">
            Cadastrar
          </button>
        </form>
        {errors.form && <p style={{ color: "red" }}>{errors.form}</p>}
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
