"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TipoComercio } from "@/types/types";

export default function EditComercio({ params }: { params: { id: number } }) {
    const navigate = useRouter(); // Redirecionamento para home

    const [comercio, setComercio] = useState<TipoComercio>({
        idComercio: 0,
        idComunidade: 0,
        unidadeVedendoraId: 0,
        unidadeCompradoraId: 0,
        quantidade: 0
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const chamadaApi = async () => {
            try {
                const response = await fetch(`http://localhost:8080/distribuicao/${params.id}`);
                const data = await response.json();
                setComercio(data);
            } catch (error) {
                console.error("Erro ao buscar dados do comércio:", error);
            }
        };
        chamadaApi();
    }, [params.id]);

    const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evento.target;
        setComercio({ ...comercio, [name]: value });
        setErrors({ ...errors, [name]: "" }); // Limpa o erro ao alterar o campo
    };

    const validateInputs = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!comercio.idComunidade) {
            newErrors.idComunidade = "O ID da comunidade é obrigatório.";
        }

        if (!comercio.unidadeVedendoraId) {
            newErrors.unidadeVedendoraId = "O ID da unidade vendedora é obrigatório.";
        }

        if (!comercio.unidadeCompradoraId) {
            newErrors.unidadeCompradoraId = "O ID da unidade compradora é obrigatório.";
        }

        if (comercio.unidadeVedendoraId === comercio.unidadeCompradoraId) {
            newErrors.unidadeCompradoraId = "A unidade vendedora e compradora não podem ser a mesma.";
        }

        if (comercio.quantidade <= 0) {
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
            const response = await fetch(`http://localhost:8080/distribuicao/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comercio)
            });

            if (response.ok) {
                alert("Comércio atualizado com sucesso!");
                navigate.push("/administracao"); // Redireciona após atualização
            } else {
                const errorMessage = await response.text();
                alert("Erro ao atualizar comércio: " + errorMessage);
            }
        } catch (error) {
            console.error("Falha na atualização: ", error);
            alert("Erro no servidor. Tente novamente mais tarde.");
        }
    };

    return (
        <div className="container-edit">
            <div className="form-edit">
            <h1 className="titulo">Editar Comercio</h1>
                <form onSubmit={handleSubmit} >
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
