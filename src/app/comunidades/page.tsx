"use client";

import { TipoComunidade } from "@/types/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";


export default function Comunidades() {


    const [comunidades, setComunidades] = useState<TipoComunidade[]>([]); // chamar a lista

    const chamadaApi = async () => {
        try {
            const response = await fetch("http://localhost:8080/comunidade");
            const data = await response.json();
            setComunidades(data);
        } catch (error) {
            console.error("Falha ao listar comunidades: ", error);
        }
    };

    useEffect(() => {
        chamadaApi();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8080/comunidade/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Comunidade deletada com sucesso!");
                setComunidades(comunidades.filter(comunidade => comunidade.idComunidade !== id)); // Atualiza a lista após exclusão
            }
        } catch (error) {
            console.error("Falha ao remover a comunidade.", error);
        }
    };


    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">Comunidades</h1>
            {comunidades.length === 0 ? (
                <p className="text-red-500">Nenhuma comunidade encontrada.</p>
            ) : (
                <table className="w-full mt-8 border-[#011625] border-8">
                    <thead className="bg-[#011625]">
                        <tr className="border-b border-[#1b3040]">
                            <th className="p-4 text-white">ID comunidade</th>
                            <th className="p-4 text-white">Tipo Comunidade</th>
                            <th className="p-4 text-white">Endereço</th>
                            <th className="p-4 text-white">Estado</th>
                            <th className="p-4 text-white">Total Energia</th>
                            <th className="p-4 text-white">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#001d31]">
                        {comunidades.map((comunidade) => (
                            <tr key={comunidade.idComunidade} className="hover:bg-[#004a7d] transition-all duration-300">
                                <td className="p-4 text-white">{comunidade.idComunidade}</td>
                                <td className="p-4 text-white">{comunidade.tipoComunidade}</td>
                                <td className="p-4 text-white">{comunidade.endereco}</td>
                                <td className="p-4 text-white">{comunidade.estado}</td>
                                <td className="p-4 text-white">{comunidade.totalEnergia}</td>
                                <td className="p-4 text-white flex justify-evenly items-center w-full h-full">
                            
                                    <Link href={`/comunidades/edit-comunidade/${comunidade.idComunidade}`}>
                                        <span className="hover:scale-125 cursor-pointer transition-all duration-300">
                                            <BiEdit size={30} color="#4300ff" />
                                        </span>
                                    </Link>
                                    <button onClick={() => handleDelete(comunidade.idComunidade!)} className="hover:scale-125 cursor-pointer transition-all duration-300">
                                        <MdDelete size={30} color="#a43400" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={6} className="p-4 text-black text-center">Total de comunidades: {comunidades.length}</td>
                        </tr>
                    </tfoot>
                </table>
            )}
        </div>
        
    );
}
