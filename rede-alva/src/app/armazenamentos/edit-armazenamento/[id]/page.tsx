"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TipoArmazenamento} from "@/types/types";

export default function EditComunidade({ params }: { params: { id: number } }) {
    const navigate = useRouter(); // Redirecionamento para home

    const [armazenamneto, setArmazenamneto] = useState<TipoArmazenamento>({
        idComunidade: 0,
        idUnidade: 0,
        tipoGeracao: "",
        quantidade: 0.0
    });


    useEffect(() => {
        const chamadaApi = async () => {
            try {
                const response = await fetch(`http://localhost:8080/armazenamento/${params.id}`);
                const data = await response.json();
                setArmazenamneto(data);
            } catch (error) {
                console.error("Erro ao buscar dados da comunidade:", error);
            }
        };
        chamadaApi();
    }, []);

    const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evento.target;
        setArmazenamneto({ ...armazenamneto, [name]: value });
    };

    const handleSubmit = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/armazenamento/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(armazenamneto)
            });

            if (response.ok) {
                alert("Comunidade atualizada com sucesso!");
                setArmazenamneto({
                    idComunidade: 0,
                    idUnidade: 0,
                    tipoGeracao: "",
                    quantidade: 0.0
                });
                navigate.push("/administracao"); 
            }
        } catch (error) {
            console.error("Falha na atualização: ", error);
        }
    };

    return (
        <div className="container-edit">
            <div className="form-edit">
                <h1 className="text-black text-center text-3xl">Editar Armazenamento</h1>
                <form onSubmit={handleSubmit} >
                    <div>
                        <label htmlFor="idCom">ID Comunidade</label>
                        <input type="number" name="idComunidade" id="idCom" value={armazenamneto.idComunidade} onChange={handleChange}
                        placeholder="digite o id da sua comunidade" required/>
                    </div>

                    <div>
                        <label htmlFor="idUnidade">ID da Unidade</label>
                        <input type="number" name="idUnidade" id="idUnidade" value={armazenamneto.idUnidade} onChange={handleChange}
                            placeholder="digite o id da unidade que deseja transferir a energia" required/>
                    </div>

                    <div>
                        <fieldset>
                            <legend className="text-center font-bold text2xl">Tipo de Transação</legend>
                            <div className="flex flex-col">
                                <div className="opcao">
                                    <label htmlFor="idTransacaoVenda"> dar </label>
                                    <input type="radio" name="tipoGeracao" id="idTransacaoVenda" value="dar" checked={armazenamneto.tipoGeracao === "dar"} onChange={handleChange} className="m-0 p-0"/>

                                </div>
                                <div className="opcao">
                                    <label htmlFor="idTransacaoCompra"> pegar </label>
                                    <input type="radio" name="tipoGeracao" id="idTransacaoCompra" value="pegar" checked={armazenamneto.tipoGeracao === "pegar"} onChange={handleChange} />
                                </div>

                                
                            </div>
                        </fieldset>
                    </div>

                    <div>
                        <label htmlFor="idQtd">Quantidade Energia</label>
                        <input type="number" name="quantidade" id="idQtd" value={armazenamneto.quantidade} onChange={handleChange}
                            placeholder="digite a quantidade que irá ser trocada" required/>
                    </div>

                    <div>
                        <button type="submit">Atualizar</button>
                    </div>
                </form>
            </div>
            
        </div>
    );
}
