"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TipoComercio } from "@/types/types";

export default function EditComercio({ params }: { params: { id: number } }) {
    const navigate = useRouter();

    const [comercio, setComercio] = useState<TipoComercio>({
        idComercio: 0,
        idComunidade: 0,
        unidadeVedendoraId: 0,
        unidadeCompradoraId: 0,
        quantidade: 0,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/distribuicao/${params.id}`);
                if (!response.ok) {
                    throw new Error("Erro ao buscar dados do comércio.");
                }
                const data = await response.json();
                setComercio(data);
            } catch (error) {
                console.error("Erro ao buscar dados do comércio:", error);
            }
        };
        fetchData();
    }, [params.id]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setComercio({ ...comercio, [name]: Number(value) });
        setErrors({ ...errors, [name]: "" });
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
            newErrors.unidadeCompradoraId = "A unidade vendedora e compradora não podem ser iguais.";
        }

        if (!comercio.quantidade || comercio.quantidade <= 0) {
            newErrors.quantidade = "A quantidade de energia deve ser maior que zero.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateInputs()) return;

        try {
            const response = await fetch(`http://localhost:8080/distribuicao/${params.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(comercio),
            });

            if (response.ok) {
                alert("Comércio atualizado com sucesso!");
                navigate.push("/administracao");
            } else {
                const errorMessage = await response.text();
                alert("Erro ao atualizar comércio: " + errorMessage);
            }
        } catch (error) {
            console.error("Falha na atualização:", error);
            alert("Erro no servidor. Tente novamente mais tarde.");
        }
    };

    return (
        <div className="container-edit">
            <div className="form-edit">
                <h1 className="titulo">Editar Comércio</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="idComunidade">ID Comunidade</label>
                        <input
                            type="number"
                            name="idComunidade"
                            id="idComunidade"
                            value={comercio.idComunidade || ""}
                            onChange={handleChange}
                            placeholder="Digite o ID da comunidade"
                        />
                        {errors.idComunidade && (
                            <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                                {errors.idComunidade}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="unidadeVedendoraId">ID Unidade Vendedora</label>
                        <input
                            type="number"
                            name="unidadeVedendoraId"
                            id="unidadeVedendoraId"
                            value={comercio.unidadeVedendoraId || ""}
                            onChange={handleChange}
                            placeholder="Digite o ID da unidade vendedora"
                        />
                        {errors.unidadeVedendoraId && (
                            <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                                {errors.unidadeVedendoraId}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="unidadeCompradoraId">ID Unidade Compradora</label>
                        <input
                            type="number"
                            name="unidadeCompradoraId"
                            id="unidadeCompradoraId"
                            value={comercio.unidadeCompradoraId || ""}
                            onChange={handleChange}
                            placeholder="Digite o ID da unidade compradora"
                        />
                        {errors.unidadeCompradoraId && (
                            <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                                {errors.unidadeCompradoraId}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="quantidade">Quantidade de Energia</label>
                        <input
                            type="number"
                            name="quantidade"
                            id="quantidade"
                            value={comercio.quantidade || ""}
                            onChange={handleChange}
                            placeholder="Digite a quantidade a ser trocada"
                        />
                        {errors.quantidade && (
                            <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                                {errors.quantidade}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                        <button type="submit">Atualizar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
