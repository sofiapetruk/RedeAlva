"use client";

import { TipoUnidade } from "@/types/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";


export default function Unidades() {
  

    const [unidades, setUnidades] = useState<TipoUnidade[]>([]); 

    const chamadaApi = async () => {
        try {
            const response = await fetch("http://localhost:8080/unidade");
            const data = await response.json();
            setUnidades(data);
        } catch (error) {
            console.error("Falha ao listar comunidades: ", error);
        }
    };

    useEffect(() => {
        chamadaApi();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8080/unidade/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Unidade deletada com sucesso!"); 
                setUnidades(unidades.filter(unidade => unidade.idUnidade !== id)); // Atualiza a lista após exclusão
            }
        } catch (error) {
            console.error("Falha ao remover a unidade.", error);
        }
    };


    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">Unidades</h1>
            {unidades.length === 0 ? (
                <p className="text-red-500">Nenhuma unidade encontrada.</p>
            ) : (
                <table className="w-full mt-8 border-[#011625] border-8">
                    <thead className="bg-[#011625]">
                        <tr className="border-b border-[#1b3040]">
                            <th className="p-4 text-white">ID Unidade</th>
                            <th className="p-4 text-white">ID Comunidade</th>
                            <th className="p-4 text-white">Numero Unidade</th>
                            <th className="p-4 text-white">Nome Unidade</th>
                            <th className="p-4 text-white">Capacidade Geração</th>
                            <th className="p-4 text-white">Capacidade Consumo</th>
                            <th className="p-4 text-white">Saldo Energia</th>
                            <th className="p-4 text-white">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#001d31]">
                        {unidades.map((unidade) => (
                            <tr key={unidade.idUnidade} className="hover:bg-[#004a7d] transition-all duration-300">
                                <td className="p-4 text-white">{unidade.idUnidade}</td>
                                <td className="p-4 text-white">{unidade.idComunidade}</td>
                                <td className="p-4 text-white">{unidade.numeroUnidade}</td>
                                <td className="p-4 text-white">{unidade.nomeUnidade}</td>
                                <td className="p-4 text-white">{unidade.capacidadeGeracao}</td>
                                <td className="p-4 text-white">{unidade.capacidadeConsumo}</td>
                                <td className="p-4 text-white">{unidade.saldoEnergia}</td>
                                <td className="p-4 text-white flex justify-evenly items-center w-full h-full">
                            
                                    <Link href={`/unidades/edit-unidade/${unidade.idUnidade}`}>
                                        <span className="hover:scale-125 cursor-pointer transition-all duration-300">
                                            <BiEdit size={30} color="#4300ff" />
                                        </span>
                                    </Link>
                                    <button onClick={() => handleDelete(unidade.idUnidade!)} className="hover:scale-125 cursor-pointer transition-all duration-300">
                                        <MdDelete size={30} color="#a43400" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={6} className="p-4 text-black text-center">Total de comunidades: {unidades.length}</td>
                        </tr>
                    </tfoot>
                </table>
            )}
        </div>
    );
}

