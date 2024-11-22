"use client";

import { TipoComunidade } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ftcomunidade from "@/img/comunidade.png"
import Image from "next/image";

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
                navigate.push("/unidades/cad-unidades"); // Redireciona para cadastro de unidade após cadastro da comunidade
            }
        } catch (error) {
            console.error("Falha no cadastro: ", error);
        }
    };

    return (
        <div className="main-comunidade">
            <h1 className="titulo">
                    <span>1</span> Comunidade <span>2</span> Unidade
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
                                placeholder="Tipo de comunidade (Rural ou urbana/Prédios ou casa)" required/>
                        </div>

                        <div>
                            <input type="text" name="endereco" id="idEnd" value={comunidade.endereco} onChange={handleChange}
                                placeholder="Endereço da comunidade" required/>
                        </div>

                        <div>
                            <input type="text" name="estado" id="idEst" value={comunidade.estado} onChange={handleChange}
                                placeholder="Estado da comunidade" required/>
                        </div>

                        <div>
                            <input type="number" name="totalEnergia" id="idEnergia" value={comunidade.totalEnergia ?? ''} onChange={handleChange}
                                placeholder="Total de energia do microgrid, caso houver"/>
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
