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
                    <Link href="/#sobre">
                        SOBRE
                    </Link>
                </li>
                <li>
                    <Link href="/comunidades/cad-comunidades">
                        COMUNIDADE
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