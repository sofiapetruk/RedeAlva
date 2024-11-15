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
                        HOME
                    </Link>
                </li>
                <li>
                    <Link href="/comunidades">
                        COMUNIDADE
                    </Link>
                </li>
            </ul>
        </nav>
    )
}