"use client"

import { TipoComunidade } from "@/types/types"
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react"

export default function Comunidades() {


    const navigate = useRouter(); //redirecionamento para home

    const [comunidades, setComunidades] = useState<TipoComunidade[]>([]) //chamar a lista

    const chamadaApi = async ()=>{
        try {
            const response = await fetch("http://localhost:8080/comunidade");
            const data = await response.json();
            setComunidades(data)
        } catch (error) {
            console.error("Falha ao listar comunidades: ", error)
        }
    }

    useEffect(() => {
        chamadaApi();
    }, [])

    const [comunidade, setComunidade] = useState<TipoComunidade>({
        tipoComunidade: "",
        endereco: "",
        estado: "",
        totalEnergia: 0.0
    }); //use state no cadastro é singular, na listar é plural

    const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evento.target;
        setComunidade({ ...comunidade, [name]: value })
    } //fazer isso e colocar "onChange={(evento)=> handleChange(evento)}" nos campos , faz com que conseguimos preencher os campos vazios

    const handleSubmit = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/comunidade", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comunidade)
            }); //usar o await para não travar

            if (response.ok) {
                alert("Comunidade cadastrada com sucesso!");
                setComunidade({
                    tipoComunidade: "",
                    endereco: "",
                    estado: "",
                    totalEnergia: 0.0
                });

                navigate.push("/");

            }

        } catch (error) {
            console.error("Falha no cadastro: ", error)
        }

    } //tem que ser uma função async pq recebe um evento externos

    return (
        <div>
            <div>
                <h2>CADASTRO DE COMUNIDADE</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="idTipo">Tipo da comunidade</label>
                        <input type="text" name="tipo_comunidade" id="idTipo" value={comunidade.tipoComunidade}
                            onChange={(evento) => handleChange(evento)} placeholder="tipo de comunidade (Rural ou urbana/Prédios ou casa)" required />
                    </div>
                    <div>
                        <label htmlFor="idEnd">Estado</label>
                        <input type="text" name="endereco" id="idEnd" value={comunidade.endereco}
                            onChange={(evento) => handleChange(evento)} placeholder="endereço da comunidade" required />
                    </div>
                    <div>
                        <label htmlFor="idEst">Endereço</label>
                        <input type="text" name="estado" id="idEst" value={comunidade.estado}
                            onChange={(evento) => handleChange(evento)} placeholder="estado da comunidade" required />
                    </div>
                    <div>
                        <label htmlFor="idEnergia">Total de energia</label>
                        <input type="number" name="total_energia" id="idEnergia" value={comunidade.totalEnergia}
                            onChange={(evento) => handleChange(evento)} placeholder="total de energia do microgrids, caso houver" required />
                    </div>
                    <div>
                        <button type="submit">REGISTRAR</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
