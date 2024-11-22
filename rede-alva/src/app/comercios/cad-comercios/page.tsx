"use client";

import { TipoComercio } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CadComunidades() {
    const navigate = useRouter(); // Redirecionamento para home

    const [comercio, setComercio] = useState<TipoComercio>({
        idComunidade: 0,
        unidadeVedendoraId: 0,
        unidadeCompradoraId: 0,
        quantidade: 0
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evento.target;
        setComercio({ ...comercio, [name]: value });
        setErrors({ ...errors, [name]: "" }); // Limpa o erro ao alterar o campo
    };

    const validateInputs = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!comercio.idComunidade) {
            newErrors.idComunidade = "O ID da comunidade é obrigatório.";
        }

        if (!comercio.unidadeVedendoraId) {
            newErrors.unidadeVedendoraId = "O ID da unidade vendedora é obrigatório.";
        }

        if (!comercio.unidadeCompradoraId) {
            newErrors.unidadeCompradoraId = "O ID da unidade compradora é obrigatório.";
        }

        if (comercio.unidadeVedendoraId === comercio.unidadeCompradoraId) {
            newErrors.unidadeCompradoraId = "A unidade vendedora e compradora não podem ser a mesma.";
        }

        if (comercio.quantidade === 0 || comercio.quantidade < 0) {
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
            const response = await fetch("http://localhost:8080/distribuicao", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comercio)
            });

            if (response.ok) {
                alert("Comércio cadastrado com sucesso!");
                setComercio({
                    idComunidade: 0,
                    unidadeVedendoraId: 0,
                    unidadeCompradoraId: 0,
                    quantidade: 0
                });
                navigate.push("/comercio"); 
            } else {
                const errorMessage = await response.text();
                alert("Erro ao cadastrar comércio: " + errorMessage);
            }
        } catch (error) {
            console.error("Falha no cadastro de comércio: ", error);
            alert("Erro no servidor. Tente novamente mais tarde.");
        }
    };

    return (
        <div>
            <h2>CADASTRO DE COMERCIO</h2>
            <form onSubmit={handleSubmit}>
                
                <div>
                    <label htmlFor="idCom">ID Comunidade</label>
                    <input type="number" name="idComunidade" id="idCom" value={comercio.idComunidade} onChange={handleChange}
                    placeholder="digite o id da sua comunidade" required/>
                </div>
                <div>
                    <label htmlFor="idVendedora">ID da Unidade Vendedora</label>
                    <input type="number" name="unidadeVedendoraId" id="idVendedora" value={comercio.unidadeVedendoraId} onChange={handleChange}
                        placeholder="digite o id da unidade vendedora" required/>
                </div>

                <div>
                    <label htmlFor="idCompradora">ID da Unidade Compradora</label>
                    <input type="number" name="unidadeCompradoraId" id="idCompradora" value={comercio.unidadeCompradoraId} onChange={handleChange}
                        placeholder="digite o id da unidade compradora" required/>
                </div>

                <div>
                    <label htmlFor="idQtd">Quantidade Energia</label>
                    <input type="number" name="quantidade" id="idQtd" value={comercio.quantidade} onChange={handleChange}
                        placeholder="digite a quantidade que irá ser trocada" required/>
                </div>

                <div>
                    <button type="submit">REGISTRAR</button>
                </div>
            </form>
        </div>
    );
}
