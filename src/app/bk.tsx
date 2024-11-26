import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#00A650] relative overflow-hidden">
      <div className="container mx-auto grid lg:grid-cols-2 gap-8 min-h-screen items-center relative z-10">
        {/* Left Content */}
        <div className="text-white p-6 lg:p-12 space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">
              Pesquisa de satisfação
            </h1>
            <h2 className="text-3xl">
              Sua opinião é importante para nós!
            </h2>
          </div>
          
          <p className="text-xl leading-relaxed">
            Participe da nossa pesquisa de satisfação e nos ajude a melhorar
            cada vez mais os nossos serviços. Seu feedback é essencial para
            oferecermos uma experiência ainda melhor. A pesquisa é rápida e
            simples, e suas respostas serão tratadas com total sigilo.
          </p>
          
          <p className="text-xl leading-relaxed">
            Contamos com a sua colaboração para continuar evoluindo e
            atendê-lo da melhor forma possível!
          </p>

          <div className="flex justify-center pt-4">
            <Link href="/survey">
              <Button size="lg" className="bg-white text-[#00A650] hover:bg-white/90 text-xl px-8 py-6">
                CLIQUE AQUI
              </Button>
            </Link>
          </div>

          <div className="flex justify-center pt-8">
            <Image
              src="/mart-minas-logo.png"
              alt="Mart Minas Logo"
              width={300}
              height={100}
              className="w-auto h-auto"
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="hidden lg:flex items-center justify-center relative">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                <span className="text-3xl">😊</span>
              </div>
              <div className="w-6 h-6 border-2 border-white rounded-sm flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                <span className="text-3xl">😐</span>
              </div>
              <div className="w-6 h-6 border-2 border-white rounded-sm"></div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                <span className="text-3xl">😞</span>
              </div>
              <div className="w-6 h-6 border-2 border-white rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Image */}
      <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
        <Image
          src="/background-image.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
    </div>
  )
}

