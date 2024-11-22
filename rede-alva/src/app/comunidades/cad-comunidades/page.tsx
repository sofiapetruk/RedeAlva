"use client";

import { TipoComunidade } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ftcomunidade from "@/img/comunidade.png";
import Image from "next/image";

export default function CadComunidades() {
    const navigate = useRouter(); // Redirecionamento para home

    const [comunidade, setComunidade] = useState<TipoComunidade>({
        tipoComunidade: "",
        endereco: "",
        estado: "",
        totalEnergia: null
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evento.target;

        // Verifica o campo totalEnergia para garantir que é um número ou null
        if (name === "totalEnergia") {
            if (value === "" || /^[0-9]*$/.test(value)) {
                setComunidade({ ...comunidade, [name]: value === "" ? null : parseFloat(value) });
                setErrors({ ...errors, [name]: "" }); // Limpa o erro se o valor for válido
            } else {
                setErrors({ ...errors, [name]: "Total de energia deve ser um número." });
            }
        } else {
            setComunidade({ ...comunidade, [name]: value });
            setErrors({ ...errors, [name]: "" }); // Limpa o erro ao alterar o campo
        }
    };

    const validateInputs = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!comunidade.tipoComunidade) {
            newErrors.tipoComunidade = "O tipo da comunidade é obrigatório.";
        }

        if (!comunidade.endereco) {
            newErrors.endereco = "O endereço é obrigatório.";
        }

        if (!comunidade.estado) {
            newErrors.estado = "O estado é obrigatório.";
        } else if (!/^[A-Za-z\s]+$/.test(comunidade.estado)) {
            newErrors.estado = "O estado deve conter apenas letras.";
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
            const response = await fetch("http://localhost:8080/comunidade", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comunidade)
            });

            if (response.ok) {
                alert("Comunidade cadastrada com sucesso!");
                setComunidade({
                    tipoComunidade: "",
                    endereco: "",
                    estado: "",
                    totalEnergia: null
                });
                navigate.push("/unidades/cad-unidades"); // Redireciona para cadastro de unidade após cadastro da comunidade
            } else {
                const errorMessage = await response.text();
                alert("Erro ao cadastrar comunidade: " + errorMessage);
            }
        } catch (error) {
            console.error("Falha no cadastro: ", error);
            alert("Erro no servidor. Tente novamente mais tarde.");
        }
    };

    return (
        <div className="main-comunidade">
            <h1 className="titulo">
                <span>1</span> Comunidade - <span>2</span> Unidade
            </h1>
            <div className="container-comunidade">
                <div className="info-comunidade">
                    <h1>INSIRA AS INFORMAÇÕES NO FORMULÁRIO PARA CADASTRAR SUA COMUNIDADE</h1>
                    <Image 
                        src={ftcomunidade}
                        height={500}
                        width={500}
                        alt="Comunidade"
                    />
                </div>
                <div className="form-comunidade">
                    <h1>CADASTRO DE COMUNIDADE</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input type="text" name="tipoComunidade" id="idTipo" value={comunidade.tipoComunidade} onChange={handleChange} 
                                placeholder="Tipo de comunidade (Rural ou urbana/Prédios ou casa)" required />
                            {errors.tipoComunidade && <p style={{ color: "red" }}>{errors.tipoComunidade}</p>}
                        </div>

                        <div>
                            <input type="text" name="endereco" id="idEnd" value={comunidade.endereco} onChange={handleChange}
                                placeholder="Endereço da comunidade" required />
                            {errors.endereco && <p style={{ color: "red" }}>{errors.endereco}</p>}
                        </div>

                        <div>
                            <input type="text" name="estado" id="idEst" value={comunidade.estado} onChange={handleChange}
                                placeholder="Estado da comunidade" required />
                            {errors.estado && <p style={{ color: "red" }}>{errors.estado}</p>}
                        </div>

                        <div>
                            <input type="number" name="totalEnergia" id="idEnergia" value={comunidade.totalEnergia ?? ''} onChange={handleChange}
                                placeholder="Total de energia do microgrid, caso houver" />
                            {errors.totalEnergia && <p style={{ color: "red" }}>{errors.totalEnergia}</p>}
                        </div>

                        <div>
                            <button type="submit" className="submit-btn">REGISTRAR</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
