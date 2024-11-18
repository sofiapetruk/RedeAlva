"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TipoComunidade } from "@/types/types";

export default function EditComunidade({ params }: { params: { id: number } }) {
    const navigate = useRouter(); // Redirecionamento para home

    const [comunidade, setComunidade] = useState<TipoComunidade>({
        idComunidade: 0,
        tipoComunidade: "",
        endereco: "",
        estado: "",
        totalEnergia: 0.0
    });

    useEffect(() => {
        const chamadaApi = async () => {
            try {
                const response = await fetch(`http://localhost:8080/comunidade/${params.id}`);
                const data = await response.json();
                setComunidade(data);
            } catch (error) {
                console.error("Erro ao buscar dados da comunidade:", error);
            }
        };
        chamadaApi();
    }, []);

    const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evento.target;
        setComunidade({ ...comunidade, [name]: value });
    };

    const handleSubmit = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/comunidade/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comunidade)
            });

            if (response.ok) {
                alert("Comunidade atualizada com sucesso!");
                setComunidade({
                    idComunidade: 0,
                    tipoComunidade: "",
                    endereco: "",
                    estado: "",
                    totalEnergia: 0.0
                });
                navigate.push("/comunidades"); // Redireciona após atualização
            }
        } catch (error) {
            console.error("Falha na atualização: ", error);
        }
    };

    return (
        <div className=" rounded-xl p-6 flex flex-col gap-4 m-auto">
            <form onSubmit={handleSubmit} >
                <h3 className="text-black text-center text-3xl">Editar Comunidade</h3>

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
                    <input type="number" name="totalEnergia" id="idEnergia" value={comunidade.totalEnergia} onChange={handleChange}
                        placeholder="total de energia do microgrid, caso houver" required/>
                </div>

                <div>
                    <button type="submit">Atualizar</button>
                </div>
            </form>
        </div>
    );
}
