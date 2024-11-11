import Link from "next/link";

export default function Login () {
    return (
        <div className="login-container">
            <div className="cadastrar">
                <h1 className="">Seja bem vindo!</h1>
                <p>
                    Caso não possua uma conta, faça seu cadastro clicando no botão abaixo
                </p>
                <Link href="/login/cadastro">Cadastrar</Link>
            </div>
            <div className="login-form">
                <h1 className="">Login</h1>
                <form action="">
                    <input type="text" placeholder="E-mail" />
                    <input type="password" placeholder="Senha" />
                    <button type="submit">Entrar</button>
                </form>
            </div>
            
        </div>
    )
}