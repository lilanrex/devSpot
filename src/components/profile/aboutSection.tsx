

interface AboutSectionProps {
    description: string;
  }
  
  export default function AboutSection({ description }: AboutSectionProps) {
    return (
      <div className=" bg-[#1B1B22] rounded-xl px-6 py-3 flex flex-col items-start gap-2 self-stretch w-full">
         <h3 className="text-sm font-semibold text-[#FFF]  mb-1">About</h3>
         
         <p className="text-sm text-[#89898C] leading-relaxed whitespace-pre-line">{description}</p>
      </div>
    );
  }