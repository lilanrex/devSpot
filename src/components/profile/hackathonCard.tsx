
"use client"; 

import Image from "next/image";
import { Hackathon } from "@/libs/types";
import { CalendarDays, Users, MapPin, CircleDot } from "lucide-react";

interface HackathonCardProps {
  hackathon: Hackathon;
}


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
    : 'N/A Participants'; 
  return (
    <div className="
        flex flex-col items-start self-stretch h-auto
        rounded-2xl
        border-2 border-[#2B2B31]
        p-3 sm:p-4 {/* MODIFIED: Responsive padding */}
        mb-4
        bg-[#1B1B22]
        w-full {/* Explicitly set w-full for clarity within grid/flex parents */}
    ">

      
      <div className="w-full mb-3">
       
        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between w-full gap-2 sm:gap-4">

        
          <div className="flex items-center gap-2">
            
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                 <Image
                    src={hackathon.organizerLogoUrl || "/placeholder-logo.png"}
                    alt={`${hackathon.organizerName} logo`}
                    fill 
                    className="rounded-full bg-gray-700 object-cover" 
                 />
            </div>
             <div className='flex flex-col'>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400/80 mb-0 sm:mb-1"> {/* Adjust margin */}
                 ORGANIZER
                </p>
                
                <span className="text-sm sm:text-base font-medium text-gray-200 line-clamp-1" title={hackathon.organizerName}> {/* Added truncation */}
                    {hackathon.organizerName}
                </span>
             </div>
          </div>

         
          <div className={`inline-flex items-center space-x-1.5 text-xs font-medium px-2 py-0.5 rounded-full border ${currentStatusStyles.bg} ${currentStatusStyles.text} ${currentStatusStyles.border} self-start sm:self-center flex-shrink-0`}> {/* Align top-left when stacked */}
              {currentStatusStyles.icon}
              <span className="whitespace-nowrap">{hackathon.status}</span> 
          </div>
        </div>
      </div>

     
      <hr className="w-full border-gray-700/50 my-1" />

     
      <div className="flex flex-col items-start gap-y-1 text-sm text-gray-400 w-full">
       
        <h4 className="text-base sm:text-lg font-semibold text-white pt-1 pb-1 my-1">
            {hackathon.title}
        </h4>
       
        <div className='flex flex-row flex-wrap gap-x-3 sm:gap-x-5 gap-y-1 py-1'> 
            {hackathon.type && ( 
                 <div className="flex items-center space-x-1.5">
                    <MapPin className="h-4 w-4 flex-shrink-0 text-gray-500" />
                    <span>{hackathon.type}</span>
                 </div>
             )}
             {hackathon.date && ( 
                 <div className="flex items-center space-x-1.5">
                    <CalendarDays className="h-4 w-4 flex-shrink-0 text-gray-500" />
                    <span>{hackathon.date}</span>
                 </div>
             )}
             
             {(typeof hackathon.participantCount === 'number') && (
                 <div className="flex items-center space-x-1.5">
                    <Users className="h-4 w-4 flex-shrink-0 text-gray-500" />
                    <span>{participantText}</span>
                 </div>
             )}
        </div>
      </div>
    </div>
  );
}