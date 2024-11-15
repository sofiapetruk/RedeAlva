import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">NOT FOUND - 404</h1>
            <h2 className="text-4xl font-bold mb-4">Página não encontrada.....</h2>

            <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                HOME PAGE
            </Link>
        </div>

    )
}

