import Image from 'next/image';
import Logo from "@/img/logo.png"



export default function Rodape () {
    return (
        <footer className="rodape">
        <div className="flex flex-col md:flex-row items-center">

            <div className="Logo">
                <Image src={Logo} alt="logotipo da empresa escrito rede alva" className="p-4" width={200} height={200} />
            </div>
            <div>
                <p className='text-footer'>Promovendo soluções energéticas sustentáveis e acessíveis para comunidades através de microrredes</p>
            </div>
        </div>
    </footer>
    )
}