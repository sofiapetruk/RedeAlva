"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TipoComunidade, TipoUnidade } from "@/types/types";

export default function EditComunidade({ params }: { params: { id: number } }) {
    const navigate = useRouter();

    const [unidade, setUnidade] = useState<TipoUnidade>({
        idUnidade: 0,
        idComunidade: 0,
        nomeUnidade:"",
        capacidadeGeracao: null,
        capacidadeConsumo: null
    });
    useEffect(() => {
        const chamadaApi = async () => {
            try {
                const response = await fetch(`http://localhost:8080/unidade/${params.id}`);
                const data = await response.json();
                setUnidade(data);
            } catch (error) {
                console.error("Erro ao buscar dados da comunidade:", error);
            }
        };
        chamadaApi();
    }, []);

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
            const response = await fetch(`http://localhost:8080/unidade/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(unidade)
            });

            if (response.ok) {
                alert("Comunidade atualizada com sucesso!");
                setUnidade({
                    idUnidade: 0,
                    idComunidade: 0,
                    nomeUnidade:"",
                    capacidadeGeracao: null,
                    capacidadeConsumo: null
                });
                navigate.push("/administracao"); // Redireciona após atualização
            }
        } catch (error) {
            console.error("Falha na atualização: ", error);
        }
    };

    return (
        <div className="container-edit">
            <div className="form-edit">
                <h1 className="titulo">Editar Unidade</h1>
                <form onSubmit={handleSubmit} >
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
                        <button type="submit" className="submit-btn">Atualizar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
