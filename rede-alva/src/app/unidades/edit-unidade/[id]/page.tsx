"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TipoUnidade } from "@/types/types";

export default function EditUnidade({ params }: { params: { id: number } }) {
    const navigate = useRouter();

    const [unidade, setUnidade] = useState<TipoUnidade>({
        idUnidade: 0,
        idComunidade: 0,
        nomeUnidade: "",
        capacidadeGeracao: null,
        capacidadeConsumo: null,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const chamadaApi = async () => {
            try {
                const response = await fetch(`http://localhost:8080/unidade/${params.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setUnidade(data);
                } else {
                    console.error("Erro ao buscar dados:", response.statusText);
                }
            } catch (error) {
                console.error("Erro ao buscar dados da unidade:", error);
            }
        };
        chamadaApi();
    }, [params.id]);

    const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evento.target;

        if (name === "capacidadeGeracao" || name === "capacidadeConsumo") {
            if (value === "" || /^[0-9]*$/.test(value)) {
                setUnidade({ ...unidade, [name]: value === "" ? null : parseFloat(value) });
                setErrors({ ...errors, [name]: "" });
            } else {
                setErrors({
                    ...errors,
                    [name]: `${name === "capacidadeGeracao" ? "Capacidade de geração" : "Capacidade de consumo"} deve ser um número.`,
                });
            }
        } else {
            setUnidade({ ...unidade, [name]: value });
            setErrors({ ...errors, [name]: "" });
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

        if (!validateInputs()) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/unidade/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(unidade),
            });

            if (response.ok) {
                alert("Unidade atualizada com sucesso!");
                navigate.push("/administracao");
            } else {
                const errorMessage = await response.text();
                alert("Erro ao atualizar unidade: " + errorMessage);
            }
        } catch (error) {
            console.error("Falha na atualização: ", error);
            alert("Erro no servidor. Tente novamente mais tarde.");
        }
    };

    return (
        <div className="container-edit">
            <div className="form-edit">
                <h1 className="titulo">Editar Unidade</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="idCom">ID Comunidade</label>
                        <input
                            type="number"
                            name="idComunidade"
                            id="idCom"
                            value={unidade.idComunidade}
                            onChange={handleChange}
                            placeholder="Digite o ID da comunidade"
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
                            placeholder="Digite o nome da unidade"
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
                            placeholder="Capacidade de geração em kWh"
                        />
                        {errors.capacidadeGeracao && <p className="error-message">{errors.capacidadeGeracao}</p>}
                    </div>

                    <div>
                        <label htmlFor="idCons">Capacidade de Consumo</label>
                        <input
                            type="number"
                            name="capacidadeConsumo"
                            id="idCons"
                            value={unidade.capacidadeConsumo ?? ""}
                            onChange={handleChange}
                            placeholder="Consumo mensal em kWh"
                        />
                        {errors.capacidadeConsumo && <p className="error-message">{errors.capacidadeConsumo}</p>}
                    </div>

                    <div>
                        <button type="submit" className="submit-btn">Atualizar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
