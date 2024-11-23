"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TipoArmazenamento } from "@/types/types";

export default function EditArmazenamento({ params }: { params: { id: number } }) {
    const navigate = useRouter(); // Redirecionamento para home

    const [armazenamento, setArmazenamento] = useState<TipoArmazenamento>({
        idComunidade: 0,
        idUnidade: 0,
        tipoGeracao: "",
        quantidade: 0.0
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const chamadaApi = async () => {
            try {
                const response = await fetch(`http://localhost:8080/armazenamento/${params.id}`);
                const data = await response.json();
                setArmazenamento(data);
            } catch (error) {
                console.error("Erro ao buscar dados do armazenamento:", error);
            }
        };
        chamadaApi();
    }, [params.id]);

    const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evento.target;
        setArmazenamento({ ...armazenamento, [name]: value });
        setErrors({ ...errors, [name]: "" }); // Limpa o erro ao alterar o campo
    };

    const validateInputs = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!armazenamento.idComunidade) {
            newErrors.idComunidade = "O ID da comunidade é obrigatório.";
        }

        if (!armazenamento.idUnidade) {
            newErrors.idUnidade = "O ID da unidade é obrigatório.";
        }

        if (!armazenamento.tipoGeracao) {
            newErrors.tipoGeracao = "O tipo de transação é obrigatório.";
        }

        if (armazenamento.quantidade <= 0) {
            newErrors.quantidade = "A quantidade de energia deve ser maior que zero.";
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
            const response = await fetch(`http://localhost:8080/armazenamento/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(armazenamento)
            });

            if (response.ok) {
                alert("Armazenamento atualizado com sucesso!");
                setArmazenamento({
                    idComunidade: 0,
                    idUnidade: 0,
                    tipoGeracao: "",
                    quantidade: 0.0
                });
                navigate.push("/administracao"); 
            }
        } catch (error) {
            console.error("Falha na atualização: ", error);
            alert("Erro no servidor. Tente novamente mais tarde.");
        }
    };

    return (
        <div className="rounded-xl p-6 flex flex-col gap-4 m-auto items-center">
            <h3 className="text-black text-center text-2xl md:text-3xl">Editar Armazenamento</h3>
            <form onSubmit={handleSubmit} className="bg-customGreenLight rounded-xl flex flex-col items-center text-white w-full md:w-7/12 lg:w-4/12 xl:w-3/12">
                <div>
                    <label htmlFor="idCom" className="text-lg m-2 text-wrap flex">ID Comunidade</label>
                    <input type="number" name="idComunidade" id="idCom" className="rounded-lg" value={armazenamento.idComunidade} onChange={handleChange}
                    placeholder="digite o id da sua comunidade" required/>
                </div>

                <div>
                    <label htmlFor="idUnidade" className="text-lg m-2 text-wrap flex">ID da Unidade</label>
                    <input type="number" name="idUnidade" id="idUnidade" className="rounded-lg" value={armazenamento.idUnidade} onChange={handleChange}
                        placeholder="digite o id da unidade que deseja transferir a energia" required/>
                </div>

                <div>
                    <fieldset className="flex flex-col items-center justify-center">
                        <legend className="text-lg m-2 text-wrap flex font-bold">Tipo de Transação</legend>
                        <div className="flex gap-4">
                            <div className="flex gap-4">
                                <label htmlFor="idTransacaoVenda"> Doar </label>
                                <input type="radio" name="tipoGeracao" id="idTransacaoVenda" value="dar" checked={armazenamento.tipoGeracao === "dar"} onChange={handleChange}/>
                            </div>

                            <div className="flex gap-4">
                                <label htmlFor="idTransacaoCompra"> Pegar </label>
                                <input type="radio" name="tipoGeracao" id="idTransacaoCompra" value="pegar" checked={armazenamento.tipoGeracao === "pegar"} onChange={handleChange} />
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div>
                    <label htmlFor="idQtd" className="text-lg m-2 text-wrap flex">Quantidade Energia</label>
                    <input type="number" name="quantidade" id="idQtd" className="rounded-lg" value={armazenamento.quantidade} onChange={handleChange}
                        placeholder="digite a quantidade que irá ser trocada" required/>
                </div>

                <div>
                    <button type="submit" className="px-8 py-2 bg-customGreenLight rounded-xl font-bold text-center m-2">Atualizar</button>
                </div>
            </form>
        </div>
            
    );
}
