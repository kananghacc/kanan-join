import { motion } from "motion/react";

export default function AuthorityStrip() {
  const logos = [
    { name: "Google", src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", width: 80 },
    { name: "Mercedes", src: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg", width: 40 },
    { name: "Microsoft", src: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg", width: 100 },
    { name: "Volvo", src: "https://upload.wikimedia.org/wikipedia/commons/2/29/Volvo_Cars_logo.svg", width: 90 },
    { name: "TCS", src: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg", width: 80 },
    { name: "Morgan Stanley", src: "https://upload.wikimedia.org/wikipedia/commons/3/34/Morgan_Stanley_Logo_1.svg", width: 120 },
  ];

  return (
    <section className="py-[40px] bg-canvas border-b border-hairline">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
          <div className="flex-shrink-0 text-center md:text-left">
            <h3 className="text-[13px] font-bold text-ink leading-snug">
              Students at Top<br />Companies
            </h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-80 mix-blend-multiply items-center">
            {logos.map((logo, index) => (
              <motion.img 
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                src={logo.src}
                alt={logo.name}
                style={{ width: logo.width }}
                className="object-contain grayscale hover:grayscale-0 transition-all"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
