"use client";

import Image from "next/image";
import { Hackathon } from "@/libs/types";
import { CalendarDays, Users, MapPin, CircleDot } from "lucide-react";

interface HackathonCardProps {
  hackathon: Hackathon;
}


const InfoItem = ({ IconComponent, text }: { IconComponent: React.ElementType, text?: string | null }) => {
  if (!text) return null;
  return (
    <div className="flex items-center space-x-2">
      <IconComponent className="h-5 w-5 flex-shrink-0 text-[#4E52F5]" />
      <span className="text-sm text-gray-400">{text}</span> 
    </div>
  );
};

const statusStyles = {
    Live: { bg: 'bg-green-800/50', text: 'text-green-300', border: 'border-green-500/50', icon: <CircleDot className="h-3 w-3" /> },
    Upcoming: { bg: 'bg-yellow-800/50', text: 'text-yellow-300', border: 'border-yellow-500/50', icon: <span className="h-2 w-2 bg-current rounded-full"></span> },
    Ended: { bg: 'bg-gray-700/50', text: 'text-gray-400', border: 'border-gray-600/50', icon: <span className="h-2 w-2 bg-current rounded-full"></span> },
};
const defaultStatusStyle = statusStyles.Ended;

export default function HackathonCard({ hackathon }: HackathonCardProps) {
  const currentStatusStyles = statusStyles[hackathon.status as keyof typeof statusStyles] || defaultStatusStyle;
  const participantText = typeof hackathon.participantCount === 'number'
    ? `${hackathon.participantCount.toLocaleString()} Participant${hackathon.participantCount !== 1 ? 's' : ''}`
    : null;

  return (
   
    <article className="
        flex flex-col self-stretch h-auto
        rounded-xl border-2 border-[#2B2B31]
            
        mb-4
        bg-[#1B1B22] w-full relative overflow-hidden 
    ">
   
        <div className=" px-4 pt-3 pb-3 "> 
            
            <div className={`-mr-2 absolute top-9 right-6 inline-flex items-center space-x-1.5 text-xs font-medium px-2 py-0.5 rounded-full border ${currentStatusStyles.bg} ${currentStatusStyles.text} ${currentStatusStyles.border} flex-shrink-0 z-10`}>
                {currentStatusStyles.icon}
                <span className="whitespace-nowrap">{hackathon.status}</span>
            </div>
           
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between w-full gap-2 sm:gap-4 ">
                
                <div className="flex items-center gap-2 flex-grow min-w-0">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                      <Image src={hackathon.organizerLogoUrl || "/placeholder-logo.png"} alt={`${hackathon.organizerName} logo`} fill className="rounded-md bg-gray-700 object-cover"/>
                    </div>
                    <div className='flex flex-col min-w-0'>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400/80 mb-0 sm:mb-1 truncate">ORGANIZER</p>
                        <span className="text-sm sm:text-base font-medium text-gray-200 line-clamp-1 truncate" title={hackathon.organizerName}>{hackathon.organizerName}</span>
                    </div>
                </div>
                
            </div>
        </div>
        

        
        <hr className="w-full border-t-2 border-[#2B2B31]" /> 


      
        <div className="flex flex-col  items-start w-full gap-1.5 px-4 pt-2.5 pb-3 bg-[#13131A] flex-1"> 
           
            <h3 className="text-lg sm:text-xl font-semibold text-white">
                {hackathon.title}
            </h3>
           
            <div className='flex flex-row flex-wrap gap-x-20 sm:gap-x-22 gap-y-2 w-full pt-1'> 
                {hackathon.type && <InfoItem IconComponent={MapPin} text={hackathon.type} />}
                {hackathon.date && <InfoItem IconComponent={CalendarDays} text={hackathon.date} />}
                {participantText && <InfoItem IconComponent={Users} text={participantText} />}
            </div>
        </div>
        
    </article>
  );
}