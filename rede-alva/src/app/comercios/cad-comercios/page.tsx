"use client";

import { TipoComercio, TipoComunidade } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CadComunidades() {
    const navigate = useRouter(); // Redirecionamento para home

    const [comercio, setComercio] = useState<TipoComercio>({
        idComunidade: 0,
        unidadeVedendoraId: 0,
        unidadeCompradoraId: 0,
        tipoTransacao: "",
        quantidade: 0
    });

    const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evento.target;
        setComercio({ ...comercio, [name]: value });
    };

    const handleSubmit = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/distribuicao", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comercio)
            });

            if (response.ok) {
                alert("Comercio cadastrada com sucesso!");
                setComercio({
                    idComunidade: 0,
                    unidadeVedendoraId: 0,
                    unidadeCompradoraId: 0,
                    tipoTransacao: "",
                    quantidade: 0
                });
                navigate.push("/"); 
            }
        } catch (error) {
            console.error("Falha no comercio: ", error);
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
                    <fieldset>
                        <legend>Tipo de Transação</legend>

                        <label htmlFor="idTransacaoVenda"> VENDA </label>
                        <input type="radio" name="tipoTransacao" id="idTransacaoVenda" value="venda" checked={comercio.tipoTransacao === "venda"} onChange={handleChange}/>

                        <label htmlFor="idTransacaoCompra"> COMPRA </label>
                        <input type="radio" name="tipoTransacao" id="idTransacaoCompra" checked={comercio.tipoTransacao === "compra"} onChange={handleChange} />
                    </fieldset>
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

