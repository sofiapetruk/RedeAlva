import Link from "next/link";
import Menu from "../Menu/Menu";
import Image from "next/image";
import logo from "@/img/logo.png"

export default function Cabecalho () {
    return (
        <header className="cabecalho">
            <h1 className="logo">
                <Link href="/">
                <Image
                    src={logo}
                    width={200}
                    height={100}
                    alt="Casa"
                />
                </Link>
            </h1>
            <Menu/>
        </header>
    )
}