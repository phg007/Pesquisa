import Image from "next/image"
import Link from "next/link"

interface NPSPageProps {
  params: {
    param: string
  }
}

export default function NPSPage({ params }: NPSPageProps) {
  const npsScores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <div className="flex flex-col items-center bg-white">
      <Image src="/images/html-nps_01.png" width={800} height={518} alt="NPS Header" priority />
      <div className="flex justify-center">
        {npsScores.map((score) => (
          <Link key={score} href={`/${score}/${params.param}`} target="_blank">
            <Image
              src={`/images/html-nps_${(score + 2).toString().padStart(2, "0")}.png`}
              width={score === 0 || score === 10 ? 99 : 66}
              height={187}
              alt={`NPS Score ${score}`}
            />
          </Link>
        ))}
      </div>
      <Link href="https://qrco.de/appmartminas" target="_blank">
        <Image src="/images/html-nps_14.png" width={800} height={371} alt="QR Code" />
      </Link>
      <Image src="/images/html-nps_14-14.png" width={800} height={431} alt="Footer" />
    </div>
  )
}

