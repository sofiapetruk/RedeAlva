export type TipoComunidade = {
    idComunidade?:number; 
    tipoComunidade:string;
    endereco: string;
    estado: string;
    totalEnergia?:number | null; //opcional
};

export type TipoUnidade = {
    idUnidade?:number;
    idComunidade?:number;
    numeroUnidade?:number;
    nomeUnidade:string;
    capacidadeGeracao?:number | null;
    capacidadeConsumo?:number | null;
    saldoEnergia?:number| null;
}

export type TipoComercio = {
    idComercio?:number;
    idComunidade:number;
    unidadeVedendoraId: number;
    unidadeCompradoraId:number;
    tipoTransacao:string;
    quantidade:number;
    saldoVendedor?:number;
    saldoComprador?:number;
    dataHora?:string;
}

export type TipoArmazenamento = {
    idArmazenamento?:number;
    idComunidade:number;
    idUnidade:number;
    tipoGeracao:string;
    quantidade:number;
}

export type TipoUser = {
    idCadastro?:number;
    user:string;
    email:string;
    senha:string;
    date:string;
}