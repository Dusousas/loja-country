import { FiCreditCard, FiTruck } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { SiPix } from "react-icons/si";

const benefits = [
  {
    title: "Enviamos para todo Brasil",
    description: "Receba seus produtos com envio rapido e seguro.",
    icon: FiTruck,
  },
  {
    title: "Parcelamos em 12x",
    description: "Facilitamos sua compra com parcelamento sem complicacao.",
    icon: FiCreditCard,
  },
  {
    title: "5% off no Pix",
    description: "Economize pagando a vista com desconto especial.",
    icon: SiPix,
  },
  {
    title: "Atendimento via WhatsApp",
    description: "Fale com nossa equipe e finalize seu pedido direto no WPP.",
    icon: FaWhatsapp,
  },
];

export default function LineIcons() {
  return (
    <section className=" border ">
      <div className="maxW">
        <div className="grid gap-4  px-5 py-6 sm:px-6 lg:grid-cols-4">
          {benefits.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="flex items-start gap-4 pb-4  lg:border-[#efe8e1] lg:pb-0 lg:last:border-r-0"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full text-[22px] text-[#171717]">
                <Icon />
              </div>

              <div className="space-y-1">
                <h4 className="text-[17px] leading-[1.1] font-extrabold uppercase text-[#171717]">
                  {title}
                </h4>
                <p className="text-[14px] leading-[1.45] text-[#5f6d80]">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
