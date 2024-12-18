import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'

export default function ObrigadoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-6">
            <Image
              src="/logo_cor.png"
              alt="Mart Minas Logo"
              width={200}
              height={80}
              priority
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Obrigado por participar!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            Sua opinião é muito importante para nós. Agradecemos por dedicar seu tempo para responder nossa pesquisa.
          </p>
          <p className="mb-6">
            Suas respostas nos ajudarão a melhorar nossos serviços e atender melhor às suas necessidades.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

