"use client";

import { TipoArmazenamento } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CadArmazenamento() {
    const navigate = useRouter(); // Redirecionamento para home

    const [armazenamento, setArmazenamento] = useState<TipoArmazenamento>({
        idComunidade: 0,
        idUnidade: 0,
        tipoGeracao: "",
        quantidade: 0.0
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evento.target;
        setArmazenamento({ ...armazenamento, [name]: value });
        setErrors({ ...errors, [name]: "" }); // Limpa o erro ao alterar o campo
    };

    const validateInputs = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!armazenamento.idComunidade) {
            newErrors.idComunidade = "O ID da comunidade é obrigatório.";
        }

        if (!armazenamento.idUnidade) {
            newErrors.idUnidade = "O ID da unidade é obrigatório.";
        }

        if (!armazenamento.tipoGeracao) {
            newErrors.tipoGeracao = "O tipo de transação é obrigatório.";
        }

        if (armazenamento.quantidade <= 0) {
            newErrors.quantidade = "A quantidade de energia deve ser maior que zero.";
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
            const response = await fetch("http://localhost:8080/armazenamento", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(armazenamento)
            });

            if (response.ok) {
                alert("Armazenamento cadastrado com sucesso!");
                setArmazenamento({
                    idComunidade: 0,
                    idUnidade: 0,
                    tipoGeracao: "",
                    quantidade: 0.0
                });
                navigate.push("/comercio"); // Redireciona após cadastro
            } else {
                const errorMessage = await response.text();
                alert("Erro ao cadastrar armazenamento: " + errorMessage);
            }
        } catch (error) {
            console.error("Falha no armazenamento: ", error);
            alert("Erro no servidor. Tente novamente mais tarde.");
        }
    };

    return (
        <div>
            <h2>CADASTRO DE ARMAZENAMENTO</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="idCom">ID Comunidade</label>
                    <input 
                        type="number" 
                        name="idComunidade" 
                        id="idCom" 
                        value={armazenamento.idComunidade} 
                        onChange={handleChange}
                        placeholder="Digite o ID da sua comunidade" 
                        required
                    />
                    {errors.idComunidade && <p style={{ color: "red" }}>{errors.idComunidade}</p>}
                </div>

                <div>
                    <label htmlFor="idUnidade">ID da Unidade</label>
                    <input 
                        type="number" 
                        name="idUnidade" 
                        id="idUnidade" 
                        value={armazenamento.idUnidade} 
                        onChange={handleChange}
                        placeholder="Digite o ID da unidade que deseja transferir a energia" 
                        required
                    />
                    {errors.idUnidade && <p style={{ color: "red" }}>{errors.idUnidade}</p>}
                </div>

                <div>
                    <fieldset>
                        <legend>Tipo de Transação</legend>

                        <label htmlFor="idTransacaoDar">Dar</label>
                        <input 
                            type="radio" 
                            name="tipoGeracao" 
                            id="idTransacaoDar" 
                            value="dar" 
                            checked={armazenamento.tipoGeracao === "dar"} 
                            onChange={handleChange} 
                            required
                        />

                        <label htmlFor="idTransacaoPegar">Pegar</label>
                        <input 
                            type="radio" 
                            name="tipoGeracao" 
                            id="idTransacaoPegar" 
                            value="pegar" 
                            checked={armazenamento.tipoGeracao === "pegar"} 
                            onChange={handleChange} 
                            required
                        />
                        {errors.tipoGeracao && <p style={{ color: "red" }}>{errors.tipoGeracao}</p>}
                    </fieldset>
                </div>

                <div>
                    <label htmlFor="idQtd">Quantidade Energia</label>
                    <input 
                        type="number" 
                        name="quantidade" 
                        id="idQtd" 
                        value={armazenamento.quantidade} 
                        onChange={handleChange}
                        placeholder="Digite a quantidade que irá ser trocada" 
                        required
                    />
                    {errors.quantidade && <p style={{ color: "red" }}>{errors.quantidade}</p>}
                </div>

                <div>
                    <button type="submit">REGISTRAR</button>
                </div>
            </form>
        </div>
    );
}
