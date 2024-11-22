import Image from 'next/image';
import Logo from "@/img/logo.png"


export default function Rodape () {
    return (
        <footer className="rodape">
            <div className="integrante">
              <Image src={Logo} alt="Carlos Eduardo" className="imagem" width={200}
                height={200} />
            </div>
        </footer>
    )
}