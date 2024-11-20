"use client";

import { TipoComunidade } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CadComunidades() {
    const navigate = useRouter(); // Redirecionamento para home

    const [comunidade, setComunidade] = useState<TipoComunidade>({
        tipoComunidade: "",
        endereco: "",
        estado: "",
        totalEnergia: null
    });

    const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evento.target;

        // Se o campo for 'totalEnergia' e estiver vazio, define como null. Caso contrário, define como número.
        setComunidade({ 
            ...comunidade, 
            [name]: name === "totalEnergia" && value === "" ? null : (name === "totalEnergia" ? parseFloat(value) : value)
        });
    };

    const handleSubmit = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

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
                navigate.push("/administracao"); // Redireciona após cadastro
            }
        } catch (error) {
            console.error("Falha no cadastro: ", error);
        }
    };

    return (
        <div>
            <h2>CADASTRO DE COMUNIDADE</h2>
            <form onSubmit={handleSubmit}>
                
                <div>
                    <label htmlFor="idTipo">Tipo da comunidade</label>
                    <input type="text" name="tipoComunidade" id="idTipo" value={comunidade.tipoComunidade} onChange={handleChange} 
                        placeholder="tipo de comunidade (Rural ou urbana/Prédios ou casa)" required/>
                </div>

                <div>
                    <label htmlFor="idEnd">Endereço</label>
                    <input type="text" name="endereco" id="idEnd" value={comunidade.endereco} onChange={handleChange}
                        placeholder="endereço da comunidade" required/>
                </div>

                <div>
                    <label htmlFor="idEst">Estado</label>
                    <input type="text" name="estado" id="idEst" value={comunidade.estado} onChange={handleChange}
                        placeholder="estado da comunidade" required/>
                </div>

                <div>
                    <label htmlFor="idEnergia">Total de energia</label>
                    <input type="number" name="totalEnergia" id="idEnergia" value={comunidade.totalEnergia ?? ''} onChange={handleChange}
                        placeholder="total de energia do microgrid, caso houver"/>
                </div>

                <div>
                    <button type="submit">REGISTRAR</button>
                </div>
            </form>
        </div>
    );
}
