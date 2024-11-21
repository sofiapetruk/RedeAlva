'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';

export default function Comercio() {
    const { isAuthenticated, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
    }, [isAuthenticated, router]);

    
    return (
        <div className="container-cadastropage">
            <div className="fundo">
                <h1>Comércio</h1>
                <p>
                    Escolha uma das opções abaixo para fazer o comércio de ENERGIA:
                </p>
                <div>
                    <Link href="/comercios/cad-comercios">
                        <button className='botao'>
                            Cadastrar Comércio
                        </button>
                    </Link>
                    <Link href="/armazenamentos/cad-armazenamentos">
                        <button className='botao'>
                            Cadastrar Armazenamento
                        </button>
                    </Link>
                </div>
                <button
                    onClick={logout}
                    className="mt-8 px-4 py-2 text-black bg-gray-200 rounded hover:bg-red-700"
                >
                    Sair
                </button>
            </div>
        </div>
    );
}
