import Image from "next/image";
import Link from "next/link";

export default function NPSSurvey({ params }: { params: { loja: string } }) {
  const ratings = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { loja } = params;

  return (
    <div className="max-w-4xl mx-auto">
      <Image
        src="/html-nps_01.png"
        width={800}
        height={518}
        alt="NPS Survey Header"
        className="w-full"
      />

      <div className="flex justify-between">
        {ratings.map((rating) => (
          <Link
            key={rating}
            href={`http://localhost:3000//${rating}/${loja}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Image
              src={`/html-nps_${(rating + 2).toString().padStart(2, "0")}.png`}
              width={rating === 0 || rating === 10 ? 99 : 65}
              height={187}
              alt={`Rate ${rating}`}
            />
          </Link>
        ))}
      </div>

      <Link
        href="https://qrco.de/appmartminas"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/html-nps_14.png"
          width={800}
          height={371}
          alt="Download our app"
          className="w-full"
        />
      </Link>

      <Image
        src="/html-nps_14-14.png"
        width={800}
        height={431}
        alt="Footer image"
        className="w-full"
      />
    </div>
  );
}
