import React from 'react'; 
import Image from 'next/image';
import { TechnologyOwner } from '@/libs/types';


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


interface ProfileInfoProps {
  owner: TechnologyOwner | null;
}

export default function ProfileInfo({ owner }: ProfileInfoProps) {

  if (!owner) {
    
    return <div className="space-y-3 mb-6">
        <div className="h-5 w-3/4 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-5 w-1/2 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-5 w-1/3 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-5 w-2/3 bg-gray-700 rounded animate-pulse"></div>
    </div>;
  }

  
  const infoItemsData = [
    { iconPath: "/link.png", text: owner.websiteUrl },
    { iconPath: "/tag.png", text: owner.industry },
    { iconPath: "/people.png", text: owner.employeeCount },
    { iconPath: "/map-pin.png", text: owner.location },
  
  ].filter(item => item.text && item.iconPath);

  return (
    
    <div className="mb-6">
      
      {infoItemsData.map((item, index) => (
        
        <React.Fragment key={item.iconPath || index}> 
          <InfoItem iconPath={item.iconPath} text={item.text} />
          
          {index < infoItemsData.length - 1 && (
            <hr className="my-3 border-gray-700" /> 
          )}
        </React.Fragment>
      ))}
    </div>
  );
  
}