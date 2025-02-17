"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function LandingPage() {
  // const router = useRouter();

  const { html } = useParams();
  console.log("Simulando envio de dados da pesquisa:", {
    html,
  });
  return (
    <div className="w-full max-w-[800px] mx-auto">
      <Image src="/html-nps_01.png" width={800} height={518} alt="Header" />
      <div className="flex">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
          <Link key={score} href={`/${score}/${html}`} className="block">
            <Image
              src={`/html-nps_${(score + 2).toString().padStart(2, "0")}.png`}
              width={score === 0 || score === 10 ? 99 : score === 4 ? 67 : 66}
              height={187}
              alt={`Score ${score}`}
            />
          </Link>
        ))}
      </div>
      <Link href="https://qrco.de/appmartminas" target="_blank">
        <Image src="/html-nps_14.png" width={800} height={371} alt="QR Code" />
      </Link>
      <Image src="/html-nps_14-14.png" width={800} height={431} alt="Footer" />
    </div>
  );
}
