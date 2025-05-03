

interface AboutSectionProps {
    description: string;
  }
  
  export default function AboutSection({ description }: AboutSectionProps) {
    return (
      <div className="mb-8 bg-[#1B1B22] rounded-2xl px-6 py-6 ">
         <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">About</h3>
         
         <p className="text-sm text-[#FFFFFF] leading-relaxed whitespace-pre-line">{description}</p>
      </div>
    );
  }