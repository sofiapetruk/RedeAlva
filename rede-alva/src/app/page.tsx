import Image from "next/image";
import redesolar from "@/img/redesolar.png"
import painel from "@/img/painelSolar.png"
import escritorio from "@/img/escritorio.png"
import casa from "@/img/casa.png"
import check from "@/img/Check.png"
import paineis from "@/img/paineis.png"
import Link from "next/link";
import Monteiro from "@/img/monteiro.jpg"
import Petruk from "@/img/petruk.jpg"
import Github from "@/img/github.png"
import Carlos from "@/img/Carlos.jpeg"


export default function Home () {
  return (
    <div className="main">
      <div className="servicos">
        <Image
          src={redesolar}
          width={300}
          height={300}
          alt="Uma mulher na frente da casa com painel solar e turbina eólica"
        />
        <div className="texto">
          <h1 className="titulo">SERVIÇOS SOLARES</h1>
          <p className="paragrafo">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      </div>
      <div className="sobre" id="sobre">
        <p className="solucoes">SOLUÇÕES PARA SUA ENERGIA</p>
        <h1 className="titulo">
          MICRO<span>RREDES</span>
        </h1>
        <p className="paragrafo">
          Por que optar por elas?
        </p>
        <div className="microrredes">
          <Image 
            src={painel}
            width={700}
            height={700}
            alt="Painel solar"
          />
          <ul>
            <li>
              <Image
                src={check}
                width={30}
                height={30}
                alt="Check"
              />
              Microrredes são sistemas locais de geração, armazenamento e distribuição de energia que podem operar independentes ou conectados à rede elétrica principal, garantindo fornecimento contínuo.
            </li>
            <li>
              <Image
                src={check}
                width={30}
                height={30}
                alt="Check"
              />
              Elas oferecem resiliência ao permitir que comunidades continuem a funcionar durante falhas de energia na rede principal, essencial em áreas vulneráveis a desastres naturais.
            </li>
            <li>
              <Image
                src={check}
                width={30}
                height={30}
                alt="Check"
              />
              Microrredes aproveitam fontes renováveis, como solar e eólica, para fornecer energia mais eficiente e sustentável, reduzindo a dependência de combustíveis fósseis.
            </li>
            <li>
              <Image
                src={check}
                width={30}
                height={30}
                alt="Check"
              />
              Elas podem reduzir custos energéticos locais, minimizando perdas de transmissão e oferecendo uma solução mais econômica a longo prazo.
            </li>
            <li>
              <Image
                src={check}
                width={30}
                height={30}
                alt="Check"
              />
              São uma solução viável para levar energia a comunidades isoladas, promovendo inclusão energética e melhorando a qualidade de vida em regiões sem acesso à rede elétrica.
            </li>
          </ul>
        </div>
        <p className="solucoes">SOLUÇÕES PARA SUA ENERGIA</p>
      </div>
      <div className="cards">
        <div className="card">
          <Image
          src={escritorio}
          width={100}
          height={100}
          alt="Escritório"
          />
          <p className="paragrafo">
            Loradipiscing elit, sed do eiusmod tempor incididunt ut.
          </p>
        </div>
        <div className="card">
          <Image
          src={casa}
          width={100}
          height={100}
          alt="Casa"
          />
          <p className="paragrafo">
            Loradipiscing elit, sed do eiusmod tempor incididunt ut.
          </p>
        </div>
        <div className="card">
          <Image
          src={escritorio}
          width={100}
          height={100}
          alt="Escritório"
          />
          <p className="paragrafo">
            Loradipiscing elit, sed do eiusmod tempor incididunt ut.
          </p>
        </div>
      </div>
      <div className="simular">
        <div className="conteudo">
          <h1>
            FAÇA UMA SIMULAÇÃO AGORA E DESCUBRA SE É A SOLUÇÃO IDEAL PRA SUA COMUNIDADE!
          </h1>
          <p>
            Será um prazer ter você conosco!
          </p>
          <button className="cadastro-btn">
            <Link href="/cadastro">
              CLIQUE AQUI
            </Link>
          </button>
        </div>
        <div>
          <Image
            src={paineis}
            width={500}
            height={500}
            alt="Casa"
          />
        </div>
      </div>
      <p className="info_integrantes">CONHEÇA OS INTEGRANTES</p>
        <div className="integrantes-container">
          <div className="integrante">
              <Image src={Monteiro} alt="Julia Monteiro" className="imagem" width={200}
            height={200} />
              <p className="nome">Julia Monteiro</p>
              <p className="rm">RM:557023</p>
              <p className="curso">1TDSPH</p>
              <a href="https://github.com/jliamonteiro" className="github-link" target="_blank">
                  <Image src={Github} alt="Ícone github" className="github-icon" width={50}
            height={50}/>
              </a>
          </div>
          <div className="integrante">
              <Image src={Petruk} alt="Sofia Petruk" className="imagem" width={200}
            height={200}/>
              <p className="nome">Sofia Andrade Petruk</p>
              <p className="rm">RM:556585</p>
              <p className="curso">1TDSPH</p>
              <a href="https://github.com/sofiapetruk" className="github-link" target="_blank">
                  <Image src={Github} alt="Ícone github" className="github-icon" width={50}
            height={50}/>
              </a>
          </div>
          <div className="integrante">
              <Image src={Carlos} alt="Carlos Eduardo" className="imagem" width={200}
            height={200} />
              <p className="nome">Carlos Eduardo Rabelo</p>
              <p className="rm">RM:558470</p>
              <p className="curso">1TDSPH</p>
              <a href="https://github.com/Carlos-Eduardo-Rabelo" className="github-link" target="_blank">
                  <Image src={Github} alt="Ícone github" className="github-icon" width={50}
            height={50} />
              </a>
          </div>
        </div>
      
    </div>
  )
}