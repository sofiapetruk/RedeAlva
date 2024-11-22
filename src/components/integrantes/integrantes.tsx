import sofia from "@/img/petruk.jpg"
import julia from "@/img/monteiro.jpg"
import carlos from "@/img/carlos.jpg"
import Image from "next/image"
import Link from "next/link";
import { SiGithub } from "react-icons/si";


export default function Integrantes () {
    return (
        <div className="integrantes">
            <div className="cards">
                <div className="card">
                    <Image
                    src={carlos}
                    width={230}
                    height={100}
                    alt="Carlos Eduardo"
                    className="rounded-2xl"
                    />
                    <div className="infos">
                        <ul>
                            <li>Nome: Carlos Eduardo Rabelo Souza</li>
                            <li>RM: 558470</li>
                            <li>1TDSPH</li>
                        </ul>
                        <Link href="https://github.com/Carlos-Eduardo-Rabelo">
                            <SiGithub size={40} className="m-2"></SiGithub>
                        </Link>
                    </div>
                    
                </div>
                <div className="card">
                    <Image
                    src={julia}
                    width={200}
                    height={100}
                    alt="Julia Monteiro"
                    className="rounded-2xl"
                    />
                    <div className="infos">
                        <ul>
                            <li>Nome: Julia Monteiro</li>
                            <li>RM: 557023</li>
                            <li>1TDSPH</li>
                        </ul>
                        <Link href="https://github.com/jliamonteiro">
                            <SiGithub size={40} className="m-2"></SiGithub>
                        </Link>
                    </div>
                </div>
                <div className="card">
                    <Image
                    src={sofia}
                    width={200}
                    height={100}
                    alt="Sofia Petruk"
                    className="rounded-2xl"
                    />
                    <div className="infos">
                        <ul>
                            <li>Nome: Sofia Andrade Petruk </li>
                            <li>RM: 556585</li>
                            <li>1TDSPH</li>
                        </ul>
                        <Link href="https://github.com/sofiapetruk">
                            <SiGithub size={40} className="m-2"></SiGithub>
                        </Link>
                    </div>
                </div>
            </div>        
        </div>
    )
}