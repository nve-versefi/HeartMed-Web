import Link from 'next/link';
import Image from 'next/image';

interface SubMenuItem {
  path: string;
  imageUrl: string;
  name: string;
}

interface ServicesProps {
  services: SubMenuItem[];
}

const Cards: React.FC<ServicesProps> = ({ services }) => {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl text-thunderbird-500 font-bold mb-6 text-center">Medicina Anti-Aging</h2>
      <div className="grid grid-cols-5 gap-4">
        {services.map((service) => (
          <Link key={service.path} href={service.path}>
            <div className="bg-white shadow-md border border-2 border-pomegranate-400 rounded-lg overflow-hidden cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
            <div className="w-full h-40 relative">
              <Image
                src={service.imageUrl}
                alt={service.name}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-center">{service.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cards;