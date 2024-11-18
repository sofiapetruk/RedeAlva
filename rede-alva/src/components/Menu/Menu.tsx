import Link from "next/link";

export default function Menu () {

    return (
        <nav>
            <ul className="menu">
                <li>
                    <Link href="/">
                        HOME
                    </Link>
                </li>
                <li>
                    <Link href="/unidades/cad-unidades">
                        UNIDADE
                    </Link>
                </li>
                <li>
                    <Link href="/comunidades/cad-comunidades">
                        COMUNIDADE
                    </Link>
                </li>

                <li>
                    <Link href="/comercios/cad-comercios">
                        COMERCIO
                    </Link>
                </li>


                <li>
                    <Link href="/comunidades">
                        ADMINISTRAÇÃO
                    </Link>
                </li>
            </ul>
        </nav>
    )
}