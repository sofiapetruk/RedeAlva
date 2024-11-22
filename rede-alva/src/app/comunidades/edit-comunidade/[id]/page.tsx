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
        totalEnergia: null
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
    }, [params.id]);

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
            const response = await fetch(`http://localhost:8080/comunidade/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comunidade)
            });

            if (response.ok) {
                alert("Comunidade atualizada com sucesso!");
                navigate.push("/administracao"); // Redireciona após atualização
            } else {
                const errorMessage = await response.text();
                alert("Erro ao atualizar comunidade: " + errorMessage);
            }
        } catch (error) {
            console.error("Falha na atualização: ", error);
            alert("Erro no servidor. Tente novamente mais tarde.");
        }
    };

    return (
        <div className="rounded-xl p-6 flex flex-col gap-4 m-auto">
            <form onSubmit={handleSubmit}>
                <h3 className="text-black text-center text-3xl">Editar Comunidade</h3>

                <div>
                    <label htmlFor="idTipo">Tipo da comunidade</label>
                    <input type="text" name="tipoComunidade" id="idTipo" value={comunidade.tipoComunidade} onChange={handleChange}
                        placeholder="tipo de comunidade (Rural ou urbana/Prédios ou casa)" required/>
                    {errors.tipoComunidade && <p style={{ color: "red" }}>{errors.tipoComunidade}</p>}
                </div>

                <div>
                    <label htmlFor="idEnd">Endereço</label>
                    <input type="text" name="endereco" id="idEnd" value={comunidade.endereco} onChange={handleChange}
                        placeholder="endereço da comunidade" required/>
                    {errors.endereco && <p style={{ color: "red" }}>{errors.endereco}</p>}
                </div>

                <div>
                    <label htmlFor="idEst">Estado</label>
                    <input type="text" name="estado" id="idEst" value={comunidade.estado} onChange={handleChange}
                        placeholder="estado da comunidade" required/>
                    {errors.estado && <p style={{ color: "red" }}>{errors.estado}</p>}
                </div>

                <div>
                    <label htmlFor="idEnergia">Total de energia</label>
                    <input type="number" name="totalEnergia" id="idEnergia" value={comunidade.totalEnergia ?? ''} onChange={handleChange}
                        placeholder="total de energia do microgrid, caso houver"/>
                    {errors.totalEnergia && <p style={{ color: "red" }}>{errors.totalEnergia}</p>}
                </div>

                <div>
                    <button type="submit">Atualizar</button>
                </div>
            </form>
        </div>
    );
}
