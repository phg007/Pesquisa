'use client';

import { Suspense, useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { competitorsByLocation } from '@/data/competitors';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from "@/lib/utils";
import { CircleX, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';

const aspects = [
  'Preços em geral',
  'Facilidade para encontrar/ler as etiquetas de preço',
  'Disponibilidade dos produtos que costumo comprar',
  'Qualidade dos produtos do setor de frutas, legumes e verduras',
  'Tempo de espera no caixa',
  'Atendimento de funcionários no caixa',
  'Atendimento de funcionários na loja (atenção e disposição para ajudar)',
  'Ambiente e climatização (temperatura) da loja',
  'Limpeza da loja',
  'Limpeza do banheiro de cliente',
];

interface DialogState {
  isOpen: boolean;
  title: string;
  message: string;
  isError: boolean;
}

const Home = () => {
  const searchParams = useSearchParams();
  const surveyId = searchParams.get('Id');
  const [aspectRatings, setAspectRatings] = useState<Record<string, string>>({});
  const [selectedStore, setSelectedStore] = useState('');
  const [competitors, setCompetitors] = useState<string[]>([]);
  const [selectedCompetitor, setSelectedCompetitor] = useState('');
  const [priceComparison, setPriceComparison] = useState('');
  const [feedback, setFeedback] = useState('');
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    title: '',
    message: '',
    isError: false,
  });

  useEffect(() => {
    if (selectedStore) {
      const storeCompetitors = competitorsByLocation[selectedStore] || [];
      setCompetitors(storeCompetitors);
    } else {
      setCompetitors([]);
    }
    setSelectedCompetitor('');
  }, [selectedStore]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStore) {

      setDialogState({
        isOpen: true,
        title: 'Erro',
        message:  'Por favor, selecione uma unidade antes de enviar a pesquisa.',
        isError: true,
      });
      return;
    }

    try {
      const surveyData = {
        surveyId,
        aspectRatings,
        selectedStore,
        selectedCompetitor,
        priceComparison,
        feedback,
      };

      console.log('Submitting survey data:', surveyData);

      const response = await fetch('/api/submit-survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      setDialogState({
        isOpen: true,
        title: 'Sucesso',
        message: 'Obrigado por enviar a pesquisa!',
        isError: false,
      });

      // Reset form fields
      setAspectRatings({});
      setSelectedStore('');
      setSelectedCompetitor('');
      setPriceComparison('');
      setFeedback('');
      
    } catch (error) {
      console.error('Error:', error);
      setDialogState({
        isOpen: true,
        title: 'Erro',
        message: error instanceof Error ? error.message : 'Ocorreu um erro desconhecido ao enviar a pesquisa. Por favor, tente novamente.',
        isError: true,
      });
    }
  };

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="p-0">
          <Image
            src="/pesquisa-de-satisfacao.png"
            alt="Pesquisa de satisfação - Sua opinião é importante para nós!"
            width={1000}
            height={500}
            className="w-full rounded-t-lg"
            priority
          />
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="font-bold">Avalie os seguintes aspectos:</Label>
              {aspects.map((aspect, index) => (
                <div
                  key={index}
                  className="flex flex-col mt-2 pb-2 border-b border-gray-200"
                >
                  <div className="flex justify-between items-center">
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
                        <RadioGroupItem 
                          value="dislike" 
                          id={`dislike-${index}`}
                          className={cn(
                            aspectRatings[aspect] === "dislike" && "border-red-500 text-red-500"
                          )}
                        />
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
                </div>
              ))}
            </div>

            <div>
              <Label className="font-bold" htmlFor="storeLocation">
                Selecione uma unidade <span className="text-red-500">*</span>
              </Label>
              <Select onValueChange={setSelectedStore} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma unidade" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(competitorsByLocation).map((location) => (
                    <SelectItem key={location} value={location}>
                      {location.replace(/-/g, ' ').toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="font-bold" htmlFor="competitor">
                Além da Mart Minas, qual outro supermercado você mais frequenta?
              </Label>
              <Select onValueChange={setSelectedCompetitor}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
                <SelectContent>
                  {competitors.map((competitor) => (
                    <SelectItem key={competitor} value={competitor}>
                      {competitor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>
                Comparando os preços, na sua opinião, os preços {selectedCompetitor ? `do ${selectedCompetitor}` : 'do concorrente'} em geral são:
              </Label>
              <RadioGroup
                onValueChange={setPriceComparison}
                className="flex space-x-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="worse" id="priceWorse" />
                  <Label htmlFor="priceWorse">Piores que na Mart Minas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="equal" id="priceEqual" />
                  <Label htmlFor="priceEqual">Iguais aos da Mart Minas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="better" id="priceBetter" />
                  <Label htmlFor="priceBetter">Melhores que na Mart Minas</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="feedback">
                Você gostaria de deixar alguma sugestão de melhoria, reclamação ou elogio?
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
          <p>Agradecemos a sua participação e continue sempre enviando a sua opinião.</p>
          <p className="font-bold mt-2">Estamos aqui POR VOCÊ!</p>
        </CardFooter>
      </Card>

      <Dialog
        open={dialogState.isOpen}
        onOpenChange={(isOpen) => setDialogState((prev) => ({ ...prev, isOpen }))}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogState.title}</DialogTitle>
            <DialogDescription>{dialogState.message}</DialogDescription>
          </DialogHeader>
          <Button onClick={() => setDialogState((prev) => ({ ...prev, isOpen: false }))}>
            Fechar
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default function SurveyPageWrapper() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Home />
    </Suspense>
  );
}
