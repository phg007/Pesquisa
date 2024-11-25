import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// import { ThumbsUp } from 'lucide-react';

export default function CustomerSurvey() {
  const [nps, setNps] = useState(5)
  const [likeDislike, setLikeDislike] = useState({})
  const [otherSupermarket, setOtherSupermarket] = useState("")
  const [priceComparison, setPriceComparison] = useState("")
  const [feedback, setFeedback] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log({ nps, likeDislike, otherSupermarket, priceComparison, feedback })
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Estamos aqui POR VOCÊ!</CardTitle>
          <CardDescription className="text-xl">Sua opinião é importante para nós!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <Label htmlFor="customerName">Olá</Label>
                <Input id="customerName" placeholder="Nome do cliente conforme cadastro" />
              </div>
              <div>
                <Label htmlFor="purchaseDate">Sobre a sua compra no dia</Label>
                <Input id="purchaseDate" placeholder="Data da compra" type="date" />
              </div>
              <div>
                <Label>O quanto você recomendaria a Mart Minas para um amigo ou familiar?</Label>
                <Slider
                  min={0}
                  max={10}
                  step={1}
                  value={[nps]}
                  onValueChange={(value) => setNps(value[0])}
                  className="mt-2"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>De jeito nenhum</span>
                  <span>Muito provável</span>
                </div>
                <div className="flex justify-between mt-1">
                  {[...Array(11)].map((_, i) => (
                    <span key={i} className="text-xs">{i}</span>
                  ))}
                </div>
              </div>
              
              <div>
                <Label>Avalie os seguintes aspectos:</Label>
                {[
                  "Preços em geral",
                  "Os produtos estão bem-sinalizados com etiqueta de preço",
                  "Setor de frutas, legumes e verduras",
                  "Disponibilidade dos produtos que costumo comprar",
                  "Atendimento de funcionários na loja (atenção e disposição para ajudar)",
                  "Atendimento de funcionários no caixa",
                  "Tempo de espera no caixa",
                  "Limpeza da loja",
                  "Limpeza do banheiro de cliente",
                  "Facilidade para encontrar/ler as etiquetas de preço"
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between mt-2">
                    <span>{item}</span>
                    <RadioGroup
                      onValueChange={(value) => setLikeDislike({...likeDislike, [item]: value})}
                      className="flex space-x-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="like" id={`like-${index}`} />
                        <Label htmlFor={`like-${index}`}>👍</Label>

                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dislike" id={`dislike-${index}`} />
                        <Label htmlFor={`dislike-${index}`}>👎</Label>
                      </div>
                    </RadioGroup>
                  </div>
                ))}
              </div>

              <div>
                <Label htmlFor="otherSupermarket">Além da Mart Minas qual o outro supermercado que você mais frequenta?</Label>
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
                  <Input className="mt-2" placeholder="Especifique o supermercado" />
                )}
              </div>

              <div>
                <Label>Comparando os preços, na sua opinião os preços do supermercado selecionado em geral são:</Label>
                <RadioGroup onValueChange={setPriceComparison} className="flex space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="worse" id="worse" />
                    <Label htmlFor="worse">Piores na Mart Minas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="equal" id="equal" />
                    <Label htmlFor="equal">Iguais ao da Mart Minas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="better" id="better" />
                    <Label htmlFor="better">Melhores na Mart Minas</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="feedback">Você gostaria de deixar alguma sugestão de melhoria, reclamação ou elogio?</Label>
                <Textarea
                  id="feedback"
                  placeholder="Seu feedback é muito importante para nós"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" className="w-full mt-6">Enviar aaahdaskjdahsdjsa pesquisa</Button>
            {/* <Button type="submit" variant="outline" className="w-full mt-6"><ThumbsUp /> Teste</Button> */}
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center text-center text-sm text-gray-500">
          <p>Agradecemos a sua participação e continue sempre enviando a sua opinião.</p>
          <p className="font-bold mt-2">Estamos aqui POR VOCÊ!</p>
        </CardFooter>
      </Card>
      <footer className="mt-8 text-center text-xs text-gray-500">
        <p>Ao responder esse questionário, as informações fornecidas serão utilizadas com o objetivo de melhorar a sua satisfação com a Mart Minas e poderemos entrar em contato com você a fim de melhorar sua experiência.</p>
        <p className="mt-2">A Mart Minas utiliza dados pessoais em conformidade legal, de modo que suas respostas e informações pessoais serão acessadas e tratadas apenas pela equipe responsável por atender esta demanda.</p>
        <p className="mt-2">Você pode optar por não receber mais e-mails de nossas pesquisas a qualquer momento clicando <a href="#" className="text-blue-500">neste link</a>.</p>
        <p className="mt-2">Para mais detalhes sobre o uso dos seus dados pessoais, acesse nossa <a href="#" className="text-blue-500">Política de Privacidade</a>.</p>
        <p className="mt-2">Se ficou com alguma dúvida, entre em contato com a nossa área de Atendimento.</p>
        <p className="mt-2">Confira a nossa <a href="#" className="text-blue-500">Política de Privacidade</a> e <a href="#" className="text-blue-500">Termos e Condições</a>.</p>
        <p className="mt-4">
          MART MINAS DISTRIBUICAO LTDA<br />
          Av. Barao Homem de Melo, 3090, Estoril<br />
          Belo Horizonte, MG<br />
          CEP: 30494-080<br />
          CNPJ: 04.737.552/0003-08
        </p>
      </footer>
    </div>
  )
}

