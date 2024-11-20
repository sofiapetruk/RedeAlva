'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TipoUser } from '@/types/types';

export default function Cadastro() {
  const navigate = useRouter();

  const [user, setUser] = useState<TipoUser>({
    user: "",
    email: "",
    senha: "",
    date: ""
  });

  const [confirmPassword, setConfirmPassword] = useState(""); 
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

  const handleSubmit = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (!validateInputs()) {
      return; 
    }

    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        setUser({
          user: "",
          email: "",
          senha: "",
          date: ""
        });
        setConfirmPassword("");
        navigate.push("/");
      } else {
        setErrors({ form: "Falha no cadastro. Verifique os dados e tente novamente." });
      }
    } catch (error) {
      console.error("Falha no cadastro: ", error);
      setErrors({ form: "Erro ao conectar com o servidor." });
    }
  };

  return (
    <div className="container-cadastro">
      <div className="form-login">
        <h1>CADASTRO</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="user"
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
              placeholder="Confirme a senha"
              value={confirmPassword}
              onChange={handlePasswordChange}
              required
            />
            {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword}</p>}
          </div>
          <div>
            <input
              type="text"
              name="date"
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
        <p>
          Já tem uma conta? <a href="/login/login">Faça login</a>
        </p>
      </div>
      <div className="info-login">
        <h1>Bem vindo de Volta!</h1>
        <p>Para se manter conectado conosco, por favor, faça login com suas informações</p>
        <button className="cadastro-btn">
          <Link href="/login/login">LOGIN</Link>
        </button>
      </div>
    </div>
  );
}
