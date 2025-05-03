
import { TechnologyOwner } from '@/libs/types';
import Image from 'next/image';


interface ProfileInfoProps {
  
  owner: TechnologyOwner | null;
}


const InfoItem = ({ iconPath, text }: { iconPath?: string | null, text?: string | null }) => {
 
  if (!text || !iconPath) {
    return null;
  }
  return (
      <div className="flex items-center space-x-2 text-sm text-gray-300">
          
          <Image
              src={iconPath}
              alt="" 
              width={16} 
              height={16} 
              className="flex-shrink-0 opacity-70" 
          />
          <span>{text}</span>
      </div>
  );
};

export default function ProfileInfo({ owner }: ProfileInfoProps) {
  
  if (!owner) {
   
     return <div className="space-y-3 mb-6">
        <div className="h-5 w-3/4 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-5 w-1/2 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-5 w-1/3 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-5 w-2/3 bg-gray-700 rounded animate-pulse"></div>
     </div>;
  }

  return (
    <div className="space-y-3 mb-6">
        
        <InfoItem iconPath="/link.png" text={owner.websiteUrl} />
        <InfoItem iconPath="/tag.png" text={owner.industry} />
        <InfoItem iconPath="/people.png" text={owner.employeeCount} />
        <InfoItem iconPath="/map-pin.png" text={owner.location} />
    </div>
  );
}