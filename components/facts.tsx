import { IoPeopleOutline } from "react-icons/io5";
import { MdOutlineBiotech } from "react-icons/md";
import { CiMedal } from "react-icons/ci";

const Stats = () => {
  const quotes = [
    {
      icon: <IoPeopleOutline className="w-12 h-12 text-pomegranate-600" />,
      text: "Cientos de pacientes satisfechos",
    },
    {
      icon: <MdOutlineBiotech className="w-12 h-12 text-pomegranate-600" />,
      text: "Técnicas científicamente testadas",
    },
    {
      icon: <CiMedal className="w-12 h-12 text-pomegranate-600" />,
      text: "Amplia gama de certificaciones",
    },
  ];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {quotes.map((quote, index) => (
            <div
              key={index}
              className={`flex flex-col items-center ${
                index < quotes.length - 1 ? "border-r border-boulder-400" : ""
              } md:px-8`}
            >
              <div className="rounded-full p-4 mb-4">
                {quote.icon}
              </div>
              <p className="text-center font-semibold text-boulder-600">{quote.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;