"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircleX, ThumbsDown, ThumbsUp } from "lucide-react";

const aspects = [
  "Preços em geral",
  "Os produtos estão bem-sinalizados com etiqueta de preço",
  "Setor de frutas, legumes e verduras",
  "Disponibilidade dos produtos que costumo comprar",
  "Atendimento de funcionários na loja (atenção e disposição para ajudar)",
  "Atendimento de funcionários no caixa",
  "Tempo de espera no caixa",
  "Limpeza da loja",
  "Limpeza do banheiro de cliente",
  "Facilidade para encontrar/ler as etiquetas de preço",
];

export default function CustomerSurvey() {
  const [customerName, setCustomerName] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [nps, setNps] = useState(5);
  const [aspectRatings, setAspectRatings] = useState<Record<string, string>>(
    {}
  );
  const [otherSupermarket, setOtherSupermarket] = useState("");
  const [otherSupermarketSpecify, setOtherSupermarketSpecify] = useState("");
  const [priceComparison, setPriceComparison] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/submit-survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName,
          purchaseDate,
          nps,
          aspectRatings,
          otherSupermarket,
          otherSupermarketSpecify,
          priceComparison,
          feedback,
        }),
      });

      if (response.ok) {
        alert("Obrigado por enviar a pesquisa!");
        // Reset form fields here if needed
      } else {
        throw new Error("Failed to submit survey");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Ocorreu um erro ao enviar a pesquisa. Por favor, tente novamente."
      );
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center bg-primary text-primary-foreground">
        <CardTitle className="text-3xl">Estamos aqui POR VOCÊ!</CardTitle>
        <CardDescription className="text-xl text-primary-foreground/90">
          Sua opinião é importante para nós!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="customerName">Olá</Label>
            <Input
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Nome do cliente conforme cadastro"
              required
            />
          </div>
          <div>
            <Label htmlFor="purchaseDate">Sobre a sua compra no dia</Label>
            <Input
              id="purchaseDate"
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="otherSupermarket">Selecione uma unidade</Label>
            <Select onValueChange={setOtherSupermarket}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um supermercado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alfenas-loteamento-trevo">
                  ALFENAS (LOTEAMENTO TREVO)
                </SelectItem>
                <SelectItem value="araguari-sibipiruna">
                  ARAGUARI (SIBIPIRUNA)
                </SelectItem>
                <SelectItem value="arapora-x">ARAPORA (X.)</SelectItem>
                <SelectItem value="araxa-orozino-teixeira">
                  ARAXA (OROZINO TEIXEIRA)
                </SelectItem>
                <SelectItem value="barbacena-santo-antonio">
                  BARBACENA (SANTO ANTONIO)
                </SelectItem>
                <SelectItem value="belo-horizonte-diamante">
                  BELO HORIZONTE (DIAMANTE)
                </SelectItem>
                <SelectItem value="belo-horizonte-jaqueline">
                  BELO HORIZONTE (JAQUELINE)
                </SelectItem>
                <SelectItem value="belo-horizonte-serrano">
                  BELO HORIZONTE (SERRANO)
                </SelectItem>
                <SelectItem value="betim-duque-de-caxias">
                  BETIM (DUQUE DE CAXIAS)
                </SelectItem>
                <SelectItem value="betim-inga-alto">
                  BETIM (INGA ALTO)
                </SelectItem>
                <SelectItem value="bom-despacho-novo-sao-jose">
                  BOM DESPACHO (NOVO SAO JOSE)
                </SelectItem>
                <SelectItem value="bpara-de-minas-mart-minas">
                  BPARA DE MINAS (MART MINAS)
                </SelectItem>
                <SelectItem value="campo-belo-jardim-america">
                  CAMPO BELO (JARDIM AMERICA)
                </SelectItem>
                <SelectItem value="caratinga-zacarias">
                  CARATINGA (ZACARIAS)
                </SelectItem>
                <SelectItem value="congonhas-jardim-vila-andreza">
                  CONGONHAS (JARDIM VILA ANDREZA)
                </SelectItem>
                <SelectItem value="conselheiro-lafaiete-carijos">
                  CONSELHEIRO LAFAIETE (CARIJOS)
                </SelectItem>
                <SelectItem value="contagem-cidade-industrial">
                  CONTAGEM (CIDADE INDUSTRIAL)
                </SelectItem>
                <SelectItem value="contagem-riacho-das-pedras">
                  CONTAGEM (RIACHO DAS PEDRAS)
                </SelectItem>
                <SelectItem value="contagem-sao-joaquim">
                  CONTAGEM (SAO JOAQUIM)
                </SelectItem>
                <SelectItem value="curvelo-bela-vista">
                  CURVELO (BELA VISTA)
                </SelectItem>
                <SelectItem value="divinopolis-rancho-alegre">
                  DIVINOPOLIS (RANCHO ALEGRE)
                </SelectItem>
                <SelectItem value="divinopolis-sao-judas-tadeu">
                  DIVINOPOLIS (SAO JUDAS TADEU)
                </SelectItem>
                <SelectItem value="extrema-tenentes">
                  EXTREMA (TENENTES)
                </SelectItem>
                <SelectItem value="governador-valadares-santa-rita">
                  GOVERNADOR VALADARES (SANTA RITA)
                </SelectItem>
                <SelectItem value="itabira-gabiroba">
                  ITABIRA (GABIROBA)
                </SelectItem>
                <SelectItem value="itauna-vila-tavares">
                  ITAUNA (VILA TAVARES)
                </SelectItem>
                <SelectItem value="ituiutaba-gerson-baduy-ii">
                  ITUIUTABA (GERSON BADUY II)
                </SelectItem>
                <SelectItem value="janauba-esplanada">
                  JANAUBA (ESPLANADA)
                </SelectItem>
                <SelectItem value="januaria-sao-miguel">
                  JANUARIA (SAO MIGUEL)
                </SelectItem>
                <SelectItem value="joao-monlevade-nova-aclimacao">
                  JOAO MONLEVADE (NOVA ACLIMACAO)
                </SelectItem>
                <SelectItem value="joao-pinheiro-divinopolis">
                  JOAO PINHEIRO (DIVINOPOLIS)
                </SelectItem>
                <SelectItem value="juiz-de-fora-industrial">
                  JUIZ DE FORA (INDUSTRIAL)
                </SelectItem>
                <SelectItem value="juiz-de-fora-teixeiras">
                  JUIZ DE FORA (TEIXEIRAS)
                </SelectItem>
                <SelectItem value="lavras-jardim-floresta">
                  LAVRAS (JARDIM FLORESTA)
                </SelectItem>
                <SelectItem value="leopoldina-maria-guimaraes-franca">
                  LEOPOLDINA (MARIA GUIMARAES FRANCA)
                </SelectItem>
                <SelectItem value="monte-carmelo-zona-de-expansao-urbana">
                  MONTE CARMELO (ZONA DE EXPANSAO URBANA)
                </SelectItem>
                <SelectItem value="montes-claros-distrito-industrial">
                  MONTES CLAROS (DISTRITO INDUSTRIAL)
                </SelectItem>
                <SelectItem value="montes-claros-independencia">
                  MONTES CLAROS (INDEPENDENCIA)
                </SelectItem>
                <SelectItem value="montes-claros-major-prates">
                  MONTES CLAROS (MAJOR PRATES)
                </SelectItem>
                <SelectItem value="nova-lima-chacara-bom-retiro">
                  NOVA LIMA (CHACARA BOM RETIRO)
                </SelectItem>
                <SelectItem value="paracatu-amoreiras-ii">
                  PARACATU (AMOREIRAS II)
                </SelectItem>
                <SelectItem value="passos-sao-francisco">
                  PASSOS (SAO FRANCISCO)
                </SelectItem>
                <SelectItem value="patos-de-minas-bela-vista">
                  PATOS DE MINAS (BELA VISTA)
                </SelectItem>
                <SelectItem value="patos-de-minas-jardim-andrades">
                  PATOS DE MINAS (JARDIM ANDRADES)
                </SelectItem>
                <SelectItem value="patrocinio-industrial">
                  PATROCINIO (INDUSTRIAL)
                </SelectItem>
                <SelectItem value="pirapora-cicero-passos">
                  PIRAPORA (CICERO PASSOS)
                </SelectItem>
                <SelectItem value="pocos-de-caldas-jardim-paraiso">
                  POCOS DE CALDAS (JARDIM PARAISO)
                </SelectItem>
                <SelectItem value="pouso-alegre-fatima-i">
                  POUSO ALEGRE (FATIMA I)
                </SelectItem>
                <SelectItem value="santa-luzia-distrito-industrial-desembarga">
                  SANTA LUZIA (DISTRITO INDUSTRIAL DESEMBARGA)
                </SelectItem>
                <SelectItem value="santana-do-paraiso-parque-veneza">
                  SANTANA DO PARAISO (PARQUE VENEZA)
                </SelectItem>
                <SelectItem value="sao-joao-del-rei-colonia-do-marcal">
                  SAO JOAO DEL REI (COLONIA DO MARCAL)
                </SelectItem>
                <SelectItem value="sete-lagoas-santo-antonio">
                  SETE LAGOAS (SANTO ANTONIO)
                </SelectItem>
                <SelectItem value="teofilo-otoni-castro-pires">
                  TEOFILO OTONI (CASTRO PIRES)
                </SelectItem>
                <SelectItem value="tres-coracoes-cidade-jardim">
                  TRES CORACOES (CIDADE JARDIM)
                </SelectItem>
                <SelectItem value="tres-pontas-esperanca">
                  TRES PONTAS (ESPERANCA)
                </SelectItem>
                <SelectItem value="uba-eixo-rodoviario">
                  UBA (EIXO RODOVIARIO)
                </SelectItem>
                <SelectItem value="uberaba-olinda">UBERABA (OLINDA)</SelectItem>
                <SelectItem value="uberaba-parque-das-laranjeiras">
                  UBERABA (PARQUE DAS LARANJEIRAS)
                </SelectItem>
                <SelectItem value="uberaba-santa-maria">
                  UBERABA (SANTA MARIA)
                </SelectItem>
                <SelectItem value="uberlandia-jardim-botanico">
                  UBERLANDIA (JARDIM BOTANICO)
                </SelectItem>
                <SelectItem value="uberlandia-jardim-patricia">
                  UBERLANDIA (JARDIM PATRICIA)
                </SelectItem>
                <SelectItem value="uberlandia-nossa-senhora-das-gracas">
                  UBERLANDIA (NOSSA SENHORA DAS GRACAS)
                </SelectItem>
                <SelectItem value="uberlandia-segismundo-pereira">
                  UBERLANDIA (SEGISMUNDO PEREIRA)
                </SelectItem>
                <SelectItem value="unai-capim-branco-ii">
                  UNAI (CAPIM BRANCO II)
                </SelectItem>
                <SelectItem value="varginha-santa-maria">
                  VARGINHA (SANTA MARIA)
                </SelectItem>
                <SelectItem value="vespasiano-nova-granja">
                  VESPASIANO (NOVA GRANJA)
                </SelectItem>
              </SelectContent>
            </Select>
            {otherSupermarket === "outros" && (
              <Input
                className="mt-2"
                placeholder="Especifique o supermercado"
              />
            )}
          </div>

          <div>
            <Label className="font-bold">
              O quanto você recomendaria a Mart Minas para um amigo ou familiar?
            </Label>
            <Slider
              min={0}
              max={10}
              step={1}
              value={[nps]}
              onValueChange={(value) => setNps(value[0])}
              className="mt-2"
            />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>De jeito nenhum</span>
              <span>Muito provável</span>
            </div>
            <div className="flex justify-between mt-1">
              {[...Array(11)].map((_, i) => (
                <span key={i} className="text-xs">
                  {i}
                </span>
              ))}
            </div>
          </div>
          <div>
            <Label className="font-bold">Avalie os seguintes aspectos:</Label>
            {aspects.map((aspect, index) => (
              <div
                key={index}
                className="flex justify-between items-center mt-2"
              >
                <span>{aspect}</span>
                <RadioGroup
                  onValueChange={(value) =>
                    setAspectRatings((prev) => ({ ...prev, [aspect]: value }))
                  }
                  className="flex space-x-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="like" id={`like-${index}`} />
                    <Label htmlFor={`like-${index}`}>
                      <ThumbsUp className="size-5 text-green-500" />
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dislike" id={`dislike-${index}`} />
                    <Label htmlFor={`dislike-${index}`}>
                      <ThumbsDown className="size-5 text-red-500" />
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="notApply" id={`notApply-${index}`} />
                    <Label htmlFor={`notApply-${index}`}>
                      <div className="d-flex flex-col justify-items-center">
                        <CircleX className="size-4 text-red-500" />
                        <p className="text-xs">Não sei</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            ))}
          </div>
          <div>
            <Label className="font-bold" htmlFor="otherSupermarket">
              Além da Mart Minas qual o outro supermercado que você mais
              frequenta?
            </Label>
            <Select onValueChange={setOtherSupermarket}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um supermercado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="concorrente1">Concorrente 1</SelectItem>
                <SelectItem value="concorrente2">Concorrente 2</SelectItem>
                <SelectItem value="concorrente3">Concorrente 3</SelectItem>
                <SelectItem value="outros">Outros (Especifique)</SelectItem>
              </SelectContent>
            </Select>
            {otherSupermarket === "outros" && (
              <Input
                className="mt-2"
                placeholder="Especifique o supermercado"
                value={otherSupermarketSpecify}
                onChange={(e) => setOtherSupermarketSpecify(e.target.value)}
              />
            )}
          </div>
          <div>
            <Label>
              Comparando os preços, na sua opinião os preços do supermercado
              selecionado em geral são:
            </Label>
            <RadioGroup
              onValueChange={setPriceComparison}
              className="flex space-x-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="worse" id="priceWorse" />
                <Label htmlFor="priceWorse">Piores na Mart Minas</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="equal" id="priceEqual" />
                <Label htmlFor="priceEqual">Iguais ao da Mart Minas</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="better" id="priceBetter" />
                <Label htmlFor="priceBetter">Melhores na Mart Minas</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label htmlFor="feedback">
              Você gostaria de deixar alguma sugestão de melhoria, reclamação ou
              elogio?
            </Label>
            <Textarea
              id="feedback"
              placeholder="Seu feedback é muito importante para nós"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Enviar pesquisa
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center text-center text-sm text-muted-foreground">
        <p>
          Agradecemos a sua participação e continue sempre enviando a sua
          opinião.
        </p>
        <p className="font-bold mt-2">Estamos aqui POR VOCÊ!</p>
      </CardFooter>
      <footer className="mt-8 text-center text-xs text-gray-500">
        <p>
          Ao responder esse questionário, as informações fornecidas serão
          utilizadas com o objetivo de melhorar a sua satisfação com a Mart
          Minas e poderemos entrar em contato com você a fim de melhorar sua
          experiência.
        </p>
        <p className="mt-2">
          A Mart Minas utiliza dados pessoais em conformidade legal, de modo que
          suas respostas e informações pessoais serão acessadas e tratadas
          apenas pela equipe responsável por atender esta demanda.
        </p>
        <p className="mt-2">
          Você pode optar por não receber mais e-mails de nossas pesquisas a
          qualquer momento clicando{" "}
          <a href="#" className="text-blue-500">
            neste link
          </a>
          .
        </p>
        <p className="mt-2">
          Para mais detalhes sobre o uso dos seus dados pessoais, acesse nossa{" "}
          <a href="#" className="text-blue-500">
            Política de Privacidade
          </a>
          .
        </p>
        <p className="mt-2">
          Se ficou com alguma dúvida, entre em contato com a nossa área de
          Atendimento.
        </p>
        <p className="mt-2">
          Confira a nossa{" "}
          <a href="#" className="text-blue-500">
            Política de Privacidade
          </a>{" "}
          e{" "}
          <a href="#" className="text-blue-500">
            Termos e Condições
          </a>
          .
        </p>
        <p className="mt-4">
          MART MINAS DISTRIBUICAO LTDA
          <br />
          Av. Barao Homem de Melo, 3090, Estoril
          <br />
          Belo Horizonte, MG
          <br />
          CEP: 30494-080
          <br />
          CNPJ: 04.737.552/0003-08
        </p>
      </footer>
    </Card>
  );
}
