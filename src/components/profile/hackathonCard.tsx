
import Image from 'next/image';
import { Hackathon } from '@/libs/types';
import { CalendarDays, Users, MapPin, CircleDot } from 'lucide-react';

interface HackathonCardProps {
  hackathon: Hackathon;
}

const statusStyles = {
    Live: { bg: 'bg-green-800/50', text: 'text-green-300', border: 'border-green-500/50', icon: <CircleDot className="h-3 w-3" /> },
    Upcoming: { bg: 'bg-yellow-800/50', text: 'text-yellow-300', border: 'border-yellow-500/50', icon: <span className="h-2 w-2 bg-current rounded-full"></span> },
    Ended: { bg: 'bg-gray-700/50', text: 'text-gray-400', border: 'border-gray-600/50', icon: <span className="h-2 w-2 bg-current rounded-full"></span> },
};

export default function HackathonCard({ hackathon }: HackathonCardProps) {
  const currentStatusStyles = statusStyles[hackathon.status] || statusStyles.Ended;

  return (
   
    <div className="
        flex flex-col items-start self-stretch h-auto 
        rounded-2xl                           
        border-2 border-[#2B2B31]             
        p-4                                   
        mb-4                                  
       
        bg-[#1B1B22]                       
    ">
        
        <div className="w-full">
            
        
            <div className="flex items-center justify-between w-full">
                
                <div className="flex items-center gap-2">
                    <Image
                        src={hackathon.organizerLogoUrl || "/placeholder-logo.png"} // <<< REPLACE PATH
                        alt={`${hackathon.organizerName} logo`}
                        width={48} 
                        height={48}
                        className="rounded-full bg-gray-700"
                    />
                   <div className='flex flex-col '>
                   <p className="text-xs font-semibold uppercase tracking-wider text-gray-400/80 mb-1">
                ORGANIZER
            </p> 
                    <span className="text-sm font-medium text-gray-200">{hackathon.organizerName}</span>
                   </div>
                </div>
               
                <div className={`inline-flex items-center space-x-1.5 text-xs font-medium px-2 py-0.5 rounded-full border ${currentStatusStyles.bg} ${currentStatusStyles.text} ${currentStatusStyles.border}`}>
                    {currentStatusStyles.icon}
                    <span>{hackathon.status}</span>
                </div>
            </div>
        </div>

        
        <div className="flex flex-wrap flex-col items-start gap-x-5 gap-y-1 text-sm bg-[#13131A] text-gray-400 border-t border-gray-700/50 pt-3 mt-auto w-full">
           
            <h4 className="text-lg font-semibold text-white pt-1 pb-1 my-2 px-1 py-1">
            {hackathon.title}
        </h4> 
            <div className='flex flex-row gap-x-5 gap-y-1 py-1 px-1 '>
            <div className="flex items-center space-x-1.5">
               <MapPin className="h-4 w-4 flex-shrink-0 text-gray-500" />
               <span>{hackathon.type}</span>
            </div>
            <div className="flex items-center space-x-1.5">
               <CalendarDays className="h-4 w-4 flex-shrink-0 text-gray-500" />
               <span>{hackathon.date}</span>
            </div>
             <div className="flex items-center space-x-1.5">
                <Users className="h-4 w-4 flex-shrink-0 text-gray-500" />
                <span>{hackathon.participantCount.toLocaleString()} Participants</span>
             </div>
            </div>
        </div>
    </div>
  );
}