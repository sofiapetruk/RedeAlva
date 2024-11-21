"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TipoComercio, TipoComunidade } from "@/types/types";

export default function EditComunidade({ params }: { params: { id: number } }) {
    const navigate = useRouter(); // Redirecionamento para home

    const [comercio, setComercio] = useState<TipoComercio>({
        idComercio: 0,
        idComunidade: 0,
        unidadeVedendoraId: 0,
        unidadeCompradoraId: 0,
        quantidade: 0
    });

    useEffect(() => {
        const chamadaApi = async () => {
            try {
                const response = await fetch(`http://localhost:8080/distribuicao/${params.id}`);
                const data = await response.json();
                setComercio(data);
            } catch (error) {
                console.error("Erro ao buscar dados do comercio:", error);
            }
        };
        chamadaApi();
    }, []);

    const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evento.target;
        setComercio({ ...comercio, [name]: value });
    };

    const handleSubmit = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/distribuicao/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comercio)
            });

            if (response.ok) {
                alert("Comercio atualizada com sucesso!");
                setComercio({
                    idComercio: 0,
                    idComunidade: 0,
                    unidadeVedendoraId: 0,
                    unidadeCompradoraId: 0,
                    quantidade: 0
                });
                navigate.push("/comercios"); 
            }
        } catch (error) {
            console.error("Falha na atualização: ", error);
        }
    };

    return (
        <div className="rounded-xl p-6 flex flex-col gap-4 m-auto">
            <form onSubmit={handleSubmit} >
                <h3 className="text-black text-center text-3xl">Editar Comercio</h3>

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
                    <button type="submit">Atualizar</button>
                </div>
            </form>
        </div>
    );
}
