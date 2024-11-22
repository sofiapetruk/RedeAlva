import Armazenamento from "../armazenamentos/page";
import Comercios from "../comercios/page";
import Comunidades from "../comunidades/page";
import Unidades from "../unidades/page";

export default function Administracao () {
    return (
        <div className="p-4 flex flex-col">
            <Comunidades/>
            <Unidades/>
            <Comercios/>
            <Armazenamento/>
        </div>
    )
}