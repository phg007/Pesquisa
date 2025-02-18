
import Image from 'next/image'

export default function ObrigadoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    
          <div className="flex justify-center mb-6">
            <Image
              src="/obrigado.png"
              alt="Mart Minas Logo"
              width={400}
              height={280}
              priority
            />
          </div>
    
      
     
    </div>
  )
}

