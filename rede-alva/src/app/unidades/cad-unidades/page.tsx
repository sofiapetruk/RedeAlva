"use client";

import { TipoUnidade } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


export default function CadUnidades() {

    const navigate = useRouter();

    const [unidade, setUnidade] = useState<TipoUnidade>({
        idComunidade: 0,
        nomeUnidade:"",
        capacidadeGeracao: null,
        capacidadeConsumo: null
    });

    const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evento.target;
    
        setUnidade({ 
            ...unidade, 
            [name]: (name === "capacidadeGeracao" || name === "capacidadeConsumo") && value === "" 
                ? null 
                : ( name === "capacidadeGeracao" || name === "capacidadeConsumo") 
                    ? parseFloat(value) 
                    : value
        });
    };
    

    const handleSubmit = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/unidade", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(unidade)
            });

            if (response.ok) {
                alert("Comunidade cadastrada com sucesso!");
                setUnidade({
                    idComunidade: 0,
                    nomeUnidade:"",
                    capacidadeGeracao: 0.0,
                    capacidadeConsumo: 0.0
                });
                navigate.push("/administracao"); // Redireciona após cadastro
            }
        } catch (error) {
            console.error("Falha no cadastro: ", error);
        }
    };



    return (
        <div>
            <h2>CADASTRO UNIDADE</h2>
            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="idCom">ID Comunidade</label>
                    <input type="number" name="idComunidade" id="idCom" value={unidade.idComunidade} onChange={handleChange}
                    placeholder="digite o id da sua comunidade" required/>
                </div>

                <div>
                    <label htmlFor="idNm">Nome Unidade</label>
                    <input type="text" name="nomeUnidade" id="idNm" value={unidade.nomeUnidade} onChange={handleChange}
                    placeholder="digite o nome da sua comunidade" required/>
                </div>

                <div>
                    <label htmlFor="idGer">Capacidade de Geração</label>
                    <input type="number" name="capacidadeGeracao" id="idGer" value={unidade.capacidadeGeracao ?? ''} onChange={handleChange}
                    placeholder="digite quantos de kwh o seu painel solar consegue geral"/>
                </div>

                <div>
                    <label htmlFor="idCons">Capacidade Consumo</label>
                    <input type="number" name="capacidadeConsumo" id="idCons" value={unidade.capacidadeConsumo ?? ''} onChange={handleChange}
                    placeholder="digite quantos de kwh conseme por mês"/>
                </div>

                <div>
                    <button type="submit">REGISTRAR</button>
                </div>

            </form>
        </div>
    )
}
