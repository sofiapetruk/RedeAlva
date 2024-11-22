import Image from 'next/image';
import Logo from "@/img/logo.png"



export default function Rodape () {
    return (
        <footer className="rodape">
        <div className="flex items-center">
        
            <div className="Logo">
                <Image 
                    src={Logo} 
                    alt="logotipo da empresa escrito rede alva" 
                    className="imagem" 
                    width={200} 
                    height={200} 
                />
            </div>
            <div className="text-footer ">
                Promovendo soluções energéticas sustentáveis e acessíveis para comunidades através de microrredes
            </div>
        </div>
    </footer>
    )
}