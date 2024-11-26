import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Image from 'next/image'

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#00A650]">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/pesquisa de satisfação_Prancheta 1.png"
          alt="Pesquisa de Satisfação"
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="relative z-10 w-full h-full">
        <Link 
          href="/survey"
          className="absolute transform -translate-x-1/2 -translate-y-1/2 left-[11.5%] bottom-[20.5%] 
                     sm:left-[20.5%] sm:bottom-[20.5%] 
                     md:left-[20.5%] md:bottom-[20.5%] 
                     lg:left-[20.5%] lg:bottom-[20.5%] 
                     xl:left-[20.5%] xl:bottom-[20.5%]"
        >
          <Button 
            size="xl" 
            className="bg-[#006837] text-white hover:bg-[#006837]/90 text-base sm:text-lg md:text-xl lg:text-2xl px-4 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-3 md:py-4 rounded-xl shadow-lg transition-transform transform hover:scale-105"
          >
            CLIQUE AQUI
          </Button>
        </Link>
      </div>
    </div>
  )
}

