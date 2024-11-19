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
                    <Link href="/cadastro">
                        CADASTRO
                    </Link>
                </li>


                <li>
                    <Link href="/administracao">
                        ADMINISTRAÇÃO
                    </Link>
                </li>
            </ul>
        </nav>
    )
}