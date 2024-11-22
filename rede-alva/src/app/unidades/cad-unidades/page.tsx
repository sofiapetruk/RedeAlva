"use client";

import { TipoUnidade } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ftcomunidade from "@/img/comunidade.png";
import Image from "next/image";

export default function CadUnidades() {
    const navigate = useRouter();

    const [unidade, setUnidade] = useState<TipoUnidade>({
        idComunidade: 0,
        nomeUnidade: "",
        capacidadeGeracao: null,
        capacidadeConsumo: null,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evento.target;

        if (name === "capacidadeGeracao" || name === "capacidadeConsumo") {
            if (value === "" || /^[0-9]*$/.test(value)) {
                setUnidade({ ...unidade, [name]: value === "" ? null : parseFloat(value) });
                setErrors({ ...errors, [name]: "" }); // Limpa erro se valor for válido
            } else {
                setErrors({ ...errors, [name]: `${name === "capacidadeGeracao" ? "Capacidade de geração" : "Capacidade de consumo"} deve ser um número válido.` });
            }
        } else {
            setUnidade({ ...unidade, [name]: value });
            setErrors({ ...errors, [name]: "" }); // Limpa erro ao alterar o campo
        }
    };

    const validateInputs = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!unidade.idComunidade) {
            newErrors.idComunidade = "O ID da comunidade é obrigatório.";
        }

        if (!unidade.nomeUnidade.trim()) {
            newErrors.nomeUnidade = "O nome da unidade é obrigatório.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        if (!validateInputs()) return;

        try {
            const response = await fetch("http://localhost:8080/unidade", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(unidade),
            });

            if (response.ok) {
                alert("Unidade cadastrada com sucesso!");
                setUnidade({
                    idComunidade: 0,
                    nomeUnidade: "",
                    capacidadeGeracao: null,
                    capacidadeConsumo: null,
                });
                navigate.push("/cadastro"); // Redireciona após cadastro
            } else {
                const errorMessage = await response.text();
                alert("Erro ao cadastrar unidade: " + errorMessage);
            }
        } catch (error) {
            console.error("Falha no cadastro:", error);
            alert("Erro no servidor. Tente novamente mais tarde.");
        }
    };

    return (
        <div className="main-unidades">
            <h1 className="titulo">
                <span>1</span> Comunidade <span>2</span> Unidade
            </h1>
            <div className="container-unidade">
                <div className="info-unidade">
                    <h1>Insira as informações no formulário para cadastrar sua comunidade</h1>
                    <Image src={ftcomunidade} height={500} width={500} alt="Comunidade" />
                </div>

                <div className="form-unidades">
                    <h1>Cadastro Unidade</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="idCom">ID Comunidade</label>
                            <input
                                type="number"
                                name="idComunidade"
                                id="idCom"
                                value={unidade.idComunidade}
                                onChange={handleChange}
                                placeholder="Digite o ID da sua comunidade"
                                required
                            />
                            {errors.idComunidade && <p className="error-message">{errors.idComunidade}</p>}
                        </div>

                        <div>
                            <label htmlFor="idNm">Nome Unidade</label>
                            <input
                                type="text"
                                name="nomeUnidade"
                                id="idNm"
                                value={unidade.nomeUnidade}
                                onChange={handleChange}
                                placeholder="Nome da Unidade"
                                required
                            />
                            {errors.nomeUnidade && <p className="error-message">{errors.nomeUnidade}</p>}
                        </div>

                        <div>
                            <label htmlFor="idGer">Capacidade de Geração</label>
                            <input
                                type="number"
                                name="capacidadeGeracao"
                                id="idGer"
                                value={unidade.capacidadeGeracao ?? ""}
                                onChange={handleChange}
                                placeholder="Capacidade de geração"
                            />
                            {errors.capacidadeGeracao && <p className="error-message">{errors.capacidadeGeracao}</p>}
                        </div>

                        <div>
                            <label htmlFor="idCons">Capacidade Consumo</label>
                            <input
                                type="number"
                                name="capacidadeConsumo"
                                id="idCons"
                                value={unidade.capacidadeConsumo ?? ""}
                                onChange={handleChange}
                                placeholder="Consumo de energia por kw/h"
                            />
                            {errors.capacidadeConsumo && <p className="error-message">{errors.capacidadeConsumo}</p>}
                        </div>

                        <div>
                            <button type="submit" className="submit-btn">
                                Registrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
