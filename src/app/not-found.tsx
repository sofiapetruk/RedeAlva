import Link from "next/link";

export default function NotFound() {
    return (
    <div className="flex flex-col items-center justify-center my-24 md:my-56 xl:my-72 md:justify-normal">
        <h1 className="text-4xl font-bold mb-4">ERRO - 404</h1>
        <h2 className="text-4xl font-bold mb-4 text-center">Página não encontrada.....</h2>
        <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4">PÁGINA INICIAL</Link>
    </div>

    )
}

