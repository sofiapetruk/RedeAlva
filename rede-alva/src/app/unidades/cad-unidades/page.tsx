"use client";

import { TipoUnidade } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ftcomunidade from "@/img/comunidade.png"
import check from "@/img/checkcad.png"
import Image from "next/image";


export default function CadUnidades() {
    const navigate = useRouter();

    const [unidade, setUnidade] = useState<TipoUnidade>({
        idComunidade: 0,
        nomeUnidade: "",
        capacidadeGeracao: null,
        capacidadeConsumo: null
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evento.target;

        if (name === "capacidadeGeracao" || name === "capacidadeConsumo") {
            if (value === "" || /^[0-9]*$/.test(value)) {
                setUnidade({ ...unidade, [name]: value === "" ? null : parseFloat(value) });
                setErrors({ ...errors, [name]: "" }); // Limpa o erro se o valor for válido
            } else {
                setErrors({ ...errors, [name]: `${name === "capacidadeGeracao" ? "Capacidade de geração" : "Capacidade de consumo"} deve ser um número.` });
            }
        } else {
            setUnidade({ ...unidade, [name]: value });
            setErrors({ ...errors, [name]: "" }); // Limpa o erro ao alterar o campo
        }
    };

    const validateInputs = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!unidade.idComunidade) {
            newErrors.idComunidade = "O ID da comunidade é obrigatório.";
        }

        if (!unidade.nomeUnidade) {
            newErrors.nomeUnidade = "O nome da unidade é obrigatório.";
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
            const response = await fetch("http://localhost:8080/unidade", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(unidade)
            });

            if (response.ok) {
                alert("Unidade cadastrada com sucesso!");
                setUnidade({
                    idComunidade: 0,
                    nomeUnidade: "",
                    capacidadeGeracao: null,
                    capacidadeConsumo: null
                });
                navigate.push("/administracao"); // Redireciona após cadastro
            } else {
                const errorMessage = await response.text();
                alert("Erro ao cadastrar unidade: " + errorMessage);
            }
        } catch (error) {
            console.error("Falha no cadastro: ", error);
            alert("Erro no servidor. Tente novamente mais tarde.");
        }
    };

    return (
        <div>
            <h2>CADASTRO UNIDADE</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="idCom">ID Comunidade</label>
                    <input
                        type="number"
                        name="idComunidade"
                        id="idCom"
                        value={unidade.idComunidade}
                        onChange={handleChange}
                        placeholder="digite o id da sua comunidade"
                        required
                    />
                    {errors.idComunidade && <p style={{ color: "red" }}>{errors.idComunidade}</p>}
                </div>
            
                <div className="form-unidades">
                    <h1>CADASTRO UNIDADE</h1>
                        <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="idNm">Nome Unidade</label>
                    <input
                        type="text"
                        name="nomeUnidade"
                        id="idNm"
                        value={unidade.nomeUnidade}
                        onChange={handleChange}
                        placeholder="digite o nome da sua comunidade"
                        required
                    />
                    {errors.nomeUnidade && <p style={{ color: "red" }}>{errors.nomeUnidade}</p>}
                </div>

                <div>
                    <label htmlFor="idGer">Capacidade de Geração</label>
                    <input
                        type="number"
                        name="capacidadeGeracao"
                        id="idGer"
                        value={unidade.capacidadeGeracao ?? ''}
                        onChange={handleChange}
                        placeholder="digite quantos de kwh o seu painel solar consegue geral"
                    />
                    {errors.capacidadeGeracao && <p style={{ color: "red" }}>{errors.capacidadeGeracao}</p>}
                </div>

                <div>
                    <label htmlFor="idCons">Capacidade Consumo</label>
                    <input
                        type="number"
                        name="capacidadeConsumo"
                        id="idCons"
                        value={unidade.capacidadeConsumo ?? ''}
                        onChange={handleChange}
                        placeholder="digite quantos de kwh consome por mês"
                    />
                    {errors.capacidadeConsumo && <p style={{ color: "red" }}>{errors.capacidadeConsumo}</p>}
                </div>

                <div>
                    <button type="submit">REGISTRAR</button>
                </div>
            </form>
        </div>
    );
}
